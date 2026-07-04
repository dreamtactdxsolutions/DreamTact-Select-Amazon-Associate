import smartwatchImg from '../assets/smartwatch.jpg';
import earbudsImg from '../assets/earbuds.jpg';
import vacuumImg from '../assets/vacuum.jpg';
import espressoImg from '../assets/espresso.jpg';
import hairdryerImg from '../assets/hairdryer.jpg';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'gadget' | 'appliance' | 'kitchen' | 'beauty';
  categoryLabel: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  asin: string;
  stars: number;
  rank: number; // カテゴリ内ランク
  specs: Record<string, string>;
  description: string;
  pros: string[];
  cons: string[];
  testimonials: {
    user: string;
    rating: number;
    comment: string;
  }[];
}

export const products: Product[] = [
  // ガジェット部門
  {
    id: 'lumina-watch-gt',
    name: 'Lumina Watch GT',
    tagline: '常時表示AMOLED＆14日間バッテリー搭載の最高峰スマートウォッチ',
    category: 'gadget',
    categoryLabel: 'ガジェット',
    price: 29800,
    rating: 4.8,
    reviewsCount: 1240,
    image: smartwatchImg,
    asin: 'B0CHWX1783',
    stars: 5,
    rank: 1,
    specs: {
      'ディスプレイ': '1.43インチ AMOLED (常時表示対応)',
      'バッテリー駆動': '通常使用で最大14日間',
      '防水規格': '5ATM (水深50m相当)',
      '主な機能': '高精度GPS、血中酸素測定、睡眠分析、心拍数モニタリング、各種ワークアウト計測'
    },
    description: 'チタン合金フレームとサファイアガラスを採用した高級感あふれるスマートウォッチ。日常の健康管理からプロのアスリートレベルのトレーニング追跡まで、これ1台でシームレスに行えます。美しい常時表示ディスプレイは太陽光の下でも極めて視認性が高く、所有欲を満たす逸品です。',
    pros: [
      'バッテリーが14日間持ち、毎日の充電が不要',
      'チタン製ボディの質感が高く、スーツにもカジュアルにも合う',
      '睡眠分析の精度が非常に高く、睡眠改善に役立つ'
    ],
    cons: [
      '本体に厚みがあり、就寝時に少し気になる場合がある',
      '他社製の特定SNSアプリでの通話機能は非対応'
    ],
    testimonials: [
      { user: 'K. Tanaka', rating: 5, comment: 'バッテリーの持ちが本当に素晴らしいです。毎日充電しなくて良いだけで、スマートウォッチの利便性が何倍にも跳ね上がりました。' },
      { user: 'S. Sato', rating: 4, comment: 'デザインに一目惚れして購入。チタンの質感が良くてお気に入りです。ただ、女性の手首には少し大きく感じるかもしれません。' }
    ]
  },
  {
    id: 'aura-audio-air',
    name: 'Aura Audio Air',
    tagline: '極上の静寂。業界最高クラスのハイレゾ対応ノイズキャンセリングイヤホン',
    category: 'gadget',
    categoryLabel: 'ガジェット',
    price: 15800,
    rating: 4.7,
    reviewsCount: 892,
    image: earbudsImg,
    asin: 'B0CGER1593',
    stars: 5,
    rank: 2,
    specs: {
      '音質コーデック': 'LDAC / AAC / SBC (ハイレゾ対応)',
      'ノイズキャンセリング': 'インテリジェント・アクティブノイズキャンセリング (最大-48dB)',
      '連続再生時間': '単体で最大8時間 (ケース併用で最大32時間)',
      'ワイヤレス充電': 'Qi規格対応'
    },
    description: '独自のノイズキャンセリング技術により、周囲の騒音を一瞬でシャットアウト。高音質なLDACコーデックにも対応し、スタジオ品質の原音に近いクリアなサウンドを提供します。人間工学に基づいたフィット感で、長時間のリスニングでも耳が痛くなりにくい設計です。',
    pros: [
      '電車の走行音やカフェの雑音がほぼ完全に消える強力なノイキャン',
      '中高音の伸びが美しく、ボーカルの声が目の前で聴こえるような高音質',
      'ケースが非常にコンパクトで、ポケットに入れてもかさばらない'
    ],
    cons: [
      'タッチ操作の感度が良すぎて、位置を直すときに誤反応することがある',
      'マルチポイント接続の切り替えがたまにワンテンポ遅れる'
    ],
    testimonials: [
      { user: 'Y. Watanabe', rating: 5, comment: 'カフェでの仕事中に使用しています。キーボードの打鍵音や話し声が消え去り、驚くほど集中できます。音質も文句なしです。' },
      { user: 'M. Kato', rating: 4, comment: '耳へのフィット感が最高で、走っても落ちません。タッチセンサーが敏感すぎることだけが唯一の不満です。' }
    ]
  },
  {
    id: 'aura-audio-mini',
    name: 'Aura Audio Mini',
    tagline: 'アンダー5,000円の決定版。高コスパ超軽量ワイヤレスイヤホン',
    category: 'gadget',
    categoryLabel: 'ガジェット',
    price: 4980,
    rating: 4.4,
    reviewsCount: 412,
    image: earbudsImg,
    asin: 'B0CMIN4980',
    stars: 4,
    rank: 3,
    specs: {
      '重量': '片耳わずか3.8g',
      '接続規格': 'Bluetooth 5.3',
      '連続再生時間': '最大6時間 (ケース併用で最大24時間)',
      '防水規格': 'IPX5 (生活防水)'
    },
    description: '5,000円以下とは思えないバランスの良いサウンドと、非常に安定したBluetooth接続を誇るエントリーモデル。片耳3.8gと超軽量のため、つけていることを忘れるほど快適です。アフィリエイトとしても「初めてのワイヤレスイヤホン」として抜群の成約率を誇る人気商品です。',
    pros: [
      '4,000円台とは思えないクリアな音質と十分な低音',
      '非常に軽く、長時間のWEB会議や通勤時でも快適',
      'ペアリングが非常にスムーズで途切れにくい'
    ],
    cons: [
      'アクティブノイズキャンセリングは非搭載 (物理的な遮音のみ)',
      '専用アプリによるイコライザー調整などは不可'
    ],
    testimonials: [
      { user: 'T. Suzuki', rating: 5, comment: 'この価格でこの音質は驚異的です。通学用やジョギング用としてガンガン使い倒せます。コスパ重視なら間違いなくこれ。' },
      { user: 'H. Ito', rating: 4, comment: '主にスマホでの動画視聴やウェブ会議で使っています。遅延も気にならず、非常にクリアに聞こえます。ノイキャン不要なら十分すぎる性能です。' }
    ]
  },

  // スマート家電部門
  {
    id: 'roboclean-x1',
    name: 'RoboClean X1',
    tagline: '吸引・水拭き・自動ゴミ収集・モップ温水洗浄まで全てを自動化する最強ロボット掃除機',
    category: 'appliance',
    categoryLabel: 'スマート家電',
    price: 79800,
    rating: 4.9,
    reviewsCount: 320,
    image: vacuumImg,
    asin: 'B0CVAC1783',
    stars: 5,
    rank: 1,
    specs: {
      '吸引力': '強力吸引 6000Pa',
      '清掃タイプ': '吸引＆加圧水拭き（モップ自動昇降機能付き）',
      'クリーンステーション': '4L大容量ダストバッグ、自動ゴミ収集、モップ自動洗浄＆温風乾燥機能搭載',
      'マッピング': 'AI障害物回避、LiDAR高速マッピング機能'
    },
    description: '床掃除のすべてを完全に自動化するフラッグシップモデル。強力な吸引力と、床に圧力をかけながら回るツインモップで、頑固な皮脂汚れもピカピカに磨き上げます。掃除完了後はステーションに戻り、自動でゴミを収集し、モップを温水で洗浄・乾燥するため、悪臭やカビの心配もありません。',
    pros: [
      '水拭きモップの洗浄・乾燥まで自動で行うため、全く手が汚れない',
      '障害物回避能力が極めて優秀で、床のコードやスリッパをしっかり避ける',
      'カーペットを検知すると自動でモップを持ち上げ、濡らさない'
    ],
    cons: [
      'クリーンステーションがかなり大きく、設置スペースが必要',
      '初期コストは高いが、得られる自由時間と綺麗さを考えれば投資価値あり'
    ],
    testimonials: [
      { user: 'R. Kimura', rating: 5, comment: '本当に生活が変わりました。フローリングが常にサラサラで、ペットの毛も一網打尽です。モップの自動洗浄・乾燥機能のおかげでメンテナンスの手間がゼロです。' },
      { user: 'N. Hayashi', rating: 5, comment: '以前使っていた他社製に比べて、家具に激突することが一切なくなりました。賢くマッピングして無駄なく動いてくれます。高かったけど大満足。' }
    ]
  },
  {
    id: 'roboclean-lite',
    name: 'RoboClean Lite',
    tagline: 'スリムボディで家具の下もスイスイ。手軽に始めるスマート清掃ロボット',
    category: 'appliance',
    categoryLabel: 'スマート家電',
    price: 24800,
    rating: 4.5,
    reviewsCount: 650,
    image: vacuumImg,
    asin: 'B0CLIT2480',
    stars: 4,
    rank: 2,
    specs: {
      '吸引力': '3000Pa',
      '本体の厚み': 'わずか7.2cmの超薄型設計',
      'ダストボックス容量': '500ml (水洗い可能)',
      '連続運転': '最大100分間'
    },
    description: 'ロボット掃除機が初めての方に最適なエントリーモデル。厚さわずか7.2cmの薄型設計で、ソファやベッドの下などの狭い隙間も軽々と入り込んで掃除します。スマホアプリから簡単にスケジュール設定や進入禁止エリアの指定ができ、手軽にスマートな暮らしを実現します。',
    pros: [
      '薄型なので家具の下の埃をしっかり取ってくれる',
      'この価格で静音モードが優秀で、夜間に動かしても静か',
      'シンプルな構造でダストボックスのゴミ捨てやフィルター掃除が簡単'
    ],
    cons: [
      '自動ゴミ収集機能はないため、こまめにゴミを捨てる必要がある',
      '広い間取りや複雑な部屋のレイアウトでは、稀に戻れなくなることがある'
    ],
    testimonials: [
      { user: 'K. Yamada', rating: 4, comment: 'ベッドの下にぴったり入って掃除してくれるのが最高です。髪の毛やホコリがみるみる取れます。自動ゴミ収集まではなくても十分便利です。' },
      { user: 'A. Nakamura', rating: 5, comment: 'アプリでの予約運転を設定しておくだけで、帰宅時には部屋が綺麗になっています。2万円台でこの性能はスマート家電の鑑ですね。' }
    ]
  },

  // ホーム・キッチン部門
  {
    id: 'barista-pro-elite',
    name: 'Barista Pro Elite',
    tagline: '極上の一杯をご自宅で。プロ仕様の本格グラインダー内蔵エスプレッソマシン',
    category: 'kitchen',
    categoryLabel: 'ホーム・キッチン',
    price: 48000,
    rating: 4.8,
    reviewsCount: 215,
    image: espressoImg,
    asin: 'B0CESP1783',
    stars: 5,
    rank: 1,
    specs: {
      'グラインダー': 'コニカル刃コニカルグラインダー搭載 (30段階の挽き目調整)',
      '抽出圧力': 'プロ仕様 15気圧イタリアンポンプ',
      'スチーム機能': '超微細マイクロミルクフォーム対応スチームパイプ',
      '加熱システム': 'サーモジェット高速加熱 (約3秒で起動)'
    },
    description: '豆を挽くことから、最適な温度での抽出、そしてラテアート用のきめ細やかなミルクフォーミングまで、すべてのプロセスをプロクオリティで行える最高峰のマシン。自宅にいながらまるで高級カフェのような濃厚なエスプレッソやふわふわのカフェラテを楽しむことができます。',
    pros: [
      '豆の挽き目や抽出量を極めて細かく調整でき、自分好みの味を追求できる',
      '起動がたった3秒と非常に早く、忙しい朝でも待たずに極上の1杯を淹れられる',
      '強力なスチームで、シルキーで滑らかなミルク（ラテアート用）が簡単に作れる'
    ],
    cons: [
      '抽出後の粉の処分やポルタフィルターの洗浄など、ある程度の手間が必要',
      '本格的な仕様のため、サイズが大きく重量（約8kg）もある'
    ],
    testimonials: [
      { user: 'T. Morita', rating: 5, comment: '毎日カフェに行くのをやめました。自分で豆の調整をして淹れる時間は至福ですし、何よりカフェで飲むより美味しいラテが作れます。大満足です。' },
      { user: 'M. Ota', rating: 5, comment: 'スチームのパワーがこれまで使っていた安物とは次元が違います。きめ細かいミルクが作れてラテアートの練習が捗ります。' }
    ]
  },
  {
    id: 'dripmaster-slim',
    name: 'DripMaster Slim',
    tagline: 'スタイリッシュな佇まい。スマート温度管理＆全自動ミル内蔵ドリップメーカー',
    category: 'kitchen',
    categoryLabel: 'ホーム&キッチン',
    price: 7980,
    rating: 4.6,
    reviewsCount: 398,
    image: espressoImg,
    asin: 'B0CDRP7980',
    stars: 5,
    rank: 2,
    specs: {
      'ミル機能': 'フラットカッター式自動ミル',
      '抽出杯数': '1〜4杯 (ガラスサーバー付き)',
      '温度管理': '最適な抽出温度 (92℃) を自動キープ',
      '幅': 'スリムな15.5cm設計'
    },
    description: 'キッチンに美しく馴染む、幅わずか15.5cmの省スペースな全自動コーヒーメーカー。挽き立ての豆を最適な温度でゆっくりとドリップし、コーヒー本来のコクと香りを最大限に引き出します。自動洗浄モード付きで、日々のお手入れも簡単です。',
    pros: [
      '幅が狭いのでキッチンのわずかな隙間にもすっきり収まる',
      '豆からドリップまで全自動なので、ボタン一つで美味しい挽き立てコーヒーが飲める',
      '自動洗浄機能付きで、ミルの内部に粉が残りにくく衛生的'
    ],
    cons: [
      'ミルの動作音は数十秒間大きめなので、静かな早朝などは少し気になる',
      '1回で最大4杯分なので、大人数での来客時には数回に分ける必要がある'
    ],
    testimonials: [
      { user: 'S. Ishii', rating: 4, comment: 'スリムなのでワンルームのキッチンでも場所を取りません。毎朝自動で豆を挽く良い香りで目が覚めて、幸せな気持ちになります。' },
      { user: 'Y. Aoki', rating: 5, comment: 'お手入れが驚くほど簡単。全自動は洗うのが面倒なイメージがありましたが、これはパーツが少なくて水洗いもしやすいです。重宝しています。' }
    ]
  },

  // 美容・健康部門
  {
    id: 'aeroforce-lumina',
    name: 'AeroForce Lumina',
    tagline: '風量と熱をインテリジェント制御。髪を傷めず速乾を実現する高級サロン仕様ドライヤー',
    category: 'beauty',
    categoryLabel: '美容・健康',
    price: 38000,
    rating: 4.8,
    reviewsCount: 512,
    image: hairdryerImg,
    asin: 'B0CHDR1783',
    stars: 5,
    rank: 1,
    specs: {
      '風量': 'パワフル風量 2.2m³/分',
      'モーター': '毎分11万回転の高速ブラシレスDCモーター',
      'イオン機能': '高濃度トリプルマイナスイオン搭載',
      '温度制御': '毎秒100回の自動温度センシング機能 (熱ダメージを完全にブロック)'
    },
    description: '大風量で髪を根元から素早く乾かしつつ、インテリジェント熱制御により髪の水分量を保ち、熱ダメージから保護します。高濃度マイナスイオンが静電気を抑え、乾かすだけでサロン帰りのような、しっとりとツヤのあるなめらかな髪に仕上げます。',
    pros: [
      '圧倒的な風量で、ロングヘアでも従来の半分の時間で乾く',
      '自動で温風と冷風を切り替えるモードがあり、髪が熱くなりすぎずツヤが出る',
      '高級感のあるメタルとローズゴールドの質感で、使うたびにテンションが上がる'
    ],
    cons: [
      'パワフルな分、最大風量時のキーンという高めの稼働音がある',
      '海外での電圧には対応しておらず、国内専用モデル'
    ],
    testimonials: [
      { user: 'A. Yoshida', rating: 5, comment: '髪の毛を乾かす時間が本当に短縮されました！そして、仕上がりが全然違います。毛先がパサつかず、まとまりがよくなって毎日のアイロンが楽になりました。' },
      { user: 'Y. Matsui', rating: 5, comment: '妻へのプレゼントで購入。とても喜んでくれています。自分も使っていますが、明らかに髪のボリュームや手触りが良くなったと感じます。投資する価値あり。' }
    ]
  },
  {
    id: 'aeroforce-travel',
    name: 'AeroForce Travel',
    tagline: '旅先でも妥協しない美髪へ。折りたためる軽量・大風量モバイルドライヤー',
    category: 'beauty',
    categoryLabel: '美容・健康',
    price: 4800,
    rating: 4.3,
    reviewsCount: 280,
    image: hairdryerImg,
    asin: 'B0CTRV4800',
    stars: 4,
    rank: 2,
    specs: {
      '重量': 'わずか350gの超軽量',
      '風量': 'コンパクトながら 1.8m³/分',
      '機能': 'マイナスイオン、折りたたみハンドル設計',
      '電圧': '海外対応 (100V-240V自動切り替え)'
    },
    description: '旅行や出張、ジムへの持ち運びに最適な折りたたみ式軽量ドライヤー。わずか350gと超軽量ながら、1.8m³/分の力強い風量でスピーディにヘアドライ。海外電圧（240V）にも対応しているため、これ1台で世界中どこでもいつも通りの美髪ケアが可能です。',
    pros: [
      '缶ジュース1本分ほど（350g）の軽さで、持っていて腕が全く疲れない',
      '折りたたむと非常にコンパクトになり、スーツケースの隙間に入る',
      '海外対応なので、旅行好きな女性や出張の多いビジネスマンに最適'
    ],
    cons: [
      '上位モデル（AeroForce Lumina）のような高度な自動温度検知センサーは非搭載',
      'コードがやや固く、収納時に少し巻きにくい'
    ],
    testimonials: [
      { user: 'R. ONO', rating: 4, comment: '旅行用に購入。軽くて風量もしっかりあるので、ホテルの風力の弱いドライヤーを使わなくてよくなり快適です。折りたたんでコンパクトになるのが最高です。' },
      { user: 'E. Kondo', rating: 5, comment: '海外出張が多く重宝しています。変圧器なしでコンセントに挿すだけで使えるのが本当に便利です。このお値段でマイナスイオン付きなのも嬉しい。' }
    ]
  }
];

export const getAffiliateLink = (asin: string, associateId: string) => {
  return `https://www.amazon.co.jp/dp/${asin}/?tag=${associateId}`;
};

export const getSearchRankingKeywords = () => {
  return [
    { keyword: 'スマートウォッチ バッテリー長持ち', count: 12450, trend: 'up' },
    { keyword: 'ロボット掃除機 水拭き 自動洗浄', count: 9840, trend: 'up' },
    { keyword: '高級ドライヤー 髪質改善', count: 8550, trend: 'up' },
    { keyword: '全自動エスプレッソマシン 家庭用', count: 7200, trend: 'stable' },
    { keyword: 'コスパ最強 ワイヤレスイヤホン', count: 6410, trend: 'down' }
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
