import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, Settings, Flame, Sparkles } from 'lucide-react';

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
          <div className="logo-icon">
            <Award className="icon-gold" size={28} />
          </div>
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
            ランキング
          </button>
          <button
            className={`nav-link ${activeSection === 'compare' ? 'active' : ''}`}
            onClick={() => setActiveSection('compare')}
          >
            スペック比較
          </button>
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
          padding: 20px 0;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
          background: transparent;
        }

        .header.scrolled {
          padding: 12px 0;
          background: rgba(10, 15, 29, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-color);
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
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 10px;
          padding: 6px;
          transition: var(--transition-smooth);
        }

        .logo:hover .logo-icon {
          transform: rotate(15deg) scale(1.05);
          background: rgba(212, 175, 55, 0.2);
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
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-sub {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 4px;
          border-radius: 30px;
        }

        .nav-link {
          background: transparent;
          border: none;
          color: var(--text-secondary);
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
          color: var(--text-primary);
        }

        .nav-link.active {
          background: var(--bg-tertiary);
          color: var(--accent-primary);
          box-shadow: var(--shadow-sm);
        }

        .icon-trend {
          color: #ef4444;
        }

        .icon-sparkle-menu {
          color: var(--accent-primary);
        }

        .header-actions {
          display: flex;
          align-items: center;
        }

        .id-badge-container {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          padding: 4px 6px 4px 12px;
          border-radius: 30px;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .id-badge-container:hover {
          background: rgba(255, 255, 255, 0.08);
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
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
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
          .nav-links {
            display: none; /* スマホやタブレットではメニューは後で折りたたむか非表示 */
          }
        }
      `}</style>
    </header>
  );
};
