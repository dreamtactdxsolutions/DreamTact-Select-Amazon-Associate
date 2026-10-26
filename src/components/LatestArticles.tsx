import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ArticleSummary {
  slug: string;
  title: string;
  description: string;
  published: string;
  eyecatch: string;
}

const formatDate = (d: string) => {
  const [y, m, day] = d.split('-').map(Number);
  return y && m && day ? `${y}年${m}月${day}日` : '';
};

const MAX_CARDS = 6;

// 記事はビルド時に静的ページとして作られ、一覧は articles/index.json に出力される
export const LatestArticles: React.FC = () => {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let alive = true;
    fetch('./articles/index.json')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: ArticleSummary[]) => {
        if (!alive) return;
        setArticles(Array.isArray(data) ? data.slice(0, MAX_CARDS) : []);
        setState('ready');
      })
      .catch(() => {
        if (alive) setState('error');
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="latest-articles" aria-labelledby="latest-heading">
      <div className="latest-header">
        <h2 id="latest-heading">新着記事</h2>
        <a className="latest-all" href="./articles/">
          すべての記事 <ArrowRight size={14} />
        </a>
      </div>

      {state === 'loading' && (
        <div className="latest-grid" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="latest-card latest-skeleton" />
          ))}
        </div>
      )}

      {state === 'error' && (
        <p className="latest-fallback">
          記事の一覧を読み込めませんでした。<a href="./articles/">記事一覧ページ</a>から記事を読めます。
        </p>
      )}

      {state === 'ready' && articles.length > 0 && (
        <div className="latest-grid">
          {articles.map((a) => (
            <a key={a.slug} className="latest-card" href={`./articles/${a.slug}/`}>
              {a.eyecatch ? (
                <img src={`./${a.eyecatch}`} alt="" className="latest-img" loading="lazy" width={1200} height={630} />
              ) : (
                <div className="latest-img latest-img-empty" />
              )}
              <div className="latest-body">
                <p className="latest-date">{formatDate(a.published)}</p>
                <h3 className="latest-title">{a.title}</h3>
              </div>
            </a>
          ))}
        </div>
      )}

      <style>{`
        .latest-articles {
          margin: 36px 0 48px;
        }
        .latest-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 18px;
          gap: 12px;
        }
        .latest-header h2 {
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .latest-header h2::before {
          content: '';
          width: 6px;
          height: 1.3em;
          border-radius: 3px;
          background: linear-gradient(180deg, var(--accent-meadow), var(--accent-primary));
        }
        .latest-all {
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 0.92rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .latest-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .latest-card {
          display: flex;
          flex-direction: column;
          color: var(--text-primary);
          overflow: hidden;
          border-radius: var(--radius);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
        }
        a.latest-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        .latest-skeleton {
          min-height: 250px;
          background: var(--bg-tertiary);
        }
        .latest-img {
          width: 100%;
          height: auto;
          aspect-ratio: 1200 / 630;
          object-fit: cover;
          display: block;
          background: var(--bg-tertiary);
        }
        .latest-body {
          padding: 14px 18px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .latest-date {
          color: var(--text-muted);
          font-size: 0.82rem;
        }
        .latest-title {
          font-size: 1rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .latest-fallback {
          padding: 18px;
          border: 1px dashed var(--border-color);
          border-radius: var(--radius);
          color: var(--text-secondary);
        }
        .latest-fallback a {
          color: var(--accent-primary);
          font-weight: 700;
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .latest-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        @media (max-width: 560px) {
          .latest-articles { margin-top: 28px; }
          .latest-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
