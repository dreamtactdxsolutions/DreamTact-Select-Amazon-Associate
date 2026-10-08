status: draft

# アイキャッチ：Kindle Paperwhiteとシグニチャーエディションの5,000円差

- 作成: designer（2026-10-08 作業、ファイル名は記事の公開予定日 2026-10-10）
- 対象記事: `content/articles/kindle-paperwhite-vs-signature.md`（front matter の `eyecatch: images/articles/kindle-paperwhite-vs-signature.png` と配置先が一致）
- ツール: SVGを手書き。PNGは cairosvg で書き出し（Canva・Metricoolは不使用）
- トーン: `ops/design/brand.md`、`public/images/articles/magnifica-s-vs-start.svg` の「A vs B」レイアウトに合わせた（濃紺×ゴールド、左上に白地に濃紺のPR 40px、A＝ゴールド／B＝青）
- 審査: 未審査。compliance の審査待ち。公開・SNS投稿はしていない。コミットもしていない

## 作成物

| ファイル | 用途 | サイズ |
|---|---|---|
| `public/images/articles/kindle-paperwhite-vs-signature.png` | 記事アイキャッチ／OGP（記事が参照するパス） | 1200×630 |
| `public/images/articles/kindle-paperwhite-vs-signature.svg` | 元データ（他の記事画像と同じ置き方） | 1200×630 |
| `ops/design/2026-10-10-kindle-paperwhite-vs-signature-eyecatch.svg` | 元データの控え（上と同一） | 1200×630 |

## 画像に入っている文字

| 位置 | 文字 | サイズ |
|---|---|---|
| 左上 | PR | 40px・太字、白地ラベル |
| 右上 | 電子書籍リーダー スペック比較 | 28px |
| 左カード | Paperwhite | 34px・ゴールド |
| 右カード | シグニチャー | 34px・青 |
| 中央 | VS | 56px |
| メイン | Kindle Paperwhite vs シグニチャー | 56px・太字 |
| サブ | 5,000円の差を、スペックで比べる | 40px |
| 左下 | 2026年10月8日時点 | 28px（価格差を入れたので確認日を画像内に入れた） |
| 右下 | DreamTact Select | 28px・ゴールド |

## 図形と入れていないもの

- 図形は、角丸の枠線＋画面＋文字行を表す3本線だけの抽象的な電子書籍リーダー風アイコン（左ゴールド、右青）。実物の形を再現していない。2枚は同じ形・同じ大きさで、見た目の優劣や機能の違いを示さない
- 入れていないもの: Amazonのロゴ・スマイルマーク・黒＋オレンジの配色、Kindleのロゴ、商品写真、Amazonの画像、星評価、「最安」「No.1」、実機を使ったと読める表現、価格そのもの（39,980円／44,980円）、発売日、機能・容量・重さの数字

## 確認してほしい点（compliance・オーナー）

1. **「5,000円の差」**: 記事の確認値（39,980円と44,980円、2026年10月8日時点）の差。画像内に確認日を入れている。価格が変わった場合は画像の更新が必要
2. **「Kindle」の文字**: 商品名として文字だけで使用（ロゴ・書体の模倣なし）。「シグニチャー」はシグニチャーエディションの略記。記事タイトルでは正式名称で書いているため、略記でよいか確認してほしい
3. **メイン文字 56px**: 1行に収めるため brand.md の見出し目安（64px以上）よりやや小さい。360px幅でも読める大きさ（28px以上）は満たしている
4. **PNGのフォント**: この環境に Noto Sans JP が無く、PNGは代替の日本語ゴシック（WenQuanYi Zen Hei）で描画した。SVGは brand.md どおり Noto Sans JP 指定。字形がサイトの他画像と少し異なる。Noto Sans JP のある環境で書き出し直すと他のアイキャッチとそろう
5. 記事は `status: draft`。公開時は記事側のメモ「eyecatch の画像ファイルは未作成」を更新する（designerは記事を変更していない）
