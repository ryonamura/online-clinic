# キレイレポオンライン HP — 完全コードベース（0-base ハンドオフ）

エンジニア向けの **0-base 完全パッケージ**です。

**このフォルダ自体が、そのまま使ってほしい完成形のプロジェクト一式**です。
ライブサイトや既存リポジトリに対するパッチ／差分ではありません。

| 項目 | 内容 |
|------|------|
| サイト名 | キレイレポオンライン |
| 技術 | Astro 5（静的サイト） |
| 用途 | オンライン診療 LP（GLP-1 / 美容内服 / アンチエイジング / AGA） |
| パッケージ種別 | **0-base complete**（差分パッチではない） |
| 本番ターゲット | `https://kireireport.com/online-clinic` |

---

## 本番ターゲット（重要）

本番では **`https://kireireport.com/online-clinic` 配下のコンテンツを、このビルド成果物（`dist/`）で置き換え**ます。

- `astro.config.mjs` 既定値:
  - `site` = `https://kireireport.com`
  - `base` = `/online-clinic/`
- ビルド後の `dist/` の中身を、サーバー上の `/online-clinic/` パスに配置してください

---

## ビルド・デプロイ手順

```bash
cd /path/to/kireirepo-online-hp-complete
npm ci
npm run build
```

1. 上記で `dist/` が生成される
2. `dist/` の**中身**をサーバーの `/online-clinic/` に配置する
3. 公開確認: `https://kireireport.com/online-clinic/`

Node.js 20 以上を推奨します。

---

## ローカルプレビュー

```bash
npm run dev
```

開く URL は次です（必須）:

**http://localhost:4321/online-clinic/**

ルート `http://localhost:4321/` は **404 になります（仕様）**。
`base=/online-clinic/` のため、必ず `/online-clinic/` 付きでアクセスしてください。

ビルド結果の確認:

```bash
npm run build
npm run preview
# → http://localhost:4321/online-clinic/
```

---

## この版の主な変更点（サマリー）

1. **商品 LP を 10 本整備**
   - GLP-1: リベルサス（rybelsus）/ 注射剤（injection）/ フォシーガ（forxiga）/ ルセフィ（lusefi）
   - 美容内服: はじめてセット（hajimete）/ 透明感爆上げセット（tomei）/ 白美セット（hakubi）/ アクネトレント（acne）
   - アンチエイジング: メトホルミン（metformin）
   - AGA: デュタステリド（dutasteride）

2. **支払い方法に PayPay を追加**
   - 表記: クレジットカード（VISA / Mastercard / JCB / AMEX）、Apple Pay、PayPay、atone翌月払い

3. **特商法の役割分担**
   - **お薬の発送**: 提携医療機関 **マーチクリニック**
   - **サイト運営・決済**: 株式会社シアン（お薬の発送は行わない）

4. **監修表記なし**（医師監修などの表記は入れない）

5. **アクネトレント**
   - 未承認薬・医師の個人輸入である旨を明記

6. **リベルサス 7mg**
   - 2回目以降 **¥15,500**

7. **GLP-1 価格帯**
   - 上限 **¥47,000**

8. **ミノキシジル**
   - 内服を削除（**外用のみ**）

9. **パフォーマンス / SEO / アクセシビリティ**
   - FontAwesome を subset 化
   - fonts を削減
   - OGP 画像（`public/ogp.png`）
   - コントラスト改善
   - sitemap / robots 対応
   - canonical = `https://kireireport.com/online-clinic/...`

10. **「透明感爆上げ」名称は現状のまま維持**（変更しない）

---

## ページ URL マップ（本番・`/online-clinic/` プレフィックス付き）

| ページ | URL |
|--------|-----|
| トップ | `/online-clinic/` |
| GLP-1 一覧 | `/online-clinic/glp1/` |
| リベルサス | `/online-clinic/glp1/rybelsus/` |
| GLP-1 注射剤 | `/online-clinic/glp1/injection/` |
| フォシーガ | `/online-clinic/glp1/forxiga/` |
| ルセフィ | `/online-clinic/glp1/lusefi/` |
| 美容内服 一覧 | `/online-clinic/beauty/` |
| はじめてセット | `/online-clinic/beauty/hajimete/` |
| 透明感爆上げセット | `/online-clinic/beauty/tomei/` |
| 白美セット | `/online-clinic/beauty/hakubi/` |
| アクネトレント | `/online-clinic/beauty/acne/` |
| アンチエイジング 一覧 | `/online-clinic/antiaging/` |
| メトホルミン | `/online-clinic/antiaging/metformin/` |
| AGA 一覧 | `/online-clinic/aga/` |
| デュタステリド | `/online-clinic/aga/dutasteride/` |
| FAQ | `/online-clinic/faq/` |
| 特商法 | `/online-clinic/legal/tokushoho/` |
| プライバシーポリシー | `/online-clinic/legal/privacy/` |
| 利用規約 | `/online-clinic/legal/terms/` |
| 医療広告ガイドライン | `/online-clinic/legal/medical-ad/` |

本番絶対 URL 例: `https://kireireport.com/online-clinic/glp1/rybelsus/`

---

## パッケージ構成

```
kireirepo-online-hp-complete/
├── README_HANDOFF.md      ← 本ファイル
├── package.json
├── package-lock.json
├── astro.config.mjs       ← site=kireireport.com / base=/online-clinic/
├── tsconfig.json
├── .gitignore
├── .github/               ← CI（GitHub Pages 用。本番は独自ドメイン想定）
├── docs/                  ← 参考（競合調査・ページ構成仕様）
├── public/                ← ogp.png, favicon.svg
├── scripts/               ← gen-icon-subset.py, gen-og.py
└── src/                   ← pages / components / data / layouts / lib / styles
```

**除外しているもの:** `node_modules/`, `dist/`, `.astro/`, `.context/`, `handoff-hp-update/`, `.git`

---

## 適用手順（エンジニア向け・要約）

1. 本パッケージで既存 HP リポジトリを置き換える（または新規 checkout）
2. `npm ci && npm run build` を実行
3. 生成された `dist/` の中身をサーバーの `/online-clinic/` にデプロイ
4. 動作確認は必ず `.../online-clinic/` 配下で行う（ルート `/` は対象外）

---

## 補足

- 料金・支払い・特商法の正本は主に `src/data/pricing.ts` / `src/data/products.ts` / `src/pages/legal/tokushoho.astro`
- CI の GitHub Pages workflow はプレビュー用に `PUBLIC_SITE` / `PUBLIC_BASE` を上書きします。本番（kireireport.com）は `astro.config.mjs` の既定値、またはデプロイ側で同様の値を渡してください
- 「透明感爆上げ」の名称は意図的に現状維持です
