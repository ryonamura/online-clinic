#!/usr/bin/env python3
"""FontAwesome サブセット生成スクリプト.

サイト内で実際に使用している `fa-*` アイコンだけを抽出し、
FontAwesome Free の woff2 をそのグリフだけにサブセット化した上で、
使用アイコン分の `::before { content }` だけを含む最小 CSS を生成する。

- 出力フォント: src/styles/fonts/fa-solid-subset.woff2 / fa-brands-subset.woff2
- 出力 CSS   : src/styles/fontawesome-subset.css

CDN の全部入り CSS（レンダーブロッキング）を置き換えるのが目的。
テンプレート側の `<i class="fa-solid fa-xxx">` はそのまま利用できる。
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
FA = ROOT / "node_modules" / "@fortawesome" / "fontawesome-free"
WEBFONTS = FA / "webfonts"
META = FA / "metadata" / "icon-families.json"

OUT_FONT_DIR = SRC / "styles" / "fonts"
OUT_CSS = SRC / "styles" / "fontawesome-subset.css"

STYLE_PREFIXES = {"solid", "brands", "regular", "classic", "sharp", "light", "thin", "duotone"}

ICON_RE = re.compile(r"fa-([a-z0-9-]+)")


def collect_used_icons() -> set[str]:
    used: set[str] = set()
    for path in SRC.rglob("*"):
        if path.suffix not in {".astro", ".ts", ".tsx", ".js", ".mjs", ".html", ".md", ".mdx"}:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for m in ICON_RE.findall(text):
            if m in STYLE_PREFIXES:
                continue
            used.add(m)
    return used


def main() -> int:
    meta = json.loads(META.read_text(encoding="utf-8"))
    used = collect_used_icons()

    solid: dict[str, str] = {}
    brands: dict[str, str] = {}
    missing: list[str] = []

    for name in sorted(used):
        entry = meta.get(name)
        if not entry:
            missing.append(name)
            continue
        unicode_hex = entry.get("unicode")
        styles = {s.get("style") for s in entry.get("familyStylesByLicense", {}).get("free", [])}
        if not unicode_hex:
            missing.append(name)
            continue
        if "solid" in styles:
            solid[name] = unicode_hex
        elif "brands" in styles:
            brands[name] = unicode_hex
        elif "regular" in styles:
            # このサイトは regular を fa-solid で使っているため solid 扱い
            solid[name] = unicode_hex
        else:
            missing.append(name)

    if missing:
        print(f"WARNING: metadata が見つからないアイコン: {missing}", file=sys.stderr)

    OUT_FONT_DIR.mkdir(parents=True, exist_ok=True)

    def subset(src_woff2: Path, out_woff2: Path, codepoints: list[str]) -> None:
        unicodes = ",".join(f"U+{cp}" for cp in codepoints)
        cmd = [
            sys.executable, "-m", "fontTools.subset",
            str(src_woff2),
            f"--unicodes={unicodes}",
            "--flavor=woff2",
            "--layout-features=*",
            f"--output-file={out_woff2}",
        ]
        subprocess.run(cmd, check=True)

    subset(WEBFONTS / "fa-solid-900.woff2", OUT_FONT_DIR / "fa-solid-subset.woff2", list(solid.values()))
    subset(WEBFONTS / "fa-brands-400.woff2", OUT_FONT_DIR / "fa-brands-subset.woff2", list(brands.values()))

    lines: list[str] = []
    lines.append("/*")
    lines.append(" * FontAwesome Free 6.5.1 subset — 自動生成 (scripts/gen-icon-subset.py)")
    lines.append(" * このサイトで実際に使用しているアイコンのみを含む自己ホスト版。")
    lines.append(" * License: Icons CC BY 4.0 / Fonts SIL OFL 1.1 / Code MIT (Fonticons, Inc.)")
    lines.append(f" * 収録: solid {len(solid)}個 / brands {len(brands)}個")
    lines.append(" */")
    lines.append("@font-face {")
    lines.append('  font-family: "Font Awesome 6 Free";')
    lines.append("  font-style: normal;")
    lines.append("  font-weight: 900;")
    lines.append("  font-display: swap;")
    lines.append('  src: url("./fonts/fa-solid-subset.woff2") format("woff2");')
    lines.append("}")
    lines.append("@font-face {")
    lines.append('  font-family: "Font Awesome 6 Brands";')
    lines.append("  font-style: normal;")
    lines.append("  font-weight: 400;")
    lines.append("  font-display: swap;")
    lines.append('  src: url("./fonts/fa-brands-subset.woff2") format("woff2");')
    lines.append("}")
    lines.append(".fa-solid,")
    lines.append(".fa-brands {")
    lines.append("  -moz-osx-font-smoothing: grayscale;")
    lines.append("  -webkit-font-smoothing: antialiased;")
    lines.append("  display: var(--fa-display, inline-block);")
    lines.append("  font-style: normal;")
    lines.append("  font-variant: normal;")
    lines.append("  line-height: 1;")
    lines.append("  text-rendering: auto;")
    lines.append("}")
    lines.append('.fa-solid { font-family: "Font Awesome 6 Free"; font-weight: 900; }')
    lines.append('.fa-brands { font-family: "Font Awesome 6 Brands"; font-weight: 400; }')

    def emit_content(mapping: dict[str, str]) -> None:
        for name, cp in sorted(mapping.items()):
            lines.append(f'.fa-{name}::before {{ content: "\\{cp}"; }}')

    emit_content(solid)
    emit_content(brands)

    OUT_CSS.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"OK: solid {len(solid)}個, brands {len(brands)}個 をサブセット化")
    print(f"  font: {OUT_FONT_DIR}")
    print(f"  css : {OUT_CSS}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
