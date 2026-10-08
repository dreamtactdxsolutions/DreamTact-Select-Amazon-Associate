// 掲載商品のデータ
// 価格・販売元・仕様は、オーナーが確認したAmazon商品ページ・メーカー公式サイトの情報だけを使う（出典は ops/research/）。
// 確認できない数値は書かない。価格は必ず checkedAt（確認日）と一緒に表示する。

export type ProductCategory = 'gadget' | 'appliance' | 'kitchen' | 'beauty' | 'household' | 'books';

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  gadget: 'ガジェット',
  appliance: '家電',
  kitchen: 'キッチン',
  beauty: '美容家電',
  household: '日用品',
  books: '本',
};

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  // 税込価格（Amazon商品ページ、checkedAt 時点）
  price: number;
  // 価格などを確認した日（YYYY-MM-DD、日本時間）
  checkedAt: string;
  // 出荷元・販売元（確認できたものだけ）
  seller?: string;
  // 価格の見方の注意（予約商品・タイムセール中など）
  notes?: string[];
  asin: string;
  specs: Record<string, string>;
  description: string;
  // 向いている人
  pros: string[];
  // 確認しておきたい点
  cons: string[];
  // この商品を扱っている記事（あれば商品カードと詳細から案内する）
  relatedArticle?: {
    slug: string;
    title: string;
  };
}

const PRIME_SALE_ARTICLE = {
  slug: 'prime-sale-2026-price-check',
  title: '【プライム感謝祭2026】セール前に価格をメモしておきたい10品',
};

