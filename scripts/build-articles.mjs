// 記事ページの静的生成
// content/articles/*.md を読み、dist/articles/<slug>/index.html と記事一覧・sitemap.xml を書き出す。
// 検索エンジンが本文を読めるように、記事はReactを使わない素のHTMLとして生成する。
//
// 環境変数:
//   AMAZON_TRACKING_ID       アソシエイトのトラッキングID（未設定なら dreamtactaffi-22）
//   VITE_GA_MEASUREMENT_ID   GA4の測定ID（未設定なら計測タグを入れない）
//   ARTICLES_INCLUDE_DRAFTS  1 にすると status: draft の記事も「下書き」表示・noindex で生成する（確認用）

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content', 'articles');
const distDir = join(root, 'dist');

const SITE_URL = 'https://select.dream-tact-dx-solutions.com/';
const SITE_NAME = 'DreamTact Select';
const PR_DISCLOSURE = '本ページはプロモーション（広告）を含みます。';
const ASSOCIATE_STATEMENT = `Amazonのアソシエイトとして、${SITE_NAME}は適格販売により収入を得ています。`;
const trackingId = process.env.AMAZON_TRACKING_ID || 'dreamtactaffi-22';
const gaId = process.env.VITE_GA_MEASUREMENT_ID || '';
const includeDrafts = process.env.ARTICLES_INCLUDE_DRAFTS === '1';

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const affiliateUrl = (asin) => `https://www.amazon.co.jp/dp/${asin}/?tag=${encodeURIComponent(trackingId)}`;

// 先頭の --- で囲まれた部分を「key: value」の形で読む（入れ子は使わない）
const parseArticle = (file) => {
  const raw = readFileSync(join(contentDir, file), 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: 先頭に --- で囲んだ情報（title など）がありません`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { file, slug: meta.slug || file.replace(/\.md$/, ''), meta, body: m[2] };
};

// 公開してはいけない状態を見つける。公開記事で1つでも見つかればビルドを止める
const findProblems = (a) => {
  const problems = [];
  for (const key of ['title', 'description', 'published']) {
    if (!a.meta[key]) problems.push(`${key} が未記入`);
  }
  if (a.meta.published && !/^\d{4}-\d{2}-\d{2}$/.test(a.meta.published)) problems.push('published は YYYY-MM-DD 形式で書く');
  if (!/^[a-z0-9-]+$/.test(a.slug)) problems.push('slug は半角英小文字・数字・ハイフンだけにする');
  const text = `${a.meta.title}\n${a.meta.description}\n${a.body.replace(/<!--[\s\S]*?-->/g, '')}`;
  if (text.includes('要確認')) problems.push('「要確認」が残っている');
  for (const [, v] of text.matchAll(/\{\{ASIN:([^}]*)\}\}/g)) {
    if (!/^[A-Z0-9]{10}$/.test(v)) problems.push(`ASINが不正: ${v}`);
  }
  if (/【実機レビュー】|使ってみた/.test(text)) problems.push('実際に使ったと読める表現（【実機レビュー】／使ってみた）がある');
  return problems;
};

const marked = new Marked({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const isAmazon = /^https:\/\/www\.amazon\.co\.jp\//.test(href);
      const attrs = isAmazon
        ? ' target="_blank" rel="sponsored noopener noreferrer"'
        : /^https?:\/\//.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${escapeHtml(href)}"${title ? ` title="${escapeHtml(title)}"` : ''}${attrs}>${text}</a>`;
    },
    // 比較表がスマホで横にはみ出さないように包む
    table(token) {
      return `<div class="table-wrap">${this.constructor.prototype.table.call(this, token)}</div>`;
    },
  },
});

const renderBody = (body) => {
  const withLinks = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\{\{ASIN:([A-Z0-9]{10})\}\}/g, (_, asin) => affiliateUrl(asin));
  return marked.parse(withLinks);
};

const gaSnippet = () =>
  gaId
    ? `<script>
(function(){
  try { if (localStorage.getItem('dreamtact_admin_mode') === 'true') return; } catch (e) {}
  var s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('js', new Date()); gtag('config', '${gaId}');
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href*="amazon.co.jp"]');
    if (!a) return;
    var m = a.href.match(/\\/dp\\/([A-Z0-9]{10})/i);
    gtag('event', 'amazon_click', { asin: m ? m[1] : '', placement: 'article', link_text: (a.textContent || '').trim().slice(0, 100) });
  }, true);
})();
</script>`
    : '';

