import React from 'react';
import { Star, ChevronRight, ShoppingCart, Award } from 'lucide-react';
import { getAffiliateLink } from '../data/products';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  associateId: string;
  onSelectProduct: (product: Product) => void;
  showRank?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  associateId,
  onSelectProduct,
  showRank = true,
}) => {
  const affiliateUrl = getAffiliateLink(product.asin, associateId);

  // ランキングバッジのスタイル
  const getRankBadge = (rank: number) => {
    if (!showRank) return null;
    let badgeClass = 'rank-normal';
    let iconColor = 'var(--text-secondary)';
    
    if (rank === 1) {
      badgeClass = 'rank-gold';
      iconColor = '#d4af37';
    } else if (rank === 2) {
      badgeClass = 'rank-silver';
      iconColor = '#a8a8a8';
    } else if (rank === 3) {
      badgeClass = 'rank-bronze';
      iconColor = '#cd7f32';
    }

    return (
      <div className={`rank-badge ${badgeClass}`}>
        <Award size={14} style={{ color: iconColor }} />
        <span>第 {rank} 位</span>
      </div>
    );
  };

  return (
    <div className="product-card glass-panel fade-in">
      <div className="product-image-container">
        {getRankBadge(product.rank)}
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img" 
          loading="lazy" 
        />
        <div className="category-tag">
          <span className="badge badge-blue">{product.categoryLabel}</span>
        </div>
      </div>

      <div className="product-info">
        <div className="rating-row">
          <div className="stars-wrapper">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? 'var(--accent-primary)' : 'none'}
                color={i < Math.floor(product.rating) ? 'var(--accent-primary)' : 'var(--text-muted)'}
              />
            ))}
            <span className="rating-val">{product.rating.toFixed(1)}</span>
          </div>
          <span className="reviews-cnt">({product.reviewsCount}件の評価)</span>
        </div>

        <h3 className="product-title">{product.name}</h3>
        <p className="product-tagline">{product.tagline}</p>

        <div className="price-row">
          <span className="price-label">税込参考価格:</span>
          <span className="price-value">
            <span className="currency">￥</span>
            {product.price.toLocaleString()}
          </span>
        </div>

        {/* 主なスペック (最初の3つを表示) */}
        <div className="specs-preview">
          {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
            <div className="spec-item" key={key}>
              <span className="spec-name">{key}:</span>
              <span className="spec-val" title={val}>{val}</span>
            </div>
          ))}
        </div>

        {/* コール・トゥ・アクション (CTA) ボタン群 */}
        <div className="cta-container">
          <button 
            className="btn-outline btn-full" 
            onClick={() => onSelectProduct(product)}
          >
            詳細レビュー・口コミ
            <ChevronRight size={16} />
          </button>
          
          <a 
            href={affiliateUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-amazon btn-full"
          >
            <ShoppingCart size={16} />
            Amazonでチェック
          </a>
        </div>
      </div>

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          transition: var(--transition-smooth);
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-6px);
          border-color: rgba(212, 175, 55, 0.25);
          box-shadow: var(--shadow-lg), var(--shadow-gold);
        }

        .product-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          background: rgba(0, 0, 0, 0.2);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .product-card:hover .product-img {
          transform: scale(1.04);
        }

        /* ランキングバッジ */
        .rank-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          z-index: 2;
          box-shadow: var(--shadow-md);
        }

        .rank-gold {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(184, 134, 11, 0.9) 100%);
          color: #000;
          border: 1px solid rgba(212, 175, 55, 0.5);
        }

        .rank-silver {
          background: linear-gradient(135deg, rgba(200, 200, 200, 0.9) 0%, rgba(150, 150, 150, 0.9) 100%);
          color: #000;
          border: 1px solid rgba(200, 200, 200, 0.5);
        }

        .rank-bronze {
          background: linear-gradient(135deg, rgba(205, 127, 50, 0.9) 0%, rgba(160, 90, 30, 0.9) 100%);
          color: #fff;
          border: 1px solid rgba(205, 127, 50, 0.5);
        }

        .rank-normal {
          background: rgba(17, 24, 39, 0.85);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .category-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
        }

        .product-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .stars-wrapper {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .rating-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-primary);
          margin-left: 4px;
        }

        .reviews-cnt {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .product-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .product-tagline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.4;
          min-height: 2.8em; /* 2行分の高さを確保して整列させる */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 12px;
        }

        .price-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .price-value {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--accent-primary);
          font-family: 'Outfit', sans-serif;
        }

        .price-value .currency {
          font-size: 1rem;
          margin-right: 1px;
        }

        .specs-preview {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 20px;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          line-height: 1.3;
        }

        .spec-name {
          color: var(--text-secondary);
          font-weight: 500;
          flex-shrink: 0;
        }

        .spec-val {
          color: var(--text-primary);
          font-weight: 600;
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 65%;
        }

        .cta-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: auto;
        }

        .btn-full {
          width: 100%;
          padding: 10px 16px;
          font-size: 0.85rem;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};
