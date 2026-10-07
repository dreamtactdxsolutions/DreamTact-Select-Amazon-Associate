// Google Analytics 4 の計測
// 測定IDはビルド時の環境変数 VITE_GA_MEASUREMENT_ID から読む。未設定なら何もしない

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
let enabled = false;

export const initAnalytics = () => {
  if (enabled || !measurementId) return;
  enabled = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js は arguments オブジェクトそのものを受け取る前提
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  // Amazonへのリンクのクリックを、どの部品から押されたかと一緒に記録する
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest?.('a[href*="amazon.co.jp"]') as HTMLAnchorElement | null;
    if (!link) return;
    const asin = link.href.match(/\/dp\/([A-Z0-9]{10})/i)?.[1] ?? '';
    const placement = (link.closest('[data-placement]') as HTMLElement | null)?.dataset.placement
      ?? link.className.split(' ')[0]
      ?? '';
    window.gtag('event', 'amazon_click', {
      asin,
      placement,
      link_text: link.textContent?.trim().slice(0, 100) ?? '',
    });
  }, { capture: true });
};

export const trackSectionView = (section: string) => {
  if (!enabled) return;
  window.gtag('event', 'page_view', {
    page_title: `${document.title} - ${section}`,
    page_location: `${window.location.origin}${window.location.pathname}#${section}`,
  });
};