const pageShell = ({ rel, title, description, canonical, ogImage, noindex, jsonLd, main }) => `<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${canonical}" />
${noindex ? '<meta name="robots" content="noindex, nofollow" />\n' : ''}<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:site_name" content="${SITE_NAME}" />
${ogImage ? `<meta property="og:image" content="${ogImage}" />\n` : ''}<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" type="image/svg+xml" href="${rel}favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Outfit:wght@600;700&display=swap" rel="stylesheet">
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n` : ''}<style>${CSS}</style>
${gaSnippet()}
</head>
<body>
<header class="site-header"><div class="wrap">
  <a class="brand" href="${rel}">DreamTact <span>Select</span></a>
  <nav><a href="${rel}">ホーム</a><a href="${rel}articles/">記事一覧</a></nav>
</div></header>
${main}
<footer class="site-footer"><div class="wrap">
  <p>${ASSOCIATE_STATEMENT}</p>
  <p>価格・在庫・ランキングは記載時点の情報です。最新の情報は各商品ページでご確認ください。</p>
  <p class="copy">© ${SITE_NAME}</p>
</div></footer>
</body>
</html>
`;

const formatDate = (d) => {
  const [y, m, day] = d.split('-').map(Number);
  return `${y}年${m}月${day}日`;
};

const CSS = `
:root{--bg:#0a0f1d;--bg2:#111827;--bg3:#1f2937;--text:#f3f4f6;--text2:#9ca3af;--gold:#d4af37;--blue:#60a5fa;--border:#374151}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font-family:'Noto Sans JP',-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.9;font-size:16px}
a{color:var(--blue)}
.wrap{max-width:760px;margin:0 auto;padding:0 16px}
.site-header{border-bottom:1px solid var(--border);background:var(--bg2)}
.site-header .wrap{display:flex;justify-content:space-between;align-items:center;height:60px;gap:12px}
.brand{font-family:Outfit,sans-serif;font-weight:700;font-size:20px;color:var(--text);text-decoration:none;white-space:nowrap}
.brand span{color:var(--gold)}
.site-header nav{display:flex;gap:16px;font-size:14px}
.site-header nav a{color:var(--text2);text-decoration:none}
.site-header nav a:hover{color:var(--gold)}
main{padding:32px 0 64px}
.pr-note{border:1px solid var(--gold);color:var(--gold);border-radius:8px;padding:8px 12px;font-size:14px;margin-bottom:20px;font-weight:700}
.draft-note{background:#7f1d1d;color:#fff;border-radius:8px;padding:8px 12px;font-size:14px;margin-bottom:16px}
h1{font-size:28px;line-height:1.5;margin-bottom:12px}
.dates{color:var(--text2);font-size:14px;margin-bottom:24px}
.eyecatch{width:100%;height:auto;border-radius:12px;border:1px solid var(--border);margin-bottom:28px;display:block}
.article h2{font-size:22px;margin:48px 0 16px;padding:4px 0 4px 12px;border-left:4px solid var(--gold);line-height:1.5}
.article h3{font-size:18px;margin:32px 0 12px;line-height:1.5}
.article p{margin:0 0 18px}
.article ul,.article ol{margin:0 0 18px 1.4em}
.article li{margin:4px 0}
.article blockquote{border-left:3px solid var(--border);padding:4px 16px;color:var(--text2);margin:0 0 18px}
.article hr{border:none;border-top:1px solid var(--border);margin:36px 0}
.article strong{color:#fff}
.article code{background:var(--bg3);padding:1px 6px;border-radius:4px;font-size:.9em}
.table-wrap{overflow-x:auto;margin:0 0 24px;-webkit-overflow-scrolling:touch}
.article table{border-collapse:collapse;min-width:100%;font-size:14px;line-height:1.6}
.article th,.article td{border:1px solid var(--border);padding:8px 10px;text-align:left;vertical-align:top}
.article th{background:var(--bg3);white-space:nowrap}
.article a[href*="amazon.co.jp"]{display:inline-block;background:linear-gradient(135deg,#ffb84d,#ff9900);color:#111;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:999px;margin:4px 0}
.list{list-style:none}
.list li{border:1px solid var(--border);border-radius:12px;margin-bottom:16px;background:var(--bg2)}
.list a{display:block;padding:16px;color:var(--text);text-decoration:none}
.list a:hover{border-color:var(--gold)}
.list .t{font-weight:700;font-size:17px;line-height:1.5;margin-bottom:6px}
.list .d{color:var(--text2);font-size:14px}
.site-footer{border-top:1px solid var(--border);color:var(--text2);font-size:13px;padding:24px 0 40px;line-height:1.8}
.site-footer p{margin-bottom:6px}
@media (max-width:600px){h1{font-size:23px}.article h2{font-size:20px}.site-header nav{gap:10px}}
`;

const main = () => {
  if (!existsSync(distDir)) throw new Error('dist がありません。先に vite build を実行してください');
  const files = existsSync(contentDir) ? readdirSync(contentDir).filter((f) => f.endsWith('.md') && !f.startsWith('_')) : [];
  const articles = files.map(parseArticle);

  const failures = [];
  const pages = [];
  for (const a of articles) {
    const isDraft = a.meta.status !== 'published';
    if (isDraft && !includeDrafts) continue;
    const problems = findProblems(a);
    if (problems.length && !isDraft) failures.push(`${a.file}:\n  - ${problems.join('\n  - ')}`);
    if (problems.length && isDraft) console.warn(`[下書き] ${a.file} は公開前に直す点があります:\n  - ${problems.join('\n  - ')}`);
    pages.push({ ...a, isDraft });
  }
  if (failures.length) {
    console.error(`公開記事に問題があるため、ビルドを止めました。\n${failures.join('\n')}`);
    process.exit(1);
  }

  pages.sort((x, y) => (y.meta.published || '').localeCompare(x.meta.published || ''));

  for (const a of pages) {
    const rel = '../../';
    const canonical = `${SITE_URL}articles/${a.slug}/`;
    const eyecatch = a.meta.eyecatch ? a.meta.eyecatch.replace(/^\//, '') : '';
    const dates = [
      a.meta.published && `公開日：${formatDate(a.meta.published)}`,
      a.meta.updated && `更新日：${formatDate(a.meta.updated)}`,
    ].filter(Boolean).join('　');
    const html = pageShell({
      rel,
      title: `${a.meta.title} | ${SITE_NAME}`,
      description: a.meta.description,
      canonical,
      ogImage: eyecatch ? `${SITE_URL}${eyecatch}` : '',
      noindex: a.isDraft,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: a.meta.title,
        description: a.meta.description,
        datePublished: a.meta.published,
        dateModified: a.meta.updated || a.meta.published,
        mainEntityOfPage: canonical,
        ...(eyecatch && { image: `${SITE_URL}${eyecatch}` }),
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
      main: `<main><div class="wrap">
${a.isDraft ? '<p class="draft-note">これは下書きのプレビューです（検索エンジンには表示されません）</p>\n' : ''}<p class="pr-note">${PR_DISCLOSURE}</p>
<h1>${escapeHtml(a.meta.title)}</h1>
<p class="dates">${dates}</p>
${eyecatch ? `<img class="eyecatch" src="${rel}${escapeHtml(eyecatch)}" alt="${escapeHtml(a.meta.title)}" width="1200" height="630" />\n` : ''}<article class="article">
${renderBody(a.body)}
</article>
</div></main>`,
    });
    const outDir = join(distDir, 'articles', a.slug);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
  }

  // 記事一覧
  const listItems = pages.length
    ? pages.map((a) => `<li><a href="${a.slug}/"><p class="t">${a.isDraft ? '【下書き】' : ''}${escapeHtml(a.meta.title)}</p><p class="d">${a.meta.published ? formatDate(a.meta.published) : ''}　${escapeHtml(a.meta.description || '')}</p></a></li>`).join('\n')
    : '<li><a href="../"><p class="t">記事を準備中です</p><p class="d">公開までしばらくお待ちください。</p></a></li>';
  mkdirSync(join(distDir, 'articles'), { recursive: true });
  writeFileSync(join(distDir, 'articles', 'index.html'), pageShell({
    rel: '../',
    title: `記事一覧 | ${SITE_NAME}`,
    description: 'ガジェット・家電・キッチン用品・美容家電の選び方とスペック比較の記事一覧です。',
    canonical: `${SITE_URL}articles/`,
    noindex: pages.length === 0 || pages.every((a) => a.isDraft),
    main: `<main><div class="wrap"><p class="pr-note">${PR_DISCLOSURE}</p><h1>記事一覧</h1><ul class="list">\n${listItems}\n</ul></div></main>`,
  }));

  // sitemap.xml（公開記事だけ）
  const published = pages.filter((a) => !a.isDraft);
  const urls = [
    `  <url><loc>${SITE_URL}</loc></url>`,
    ...(published.length ? [`  <url><loc>${SITE_URL}articles/</loc></url>`] : []),
    ...published.map((a) => `  <url><loc>${SITE_URL}articles/${a.slug}/</loc><lastmod>${a.meta.updated || a.meta.published}</lastmod></url>`),
  ];
  writeFileSync(join(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);

  console.log(`記事ページを生成しました：公開 ${published.length} 本${includeDrafts ? `、下書き ${pages.length - published.length} 本` : ''}`);
};

main();
