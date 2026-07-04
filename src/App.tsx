import { useState, useEffect } from 'react';
import { products, getPriceRanges, getAffiliateLink } from './data/products';
import type { Product } from './data/products';
import { Header } from './components/Header';
import { AssociateConfig } from './components/AssociateConfig';
import { TrendDashboard } from './components/TrendDashboard';
import { ProductCard } from './components/ProductCard';
import { CompareTable } from './components/CompareTable';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ArticleGenerator } from './components/ArticleGenerator';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

function App() {
  // 管理者モードの判定 (localhost であるか、URLに ?admin=true があるか、localStorage に記録がある場合)
  const [isAdmin] = useState<boolean>(() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return true;
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      localStorage.setItem('dreamtact_admin_mode', 'true');
      return true;
    }
    return localStorage.getItem('dreamtact_admin_mode') === 'true';
  });

  // アソシエイトIDの状態管理 (初期値: ローカルストレージ、なければ dreamtactaffi-22)
  const [associateId, setAssociateId] = useState<string>(() => {
    const saved = localStorage.getItem('dreamtact_associate_id');
    return saved || 'dreamtactaffi-22';
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  // URLのパラメータから ?admin=true を削除してクリーンにする
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  // 一般ユーザーが管理者用画面に直リンクされた場合の保護
  useEffect(() => {
    if (!isAdmin && (activeSection === 'blog' || activeSection === 'dashboard')) {
      setActiveSection('home');
    }
  }, [activeSection, isAdmin]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  // ID保存処理
  const handleSaveId = (newId: string) => {
    setAssociateId(newId);
    localStorage.setItem('dreamtact_associate_id', newId);
  };

  // 商品フィルタリング
  const filteredProducts = products.filter((product) => {
    // カテゴリフィルター
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // 価格帯フィルター
    if (selectedPrice !== 'all') {
      const ranges = getPriceRanges();
      const range = ranges[parseInt(selectedPrice)];
      if (product.price < range.min || product.price > range.max) {
        return false;
      }
    }
    return true;
  });

  // ランキング順に並び替え (カテゴリ内ランク順)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // カテゴリがallの場合は価格や評価などで並べるか、モックデータの順序
    if (selectedCategory === 'all') {
      return b.rating - a.rating; // overallは評価順
    }
    return a.rank - b.rank; // カテゴリ内はランク順
  });

  return (
    <>
      {/* ヘッダー */}
      <Header
        currentId={associateId}
        onOpenConfig={() => setIsConfigOpen(true)}
        activeSection={activeSection}
        setActiveSection={(sec) => {
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isAdmin={isAdmin}
      />

      <main className="main-content" style={{ marginTop: '90px', flexGrow: 1 }}>
        {/* ==================== 1. ホーム画面 ==================== */}
        {activeSection === 'home' && (
          <div className="home-container container fade-in">
            {/* ヒーローセクション */}
            <section className="hero-section text-center">
              <div className="hero-badge">
                <Sparkles size={14} className="icon-gold" />
                <span>2026年最新 Amazon売れ筋・厳選セレクト</span>
              </div>
              <h1 className="hero-title">
                日常を極上にアップデートする<br />
                <span className="gradient-gold-text">至高の厳選プロダクト</span>
              </h1>
              <p className="hero-subtitle">
                Amazonで評価4.5以上、口コミでも絶賛されている人気商品だけをリサーチ。<br />
                あなたの生活の質（QOL）を高める逸品を、カテゴリー・価格帯別にご提案します。
              </p>
              
              <div className="hero-actions">
                <button 
                  className="btn-amazon" 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedPrice('all');
                    setActiveSection('rankings');
                  }}
                >
                  ランキングを見る
                  <ArrowRight size={16} />
                </button>
                <button className="btn-outline" onClick={() => setIsConfigOpen(true)}>
                  アソシエイトIDを設定
                </button>
              </div>
            </section>

            {/* クイックリンク・カードセクション */}
            <section className="features-grid">
              <div 
                className="feature-card glass-panel"
                onClick={() => {
                  setSelectedCategory('gadget');
                  setSelectedPrice('all');
                  setActiveSection('rankings');
                }}
              >
                <span className="feat-badge">人気 No.1</span>
                <h3>最新ガジェット部門</h3>
                <p>スマートウォッチやワイヤレスイヤホンなど、生産性を高める最新デジタル機器。</p>
                <span className="feat-link">
                  ガジェット部門を見る <ArrowRight size={14} />
                </span>
              </div>

              <div 
                className="feature-card glass-panel"
                onClick={() => {
                  setSelectedCategory('appliance');
                  setSelectedPrice('all');
                  setActiveSection('rankings');
                }}
              >
                <span className="feat-badge">売れ筋</span>
                <h3>スマート家電部門</h3>
                <p>吸引・水拭きを全自動化するロボット掃除機など、暮らしにゆとりを生むスマート家電。</p>
                <span className="feat-link">
                  スマート家電部門を見る <ArrowRight size={14} />
                </span>
              </div>

              <div 
                className="feature-card glass-panel"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPrice('2'); // 10,000円〜30,000円
                  setActiveSection('rankings');
                }}
              >
                <span className="feat-badge">予算別</span>
                <h3>1万〜3万円の厳選ギフト</h3>
                <p>自分へのご褒美や、大切な人への贈り物に最も選ばれている本命の価格帯。</p>
                <span className="feat-link">
                  この価格帯を見る <ArrowRight size={14} />
                </span>
              </div>
            </section>

            {/* 特集セクション (本日のイチオシ商品) */}
            <section className="featured-product-section glass-panel">
              <div className="featured-grid">
                <div className="featured-img-wrapper">
                  <img src={products[0].image} alt={products[0].name} className="featured-img" />
                  <span className="featured-label">本日の注目プロダクト</span>
                </div>
                <div className="featured-info">
                  <span className="badge badge-gold">総合評価 4.8 | ベストセラー</span>
                  <h2>{products[0].name}</h2>
                  <p className="featured-tagline">{products[0].tagline}</p>
                  <p className="featured-desc">
                    スマートウォッチ市場で圧倒的な支持を集めるモデル。常時表示対応の美しいAMOLEDディスプレイと、14日間持続する驚異的なバッテリーを両立。健康管理機能も網羅し、アフィリエイトでのコンバージョン率（購入率）も非常に高い名作です。
                  </p>
                  <div className="featured-cta">
                    <button 
                      className="btn-outline" 
                      onClick={() => setSelectedProduct(products[0])}
                    >
                      詳細レビューを読む
                    </button>
                    <a 
                      href={getAffiliateLink(products[0].asin, associateId)}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-amazon"
                    >
                      Amazonでチェックする
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== 2. ランキング画面 ==================== */}
        {activeSection === 'rankings' && (
          <div className="rankings-container container fade-in">
            <div className="section-header text-center">
              <h1 className="gradient-gold-text">人気商品ランキング</h1>
              <p className="subtitle">カテゴリーと価格帯を組み合わせて、最適なアイテムを見つけられます</p>
            </div>

            {/* フィルターパネル */}
            <div className="filter-panel glass-panel">
              {/* カテゴリ選択 */}
              <div className="filter-group">
                <span className="filter-label">カテゴリー:</span>
                <div className="filter-tabs">
                  {[
                    { id: 'all', label: 'すべて' },
                    { id: 'gadget', label: 'ガジェット' },
                    { id: 'appliance', label: 'スマート家電' },
                    { id: 'kitchen', label: 'キッチン用品' },
                    { id: 'beauty', label: '美容・健康' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      className={`filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 価格帯選択 */}
              <div className="filter-group">
                <span className="filter-label">価格帯:</span>
                <div className="filter-tabs">
                  <button
                    className={`filter-tab ${selectedPrice === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedPrice('all')}
                  >
                    すべて
                  </button>
                  {getPriceRanges().map((range, index) => (
                    <button
                      key={index}
                      className={`filter-tab ${selectedPrice === index.toString() ? 'active' : ''}`}
                      onClick={() => setSelectedPrice(index.toString())}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 商品一覧グリッド */}
            {sortedProducts.length > 0 ? (
              <div className="products-grid">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    associateId={associateId}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    showRank={selectedCategory !== 'all'} // カテゴリ絞り込み時のみ順位を表示
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state glass-panel text-center">
                <HelpCircle size={48} className="icon-muted" />
                <h3>条件に一致する商品が見つかりませんでした</h3>
                <p>フィルターの条件を変更してお試しください。</p>
                <button 
                  className="btn-outline" 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedPrice('all');
                  }}
                >
                  フィルターをリセットする
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. 比較表画面 ==================== */}
        {activeSection === 'compare' && (
          <div className="compare-container container fade-in">
            <div className="filter-panel glass-panel" style={{ marginBottom: '20px' }}>
              <div className="filter-group">
                <span className="filter-label">比較するカテゴリー:</span>
                <div className="filter-tabs">
                  {[
                    { id: 'gadget', label: 'ガジェット' },
                    { id: 'appliance', label: 'スマート家電' },
                    { id: 'kitchen', label: 'キッチン用品' },
                    { id: 'beauty', label: '美容・健康' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      className={`filter-tab ${selectedCategory === cat.id || (selectedCategory === 'all' && cat.id === 'gadget') ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <CompareTable
              products={products.filter((p) => p.category === (selectedCategory === 'all' ? 'gadget' : selectedCategory))}
              associateId={associateId}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
          </div>
        )}

        {/* ==================== 4. トレンド分析画面 ==================== */}
        {activeSection === 'dashboard' && isAdmin && (
          <div className="container">
            <TrendDashboard />
          </div>
        )}

        {/* ==================== 5. AI記事生成画面 ==================== */}
        {activeSection === 'blog' && isAdmin && (
          <div className="container">
            <ArticleGenerator associateId={associateId} />
          </div>
        )}
      </main>

      {/* ==================== フッター ==================== */}
      <footer className="footer">
        <div className="footer-container container">
          <div className="footer-brand">
            <span className="brand-name">DreamTact Select</span>
            <p className="footer-tagline">Amazonの人気商品を徹底リサーチして届ける専門メディア</p>
          </div>
          
          <div className="footer-legal glass-panel">
            <ShieldCheck size={16} className="icon-success flex-shrink-0" style={{ marginTop: '2px' }} />
            <p className="legal-text">
              <strong>Amazonアソシエイト開示情報:</strong><br />
              当サイト「DreamTact Select」は、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。すべての商品リンクにはアソシエイトID（トラッキングID）が含まれており、ご購入いただいた一部の金額がサイト運営者に紹介料として還元されますが、購入者の負担額が変わることはありません。
            </p>
          </div>
          
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DreamTact. All rights reserved. Built with premium design.</span>
          </div>
        </div>
      </footer>

      {/* 設定モーダル */}
      <AssociateConfig
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        currentId={associateId}
        onSave={handleSaveId}
      />

      {/* 商品詳細モーダル */}
      <ProductDetailModal
        product={selectedProduct}
        associateId={associateId}
        onClose={() => setSelectedProduct(null)}
      />

      {/* 全体の追加スタイル */}
      <style>{`
        /* メインコンテンツへのパディング */
        .main-content {
          padding-bottom: 60px;
        }

        /* ヒーローセクション */
        .hero-section {
          padding: 60px 0 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.2);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .hero-title {
          font-size: 2.8rem;
          line-height: 1.25;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
        }

        .hero-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 700px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        /* クイックリンク・特徴グリッド */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 40px 0;
        }

        @media (max-width: 850px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        .feature-card {
          padding: 24px;
          cursor: pointer;
          transition: var(--transition-smooth);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.2);
          box-shadow: var(--shadow-md), var(--shadow-gold);
        }

        .feat-badge {
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-secondary);
        }

        .feature-card:hover .feat-badge {
          color: var(--accent-primary);
          border-color: rgba(212, 175, 55, 0.3);
          background: rgba(212, 175, 55, 0.1);
        }

        .feature-card h3 {
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .feature-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .feat-link {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: auto;
          padding-top: 10px;
        }

        /* イチオシ商品セクション */
        .featured-product-section {
          padding: 30px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: var(--shadow-lg), var(--shadow-gold);
        }

        .featured-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 30px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .featured-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .featured-img-wrapper {
          position: relative;
          width: 100%;
          height: 250px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        .featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-label {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(10, 15, 29, 0.85);
          backdrop-filter: blur(4px);
          color: var(--accent-primary);
          padding: 4px 12px;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .featured-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          text-align: left;
        }

        .featured-info h2 {
          font-size: 1.8rem;
          color: var(--text-primary);
        }

        .featured-tagline {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1.4;
        }

        .featured-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .featured-cta {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        /* ランキング/フィルターセクション */
        .section-header {
          padding: 40px 0 20px;
        }

        .section-header h1 {
          font-size: 2.2rem;
          margin-bottom: 8px;
        }

        .filter-panel {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 30px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .filter-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        .filter-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          width: 90px;
          flex-shrink: 0;
        }

        .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-tab {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .filter-tab:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
        }

        .filter-tab.active {
          background: rgba(212, 175, 55, 0.12);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        /* 商品グリッド */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        /* エンプティ・ステート */
        .empty-state {
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          border: 1px dashed var(--border-color);
        }

        .icon-muted {
          color: var(--text-muted);
        }

        .empty-state p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        /* フッター */
        .footer {
          background: #070a14;
          border-top: 1px solid var(--border-color);
          padding: 40px 0 20px;
          margin-top: 60px;
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .footer-brand {
          text-align: left;
        }

        .footer-brand .brand-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .footer-tagline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .footer-legal {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          text-align: left;
        }

        .legal-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .footer-bottom {
          display: flex;
          justify-content: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </>
  );
}

export default App;