export const products: Product[] = [
  // ガジェット
  {
    id: 'fire-tv-stick-4k-select',
    name: 'Amazon Fire TV Stick 4K Select',
    tagline: 'テレビで動画配信サービスを見るためのストリーミングメディアプレイヤー',
    category: 'gadget',
    price: 10980,
    checkedAt: '2026-10-08',
    seller: 'Amazon.co.jp',
    notes: ['商品ページに「この商品には新しいモデルがあります」と表示（2026年10月8日時点）'],
    asin: 'B0G2TXCWFH',
    specs: {
      '画質の表記': '4K（商品名の表記）',
    },
    description: 'テレビにつないで、動画配信サービスを見るための機器です。確認時点で新しいモデルがあると表示されていたため、購入前に両方の価格と対応機能を見比べてから選んでください。',
    pros: ['テレビで動画配信サービスを見たい人', 'Amazon.co.jp 販売の商品を選びたい人'],
    cons: ['新しいモデルとの違い（価格・機能）を商品ページで確認してから選ぶ'],
    relatedArticle: PRIME_SALE_ARTICLE,
  },
  {
    id: 'anker-power-bank-20000-87w',
    name: 'Anker Power Bank（20000mAh, 87W, Built-In USB-C ケーブル）',
    tagline: 'USB-Cケーブルが本体に付いた、容量20000mAhのモバイルバッテリー',
    category: 'gadget',
    price: 6720,
    checkedAt: '2026-10-08',
    notes: ['確認した時点ですでにタイムセール中の価格（「-33%」、参考価格 9,990円のAmazonの表示）。タイムセール終了後は価格が変わる可能性があります'],
    asin: 'B0CXNY69DC',
    specs: {
      '容量': '20000mAh（商品名の表記）',
      '出力': '87W（商品名の表記）',
      'ケーブル': 'USB-Cケーブル内蔵（商品名の表記）',
      'PSE': '商品説明に「PSE技術基準適合」の表記',
    },
    description: 'USB-Cケーブルが本体に付いたモバイルバッテリーです。確認時点の価格はタイムセール中のものである点に注意してください。',
    pros: ['ケーブルを別に持ち歩きたくない人', '容量20000mAhのモバイルバッテリーを探している人'],
    cons: ['容量や出力の違うモデルが多いので、商品名の数値が用途に合うか確認する', '参考価格からの割引率ではなく、金額そのもので比べる'],
    relatedArticle: PRIME_SALE_ARTICLE,
  },
  {
    id: 'kindle-paperwhite-signature-32gb',
    name: 'Amazon Kindle Paperwhite シグニチャーエディション 32GB',
    tagline: '7インチディスプレイ・明るさ自動調整の電子書籍リーダー（予約受付中）',
    category: 'gadget',
    price: 44980,
    checkedAt: '2026-10-08',
    seller: 'Amazon.co.jp',
    notes: ['予約商品：発売予定日 2026年11月11日'],
    asin: 'B0GV61RZK8',
    specs: {
      'ストレージ': '32GB（商品名の表記）',
      'ディスプレイ': '7インチ（商品名の表記）',
      '明るさ': '自動調整（商品名の表記）',
    },
    description: 'Kindle Paperwhite のシグニチャーエディションで、確認時点では発売前の予約商品でした。発売前のため購入者の評価はまだありません。',
    pros: ['電子書籍リーダーの新しいモデルを発売時期に合わせて手に入れたい人'],
    cons: ['容量や機能の違うモデルと価格を見比べてから選ぶ'],
    relatedArticle: PRIME_SALE_ARTICLE,
  },

  // 家電
  {
    id: 'panasonic-f-yex120b',
    name: 'パナソニック 衣類乾燥除湿機 F-YEX120B-W',
    tagline: 'エコ・ハイブリッド方式の衣類乾燥除湿機',
    category: 'appliance',
    price: 69000,
    checkedAt: '2026-10-08',
    seller: '家電通販ナカデン（出品者）',
    asin: 'B0D1764L6D',
    specs: {
      '方式': 'エコ・ハイブリッド方式（商品名の表記）',
    },
    description: '部屋干しの「乾かす」役割を担う衣類乾燥除湿機です。確認時点の出荷元・販売元は Amazon.co.jp ではなく出品者でした。',
    pros: ['部屋干しが多く、衣類乾燥除湿機を探している人'],
    cons: ['販売元によって返品・保証の窓口が異なる場合があるので、商品ページで確認する', '性能はメーカー公式サイトの仕様で確認する'],
    relatedArticle: { slug: 'room-drying-guide', title: '部屋干しの悩みを3つの役割で整理' },
  },
  {
    id: 'zojirushi-ee-df50',
    name: '象印マホービン スチーム式加湿器 EE-DF50-HA（グレー）',
    tagline: '容量4.0L・フィルター不要のスチーム式加湿器',
    category: 'appliance',
    price: 23384,
    checkedAt: '2026-10-08',
    seller: 'Amazon.co.jp',
    notes: ['確認時点で「-7%」、参考価格 25,080円のAmazonの表示。「他の出品者ではより安い価格があります」の表示あり'],
    asin: 'B0FH9PMVR8',
    specs: {
      '方式': 'スチーム式（蒸気式）',
      'タンク容量': '4.0L（商品名の表記）',
      'フィルター': '不要（商品名の表記）',
    },
    description: 'フィルター交換のいらないスチーム式の加湿器です。確認時点の出荷元・販売元は Amazon.co.jp でした。',
    pros: ['フィルター交換のいらない加湿器を探している人'],
    cons: ['参考価格からの割引率ではなく、金額そのもので比べる'],
    relatedArticle: PRIME_SALE_ARTICLE,
  },

  // キッチン
  {
    id: 'delonghi-magnifica-s',
    name: 'デロンギ 全自動コーヒーマシン マグニフィカS ECAM22112B',
    tagline: '全2メニュー・ミルクは手動の全自動コーヒーマシン',
    category: 'kitchen',
    price: 69800,
    checkedAt: '2026-10-08',
    asin: 'B088HJCVDX',
    specs: {
      'メニュー': '全2メニュー（商品名の表記）',
      'ミルク': '手動',
      '本体寸法': '奥行43×幅23.8×高さ35cm',
      '重さ': '9.5kg',
      '水タンク': '1.8L',
      '消費電力': '1450W',
    },
    description: '豆を挽くところから抽出までを1台で行う全自動コーヒーマシンです。マグニフィカ スタートより軽く、メニューは少なめです。',
    pros: ['ブラックコーヒー中心で、メニューは少なくてよい人', 'ミルクは手動で泡立ててもよい人'],
    cons: ['置き場所の奥行き（43cm）を先に測っておく', '保証はAmazonの表記で納品日より1年（デロンギファミリー登録で3年の表記あり）'],
    relatedArticle: { slug: 'magnifica-s-vs-start', title: 'マグニフィカSとマグニフィカ スタートの違いを比較' },
  },
  {
    id: 'delonghi-magnifica-start-ecam22020b',
    name: 'デロンギ 全自動コーヒーマシン マグニフィカ スタート ECAM22020B',
    tagline: '全3メニューのエントリーモデル',
    category: 'kitchen',
    price: 87750,
    checkedAt: '2026-10-08',
    seller: 'ディーライズ（出品者）',
    asin: 'B0CM5LSZYF',
    specs: {
      'メニュー': '全3メニュー（商品名の表記）',
      '本体寸法': '奥行44×幅24×高さ35cm',
      '重さ': '11.6kg',
      '水タンク': '1.8L',
      '消費電力': '1450W',
    },
    description: 'マグニフィカ スタートのエントリーモデルです。確認時点の出荷元・販売元は Amazon.co.jp ではなく出品者でした。',
    pros: ['マグニフィカ スタートのエントリーモデルを選びたい人'],
    cons: ['マグニフィカSより重いので、置き場所を確認する', '販売元が出品者なので、返品・保証の窓口を確認する'],
    relatedArticle: { slug: 'magnifica-s-vs-start', title: 'マグニフィカSとマグニフィカ スタートの違いを比較' },
  },
  {
    id: 'delonghi-magnifica-start-ecam22080gb',
    name: 'デロンギ 全自動コーヒーマシン マグニフィカ スタート ECAM22080GB',
    tagline: '全5メニュー・カプチーノ／ラテマキアートの記載があるモデル',
    category: 'kitchen',
    price: 113455,
    checkedAt: '2026-10-08',
    seller: 'Amazon.co.jp',
    asin: 'B0GHT976Z9',
    specs: {
      'メニュー': '全5メニュー（商品名の表記）',
      '本体寸法': '奥行44×幅24×高さ35cm',
      '重さ': '11.8kg',
    },
    description: 'マグニフィカ スタートの全5メニューのモデルで、商品説明にカプチーノ／ラテマキアートの記載があります。',
    pros: ['ミルクを使うメニューも楽しみたい人'],
    cons: ['マグニフィカS（ECAM22112B）・マグニフィカ スタート（ECAM22020B）より価格が高い（2026年10月8日時点）'],
    relatedArticle: { slug: 'magnifica-s-vs-start', title: 'マグニフィカSとマグニフィカ スタートの違いを比較' },
  },

  // 美容家電
  {
    id: 'panasonic-nanocare-eh-na0k',
    name: 'パナソニック ヘアドライヤー ナノケア EH-NA0K（チャコールブラック）',
    tagline: '付属ノズル3種類の前モデル（確認時点で在庫あり）',
    category: 'beauty',
    price: 33500,
    checkedAt: '2026-10-08',
    seller: 'ビューティーワールドストア（出品者）',
    notes: ['確認時点で「-14%」、参考価格 39,000円の表示'],
    asin: 'B0FHGY1FYH',
    specs: {
      'ノズル': '速乾ノズル（本体内蔵）、ナイトキャップ、セット、根元速乾（公式の仕様表）',
      '本体寸法': '高さ22.1×幅14.8×奥行7.4cm（公式の仕様表）',
      '質量': '約550g・セットノズル含まず（公式の仕様表）',
      '消費電力': '1200W',
    },
    description: '新型 EH-NB70 の前モデルです。確認時点では新型より価格が低く、在庫ありで翌日配送の表示でした。販売元は出品者でした。',
    pros: ['すぐに使い始めたい人', 'ノズルの種類を重視する人'],
    cons: ['販売元が出品者なので、返品・保証の窓口を確認する', '参考価格からの割引率ではなく、金額そのもので比べる'],
    relatedArticle: { slug: 'nanocare-nb70-vs-na0k', title: 'ナノケア新型EH-NB70と前モデルEH-NA0Kの違い' },
  },
  {
    id: 'panasonic-nanocare-eh-nb70',
    name: 'パナソニック ヘアドライヤー ナノケア EH-NB70（アンバーブラック）',
    tagline: '2026年11月1日発売予定の新型（予約受付中）',
    category: 'beauty',
    price: 41000,
    checkedAt: '2026-10-08',
    seller: 'Amazon.co.jp',
    notes: ['予約商品：発売予定日 2026年11月1日'],
    asin: 'B0HJ1JHG4G',
    specs: {
      'ノズル': 'セットノズル（公式の仕様表）',
      '本体寸法': '高さ21.7×幅9.6×奥行7.7cm（公式の仕様表）',
      '質量': '約565g・ノズル含まず（公式の仕様表）',
      '消費電力': '1200W',
    },
    description: 'ナノケアの新型です。公式の仕様表では、前モデル EH-NA0K より幅が約5.2cm小さく、質量は約15g重い値です（質量は新型が「ノズル含まず」、前モデルが「セットノズル含まず」の条件）。確認時点では発売前の予約商品でした。',
    pros: ['発売まで待てる人', '幅の小さいドライヤーを選びたい人'],
    cons: ['発売前のため、購入者の評価はまだない', '「予約商品の価格保証」の条件はAmazonの規約で確認する'],
    relatedArticle: { slug: 'nanocare-nb70-vs-na0k', title: 'ナノケア新型EH-NB70と前モデルEH-NA0Kの違い' },
  },

  // 日用品
  {
    id: 'attack-zero-heyaboshi-2300g',
    name: 'アタックZERO 部屋干し つめかえ用 2300g（大容量）',
    tagline: '部屋干し用の液体洗剤・大容量のつめかえ',
    category: 'household',
    price: 2370,
    checkedAt: '2026-10-08',
    seller: 'るんるんストア埼玉本店（出品者）',
    notes: ['確認時点で「-7%」、過去価格 2,559円の表示。「3点買うと5% OFF」の表示あり'],
    asin: 'B0GM6JC7G8',
    specs: {
      '容量': '2300g',
      '1gあたり': '約1円（確認時点の表示）',
    },
    description: '部屋干しの「洗う」役割の液体洗剤です。確認時点の出荷元・販売元は出品者でした。使い方は製品の表示に従ってください。',
    pros: ['部屋干し用の洗剤を大容量で買い置きしたい人'],
    cons: ['出品者ごとに価格や送料が違う場合があるので、販売元と送料も比べる', '過去価格からの割引率ではなく、金額そのもので比べる'],
    relatedArticle: { slug: 'room-drying-guide', title: '部屋干しの悩みを3つの役割で整理' },
  },
  {
    id: 'oxiclean-white-revive-1360g',
    name: 'オキシクリーン ホワイトリバイブ 1360g（粉タイプ・EC専売品）',
    tagline: '粉タイプの酸素系漂白剤（商品名に「過炭酸ナトリウム」の表記）',
    category: 'household',
    price: 2222,
    checkedAt: '2026-10-08',
    notes: ['定期おトク便でのみ5%お得のクーポン表示（確認時点）'],
    asin: 'B099N1477L',
    specs: {
      '容量': '1360g',
      '種類': '酸素系漂白剤（商品名の表記）',
    },
    description: '部屋干しの記事で、白い衣類のくすみが気になる人向け（「戻す」役割）として紹介している酸素系漂白剤です。使い方・注意事項は製品の表示に従ってください。',
    pros: ['粉タイプの酸素系漂白剤を買い置きしたい人'],
    cons: ['容量の違う商品とは1gあたりの価格で比べる'],
    relatedArticle: { slug: 'room-drying-guide', title: '部屋干しの悩みを3つの役割で整理' },
  },

  // 本
  {
    id: 'okane-no-daigaku-kaiteiban',
    name: '【改訂版】本当の自由を手に入れる お金の大学（単行本）',
    tagline: '家計やお金の基本をまとめた本（両@リベ大学長、朝日新聞出版）',
    category: 'books',
    price: 1650,
    checkedAt: '2026-10-08',
    notes: ['Kindle版は1,485円（確認時点）'],
    asin: '4023323780',
    specs: {
      '形式': '単行本（Kindle版あり）',
      'ページ数': '324ページ',
      '発売日': '2024年11月20日',
      '出版社': '朝日新聞出版',
    },
    description: '家計やお金の基本を1冊にまとめた本です。紙の本とKindle版で価格が違うので、読み方に合わせて選べます。',
    pros: ['家計やお金の基本を1冊で整理したい人'],
    cons: ['リンク先は単行本。Kindle版は商品ページで形式を切り替えて確認する'],
    relatedArticle: PRIME_SALE_ARTICLE,
  },
];

export const getAffiliateLink = (asin: string, associateId: string) => {
  return `https://www.amazon.co.jp/dp/${asin}/?tag=${associateId}`;
};

// YYYY-MM-DD を「2026年10月8日」の形にする
export const formatCheckedDate = (d: string) => {
  const [y, m, day] = d.split('-').map(Number);
  return `${y}年${m}月${day}日`;
};

// 管理者画面（リサーチ分析）用のサンプル。公開ページには表示しない
export const getSearchRankingKeywords = () => {
  return [
    { keyword: 'マグニフィカS マグニフィカスタート 違い', count: 0, trend: 'stable' },
    { keyword: 'ナノケア EH-NB70 EH-NA0K 違い', count: 0, trend: 'stable' },
    { keyword: '部屋干し 除湿機 洗剤', count: 0, trend: 'stable' },
  ];
};

export const getPriceRanges = () => {
  return [
    { label: '5,000円以下', min: 0, max: 5000 },
    { label: '5,000円〜10,000円', min: 5000, max: 10000 },
    { label: '10,000円〜30,000円', min: 10000, max: 30000 },
    { label: '30,000円以上', min: 30000, max: Infinity }
  ];
};
