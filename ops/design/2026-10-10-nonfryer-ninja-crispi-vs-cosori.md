status: draft

# アイキャッチ：ノンフライヤー3機種（Ninja Crispi・COSORI 4.7L・6L）

- 作成: designer（2026-10-10）
- 対象記事: `content/articles/nonfryer-ninja-crispi-vs-cosori.md`（front matter の `eyecatch: images/articles/nonfryer-ninja-crispi-vs-cosori.png` と配置先が一致。確認済み）
- ツール: SVGを手書き。PNGは cairosvg で書き出し（Canva・Metricoolは不使用）
- トーン: `ops/design/brand.md` と `kindle-paperwhite-vs-signature.svg`／`sesame-6-pro-touch-2-pro-experience.svg` のレイアウト（濃紺×ゴールド、左上に白地に濃紺のPR 40px、右上に補足、下部にメイン・サブ・サイト名）に合わせた
- 公開・SNS投稿・コミットはしていない。compliance の審査待ち

## 作成物

| ファイル | 用途 | サイズ |
|---|---|---|
| `public/images/articles/nonfryer-ninja-crispi-vs-cosori.png` | 記事アイキャッチ／OGP | 1200×630 |
| `public/images/articles/nonfryer-ninja-crispi-vs-cosori.svg` | 元データ | 1200×630 |
| `ops/design/2026-10-10-nonfryer-ninja-crispi-vs-cosori-eyecatch.svg` | 元データの控え（上と同一） | 1200×630 |

## 画像に入っている文字

| 位置 | 文字 | サイズ |
|---|---|---|
| 左上 | PR | 40px・太字、白地ラベル |
| 右上 | Ninjaは運営者が自費購入 | 32px |
| カード上部 | 使用（Ninja、ゴールド地）／商品ページの記載（COSORI 2枚、青枠） | 28px |
| カード下部 | Ninja／COSORI 4.7L／COSORI 6L | 30px |
| メイン | ノンフライヤー3機種を比べる（「3機種」のみゴールド） | 66px・太字 |
| サブ | Ninja Crispi（使用）と COSORI 4.7L・6L（スペック比較） | 40px |
| 右下 | DreamTact Select | 28px・ゴールド |

## 図形と入れていないもの

- 角丸四角の調理家電を抽象化したアイコン3つ（外枠＋内側のかご風の角丸＋取っ手の線）。3つとも同じ大きさ・同じ形にして、容量差や優劣を図形で示していない
- 色: Ninja＝ゴールド、COSORI＝青（brand.md の2色ルール。どちらが上という意味は持たせていない）。「使用」だけ塗りのラベルにして、体験の有無を区別した
- COSORI 側には「使用」「実機」「使ってみた」を一切付けていない。「商品ページの記載」「スペック比較」と表記
- 入れていないもの: メーカー・Amazonのロゴや配色、商品写真・Amazon画像、星評価、価格・割引率・日付、「最安」「お得」「No.1」、「ヘルシー」「痩せる」など健康・ダイエット表現
- 日付を入れていない理由: 価格など時点が必要な数字が画像内にないため

## 確認してほしい点（compliance・オーナー）

1. 「Ninjaは運営者が自費購入」「使用」は記事 front matter（hands_on: owner、purchase: self、purchased_at: 2026-08-14、owner_confirmed: 2026-10-10）に沿う表記
2. 画像に「実機レビュー」「使ってみた」の語は無し。サブの「（使用）」は Ninja のみ
3. PNGのフォント: この環境に Noto Sans JP が無く、PNGは代替の日本語ゴシック（WenQuanYi Zen Hei）で描画した。SVGは Noto Sans JP 指定。メイン見出しは cairosvg の tspan 不具合を避けるため3つの text に分けて配置。Noto Sans JP のある環境で書き出し直すと他のアイキャッチと字形がそろう
4. 記事は `status: draft` のまま。designerは記事を変更していない

## 審査結果

- 【compliance 2026-10-10】合格（status: draft のまま）
- ロゴ・価格・割引・健康表現なし。PR表記あり、スマホで読める文字サイズ
- 「使用」はNinjaのみ。COSORIは「商品ページの記載」「スペック比較」で、使用したと誤解させない
- 任意: Noto Sans JP 環境での書き出し直し（字形統一）。公開をブロックしない
