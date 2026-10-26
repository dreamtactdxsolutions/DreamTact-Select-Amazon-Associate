import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings, Flame, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentId: string;
  onOpenConfig: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentId,
  onOpenConfig,
  activeSection,
  setActiveSection,
  isAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container container">
        <div className="logo" onClick={() => setActiveSection('home')}>
          <div className="logo-text">
            <span className="brand-name">DreamTact</span>
            <span className="brand-sub">Select</span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => setActiveSection('home')}
          >
            ホーム
          </button>
          <button
            className={`nav-link ${activeSection === 'rankings' ? 'active' : ''}`}
            onClick={() => setActiveSection('rankings')}
          >
            商品一覧
          </button>
          <button
            className={`nav-link ${activeSection === 'compare' ? 'active' : ''}`}
            onClick={() => setActiveSection('compare')}
          >
            スペック比較
          </button>
          {/* 記事は静的ページとして別に生成しているので、通常のリンクで移動する */}
          <a className="nav-link" href="./articles/">
            記事
          </a>
          {isAdmin && (
            <>
              <button
                className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveSection('dashboard')}
              >
                <Flame size={16} className="icon-trend" />
                リサーチ分析
              </button>
              <button
                className={`nav-link ${activeSection === 'blog' ? 'active' : ''}`}
                onClick={() => setActiveSection('blog')}
              >
                <Sparkles size={14} className="icon-sparkle-menu" />
                AIブログ作成
              </button>
            </>
          )}
        </nav>

        <div className="header-actions">
          {isAdmin && (
            <div className="id-badge-container" onClick={onOpenConfig} title="ストアIDを設定">
              <span className="id-label">ストアID:</span>
              <div className="id-badge">
                <ShieldCheck size={14} className="icon-success" />
                <span className="id-value">{currentId}</span>
              </div>
              <button className="settings-btn" aria-label="設定を開く">
                <Settings size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          padding: 14px 0;
          transition: var(--transition-smooth);
          border-bottom: 1px solid #163a22;
          background: rgba(31, 74, 44, 0.97);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .header.scrolled {
          padding: 12px 0;
          background: rgba(22, 58, 34, 0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #163a22;
          box-shadow: var(--shadow-md);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(251, 246, 233, 0.12);
          border: 1px solid rgba(251, 246, 233, 0.3);
          border-radius: 10px;
          padding: 6px;
          transition: var(--transition-smooth);
        }

        .logo:hover .logo-icon {
          transform: scale(1.05);
          background: rgba(var(--accent-rgb), 0.2);
        }

        .icon-gold {
          color: var(--accent-primary);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brand-name {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #fbf6e9;
        }

        .brand-sub {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          color: #d9e8a6;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(251, 246, 233, 0.1);
          border: 1px solid rgba(251, 246, 233, 0.22);
          padding: 4px;
          border-radius: 30px;
        }

        .nav-link {
          background: transparent;
          border: none;
          color: #eef2dc;
          font-weight: 500;
          font-size: 0.9rem;
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition-smooth);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-link.active {
          background: #fbf6e9;
          color: #1f4a2c;
          box-shadow: var(--shadow-sm);
        }

        .icon-trend {
          color: #ef4444;
        }

        .icon-sparkle-menu {
          color: #d9e8a6;
        }

        .header-actions {
          display: flex;
          align-items: center;
        }

        .id-badge-container {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(var(--ink-rgb), 0.064);
          border: 1px solid var(--border-color);
          padding: 4px 6px 4px 12px;
          border-radius: 30px;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .id-badge-container:hover {
          background: rgba(var(--ink-rgb), 0.128);
          border-color: var(--text-muted);
        }

        .id-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .id-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(var(--accent-rgb), 0.1);
          border: 1px solid rgba(var(--accent-rgb), 0.2);
          padding: 2px 8px;
          border-radius: 20px;
        }

        .icon-success {
          color: var(--accent-success);
        }

        .id-value {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          font-family: monospace;
        }

        .settings-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .id-badge-container:hover .settings-btn {
          color: var(--accent-primary);
          transform: rotate(30deg);
        }

        @media (max-width: 900px) {
          .header-container {
            flex-wrap: wrap;
            row-gap: 8px;
          }
          .nav-links {
            order: 3;
            width: 100%;
            overflow-x: auto;
            gap: 2px;
            border-radius: 999px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .nav-links::-webkit-scrollbar { display: none; }
          .nav-link {
            white-space: nowrap;
            padding: 8px 14px;
            min-height: 40px;
            font-size: 0.85rem;
          }
          .header.scrolled { padding: 8px 0; }
        }
      `}</style>
    </header>
  );
};
