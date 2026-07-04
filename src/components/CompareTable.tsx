import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { getAffiliateLink } from '../data/products';
import type { Product } from '../data/products';

interface CompareTableProps {
  products: Product[];
  associateId: string;
  onSelectProduct: (product: Product) => void;
}

export const CompareTable: React.FC<CompareTableProps> = ({
  products,
  associateId,
  onSelectProduct,
}) => {
  if (products.length === 0) return null;

  return (
    <div className="compare-section fade-in">
      <div className="compare-header text-center">
        <h2 className="gradient-gold-text">スペック＆価格 比較表</h2>
        <p className="subtitle">同ジャンルでの性能差や価格を並べて比較できます</p>
      </div>

      <div className="table-responsive-wrapper glass-panel">
        <div className="scroll-hint">
          <span>← 左右にスクロールできます →</span>
        </div>
        <table className="compare-table">
          <thead>
            <tr>
              <th className="sticky-col">項目</th>
              {products.map((product) => (
                <th key={product.id} className="product-th">
                  <div className="th-product-info">
                    <img src={product.image} alt={product.name} className="table-img" />
                    <span className="table-rank">Rank #{product.rank}</span>
                    <span className="table-product-name">{product.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="sticky-col label-td">参考価格</td>
              {products.map((product) => (
                <td key={product.id} className="price-td">
                  ￥{product.price.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky-col label-td">評価</td>
              {products.map((product) => (
                <td key={product.id}>
                  <div className="table-rating">
                    <Star size={14} fill="var(--accent-primary)" color="var(--accent-primary)" />
                    <span className="rate-num">{product.rating.toFixed(1)}</span>
                    <span className="reviews-cnt">({product.reviewsCount}件)</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky-col label-td">特徴・強み</td>
              {products.map((product) => (
                <td key={product.id} className="desc-td">
                  <p className="table-desc">{product.tagline}</p>
                </td>
              ))}
            </tr>
            {/* 主要なスペック項目を統合して表示 */}
            {Object.keys(products[0].specs).map((specKey) => (
              <tr key={specKey}>
                <td className="sticky-col label-td">{specKey}</td>
                {products.map((product) => (
                  <td key={product.id} className="spec-td">
                    {product.specs[specKey] || '-'}
                  </td>
                ))}
              </tr>
            ))}
            {/* アクションボタン */}
            <tr>
              <td className="sticky-col label-td">アクション</td>
              {products.map((product) => {
                const affiliateUrl = getAffiliateLink(product.asin, associateId);
                return (
                  <td key={product.id} className="action-td">
                    <div className="table-actions">
                      <button 
                        className="btn-outline btn-table" 
                        onClick={() => onSelectProduct(product)}
                      >
                        詳細を見る
                      </button>
                      <a 
                        href={affiliateUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-amazon btn-table"
                      >
                        <ShoppingCart size={14} />
                        Amazon
                      </a>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <style>{`
        .compare-section {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .table-responsive-wrapper {
          position: relative;
          width: 100%;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: var(--shadow-lg);
        }

        .scroll-hint {
          display: none;
          text-align: center;
          padding: 6px;
          background: rgba(212, 175, 55, 0.15);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent-primary);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        @media (max-width: 768px) {
          .scroll-hint {
            display: block;
          }
        }

        .compare-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
          min-width: 600px; /* 横スクロールを強制するため */
        }

        .compare-table th, 
        .compare-table td {
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          vertical-align: middle;
        }

        .compare-table tr:last-child td {
          border-bottom: none;
        }

        .sticky-col {
          position: sticky;
          left: 0;
          background: #111827; /* 背景色で透過を防ぐ */
          z-index: 10;
          font-weight: 700;
          color: var(--text-primary);
          border-right: 2px solid var(--border-color) !important;
          width: 120px;
          flex-shrink: 0;
        }

        .product-th {
          width: 250px;
          background: rgba(255, 255, 255, 0.01);
        }

        .th-product-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
        }

        .table-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .table-rank {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent-primary);
          background: rgba(212, 175, 55, 0.1);
          padding: 2px 8px;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .table-product-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .label-td {
          color: var(--text-secondary);
        }

        .price-td {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent-primary);
          font-family: 'Outfit', sans-serif;
        }

        .table-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rate-num {
          font-weight: 700;
          color: var(--text-primary);
        }

        .table-desc {
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .spec-td {
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.4;
        }

        .table-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .btn-table {
          width: 100%;
          padding: 8px 12px;
          font-size: 0.8rem;
          border-radius: 16px;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
