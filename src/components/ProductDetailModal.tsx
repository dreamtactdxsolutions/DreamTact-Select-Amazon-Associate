import React from 'react';
import { X, Check, AlertTriangle, Star, ShoppingCart } from 'lucide-react';
import { getAffiliateLink } from '../data/products';
import type { Product } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  associateId: string;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  associateId,
  onClose,
}) => {
  if (!product) return null;

  const affiliateUrl = getAffiliateLink(product.asin, associateId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal-content glass-panel fade-in" onClick={(e) => e.stopPropagation()}>
        
        {/* モーダルヘッダー */}
        <div className="modal-header">
          <div>
            <span className="badge badge-blue">{product.categoryLabel} 第{product.rank}位</span>
            <h2 className="modal-title">{product.name}</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="閉じる">
            <X size={24} />
          </button>
        </div>

        {/* モーダルボディ */}
        <div className="modal-body scrollable-body">
          {/* 画像 & 基本スペックカード */}
          <div className="detail-hero-grid">
            <div className="detail-img-wrapper">
              <img src={product.image} alt={product.name} className="detail-img" />
            </div>
            
            <div className="detail-basic-info">
              <p className="detail-tagline">{product.tagline}</p>
              
              <div className="detail-rating-row">
                <div className="stars-wrapper">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? 'var(--accent-primary)' : 'none'}
                      color={i < Math.floor(product.rating) ? 'var(--accent-primary)' : 'var(--text-muted)'}
                    />
                  ))}
                </div>
                <span className="rating-val">{product.rating.toFixed(1)}</span>
                <span className="reviews-cnt">({product.reviewsCount}件のユーザー評価)</span>
              </div>

              <div className="detail-price-box">
                <span className="price-label">Amazon 税込参考価格:</span>
                <span className="price-value">￥{product.price.toLocaleString()}</span>
              </div>

              <a 
                href={affiliateUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-amazon btn-detail-cta"
              >
                <ShoppingCart size={18} />
                Amazonで詳細＆最新価格をチェック
              </a>
            </div>
          </div>

          {/* 商品紹介文 */}
          <div className="detail-section">
            <h3 className="section-title">商品の概要・特徴</h3>
            <p className="detail-description">{product.description}</p>
          </div>

          {/* メリット ＆ デメリット比較 */}
          <div className="pros-cons-grid">
            <div className="pros-box">
              <h4 className="pros-title">
                <Check size={18} className="icon-success" />
                おすすめポイント（メリット）
              </h4>
              <ul className="pros-list">
                {product.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>

            <div className="cons-box">
              <h4 className="cons-title">
                <AlertTriangle size={18} className="icon-warning" />
                購入前に知っておくべき点（デメリット）
              </h4>
              <ul className="cons-list">
                {product.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* スペック詳細 */}
          <div className="detail-section">
            <h3 className="section-title">スペック詳細情報</h3>
            <div className="detail-specs-table">
              {Object.entries(product.specs).map(([key, val]) => (
                <div className="specs-row" key={key}>
                  <span className="specs-key">{key}</span>
                  <span className="specs-val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ユーザーのクチコミ */}
          <div className="detail-section">
            <h3 className="section-title">購入者・ユーザーの声</h3>
            <div className="testimonials-grid">
              {product.testimonials.map((t, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="t-header">
                    <span className="t-user">{t.user}</span>
                    <div className="t-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < t.rating ? 'var(--accent-primary)' : 'none'}
                          color={i < t.rating ? 'var(--accent-primary)' : 'var(--text-muted)'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="t-comment">「{t.comment}」</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* フッターの購入ボタン */}
        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>閉じる</button>
          <a 
            href={affiliateUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-amazon"
          >
            <ShoppingCart size={16} />
            Amazonで見る
          </a>
        </div>

      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(4, 6, 12, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .detail-modal-content {
          width: 100%;
          max-width: 850px;
          height: auto;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), var(--shadow-gold);
          border: 1px solid rgba(212, 175, 55, 0.25);
          padding: 24px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .modal-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 4px;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .scrollable-body {
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 8px;
          margin-bottom: 20px;
        }

        /* ヒーローグリッド */
        .detail-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 28px;
          margin-bottom: 28px;
        }

        @media (max-width: 768px) {
          .detail-hero-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .detail-img-wrapper {
          width: 100%;
          height: 280px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        .detail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-basic-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }

        .detail-tagline {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1.4;
        }

        .detail-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .detail-rating-row .rating-val {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .detail-price-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 14px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-price-box .price-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .detail-price-box .price-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-primary);
          font-family: 'Outfit', sans-serif;
          line-height: 1;
        }

        .btn-detail-cta {
          width: 100%;
          padding: 14px 20px;
          font-size: 1rem;
          border-radius: 30px;
          animation: pulse-gold 2.5s infinite;
        }

        /* セクション共通 */
        .detail-section {
          margin-bottom: 28px;
        }

        .section-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          border-left: 3px solid var(--accent-primary);
          padding-left: 10px;
          margin-bottom: 12px;
        }

        .detail-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          text-align: justify;
        }

        /* メリット ＆ デメリット */
        .pros-cons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }

        @media (max-width: 768px) {
          .pros-cons-grid {
            grid-template-columns: 1fr;
          }
        }

        .pros-box, .cons-box {
          padding: 20px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-color);
        }

        .pros-box {
          border-left: 4px solid var(--accent-success);
        }

        .cons-box {
          border-left: 4px solid #f97316;
        }

        .pros-title, .cons-title {
          font-size: 0.95rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .pros-title {
          color: var(--accent-success);
        }

        .cons-title {
          color: #f97316;
        }

        .icon-warning {
          color: #f97316;
        }

        .pros-list, .cons-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .pros-list li::before {
          content: '✓';
          color: var(--accent-success);
          font-weight: bold;
          margin-right: 6px;
        }

        .cons-list li::before {
          content: '•';
          color: #f97316;
          font-weight: bold;
          margin-right: 8px;
          font-size: 1.2rem;
          line-height: 0.8;
          display: inline-block;
          vertical-align: middle;
        }

        /* スペック詳細テーブル */
        .detail-specs-table {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
        }

        .specs-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.85rem;
        }

        .specs-row:last-child {
          border-bottom: none;
        }

        .specs-key {
          background: rgba(255, 255, 255, 0.02);
          padding: 10px 14px;
          color: var(--text-secondary);
          font-weight: 600;
          border-right: 1px solid var(--border-color);
        }

        .specs-val {
          padding: 10px 14px;
          color: var(--text-primary);
          font-weight: 500;
        }

        /* クチコミ */
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 14px;
        }

        .t-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .t-user {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .t-stars {
          display: flex;
          gap: 1px;
        }

        .t-comment {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
          font-style: italic;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
