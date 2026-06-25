// =========================================================
// 料金マスター（2025-12-05 版・最新）— サイト内の価格はすべてここを参照する
// 共通ルール:
//   ・全プラン別途、診察・配送料 一律 2,000円（税込）。2回目以降も同額。
//   ・支払い方法: クレジットカード / Apple Pay / atone翌月払い のみ。
//   ・価格はすべて税込。null は「設定なし(-)」。
//   ・買い切り(buyout)は1ヶ月単位。定期(m1/m3/m6)は initial=初回 / recur=2回目以降。
//   ・注射薬は1ヶ月分=4本（1箱2本×2箱）。
//   ・社割「中の人割引」は患者非表示のため掲載しない。
// =========================================================

export const CONSULT_SHIPPING = 2000; // 診察・配送料（税込・一律）
export const PAYMENT_METHODS =
  "クレジットカード（VISA / Mastercard / JCB / AMEX）、Apple Pay、atone翌月払い";

export interface Term {
  initial: number | null; // 初回
  recur: number | null; // 2回目以降
}
export interface Plan {
  name: string;
  detail?: string; // 内容・用量など
  buyout: number | null; // 買い切り（1ヶ月）
  m1: Term | null; // 1ヶ月定期
  m3: Term | null; // 3ヶ月定期
  m6: Term | null; // 6ヶ月定期
  note?: string;
}

// ===== ダイエット：GLP-1 / SGLT2 =====
export const glp1Plans: Plan[] = [
  { name: "注射薬 2.5mg", detail: "GIP/GLP-1 受容体作動薬・週1回 注射", buyout: 13000, m1: { initial: 12000, recur: 13000 }, m3: { initial: 29400, recur: 34920 }, m6: { initial: 58800, recur: 67680 } },
  { name: "注射薬 5.0mg", detail: "週1回 注射", buyout: 27000, m1: { initial: 25000, recur: 27000 }, m3: { initial: 59400, recur: 78570 }, m6: { initial: 118800, recur: 152280 } },
  { name: "注射薬 7.5mg", detail: "週1回 注射", buyout: 38000, m1: { initial: 36000, recur: 38000 }, m3: { initial: 89400, recur: 110500 }, m6: { initial: 178800, recur: 214320 } },
  { name: "注射薬 10.0mg", detail: "週1回 注射（医師判断で増量）", buyout: 47000, m1: { initial: 45000, recur: 47000 }, m3: { initial: 131000, recur: 136700 }, m6: null },
  { name: "リベルサス 3mg", detail: "飲むGLP-1・毎日 内服", buyout: 7500, m1: { initial: 7500, recur: 7500 }, m3: { initial: 20000, recur: 21800 }, m6: null },
  { name: "リベルサス 7mg", detail: "飲むGLP-1・毎日 内服", buyout: 15500, m1: { initial: 15500, recur: 27600 }, m3: { initial: 44500, recur: 45100 }, m6: null },
  { name: "フォシーガ 5mg", detail: "SGLT2阻害薬・毎日 内服", buyout: 9500, m1: { initial: 8500, recur: 9500 }, m3: { initial: 27600, recur: 27600 }, m6: null },
  { name: "ルセフィ錠 2.5mg", detail: "SGLT2阻害薬・毎日 内服", buyout: 8500, m1: { initial: 7500, recur: 8500 }, m3: { initial: 24700, recur: 24700 }, m6: null },
];

// ===== ダイエット：セット / オプション =====
export const dietSetPlans: Plan[] = [
  { name: "メトホルミン + フォシーガ", detail: "Wアプローチ", buyout: null, m1: { initial: 10930, recur: 12930 }, m3: { initial: 37600, recur: 37600 }, m6: null },
  { name: "注射薬2.5mg + ナウゼリン", detail: "ナウゼリン5 10錠（吐き気対策）", buyout: 14000, m1: { initial: 13000, recur: 14000 }, m3: null, m6: null },
  { name: "注射薬2.5mg + 防風通聖散", detail: "防風通聖散60包", buyout: 17000, m1: { initial: 16000, recur: 17000 }, m3: null, m6: null },
];
export const dietAddons: Plan[] = [
  { name: "ナウゼリン5 10錠（追加）", detail: "吐き気止め", buyout: 1000, m1: { initial: 1000, recur: 1000 }, m3: null, m6: null, note: "注射薬処方時に申し出があった方のみ" },
  { name: "防風通聖散60包（追加）", detail: "漢方", buyout: 4000, m1: { initial: 4000, recur: 4000 }, m3: null, m6: null, note: "注射薬処方時に申し出があった方のみ" },
];

// ===== アンチエイジング / ダイエット：メトホルミン単剤 =====
// ※最新マスターでは科目「ダイエット」に分類。現状はアンチエイジングページで掲載中。
export const metforminPlan: Plan = {
  name: "メトホルミン 500mg",
  detail: "30日分60錠",
  buyout: null,
  m1: { initial: 2980, recur: 3480 },
  m3: { initial: 9800, recur: 9800 },
  m6: { initial: 18800, recur: 18800 },
};

// ===== スキンケア：美容内服 =====
export const beautyPlans: Plan[] = [
  { name: "はじめての美容内服セット", detail: "シナール・ユベラ・ハイチオール（各60錠）", buyout: 3480, m1: { initial: 2980, recur: 3480 }, m3: null, m6: null },
  { name: "透明感爆上げセット", detail: "シナール・ユベラ50mg・ハイチオール（各90錠）", buyout: 4980, m1: { initial: 3980, recur: 4980 }, m3: { initial: 9800, recur: 10800 }, m6: null },
  { name: "とことん美白セット", detail: "シナール・ユベラ・トラネキサム酸・ハイチオール・ノイロビタン（各90錠）", buyout: 6980, m1: { initial: 6480, recur: 6980 }, m3: { initial: 17800, recur: 18800 }, m6: null, note: "トラネキサム酸を含むため、ピル服用中・血栓症の既往がある方は不可" },
  { name: "アクネトレント 20mg", detail: "中等症〜重症ニキビ向け（イソトレチノイン）", buyout: 5980, m1: { initial: 4980, recur: 5980 }, m3: { initial: 10800, recur: 11800 }, m6: null },
];

// ===== AGA =====
export const agaPlans: Plan[] = [
  { name: "デュタステリド錠 0.5mg", detail: "国内AGA承認薬・毎日 内服", buyout: 3980, m1: { initial: 3480, recur: 3980 }, m3: { initial: 6980, recur: 7980 }, m6: null },
  { name: "デュタステリド0.5mg 12ヶ月まとめ買い", detail: "360錠・買い切りのみ", buyout: 19980, m1: null, m3: null, m6: null },
];
