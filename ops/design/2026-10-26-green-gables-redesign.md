status: draft

# サイトのリデザイン「グリーンゲイブルス」（2026-10-26、designer）

compliance 審査待ち（見た目の変更。記事本文・フロントマターは変更なし）。コードは作業ツリーのみ、commit/push はしていない。

## 配色（HEX）
| 役割 | 値 | 備考 |
|---|---|---|
| 背景（クリーム） | #fbf6e9 | ページ地 |
| 面（カード） | #fffdf7 | |
| 面（羊皮紙） | #f1e9d2 | 表見出し・フッター |
| 文字（主） | #3b2a1e | 対クリーム 12.67:1 |
| 文字（副） | #5a4636 | 8.23:1 |
| 文字（注記・日付） | #735e4b | 5.67:1（羊皮紙上でも 5.05:1） |
| 森の緑（ブランド・リンク・見出し） | #2f5d3a | 7.08:1。ホバー #234a2d |
| 若草（面・装飾） | #e6eed2 / #8aa856 | #8aa856 は装飾のみ（文字に使わない） |
| 赤茶（アンの髪。CTA・PR表記の縁） | #9c3d1a | 白文字 6.78:1。ホバー #823014（8.82:1） |
| 枠線 | #dccfae | |
| PR表記 | 文字 #7a2f12 / 地 #fff6e8 | 8.74:1 |
| 結論ボックス | 地 #e6eed2、見出し #234a2d（8.39:1）、本文 #3b2a1e（11.41:1） | |

Amazon の橙・黒は廃止。購入ボタンは赤茶の文字だけのボタン（「Amazonで詳細を見る」等）。

## 書体
- 見出し・ロゴ: Noto Serif JP（500/700）。フォールバック Hiragino Mincho ProN / Yu Mincho / serif
- 本文: Noto Sans JP（400/500/700）。価格の数字のみ Outfit（既存どおり）
- Google Fonts の読み込みは既存方法（`index.html` と `build-articles.mjs` の link）に Noto Serif JP を追加。Inter は廃止。

## 変更したファイル
- `src/index.css`（トークン、ボタン、見出しの書体、フォーカス表示、reduced-motion）
- `src/App.tsx`（ヒーローを低く・左寄せ、装飾SVG、フッター、スタイル）
- `src/components/LatestArticles.tsx`（6枚、読み込み中/失敗時の表示）
- `src/components/MeadowArt.tsx`（新規。草原と切妻屋根の線画SVG）
- `src/components/Header.tsx`（ロゴ、常時クリーム背景、スマホでもメニューを横スクロールで表示）
- `src/components/ProductCard.tsx` `CompareTable.tsx` `ProductDetailModal.tsx` `ProductVisual.tsx` `AssociateConfig.tsx` `ArticleGenerator.tsx` `TrendDashboard.tsx`（半透明の白/黒/金をトークンに置換しただけ）
- `scripts/build-articles.mjs`（記事・一覧・404・固定ページの共通CSS、結論ボックス、比較表、一覧にアイキャッチ）
- `index.html`（フォント）

## トップに記事が見えなかった原因
`LatestArticles` は存在し、`articles/index.json`（本番でも200）を読んで動いていた。ただしヒーローが約700px と高く、新着記事が1画面目の外に出て、カテゴリ3枚だけが見えていた（スマホはさらに下）。ヒーローを約280pxに縮め、記事カードを直下に6枚（PC 3列、スマホ1列）並べた。取得失敗時は「記事一覧ページ」へのリンクを出す。

## 結論ボックス `summary` の書き方
フロントマターに次の形で書く（2〜4行。2行未満・5行以上、または同じ行に書くとビルドエラー）。`**太字**` とリンクは使える。「要確認」「実機レビュー」等のビルドガードは summary にも効く。
```
summary:
  - 結論1行目
  - 結論2行目
```
表示位置: PR表記 → タイトル・日付 → 結論ボックス → シェア → アイキャッチ → 本文。summary が無い記事は従来どおり。表示確認は下書きのテスト記事（削除済み）で行った。

## 比較表（スマホ）
最初の列（項目名）を左固定（sticky）・幅 約8em 以上にして、縦に1文字ずつ折り返さないようにした。表は最小幅 40〜44em で横スクロール、端に影のヒント。確認: Fire TV 記事（390px）。

## スクリーンショット
ディレクトリ: `/tmp/claude-0/-home-user-DreamTact-Select-Amazon-Associate/38bf39dc-b707-56aa-8737-26b0d8e20f28/scratchpad/shots/`
- トップ PC `top-pc.png` / スマホ `top-sp.png`
- 記事（Fire TV）PC `art-fire-pc.png` / スマホ `art-fire-sp.png`、表 `table-sp-0.png` `table-sp-1.png`
- 記事一覧 PC `list-pc.png` / スマホ `list-sp.png`
- 404 `notfound.png`、運営者情報 `about.png`、商品一覧 `rank-pc.png`
- 変更前 `base-top.png`
- 全ページで横はみ出しなし（scrollWidth = 幅）。アニメーションは reduced-motion で止めて撮影。

## 気づいた問題・要確認
- アイキャッチ画像は暗い紺地のため、クリーム地では暗い四角に見える。一覧ではよく目立つが、世界観を揃えるなら新デザインのアイキャッチを別途作る（今回は未着手）。
- 検証環境では Google Fonts に接続できず、明朝・サンセリフはシステムのフォールバックで撮影している。本番では Noto Serif JP が出る（字面が変わるため、公開後に実機で確認してほしい）。
- 商品カード（`ProductCard`）に星評価（lucide アイコン）を使う箇所がある可能性。Amazonの星そのものではないが、評価の出所は要確認（今回は未変更）。
- 記事内 Amazon リンクは、本文中の文字リンクもボタン型になる（従来どおりの挙動）。
- 管理者用画面（AIブログ作成・リサーチ分析）は色トークン置換のみで、個別の見た目確認はしていない。
- `index.html` の favicon は絵文字のまま、og:image はダミーSVGのまま（今回の範囲外）。
