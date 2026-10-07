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

// 記事はビルド時に静的ページとして作られ、一覧は articles/index.json に出力される
export const LatestArticles: React.FC = () => {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);

  useEffect(() => {
    fetch('./articles/index.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: ArticleSummary[]) => setArticles(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setArticles([]));
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="latest-articles">
      <div className="latest-header">
        <h2>新着記事</h2>
        <a className="latest-all" href="./articles/">
          すべての記事 <ArrowRight size={14} />
        </a>
      </div>
      <div className="latest-grid">
        {articles.map((a) => (
          <a key={a.slug} className="latest-card glass-panel" href={`./articles/${a.slug}/`}>
            {a.eyecatch && (
              <img src={`./${a.eyecatch}`} alt="" className="latest-img" loading="lazy" width={1200} height={630} />
            )}
            <div className="latest-body">
              <p className="latest-date">{formatDate(a.published)}</p>
              <h3 className="latest-title">{a.title}</h3>
              <p className="latest-desc">{a.description}</p>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .latest-articles {
          margin: 0 0 56px;
        }
        .latest-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 20px;
          gap: 12px;
        }
        .latest-header h2 {
          font-size: 1.6rem;
        }
        .latest-all {
          color: var(--accent-primary);
          text-decoration: none;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .latest-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .latest-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: var(--text-primary);
          overflow: hidden;
          border-radius: 16px;
          transition: var(--transition-smooth);
        }
        .latest-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }
        .latest-img {
          width: 100%;
          height: auto;
          aspect-ratio: 1200 / 630;
          object-fit: cover;
          display: block;
        }
        .latest-body {
          padding: 16px;
        }
        .latest-date {
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-bottom: 6px;
        }
        .latest-title {
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 8px;
        }
        .latest-desc {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .latest-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
