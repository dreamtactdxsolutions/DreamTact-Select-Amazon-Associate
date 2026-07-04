import React, { useState } from 'react';
import { X, Save, Info, RefreshCw } from 'lucide-react';

interface AssociateConfigProps {
  isOpen: boolean;
  onClose: () => void;
  currentId: string;
  onSave: (newId: string) => void;
}

export const AssociateConfig: React.FC<AssociateConfigProps> = ({
  isOpen,
  onClose,
  currentId,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState(currentId);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsSaving(true);
    // 保存シミュレーション（プレミアム感を高めるマイクロウェイト）
    setTimeout(() => {
      onSave(inputValue.trim());
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  const handleReset = () => {
    setInputValue('dreamtactaffi-22');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="gradient-gold-text">アソシエイト設定</h2>
          <button className="close-btn" onClick={onClose} aria-label="閉じる">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <p className="description">
            現在、サイト内のすべての商品リンクは、設定されたAmazonアソシエイトID（トラッキングID）に動的に書き換えられています。
          </p>

          <div className="input-group">
            <label htmlFor="associateId">AmazonアソシエイトID (ストアID)</label>
            <div className="input-wrapper">
              <input
                id="associateId"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="example-22"
                disabled={isSaving || saveSuccess}
                className="text-input"
              />
              <button 
                type="button" 
                className="reset-btn" 
                onClick={handleReset} 
                title="デフォルトにリセット"
                disabled={isSaving || saveSuccess}
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          <div className="info-box">
            <Info size={16} className="info-icon" />
            <span>
              日本のAmazonで使用可能なIDを入力してください。IDを変更すると、本サイトの「Amazonで詳細を見る」リンクが即時に書き換わります。
            </span>
          </div>

          <div className="preview-box">
            <span className="preview-title">生成されるアフィリエイトリンクのプレビュー</span>
            <code className="preview-code">
              {`https://www.amazon.co.jp/dp/ASIN/?tag=`}
              <span className="highlight-tag">{inputValue || '未入力'}</span>
            </code>
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="btn-outline" 
              onClick={onClose} 
              disabled={isSaving || saveSuccess}
            >
              キャンセル
            </button>
            <button 
              type="submit" 
              className={`btn-save ${saveSuccess ? 'success' : ''}`}
              disabled={isSaving || !inputValue.trim()}
            >
              {isSaving ? (
                <>
                  <RefreshCw size={16} className="spin" />
                  保存中...
                </>
              ) : saveSuccess ? (
                '適用完了！'
              ) : (
                <>
                  <Save size={16} />
                  設定を適用する
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(4, 6, 12, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 500px;
          padding: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), var(--shadow-gold);
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .modal-header h2 {
          font-size: 1.4rem;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
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

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .text-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px 40px 12px 14px;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: monospace;
          transition: var(--transition-fast);
        }

        .text-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.15);
        }

        .reset-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .reset-btn:hover {
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
        }

        .info-box {
          display: flex;
          gap: 10px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .info-icon {
          color: var(--accent-secondary);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .preview-box {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          padding: 12px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .preview-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .preview-code {
          font-size: 0.75rem;
          color: var(--text-secondary);
          word-break: break-all;
          line-height: 1.4;
          font-family: monospace;
        }

        .highlight-tag {
          color: var(--accent-primary);
          font-weight: 700;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }

        .btn-save {
          background: var(--accent-primary);
          color: #000;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-sm);
        }

        .btn-save:hover:not(:disabled) {
          background: var(--accent-primary-hover);
          transform: translateY(-1px);
        }

        .btn-save:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-save.success {
          background: var(--accent-success);
          color: #fff;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
