import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Sparkles, Key, AlertCircle, Copy, Check, FileText, Code, RefreshCw } from 'lucide-react';
import { getAffiliateLink } from '../data/products';

const PR_DISCLOSURE = '本ページはプロモーション（広告）を含みます。';

const formatCheckedDate = () => {
  const d = new Date();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
};

// 簡易Markdown to HTML変換 (簡易パーサー)
const markdownToHtml = (markdown: string) => {
  let htmlConverted = markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^---$/gim, '<hr>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer sponsored">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // 全体を段落で囲み、リストをulで囲む処理
  htmlConverted = `<p>${htmlConverted}</p>`;
  // ブロック要素の直後の改行タグは余白が二重になるので取り除く
  htmlConverted = htmlConverted.replace(/(<\/li>|<\/h[1-3]>|<\/blockquote>|<hr>)<br>/g, '$1');
  htmlConverted = htmlConverted.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
  return htmlConverted;
};

interface ArticleGeneratorProps {
  associateId: string;
}

export const ArticleGenerator: React.FC<ArticleGeneratorProps> = ({ associateId }) => {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('dreamtact_gemini_api_key') || '';
  });
  const [productInput, setProductInput] = useState('');
  const [writingStyle, setWritingStyle] = useState('blog'); // blog, honest, beginner, promotional
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [copiedType, setCopiedType] = useState<'md' | 'html' | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown' | 'html'>('preview');
  const [errorMessage, setErrorMessage] = useState('');

  // APIキーの保存
  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('dreamtact_gemini_api_key', key);
  };

  // デモ用の模擬ブログ生成テキスト
  // 実際に使っていない商品を前提にした「スペック比較・口コミ傾向」形式。数値や口コミは要確認のまま残す
  const generateDemoArticle = (input: string) => {
    const productName = input.includes('http') 
      ? 'Amazon特選 プレミアム・スマートガジェット' 
      : input || 'Lumina Pro 360';
      
    const mockAsin = 'B0CHWX1783';
    const affUrl = getAffiliateLink(mockAsin, associateId);
    const checkedDate = formatCheckedDate();

    const body = `# 「${productName}」はどんな人に向いている？スペック比較と口コミ傾向から分かるメリット・デメリット

> ${PR_DISCLOSURE}

「${productName}」の購入を迷っている方に向けて、公式のスペックとAmazonに寄せられた口コミの傾向から、向いている人・向いていない人を整理しました。
※本記事は実機を使ったレビューではなく、公開情報をもとにした比較・分析です。

---

## 🧐 「${productName}」の基本スペック
価格や評価は変動します。最新の情報は商品ページでご確認ください。

- **価格**: 要確認（${checkedDate}時点の価格を記入）
- **主な特徴**: 要確認（メーカー公式サイトの仕様を記入）
- **Amazonの評価**: 要確認（${checkedDate}時点の星の数とレビュー件数を記入）

---

## 💡 スペックから分かる3つのメリット

### 1️⃣ （例）操作がシンプル
要確認：公式の仕様や説明書から、どこが分かりやすいのかを具体的に書く。

### 2️⃣ （例）デザイン・サイズ
要確認：サイズや重さの数値を添えて書く。

### 3️⃣ （例）同価格帯との比較
要確認：比較する商品名と、違いが出る項目を書く。

---

## ⚠️ 購入前に確認したい2つの注意点

### 🔴 （例）バッテリー持ち
要確認：公式のバッテリー持続時間と、口コミで多い不満の傾向を書く。

### 🔴 （例）初期設定
要確認：アプリ連携の有無や対応機種を書く。

---

## 🗣️ 口コミの傾向
要確認：Amazonのレビューを読み、良い評価と悪い評価で多い意見をそれぞれ要約する。口コミを作ったり、そのまま転載したりしない。

---

## 🎯 まとめ：向いている人・向いていない人

**向いている人**
- 要確認

**向いていない人**
- 要確認

価格やセールの有無は時期によって変わります。最新の情報はAmazonの商品ページでご確認ください。`;

    const cta = `<div class="cta-box" style="text-align: center; margin: 30px 0; padding: 20px; border: 1px solid #d4af37; border-radius: 12px; background: rgba(212,175,55,0.05);">
  <a href="${affUrl}" target="_blank" rel="noopener noreferrer sponsored" style="background: linear-gradient(135deg, #ff9900 0%, #e68a00 100%); color: #000; font-weight: 700; padding: 12px 24px; border-radius: 30px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(255,153,0,0.3);">
    🛒 Amazonで「${productName}」の詳細を見る
  </a>
</div>`;

    return { markdown: `${body}\n\n${cta}`, html: `${markdownToHtml(body)}\n\n${cta}` };
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productInput.trim()) return;

    setIsGenerating(true);
    setErrorMessage('');
    setGeneratedMarkdown('');
    setGeneratedHtml('');

    const styleGuide = {
      blog: '親しみやすく熱心なブロガー風の文体で、初心者に寄り添っておすすめする記事',
      honest: '中立で誠実な専門家風の文体で、良い点だけでなく悪い点も公開情報から検証する比較記事',
      beginner: '難しい用語を使わず、メリットをわかりやすく解説する初心者向けの紹介記事',
      promotional: '購入の決め手になる情報（向いている人、他商品との違い）を前面に出した記事。煽り表現や誇大表現は使わない',
    }[writingStyle];

    // ASINコードを抽出（なければ仮のコード）
    let asin = 'B0CHWX1783';
    const asinMatch = productInput.match(/\/dp\/([A-Z0-9]{10})/i) || productInput.match(/\/gp\/product\/([A-Z0-9]{10})/i);
    if (asinMatch) {
      asin = asinMatch[1];
    }
    const affiliateUrl = getAffiliateLink(asin, associateId);

    // --- 1. 本物のGemini APIを使って生成する場合 ---
    if (apiKey.trim()) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `あなたは誠実さを重視するAmazonアフィリエイトメディアの編集者です。
以下の入力情報に基づいて、読者が購入を判断しやすい商品紹介記事を作成してください。

【入力された商品情報】
${productInput}

【記事のトーン・マナー】
${styleGuide}

【必ず守るルール】
- タイトルの直後に「${PR_DISCLOSURE}」と1行で明記する
- 書き手はこの商品を実際に使っていない。「実機レビュー」「使ってみた」「実際に使って分かった」など、使用したと読める表現は使わない
- 口コミを創作しない。口コミの傾向を書く場合は「要確認：Amazonのレビューを要約」とだけ書く
- 価格・評価・スペックの数値は、入力情報に無ければ「要確認」と書く。価格には「${formatCheckedDate()}時点」と添える
- 「最強」「絶対」「No.1」「最安」など、根拠のない断定表現や誇大表現を使わない
- 美容・健康系の商品では、医薬品のような効能効果をうたわない
- 向いていない人も必ず書く

【アフィリエイトリンク】
記事の最後とおすすめポイントの直後に、以下のリンクを設置してください。
・リンク先URL: ${affiliateUrl}
・アンカーテキスト例: 「Amazonで詳細を見る」

【構成案】
1. 読者の悩みに合ったタイトル（「レビュー」ではなく「比較」「選び方」「向いている人」などの表現）
2. 広告表記（上記の1行）
3. 導入文（読者の悩みへの共感、この記事でわかること、公開情報にもとづく分析であること）
4. 商品の概要・基本スペック（見やすい箇条書き）
5. スペックから分かるメリット（3つ、見出しをつけて解説）
6. 購入前に確認したい注意点（2つ、誠実に解説）
7. 口コミの傾向（要確認）
8. まとめ：向いている人・向いていない人
9. アフィリエイトリンク付きのCTA

【出力フォーマット】
Markdown形式で出力してください。見出しは「#」や「##」を適切に使い、太字やリストを活用して読みやすく整えてください。`;

        const result = await model.generateContent(prompt);
        const rawText = result.response.text();
        // AIが広告表記を落とした場合でも、必ず冒頭に入るようにする
        const responseText = rawText.includes(PR_DISCLOSURE) ? rawText : `> ${PR_DISCLOSURE}\n\n${rawText}`;
        
        setGeneratedMarkdown(responseText);
        setGeneratedHtml(markdownToHtml(responseText));
        setActiveTab('preview');
      } catch (error: any) {
        console.error('Gemini API Error:', error);
        setErrorMessage(`AI生成中にエラーが発生しました: ${error.message || 'APIキーまたは通信環境を確認してください。'}`);
        setIsGenerating(false);
      } finally {
        setIsGenerating(false);
      }
    } 
    // --- 2. デモモード（APIキーなし）の場合 ---
    else {
      // リアルな生成感を演出するタイピングエフェクト
      setTimeout(() => {
        const { markdown, html } = generateDemoArticle(productInput);
        setGeneratedMarkdown(markdown);
        setGeneratedHtml(html);
        setIsGenerating(false);
        setActiveTab('preview');
      }, 2000);
    }
  };

  const handleCopy = (type: 'md' | 'html') => {
    const textToCopy = type === 'md' ? generatedMarkdown : generatedHtml;
    navigator.clipboard.writeText(textToCopy);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="generator-container fade-in">
      <div className="generator-header text-center">
        <h1 className="gradient-gold-text">AIアフィリエイト記事ジェネレーター</h1>
        <p className="subtitle">Amazonの商品URLや商品名から、スペック比較・口コミ傾向にもとづく記事の下書きをAIが作成します</p>
      </div>

      <div className="generator-grid">
        {/* コントロール・入力エリア */}
        <div className="control-panel glass-panel">
          
          {/* APIキー設定エリア */}
          <div className="api-key-section">
            <div className="api-key-header">
              <Key size={16} className="text-gold" />
              <h4>Gemini API キー設定 (任意)</h4>
            </div>
            <p className="api-key-desc">
              APIキーを入力すると、本物のAIがどんな商品でもリアルタイムに執筆します。入力がない場合は、デモ用の記事テンプレート（要確認の項目を埋めて使う形式）を表示します。
            </p>
            <div className="api-input-wrapper">
              <input
                type="password"
                placeholder="AI StudioのAPIキーを入力してください..."
                value={apiKey}
                onChange={(e) => handleSaveKey(e.target.value)}
                className="api-input"
              />
              {apiKey && <span className="key-saved-badge">✓ 設定済</span>}
            </div>
            <div className="key-hint">
              <span>※キーはブラウザにのみ安全に保存されます。</span>
              <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="key-link">
                無料でキーを取得する →
              </a>
            </div>
          </div>

          <hr className="divider" />

          {/* 生成フォーム */}
          <form onSubmit={handleGenerate} className="generate-form">
            <div className="form-group">
              <label htmlFor="productInput">Amazonの商品URL、または商品名</label>
              <textarea
                id="productInput"
                placeholder="例: https://www.amazon.co.jp/dp/B0CHWX1783&#13;または「Boseノイズキャンセリングヘッドホン」など"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                className="textarea-input"
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label>執筆スタイル</label>
              <div className="style-options">
                {[
                  { id: 'blog', label: '親しみやすいブログ風' },
                  { id: 'honest', label: '中立・辛口比較' },
                  { id: 'beginner', label: '初心者向けやさしい解説' },
                  { id: 'promotional', label: 'セールス特化 (CVR重視)' }
                ].map((style) => (
                  <label key={style.id} className={`style-radio-label ${writingStyle === style.id ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="writingStyle"
                      value={style.id}
                      checked={writingStyle === style.id}
                      onChange={() => setWritingStyle(style.id)}
                      className="radio-input"
                    />
                    {style.label}
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn-amazon btn-generate ${isGenerating ? 'loading' : ''}`}
              disabled={isGenerating || !productInput.trim()}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="spin" size={18} />
                  AI記事を執筆中...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  アフィリエイト記事を自動生成する
                </>
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="error-box">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* プレビュー・出力エリア */}
        <div className="output-panel glass-panel">
          {generatedMarkdown ? (
            <div className="output-wrapper">
              <div className="output-header">
                <div className="tab-buttons">
                  <button 
                    className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('preview')}
                  >
                    <FileText size={14} />
                    プレビュー
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'markdown' ? 'active' : ''}`}
                    onClick={() => setActiveTab('markdown')}
                  >
                    Markdown
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
                    onClick={() => setActiveTab('html')}
                  >
                    <Code size={14} />
                    HTMLコード
                  </button>
                </div>

                <div className="copy-buttons">
                  {activeTab !== 'preview' && (
                    <button 
                      className="btn-outline btn-copy"
                      onClick={() => handleCopy(activeTab === 'markdown' ? 'md' : 'html')}
                    >
                      {copiedType === (activeTab === 'markdown' ? 'md' : 'html') ? (
                        <>
                          <Check size={14} className="text-success" />
                          コピー完了！
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          コードをコピー
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="output-body">
                {activeTab === 'preview' && (
                  <div 
                    className="article-preview-html" 
                    dangerouslySetInnerHTML={{ __html: generatedHtml }} 
                  />
                )}
                {activeTab === 'markdown' && (
                  <pre className="code-pre">
                    <code>{generatedMarkdown}</code>
                  </pre>
                )}
                {activeTab === 'html' && (
                  <pre className="code-pre">
                    <code>{generatedHtml}</code>
                  </pre>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-output text-center">
              <Sparkles size={48} className="icon-sparkle-placeholder" />
              <h3>AIブログ執筆エリア</h3>
              <p>左側のフォームにAmazon商品URLや商品名を入力し、生成ボタンをクリックしてください。ここに自動で記事が生成されます。</p>
              {!apiKey && (
                <div className="demo-notice">
                  <span>現在は「デモ体験モード」になっています。APIキーを入力しなくても、魅力的な記事執筆のアニメーションをお試しいただけます！</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .generator-container {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .generator-header h1 {
          font-size: 2.2rem;
          margin-bottom: 12px;
        }

        .generator-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .generator-grid {
            grid-template-columns: 1fr;
          }
        }

        .control-panel, .output-panel {
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          min-height: 520px;
        }

        /* APIキーセクション */
        .api-key-section {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .api-key-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .api-key-header h4 {
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .api-key-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .api-input-wrapper {
          display: flex;
          gap: 8px;
          position: relative;
          align-items: center;
        }

        .api-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 0.8rem;
          color: var(--text-primary);
          font-family: monospace;
          transition: var(--transition-fast);
        }

        .api-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        .key-saved-badge {
          position: absolute;
          right: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent-success);
          background: rgba(16, 185, 129, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .key-hint {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .key-link {
          color: var(--accent-primary);
          font-weight: 600;
          text-decoration: none;
        }

        .key-link:hover {
          color: var(--accent-primary-hover);
        }

        .divider {
          border: none;
          border-top: 1px solid var(--border-color);
          margin: 20px 0;
        }

        /* フォーム */
        .generate-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .textarea-input {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
          transition: var(--transition-fast);
        }

        .textarea-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.15);
        }

        .style-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .style-radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .style-radio-label:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .style-radio-label.active {
          border-color: var(--accent-primary);
          background: rgba(212, 175, 55, 0.05);
          color: var(--accent-primary);
          font-weight: 600;
        }

        .radio-input {
          display: none;
        }

        .btn-generate {
          width: 100%;
          padding: 12px;
          border-radius: 30px;
          font-size: 0.95rem;
          margin-top: 8px;
        }

        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          margin-top: 16px;
        }

        /* プレビュー出力エリア */
        .empty-output {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 470px;
          gap: 16px;
          padding: 40px 20px;
          border: 1px dashed var(--border-color);
          border-radius: 12px;
        }

        .icon-sparkle-placeholder {
          color: var(--text-muted);
          animation: pulse 3s infinite;
        }

        .empty-output h3 {
          font-size: 1.2rem;
          color: var(--text-primary);
        }

        .empty-output p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          max-width: 320px;
          line-height: 1.5;
        }

        .demo-notice {
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 8px;
          padding: 12px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          max-width: 360px;
          line-height: 1.4;
          margin-top: 10px;
        }

        /* 出力ラッパー */
        .output-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 16px;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .tab-buttons {
          display: flex;
          gap: 6px;
        }

        .tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition-fast);
        }

        .tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.03);
        }

        .tab-btn.active {
          color: var(--accent-primary);
          background: rgba(212, 175, 55, 0.1);
        }

        .btn-copy {
          padding: 6px 12px;
          font-size: 0.75rem;
          border-radius: 6px;
        }

        .text-success {
          color: var(--accent-success);
        }

        .output-body {
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          max-height: 600px;
          overflow-y: auto;
          text-align: left;
        }

        .code-pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
          font-family: monospace;
          font-size: 0.8rem;
          color: var(--text-primary);
        }

        /* プレビュー記事表示のHTML装飾 */
        .article-preview-html h1 {
          font-size: 1.5rem;
          margin-bottom: 16px;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .article-preview-html h2 {
          font-size: 1.2rem;
          margin: 24px 0 12px;
          border-left: 3px solid var(--accent-primary);
          padding-left: 8px;
          color: var(--text-primary);
        }

        .article-preview-html h3 {
          font-size: 1.05rem;
          margin: 18px 0 8px;
          color: var(--text-primary);
        }

        .article-preview-html p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .article-preview-html ul {
          margin-left: 20px;
          margin-bottom: 16px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .article-preview-html li {
          margin-bottom: 6px;
        }

        .article-preview-html blockquote {
          border-left: 4px solid var(--border-color);
          padding-left: 14px;
          margin: 16px 0;
          font-style: italic;
          color: var(--text-muted);
        }

        .article-preview-html hr {
          border: none;
          border-top: 1px solid var(--border-color);
          margin: 20px 0;
        }

        .spin {
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};
