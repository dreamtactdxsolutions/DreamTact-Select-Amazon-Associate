import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, MousePointerClick, ShoppingBag, Calculator } from 'lucide-react';
import { getSearchRankingKeywords } from '../data/products';

export const TrendDashboard: React.FC = () => {
  const keywords = getSearchRankingKeywords();
  
  // シミュレーター用の状態
  const [monthlyTraffic, setMonthlyTraffic] = useState(10000);
  const [ctr, setCtr] = useState(3); // クリック率 (%)
  const [cvr, setCvr] = useState(2); // 成約率 (%)

  // 各カテゴリの平均単価とアソシエイト紹介料率
  // ガジェット: 2%, スマート家電: 2%, キッチン: 4%, 美容: 5%
  const stats = {
    gadget: { name: 'ガジェット', feeRate: 0.02, avgPrice: 16860 },
    appliance: { name: 'スマート家電', feeRate: 0.02, avgPrice: 52300 },
    kitchen: { name: 'キッチン用品', feeRate: 0.04, avgPrice: 27990 },
    beauty: { name: '美容・健康', feeRate: 0.05, avgPrice: 21400 },
  };

  // シミュレーション計算
  const clicks = Math.round(monthlyTraffic * (ctr / 100));
  const orders = Math.round(clicks * (cvr / 100));
  
  // 全体の加重平均アフィリエイト報酬を計算
  const commissionMap = Object.values(stats).map((value) => {
    const commissionPerOrder = value.avgPrice * value.feeRate;
    const totalCommission = orders * 0.25 * commissionPerOrder; // 各カテゴリが均等に25%ずつ売れると仮定
    return totalCommission;
  });
  
  const estimatedCommission = Math.round(commissionMap.reduce((a, b) => a + b, 0));

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header text-center">
        <h1 className="gradient-gold-text">Amazon アフィリエイト・リサーチセンター</h1>
        <p className="subtitle">
          最新のAmazon検索トレンドと、アフィリエイト報酬の収益シミュレーションデータ
        </p>
      </div>

      <div className="dashboard-grid">
        {/* 急上昇キーワードセクション */}
        <div className="dashboard-card glass-panel flex-col">
          <div className="card-header">
            <TrendingUp className="header-icon text-gold" />
            <h3>急上昇Amazon検索キーワード</h3>
          </div>
          <p className="card-desc">当サイトの流入ベースから抽出した、今熱いAmazon検索キーワード</p>
          
          <div className="keyword-list">
            {keywords.map((kw, index) => (
              <div className="keyword-item" key={index}>
                <div className="kw-left">
                  <span className={`kw-rank ${index < 3 ? 'top-rank' : ''}`}>#{index + 1}</span>
                  <span className="kw-text">{kw.keyword}</span>
                </div>
                <div className="kw-right">
                  <span className="kw-count">月間 {kw.count.toLocaleString()}pv</span>
                  {kw.trend === 'up' && <TrendingUp size={16} className="trend-up" />}
                  {kw.trend === 'stable' && <span className="trend-stable">-</span>}
                  {kw.trend === 'down' && <TrendingDown size={16} className="trend-down" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* カテゴリ別紹介料率 ＆ マーケット分析 */}
        <div className="dashboard-card glass-panel flex-col">
          <div className="card-header">
            <ShoppingBag className="header-icon text-blue" />
            <h3>カテゴリー別紹介料率 ＆ 平均単価</h3>
          </div>
          <p className="card-desc">アフィリエイト効果を最大化するための、料率と製品単価のバランス分析</p>
          
          <div className="category-stats-list">
            {Object.entries(stats).map(([catKey, value]) => (
              <div className="cat-stat-item" key={catKey}>
                <div className="cat-stat-meta">
                  <span className="cat-stat-name">{value.name}</span>
                  <span className="cat-stat-rate">紹介料率: <strong className="text-gold">{(value.feeRate * 100)}%</strong></span>
                </div>
                <div className="cat-stat-bar-container">
                  <div 
                    className={`cat-stat-bar bar-${catKey}`} 
                    style={{ width: `${(value.feeRate * 100) * 15}%` }}
                  ></div>
                </div>
                <div className="cat-stat-footer">
                  <span>平均商品単価: ￥{value.avgPrice.toLocaleString()}</span>
                  <span>1件あたりの予想報酬: ￥{Math.round(value.avgPrice * value.feeRate).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 収益シミュレーターセクション */}
      <div className="dashboard-card simulator-card glass-panel">
        <div className="card-header">
          <Calculator className="header-icon text-gold" />
          <h3>アフィリエイト収益シミュレーター</h3>
        </div>
        <p className="card-desc">
          アクセス数とクリック率（CTR）、コンバージョン率（CVR）を調整して、月間の予想アフィリエイト報酬をシミュレーションします。
        </p>

        <div className="simulator-grid">
          {/* コントロールパネル */}
          <div className="sim-controls">
            <div className="control-group">
              <div className="control-label">
                <span>月間想定アクセス数 (PV)</span>
                <span className="control-value">{monthlyTraffic.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000"
                value={monthlyTraffic} 
                onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                className="sim-slider"
              />
              <div className="slider-labels">
                <span>1,000</span>
                <span>50,000</span>
                <span>100,000</span>
              </div>
            </div>

            <div className="control-group">
              <div className="control-label">
                <span>クリック率 (CTR)</span>
                <span className="control-value">{ctr}%</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="10" 
                step="0.5"
                value={ctr} 
                onChange={(e) => setCtr(Number(e.target.value))}
                className="sim-slider"
              />
              <div className="slider-labels">
                <span>0.5%</span>
                <span>5%</span>
                <span>10%</span>
              </div>
            </div>

            <div className="control-group">
              <div className="control-label">
                <span>コンバージョン率 (CVR)</span>
                <span className="control-value">{cvr}%</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.1"
                value={cvr} 
                onChange={(e) => setCvr(Number(e.target.value))}
                className="sim-slider"
              />
              <div className="slider-labels">
                <span>0.5%</span>
                <span>2.5%</span>
                <span>5%</span>
              </div>
            </div>
          </div>

          {/* 計算結果パネル */}
          <div className="sim-results">
            <div className="results-grid">
              <div className="result-item">
                <div className="result-icon-wrapper bg-eye">
                  <Eye size={20} className="icon-blue" />
                </div>
                <div className="result-meta">
                  <span className="result-label">想定クリック数</span>
                  <span className="result-num">{clicks.toLocaleString()} <span className="unit">回</span></span>
                </div>
              </div>

              <div className="result-item">
                <div className="result-icon-wrapper bg-click">
                  <MousePointerClick size={20} className="icon-gold" />
                </div>
                <div className="result-meta">
                  <span className="result-label">想定注文数</span>
                  <span className="result-num">{orders.toLocaleString()} <span className="unit">件</span></span>
                </div>
              </div>
            </div>

            <div className="result-total">
              <span className="total-label">月間予想アフィリエイト報酬</span>
              <div className="total-amount">
                <span className="yen">￥</span>
                <span className="amount-num">{estimatedCommission.toLocaleString()}</span>
                <span className="per-month">/月</span>
              </div>
              <p className="total-note">
                ※4つの製品カテゴリーが均等に売れた場合の加重平均（平均単価 ￥29,600 / 平均紹介料率 3.25%）に基づいて計算しています。
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .dashboard-header {
          margin-bottom: 10px;
        }

        .dashboard-header h1 {
          font-size: 2.2rem;
          margin-bottom: 12px;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 800px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        .dashboard-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .header-icon {
          padding: 8px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .text-gold {
          color: var(--accent-primary);
        }

        .text-blue {
          color: var(--accent-secondary);
        }

        .card-header h3 {
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        /* キーワードリスト */
        .keyword-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .keyword-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          transition: var(--transition-fast);
        }

        .keyword-item:hover {
          transform: translateX(4px);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .kw-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .kw-rank {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          width: 24px;
        }

        .kw-rank.top-rank {
          color: var(--accent-primary);
        }

        .kw-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .kw-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .kw-count {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .trend-up {
          color: #ef4444;
        }

        .trend-down {
          color: #3b82f6;
        }

        .trend-stable {
          color: var(--text-muted);
          font-weight: 700;
          width: 16px;
          text-align: center;
        }

        /* カテゴリスタッツ */
        .category-stats-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cat-stat-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px;
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .cat-stat-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .cat-stat-name {
          color: var(--text-primary);
        }

        .cat-stat-rate {
          color: var(--text-secondary);
        }

        .cat-stat-bar-container {
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .cat-stat-bar {
          height: 100%;
          border-radius: 3px;
        }

        .bar-gadget {
          background: #3b82f6;
        }
        
        .bar-appliance {
          background: #8b5cf6;
        }

        .bar-kitchen {
          background: #f59e0b;
        }

        .bar-beauty {
          background: #ec4899;
        }

        .cat-stat-footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* シミュレーターカード */
        .simulator-card {
          margin-top: 10px;
        }

        .simulator-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          margin-top: 20px;
        }

        @media (max-width: 800px) {
          .simulator-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .sim-controls {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .control-value {
          color: var(--accent-primary);
          font-size: 1rem;
          font-weight: 700;
          font-family: monospace;
        }

        .sim-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          outline: none;
        }

        .sim-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent-primary);
          cursor: pointer;
          transition: var(--transition-fast);
          border: 2px solid var(--bg-secondary);
        }

        .sim-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .sim-results {
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
        }

        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .result-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
        }

        .bg-eye {
          background: rgba(59, 130, 246, 0.1);
        }

        .bg-click {
          background: rgba(212, 175, 55, 0.1);
        }

        .icon-blue {
          color: var(--accent-secondary);
        }

        .result-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .result-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .result-num {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: monospace;
        }

        .result-num .unit {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .result-total {
          background: rgba(212, 175, 55, 0.05);
          border: 1px dashed rgba(212, 175, 55, 0.3);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
        }

        .total-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .total-amount {
          display: flex;
          align-items: baseline;
          justify-content: center;
          color: var(--accent-primary);
        }

        .total-amount .yen {
          font-size: 1.5rem;
          font-weight: 700;
          margin-right: 2px;
        }

        .total-amount .amount-num {
          font-size: 2.8rem;
          font-weight: 800;
          line-height: 1;
          font-family: monospace;
          letter-spacing: -1px;
        }

        .total-amount .per-month {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-left: 4px;
        }

        .total-note {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};
