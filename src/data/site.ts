// =========================================================
// サイト全体で共有する定数（DRY のため一元管理）
// 特商法の事業者詳細はリサーチ結果（.context/content-extracted.md）を反映
// =========================================================

export const LINE_URL = "https://lin.ee/3vvO4ol";
export const LINE_URL_ALT = "https://lin.ee/YjPkymi"; // 特商法問い合わせ用

// オンラインショップ（Shopify: Kireireport Online Store）
// ※独自ドメイン運用の場合は確認のうえ差し替え
export const SHOP_URL = "https://kireireportonline.myshopify.com";

export const SITE_NAME = "キレイレポオンライン";

export const company = {
  operator: "株式会社シアン",
  representative: "籔本 崇",
  address: "〒141-0031 東京都品川区西五反田2丁目13-6 セラヴィ五反田ビル2F",
  tel: "03-6419-7728",
  email: "info@xian.inc",
  hours: "平日 11:00〜17:00",
  partnerClinic: "マーチクリニック",
  medicalAdGuidelineUrl:
    "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryou/kokokukisei/",
};

// グローバルナビ（サービス）— accent: pink=ピンク系 / gold=ゴールド系 / navy=メンズ系
export const services = [
  { slug: "glp1", label: "GLP-1ダイエット", href: "/glp1", accent: "pink" },
  { slug: "beauty", label: "美容内服", href: "/beauty", accent: "pink" },
  { slug: "antiaging", label: "アンチエイジング", href: "/antiaging", accent: "gold" },
  { slug: "aga", label: "AGA治療", href: "/aga", accent: "navy" },
] as const;

export const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "GLP-1ダイエット", href: "/glp1" },
  { label: "美容内服", href: "/beauty" },
  { label: "アンチエイジング", href: "/antiaging" },
  { label: "AGA治療", href: "/aga" },
  { label: "よくある質問", href: "/faq" },
] as const;

// オンラインショップへの導線
export const shopLink = { label: "オンラインショップ", href: SHOP_URL };

// 法的ページ（独立URL化。特商法はサービス別に正確化する）
export const legalLinks = [
  { label: "特定商取引法に基づく表記", href: "/legal/tokushoho" },
  { label: "プライバシーポリシー", href: "/legal/privacy" },
  { label: "利用規約", href: "/legal/terms" },
  { label: "医療広告ガイドライン", href: "/legal/medical-ad" },
] as const;
