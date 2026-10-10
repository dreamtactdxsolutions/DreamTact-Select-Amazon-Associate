status: draft

# アイキャッチ：セサミ6プロ＋セサミタッチ2プロ 運営者の体験記

- 作成: designer（2026-10-10）
- 対象記事: `content/articles/sesame-6-pro-touch-2-pro-experience.md`（front matter の `eyecatch: images/articles/sesame-6-pro-touch-2-pro-experience.png` と配置先が一致。確認済み）
- ツール: SVGを手書き。PNGは cairosvg で書き出し（Canva・Metricoolは不使用）
- トーン: `ops/design/brand.md` と `public/images/articles/kindle-paperwhite-vs-signature.svg` のレイアウト（濃紺×ゴールド、左上に白地に濃紺のPR 40px、下部にメイン・サブ・サイト名）に合わせた
- 審査: 未審査。compliance の審査待ち。公開・SNS投稿・コミットはしていない

## 作成物

| ファイル | 用途 | サイズ |
|---|---|---|
| `public/images/articles/sesame-6-pro-touch-2-pro-experience.png` | 記事アイキャッチ／OGP | 1200×630 |
| `public/images/articles/sesame-6-pro-touch-2-pro-experience.svg` | 元データ | 1200×630 |
| `ops/design/2026-10-10-sesame-6-pro-touch-2-pro-experience-eyecatch.svg` | 元データの控え（上と同一） | 1200×630 |

## 画像に入っている文字

| 位置 | 文字 | サイズ |
|---|---|---|
| 左上 | PR | 40px・太字、白地ラベル |
| 右上 | 運営者の体験記 | 32px |
| メイン | 鍵から解放された話（「解放された」のみゴールド） | 76px・太字 |
| サブ | セサミ6プロ＋セサミタッチ2プロを約2か月 | 40px |
| 右下 | DreamTact Select | 28px・ゴールド |

## 図形と入れていないもの

- 左: 斜線で消した鍵の抽象アイコン（グレー＋ゴールドの斜線）。右: スマートフォンと指紋の抽象アイコン（青）。間にゴールドの矢印。実物の形を再現していない
- 入れていないもの: 「スペック比較」の文言、メーカー・Amazon・セサミ／CANDY HOUSE のロゴや配色、商品写真、星評価、価格・日付、「最安」「No.1」、「安心」「防犯」など防犯・安全の効果を示す表現
- 日付を入れていない理由: 価格・割引率など時点が必要な数字が画像内にないため

## 確認してほしい点（compliance・オーナー）

1. 「運営者の体験記」「約2か月」は記事の front matter（hands_on: owner、運営者の申告）に沿った表記。自費購入・使用の事実はオーナー確認済みの前提
2. 商品名「セサミ6プロ」「セサミタッチ2プロ」は文字のみ使用（ロゴ・書体の模倣なし）
3. PNGのフォント: この環境に Noto Sans JP が無く、PNGは代替の日本語ゴシック（WenQuanYi Zen Hei）で描画した。SVGは Noto Sans JP 指定。メイン見出しは cairosvg の tspan 不具合を避けるため、3つの text に分けて配置している。Noto Sans JP のある環境で書き出し直すと他のアイキャッチと字形がそろう
4. 記事は `status: draft` のまま。designerは記事を変更していない
