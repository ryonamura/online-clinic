# キレイレポオンライン HP — 完全コードベース（0-base ハンドオフ）

エンジニア向けの **0-base 完全パッケージ**です。  
ライブサイトや既存リポジトリに対するパッチ／差分ではありません。**このフォルダ自体が、そのまま使ってほしい完成形のプロジェクト一式**です。

| 項目 | 内容 |
|------|------|
| サイト名 | キレイレポオンライン |
| 技術 | Astro 5（静的サイト） |
| 用途 | オンライン診療 LP（GLP-1 / 美容内服 / アンチエイジング / AGA） |
| パッケージ種別 | **0-base complete**（差分パッチではない） |

---

## 使い方

### A. 既存リポジトリを置き換える場合

既存の HP リポジトリをこの内容で上書きする想定です。

```bash
# 例: 受け取り側のリポジトリルートで
# このパッケージの中身をコピー（node_modules / dist は含めない）
rsync -a --exclude README_HANDOFF.md /path/to/kireirepo-online-hp-complete/ ./

npm ci
npm run build
```

### B. 新規クローン相当で動かす場合

```bash
cd /path/to/kireirepo-online-hp-complete
npm ci
npm run dev      # ローカル確認
npm run build    # 本番ビルド
npm run preview  # ビルド結果の確認
```

Node.js 20 以上を推奨します。

---

## この版の主な変更点（サマリー）

1. **支払い方法に PayPay を追加**
   - 正本: `src/data/pricing.ts` の `PAYMENT_METHODS`
   - 表記: `クレジットカード（VISA / Mastercard / JCB / AMEX）、Apple Pay、PayPay、atone翌月払い`
   - 各サービスページは定数参照。特商法ページは atone 詳細付きのため同内容を記載

2. **特商法・発送の整理**
   - **お薬の発送**: 提携医療機関 **マーチクリニック**
   - **サイト運営・決済**: 株式会社シアン（お薬の発送は行わない）
   - サイト URL（特商法）: `https://kireirepo-online.clinic`
   - 引渡時期: 処方確定後、最短翌日発送／お届けは地域により 1〜5 営業日程度

3. **トップページの初回価格**
   - 料金マスター（`pricing.ts`）から算出した「初回 ○○円〜」表記

4. **meta / OGP**
   - `BaseLayout.astro` で description・canonical・OGP（og:image 等）を整備
   - favicon / OGP 画像（`public/`）

5. **発送文言の統一**
   - トップ・FAQ・各サービスページで「最短翌日発送」等を整合

---

## デプロイ（GitHub Pages）

`.github/workflows/` に GitHub Pages 向け workflow があります。

- トリガー: `damascus` / `main` への push、または `workflow_dispatch`
- ビルド時 env:
  - `PUBLIC_SITE=https://ryonamura.github.io`
  - `PUBLIC_BASE=/online-clinic`
- 本番独自ドメイン運用時は、`astro.config.mjs` および workflow の `PUBLIC_SITE` / `PUBLIC_BASE` を環境に合わせて変更してください

---

## ディレクトリ構成（概要）

```
kireirepo-online-hp-complete/
├── README_HANDOFF.md     ← 本ファイル
├── package.json
├── package-lock.json
├── astro.config.mjs
├── tsconfig.json
├── .gitignore
├── .github/               # GitHub Pages deploy
├── public/                # 静的アセット（favicon, OGP 等）
└── src/
    ├── components/
    ├── data/              # pricing.ts（料金・支払い）, site.ts
    ├── layouts/           # BaseLayout（meta/OGP）
    ├── pages/            # 各 LP・legal（特商法など）
    ├── styles/
    └── lib/
```

`node_modules/`・`dist/`・`.astro/` は含めていません。`npm ci` で依存関係を入れてください。

---

## 連絡・コンテキスト

- プロダクト: **キレイレポオンライン**（オンライン診療 HP）
- 技術スタック: Astro 静的サイト
- 本パッケージはエンジニアへの **0-base 完全引き渡し**用です。コミット／force push はパッケージ作成時には実施していません
