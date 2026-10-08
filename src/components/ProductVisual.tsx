import React from 'react';
import { Smartphone, Wind, Coffee, Sparkles, SprayCan, BookOpen } from 'lucide-react';
import { CATEGORY_LABELS } from '../data/products';
import type { ProductCategory } from '../data/products';

// 商品写真の代わりに表示するカテゴリの目印。
// Amazonの商品画像は保存・転載できず、イメージ画像は実物と誤解されるおそれがあるため、写真は使わない
const ICONS: Record<ProductCategory, React.ElementType> = {
  gadget: Smartphone,
  appliance: Wind,
  kitchen: Coffee,
  beauty: Sparkles,
  household: SprayCan,
  books: BookOpen,
};

export const ProductVisual: React.FC<{ category: ProductCategory; size?: 'card' | 'detail' | 'table' }> = ({ category, size = 'card' }) => {
  const Icon = ICONS[category];
  return (
    <div className={`product-visual product-visual-${size}`} aria-hidden="true">
      <Icon size={size === 'table' ? 28 : 48} strokeWidth={1.5} />
      {size !== 'table' && <span className="product-visual-label">{CATEGORY_LABELS[category]}</span>}
      {size !== 'table' && <span className="product-visual-note">写真は商品ページでご確認ください</span>}
      <style>{`
        .product-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.12), transparent 60%), var(--bg-tertiary);
          color: var(--accent-primary);
        }
        .product-visual-card { height: 200px; }
        .product-visual-detail { height: 100%; min-height: 240px; border-radius: 12px; }
        .product-visual-table { width: 64px; height: 64px; border-radius: 10px; margin: 0 auto; }
        .product-visual-label { color: var(--text-primary); font-weight: 700; font-size: 0.95rem; }
        .product-visual-note { color: var(--text-muted); font-size: 0.75rem; }
      `}</style>
    </div>
  );
};
