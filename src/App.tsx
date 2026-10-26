import { useState, useEffect } from 'react';
import { products, getPriceRanges, CATEGORY_LABELS } from './data/products';
import type { Product } from './data/products';
import { Header } from './components/Header';
import { AssociateConfig } from './components/AssociateConfig';
import { TrendDashboard } from './components/TrendDashboard';
import { ProductCard } from './components/ProductCard';
import { CompareTable } from './components/CompareTable';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ArticleGenerator } from './components/ArticleGenerator';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { initAnalytics, trackSectionView } from './analytics';
import { LatestArticles } from './components/LatestArticles';
import { MeadowArt } from './components/MeadowArt';

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

  // アクセス解析（オーナー自身のアクセスは数字を汚すので計測しない）
  useEffect(() => {
    if (!isAdmin) initAnalytics();
  }, [isAdmin]);

  useEffect(() => {
    if (activeSection !== 'home') trackSectionView(activeSection);
  }, [activeSection]);

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

  // 並び順は掲載データの順（人気順ではない）
  const sortedProducts = filteredProducts;

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

      <main className="main-content" style={{ flexGrow: 1 }}>
        {/* ==================== 1. ホーム画面 ==================== */}
        {activeSection === 'home' && (
          <div className="home-container container fade-in">
            {/* ヒーローセクション（記事がすぐ下に見えるよう低めに） */}
            <section className="hero-section">
              <div className="hero-text">
                <div className="hero-badge">
                  <Sparkles size={14} className="icon-gold" />
                  <span>Amazonで買えるモノを比べて選ぶ買い物ガイド</span>
                </div>
                <h1 className="hero-title">
                  比べて選ぶ、<br />
                  <span className="gradient-gold-text">暮らしの買い物ガイド</span>
                </h1>
                <p className="hero-subtitle">
                  家電・ガジェット・美容家電・日用品・本まで、スペックと価格を比べて「どれを選ぶか」を整理しています。
                  価格は確認した日付つきで掲載しています。
                </p>
                <p className="hero-pr-note">本ページはプロモーション（広告）を含みます。</p>

                <div className="hero-actions">
                  <a className="btn-amazon" href="./articles/">
                    記事を読む
                    <ArrowRight size={16} />
                  </a>
                  <button
                    className="btn-outline"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedPrice('all');
                      setActiveSection('rankings');
                    }}
                  >
                    商品一覧を見る
                  </button>
                  {isAdmin && (
                    <button className="btn-outline" onClick={() => setIsConfigOpen(true)}>
                      アソシエイトIDを設定
                    </button>
                  )}
                </div>
              </div>
              <MeadowArt className="hero-art" />
            </section>

            {/* 新着記事 */}
            <LatestArticles />

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
                <span className="feat-badge">ガジェット</span>
                <h3>ガジェット</h3>
                <p>Fire TV Stick・モバイルバッテリー・Kindleなど。価格は確認日つきで掲載しています。</p>
                <span className="feat-link">
                  ガジェットを見る <ArrowRight size={14} />
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
                <span className="feat-badge">家電</span>
                <h3>家電</h3>
                <p>衣類乾燥除湿機や加湿器など、秋冬の家事で使う家電。</p>
                <span className="feat-link">
                  家電を見る <ArrowRight size={14} />
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
                <h3>1万〜3万円の商品</h3>
                <p>予算に合わせて、確認日つきの価格で絞り込めます。</p>
                <span className="feat-link">
                  この価格帯を見る <ArrowRight size={14} />
                </span>
              </div>
            </section>

          </div>
        )}

        {/* ==================== 2. ランキング画面 ==================== */}
        {activeSection === 'rankings' && (
          <div className="rankings-container container fade-in">
            <div className="section-header text-center">
              <h1 className="gradient-gold-text">商品一覧</h1>
              <p className="subtitle">カテゴリーと価格帯で絞り込めます。価格は確認した日付つきで、並び順は人気順ではありません。</p>
              <p className="hero-pr-note">本ページはプロモーション（広告）を含みます。</p>
            </div>

            {/* フィルターパネル */}
            <div className="filter-panel glass-panel">
              {/* カテゴリ選択 */}
              <div className="filter-group">
                <span className="filter-label">カテゴリー:</span>
                <div className="filter-tabs">
                  {[
                    { id: 'all', label: 'すべて' },
                    ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label })),
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
                  {Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label })).map((cat) => (
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
            <p className="footer-tagline">Amazonで買えるモノを比べて選ぶ買い物ガイド</p>
            <p className="footer-links"><a href="./articles/">記事一覧</a>　<a href="./about/">運営者情報</a>　<a href="./privacy/">プライバシーポリシー</a></p>
          </div>
          
          <div className="footer-legal glass-panel">
            <ShieldCheck size={16} className="icon-success flex-shrink-0" style={{ marginTop: '2px' }} />
            <p className="legal-text">
              <strong>Amazonアソシエイト開示情報:</strong><br />
              当サイト「DreamTact Select」は、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。すべての商品リンクにはアソシエイトID（トラッキングID）が含まれており、ご購入いただいた一部の金額がサイト運営者に紹介料として還元されますが、購入者の負担額が変わることはありません。
            </p>
          </div>
          
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DreamTact Select</span>
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
          margin-top: 76px;
        }
        @media (max-width: 900px) {
          .main-content { margin-top: 112px; }
        }

        /* ヒーローセクション */
        .hero-section {
          position: relative;
          overflow: hidden;
          margin-top: 20px;
          padding: 32px 40px;
          border-radius: 24px;
          background: linear-gradient(135deg, #163a22 0%, #1f4a2c 55%, #2c6a3d 100%);
          border: 1px solid #163a22;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          min-height: 280px;
        }

        .hero-text {
          position: relative;
          z-index: 1;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .hero-art {
          position: absolute;
          right: 0;
          bottom: 0;
          height: 100%;
          width: 46%;
          max-width: 540px;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-meadow-soft);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .hero-section .hero-title { color: #fbf6e9; }
        .hero-section .gradient-gold-text { background: none; -webkit-text-fill-color: #d9e8a6; color: #d9e8a6; }
        .hero-section .hero-subtitle { color: #e9eed6; }
        .hero-section .hero-pr-note { color: #fbf6e9; border-left-color: #e8a27f; }
        .hero-section .btn-outline { color: #fbf6e9; border-color: rgba(251, 246, 233, 0.75); background: transparent; }
        .hero-section .btn-outline:hover { background: rgba(251, 246, 233, 0.14); color: #fff; }
        .hero-title {
          font-size: 2.3rem;
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .hero-subtitle {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 22px 18px 96px;
            margin-top: 8px;
            border-radius: 20px;
          }
          .hero-title {
            font-size: 1.65rem;
          }
          .hero-subtitle {
            font-size: 0.92rem;
            line-height: 1.7;
          }
          .hero-art {
            width: 100%;
            max-width: none;
            height: 96px;
            opacity: 0.95;
          }
          .hero-actions .btn-amazon,
          .hero-actions .btn-outline {
            padding: 10px 18px;
          }
        }

        /* クイックリンク・特徴グリッド */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 8px 0 40px;
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
          border: 1px solid rgba(var(--ink-rgb), 0.08);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(var(--accent-rgb), 0.2);
          box-shadow: var(--shadow-md), var(--shadow-gold);
        }

        .feat-badge {
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          background: rgba(var(--ink-rgb), 0.08);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-secondary);
        }

        .feature-card:hover .feat-badge {
          color: var(--accent-primary);
          border-color: rgba(var(--accent-rgb), 0.3);
          background: rgba(var(--accent-rgb), 0.1);
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
          border: 1px solid rgba(var(--accent-rgb), 0.25);
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
          background: rgba(251, 246, 233, 0.94);
          backdrop-filter: blur(4px);
          color: var(--accent-primary);
          padding: 4px 12px;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 12px;
          border: 1px solid rgba(var(--accent-rgb), 0.3);
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
          border: 1px solid rgba(var(--ink-rgb), 0.08);
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
          background: rgba(var(--ink-rgb), 0.032);
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
          background: rgba(var(--ink-rgb), 0.08);
        }

        .filter-tab.active {
          background: rgba(var(--accent-rgb), 0.12);
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
          background: var(--bg-tertiary);
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
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .footer-tagline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .hero-pr-note {
          font-size: 0.82rem;
          color: var(--text-primary);
          font-weight: 700;
          border-left: 3px solid var(--accent-secondary);
          padding-left: 8px;
        }
        .section-header .hero-pr-note {
          display: inline-block;
        }

        .footer-links {
          margin-top: 8px;
          font-size: 0.85rem;
        }

        .footer-links a {
          color: var(--accent-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .footer-legal {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          text-align: left;
        }

        .legal-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .footer-bottom {
          display: flex;
          justify-content: center;
          border-top: 1px solid rgba(var(--ink-rgb), 0.08);
          padding-top: 20px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </>
  );
}

export default App;

