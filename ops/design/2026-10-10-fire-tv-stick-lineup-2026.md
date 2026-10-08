status: draft

# アイキャッチ：Fire TV Stick 4機種の違い（HD／4K Select／4K／4K Plus）

- 作成: designer（2026-10-08 作業、ファイル名は記事の公開予定日 2026-10-10）
- 対象記事: `content/articles/fire-tv-stick-lineup-2026.md`（front matter の `eyecatch: images/articles/fire-tv-stick-lineup-2026.png` と配置先が一致。確認済み）
- ツール: SVGを手書き。PNGは cairosvg で書き出し（Canva・Metricoolは不使用）
- トーン: `ops/design/brand.md`、`public/images/articles/kindle-paperwhite-vs-signature.svg` のレイアウトに合わせた（濃紺×ゴールド、左上に白地に濃紺のPR 40px、上下にゴールドの細線）
- 審査: 未審査。compliance の審査待ち。公開・SNS投稿はしていない。コミットもしていない

## 作成物

| ファイル | 用途 | サイズ |
|---|---|---|
| `public/images/articles/fire-tv-stick-lineup-2026.png` | 記事アイキャッチ／OGP（記事が参照するパス） | 1200×630 |
| `public/images/articles/fire-tv-stick-lineup-2026.svg` | 元データ（他の記事画像と同じ置き方） | 1200×630 |
| `ops/design/2026-10-10-fire-tv-stick-lineup-2026-eyecatch.svg` | 元データの控え（上と同一） | 1200×630 |

## 画像に入っている文字

| 位置 | 文字 | サイズ |
|---|---|---|
| 左上 | PR | 40px・太字、白地ラベル |
| 右上 | ストリーミング端末 スペック比較 | 28px |
| 4枚のカード | HD / 4K Select / 4K / 4K Plus | 36px・太字 |
| メイン | Fire TV Stick 4機種の違い | 64px・太字 |
| サブ | HD・4K Select・4K・4K Plus を比べる | 40px |
| 左下 | 2026年10月8日時点 | 28px |
| 右下 | DreamTact Select | 28px・ゴールド |

## 図形と入れていないもの

- 図形は、角丸の横長枠＋端子を表す小さな四角＋中の1本線だけの抽象的なスティック風アイコン。4枚とも同じ形・同じ大きさ・同じゴールドで、順位や優劣、機能の違いを示さない
- 入れていないもの: Amazon・Fire TV・Alexaのロゴ、スマイルマーク、黒＋オレンジの配色、商品写真、Amazonの画像、星評価、「最安」「No.1」、価格・セール価格、実機を使ったと読める表現、スペックの数字

## 確認してほしい点（compliance・オーナー）

1. **「Fire TV Stick」の文字**: 商品名として文字だけで使用（ロゴ・書体の模倣なし）
2. **「2026年10月8日時点」**: 価格は入れていないが、記事の確認日（オーナー申告ベース）と合わせて28px（下限）で併記した。公開前に記事側の確認状況と整合しているか確認してほしい
3. **ラベル「4K」**: 記事本文の【New】4Kを指す。画像では【New】を省略している。誤認の恐れがあれば、サブコピーなどへの追記を検討（文字量が増えるため要相談）
4. **PNGのフォント**: この環境に Noto Sans JP が無い（Outfit も無し）。SVGは brand.md どおり Noto Sans JP / Outfit 指定のまま。PNGは日本語を代替の WenQuanYi Zen Hei で書き出し、英字・数字は代替の sans-serif（Outfit風ではない）で描画した。字形がサイトの他画像と少し異なる。Noto Sans JP がある環境で書き出し直すとそろう
5. 右上の補足「ストリーミング端末 スペック比較」は、実機未使用のため「スペック比較」と表記した

## 審査結果（compliance・2026-10-08）：合格（条件つき）
- PNGを目視確認。PR表記あり（40px）、Amazon・Fire TV・Alexaのロゴ／スマイル／黒＋オレンジなし、商品写真なし、価格・割引・星・最安・No.1なし、図形は4枚同一で優劣なし。brand.md の文字サイズ下限（28px以上）を満たす
- 「2026年10月8日時点」は記事の確認日と一致（価格は画像にないため日付だけでも誤解なし）
- ラベル「4K」：【New】4Kを指す。画像はスペック・同一性の主張をしておらず、4K Plusと同一と読める表現もないため、現状でも合格。ただし誤認を避けたいなら次回の書き出しで「【New】4K」へ変更する（任意。SVGの該当テキストを書き換えてPNGを再書き出し。本審査では再書き出しの手段がなく未実施）
- 公開前条件：記事側で確認日（10/8）または価格が更新されたら、この画像の日付も更新する
- フォント差（代替フォント）は規約上の問題なし
