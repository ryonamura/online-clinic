# HP更新ハンドオフ（エンジニア向け）

オンラインクリニック HP（Astro）の**未コミット変更一式**です。  
コミット / force push は行っていません。このパッケージを適用してビルド・デプロイしてください。

## ベース

| 項目 | 値 |
|------|------|
| ブランチ | `damascus` |
| ベースコミット | `6048947` — 料金表記の「2回目〜」を「2回目以降」に統一 |
| 詳細 | `BASE_COMMIT.txt` |

リモートが同じコミットなら、そのままパッチ適用できます。  
差分がある場合は先に `git pull` / マージしてから当ててください。

## パッケージ内容

| パス | 用途 |
|------|------|
| `hp-update.patch` | **全変更**（ソース + `public/` バイナリ）。推奨 |
| `hp-update-src-only.patch` | ソースのみ（アセットなし） |
| `changed/` | 変更後ファイル一式（上書きコピー用） |
| `changed-source-files.zip` | 上記 `changed/` の zip |
| `BASE_COMMIT.txt` | パッチ作成時の HEAD |
| `git-status-at-package.txt` | パッケージ作成時の変更一覧 |

## 変更サマリー

1. **PayPay を支払い方法に追加**
   - `PAYMENT_METHODS` に PayPay を追加（正本）
   - トップ / FAQ / AGA は定数参照に統一
   - 特商法は atone 詳細付きのためハードコードで PayPay 追記
   - GLP-1 / 美容 / アンチエイジングは定数経由で自動反映
2. **特商法・配送**（セッション内修正を含む）
   - サイト URL → `https://kireirepo-online.clinic`
   - 発送: マーチクリニック / シアンはサイト運営・決済のみ
   - 引渡時期: 最短翌日発送・お届け 1〜5 営業日程度
3. **トップ料金**を料金マスターから算出（「初回 ○○円〜」）
4. **メタ description**・favicon / OGP

### PayPay で触ったファイル

| ファイル | 内容 |
|----------|------|
| `src/data/pricing.ts` | `PAYMENT_METHODS` 正本 |
| `src/pages/index.astro` | お支払い方法（定数） |
| `src/pages/faq.astro` | 支払方法 FAQ（定数） |
| `src/pages/aga.astro` | お支払い方法（定数） |
| `src/pages/legal/tokushoho.astro` | 支払方法（atone 詳細付き） |

定数経由で自動反映: `glp1.astro` / `beauty.astro` / `antiaging.astro` / AGA 料金注記

表記例:

`クレジットカード（VISA / Mastercard / JCB / AMEX）、Apple Pay、PayPay、atone翌月払い`

## 適用方法 A: パッチ（推奨）

```bash
git fetch origin
git checkout damascus
git pull origin damascus
git log -1 --oneline   # 理想は 6048947 付近

# ドライラン
git apply --check --binary /path/to/handoff-hp-update/hp-update.patch

# 適用
git apply --binary /path/to/handoff-hp-update/hp-update.patch
```

ソースのみ（`public/` は zip / `changed/` からコピー）:

```bash
git apply --check /path/to/handoff-hp-update/hp-update-src-only.patch
git apply /path/to/handoff-hp-update/hp-update-src-only.patch
cp -R /path/to/handoff-hp-update/changed/public ./
```

コンフリクト時は `git apply --reject` で `.rej` を確認するか、方式 B に切り替えてください。

## 適用方法 B — ファイルコピー

```bash
cd /path/to/online-clinic
unzip /path/to/changed-source-files.zip -d /tmp/hp-changed
# または handoff-hp-update/changed/ を使う

cp -R /tmp/hp-changed/public ./
cp /tmp/hp-changed/src/data/pricing.ts src/data/
cp /tmp/hp-changed/src/layouts/BaseLayout.astro src/layouts/
cp /tmp/hp-changed/src/pages/aga.astro src/pages/
cp /tmp/hp-changed/src/pages/faq.astro src/pages/
cp /tmp/hp-changed/src/pages/index.astro src/pages/
cp /tmp/hp-changed/src/pages/legal/tokushoho.astro src/pages/legal/
```

（パスは環境に合わせて読み替えてください。`changed/` 直下に `src/` と `public/` があります。）

## ビルド・デプロイ

```bash
npm ci   # または npm install
npm run build
```

- 静的出力: `dist/`
- ローカル確認: `npm run preview`
- 本番デプロイは既存の HP デプロイ手順に従ってください（このパッケージではデプロイしません）

### 確認ポイント

- [ ] トップ「お支払い・定期配送」に PayPay
- [ ] FAQ「支払方法」に PayPay
- [ ] AGA「お支払い方法」に PayPay
- [ ] 特商法「支払方法」に PayPay
- [ ] GLP-1 / 美容 / アンチエイジングの料金注記に PayPay
- [ ] 特商法の発送主体・引渡時期が意図どおり
- [ ] favicon が表示される

## 変更ファイル一覧

```
src/data/pricing.ts
src/layouts/BaseLayout.astro
src/pages/aga.astro
src/pages/faq.astro
src/pages/index.astro
src/pages/legal/tokushoho.astro
public/favicon.svg   （新規）
public/ogp.png      （新規）
```

## 注意

- **git commit / force push は行っていません。** 適用後のコミットはエンジニア側で実施してください。
- `handoff-hp-update/` 自体は配布用で、本番リポジトリへのコミットは不要です。
- ベースが `6048947` から大きく離れている場合は、パッチよりファイルコピー＋手動マージを推奨します。
- フルパッチ適用時は `git apply --binary` を使ってください（`ogp.png` 含むため）。
