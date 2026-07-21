#!/usr/bin/env python3
"""OGP 画像 (1200x630) を生成する。

ブランドピンク (#ff4471) を基調に、サイト名「キレイレポオンライン」と
タグライン「オンライン診療」を配置したクリーンな OG 画像を出力する。
favicon と同じ同心円（ターゲット）モチーフを右側にあしらう。

出力: public/ogp.png
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "ogp.png"

W, H = 1200, 630

# --- colors ---
BG = (255, 255, 255)
NAVY = (44, 62, 80)
GRAY = (127, 140, 141)
PINK = (255, 68, 113)      # brand-600
PINK_L = (255, 107, 142)   # brand-500
PINK_LL = (255, 138, 170)  # brand-400
WHITE = (255, 255, 255)

FONT_DIR = "/System/Library/Fonts"
F_BLACK = f"{FONT_DIR}/ヒラギノ角ゴシック W8.ttc"
F_BOLD = f"{FONT_DIR}/ヒラギノ角ゴシック W6.ttc"
F_MED = f"{FONT_DIR}/ヒラギノ角ゴシック W4.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def diagonal_gradient(size, c0, c1, c2):
    """135度方向の3色グラデーション画像を作る。"""
    w, h = size
    grad = Image.new("RGB", size)
    px = grad.load()
    maxd = w + h
    for y in range(h):
        for x in range(w):
            t = (x + y) / maxd
            if t < 0.5:
                px[x, y] = lerp(c0, c1, t / 0.5)
            else:
                px[x, y] = lerp(c1, c2, (t - 0.5) / 0.5)
    return grad


def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def main() -> int:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # --- 右側のピンクグラデーションパネル ---
    panel_w, panel_h = 470, 470
    panel_x, panel_y = W - panel_w - 70, (H - panel_h) // 2
    grad = diagonal_gradient((panel_w, panel_h), PINK_LL, PINK_L, PINK)
    mask = rounded_mask((panel_w, panel_h), 60)
    img.paste(grad, (panel_x, panel_y), mask)

    # favicon と同じターゲットモチーフ（白円 + ピンク内円）
    cx, cy = panel_x + panel_w // 2, panel_y + panel_h // 2
    r_out = 150
    draw.ellipse([cx - r_out, cy - r_out, cx + r_out, cy + r_out], fill=WHITE)
    r_in = 84
    draw.ellipse([cx - r_in, cy - r_in, cx + r_in, cy + r_in], fill=PINK)
    # 中央の小さな白ドット（クロスヘア感）
    r_dot = 26
    draw.ellipse([cx - r_dot, cy - r_dot, cx + r_dot, cy + r_dot], fill=WHITE)

    # --- 左側テキストブロック ---
    left = 80
    # eyebrow
    eb = font(F_BOLD, 30)
    draw.text((left + 2, 132), "O N L I N E   C L I N I C", font=eb, fill=PINK)
    # 小さなアクセントバー
    draw.rounded_rectangle([left + 2, 178, left + 64, 184], radius=3, fill=PINK)

    # site name（2行に分けてバランス良く）
    f_title = font(F_BLACK, 92)
    draw.text((left, 208), "キレイレポ", font=f_title, fill=NAVY)
    draw.text((left, 312), "オンライン", font=f_title, fill=NAVY)

    # tagline
    f_tag = font(F_BLACK, 58)
    draw.text((left, 430), "オンライン診療", font=f_tag, fill=PINK)

    # sub description
    f_sub = font(F_MED, 27)
    draw.text((left, 512), "GLP-1メディカルダイエット・美容内服・アンチエイジング",
              font=f_sub, fill=GRAY)

    # --- 下部のブランドバー ---
    bar_h = 14
    bar = diagonal_gradient((W, bar_h), PINK_LL, PINK_L, PINK)
    img.paste(bar, (0, H - bar_h))

    img.save(OUT, "PNG", optimize=True)
    print(f"OK: {OUT} ({img.size[0]}x{img.size[1]})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
