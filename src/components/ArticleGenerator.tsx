import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Sparkles, Key, AlertCircle, Copy, Check, FileText, Code, RefreshCw } from 'lucide-react';
import { getAffiliateLink } from '../data/products';

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
  const generateDemoArticle = (input: string) => {
    const productName = input.includes('http') 
      ? 'Amazon特選 プレミアム・スマートガジェット' 
      : input || 'Lumina Pro 360';
      
    const mockAsin = 'B0CHWX1783';
    const affUrl = getAffiliateLink(mockAsin, associateId);

    const markdown = `# 【実機レビュー】QOLが劇的に向上する「${productName}」を使って分かった本音のメリット・デメリット

日常生活をより快適に、そしてスマートにアップデートしたいと考えたことはありませんか？
今回は、Amazonで今売れに売れている大注目アイテム**「${productName}」**を徹底レビューします！

「本当に買う価値はあるの？」「安いだけの偽物じゃない？」といった疑問に、実際に使ってみた感想を交えながらメリット・デメリットを忖度なしで紹介します。

---

## 🧐 「${productName}」の基本スペック
まずはこの商品の基本仕様をチェックしておきましょう。

- **価格**: ￥24,800（参考価格）
- **特徴**: 最先端のインテリジェント制御機能、超軽量・スリム設計
- **総合評価**: ★★★★☆ (4.7 / 5.0)

---

## 💖 実際に使って分かった3つのメリット

### 1️⃣ 圧倒的な使いやすさと時短効果
設定から日常での使用まで、とにかく操作がシンプルで直感的に使えます。これまでの作業時間がほぼ半分になり、暮らしにゆとりが生まれました。

### 2️⃣ 所有欲を満たすプレミアムな高級感
チタン合金のような美しい外装と、すっきりしたミニマルなデザインは、置いているだけでインテリアとしても機能します。

### 3️⃣ 同価格帯を圧倒する高コスパ
「このクオリティなら倍の値段がしてもおかしくない」と思えるほど、機能が充実しています。Amazonで売れている理由がよく分かります。

---

## ⚠️ 購入前に知っておくべき2つのデメリット

### 🔴 バッテリー充電の頻度
多機能なため、フル稼働させるとバッテリーの消費がやや早く感じます。こまめな給電、またはスマートな運用設定が必要です。

### 🔴 初期設定時のアプリ同期
スマホアプリとの連携が必要ですが、最初の同期で数回エラーが出ることがありました。一度繋がってしまえば、その後は極めて安定しています。

---

## 🗣️ 購入者のリアルな口コミ・評判

> **「生活がガラリと変わりました！」** （30代・男性）
> 半信半疑で購入しましたが、今では毎日の生活に欠かせない相棒です。もっと早く買えばよかった。

> **「デザインと質感が素晴らしい」** （20代・女性）
> メタル部分の高級感が特に気に入っています。プレゼントとしても喜ばれそうなクオリティです。

---

## 🎯 まとめ：どんな人におすすめ？

- 毎日を少しでも便利に、スマートに変えたい人
- コストパフォーマンスに優れた実用的なガジェットを探している人
- 大切な人へのセンスの良いギフトを探している人

「${productName}」は、間違いなくあなたの生活の質（QOL）を引き上げてくれる投資価値のあるプロダクトです。

Amazonアソシエイトにも対応しており、現在割引セールが行われていることも多いため、気になる方はぜひお早めにチェックしてみてください！

<div class="cta-box" style="text-align: center; margin: 30px 0; padding: 20px; border: 1px solid #d4af37; border-radius: 12px; background: rgba(212,175,55,0.05);">
  <p style="margin-bottom: 12px; font-weight: bold;">お得なAmazonセール会場はこちら</p>
  <a href="${affUrl}" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #ff9900 0%, #e68a00 100%); color: #000; font-weight: 700; padding: 12px 24px; border-radius: 30px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(255,153,0,0.3);">
    🛒 Amazonで「${productName}」の最新価格を見る
  </a>
</div>`;

    const html = `<h1>【実機レビュー】QOLが劇的に向上する「${productName}」を使って分かった本音のメリット・デメリット</h1>
<p>日常生活をより快適に、そしてスマートにアップデートしたいと考えたことはありませんか？<br>
今回は、Amazonで今売れに売れている大注目アイテム<strong>「${productName}」</strong>を徹底レビューします！</p>
<p>「本当に買う価値はあるの？」「安いだけの偽物じゃない？」といった疑問に、実際に使ってみた感想を交えながらメリット・デメリットを忖度なしで紹介します。</p>

<hr>

<h2>🧐 「${productName}」の基本スペック</h2>
<p>まずはこの商品の基本仕様をチェックしておきましょう。</p>
<ul>
  <li><strong>価格</strong>: ￥24,800（参考価格）</li>
  <li><strong>特徴</strong>: 最先端のインテリジェント制御機能、超軽量・スリム設計</li>
  <li><strong>総合評価</strong>: ★★★★☆ (4.7 / 5.0)</li>
</ul>

<hr>

<h2>💖 実際に使って分かった3つのメリット</h2>
<h3>1️⃣ 圧倒的な使いやすさと時短効果</h3>
<p>設定から日常での使用まで、とにかく操作がシンプルで直感的に使えます。これまでの作業時間がほぼ半分になり、暮らしにゆとりが生まれました。</p>
<h3>2️⃣ 所有欲を満たすプレミアムな高級感</h3>
<p>チタン合金のような美しい外装と、すっきりしたミニマルなデザインは、置いているだけでインテリアとしても機能します。</p>
<h3>3️⃣ 同価格帯を圧倒する高コスパ</h3>
<p>「このクオリティなら倍の値段がしてもおかしくない」と思えるほど、機能が充実しています。Amazonで売れている理由がよく分かります。</p>

<hr>

<h2>⚠️ 購入前に知っておくべき2つのデメリット</h2>
<h3>🔴 バッテリー充電の頻度</h3>
<p>多機能なため、フル稼働させるとバッテリーの消費がやや早く感じます。こまめな給電、またはスマートな運用設定が必要です。</p>
<h3>🔴 初期設定時のアプリ同期</h3>
<p>スマホアプリとの連携が必要ですが、最初の同期で数回エラーが出ることがありました。一度繋がってしまえば、その後は極めて安定しています。</p>

<hr>

<h2>🗣️ 購入者のリアルな口コミ・評判</h2>
<blockquote>
  <p><strong>「生活がガラリと変わりました！」</strong> （30代・男性）<br>
  半信半疑で購入しましたが、今では毎日の生活に欠かせない相棒です。もっと早く買えばよかった。</p>
</blockquote>
<blockquote>
  <p><strong>「デザインと質感が素晴らしい」</strong> （20代・女性）<br>
  メタル部分の高級感が特に気に入っています。プレゼントとしても喜ばれそうなクオリティです。</p>
</blockquote>

<hr>

<h2>🎯 まとめ：どんな人におすすめ？</h2>
<ul>
  <li>毎日を少しでも便利に、スマートに変えたい人</li>
  <li>コストパフォーマンスに優れた実用的なガジェットを探している人</li>
  <li>大切な人へのセンスの良いギフトを探している人</li>
</ul>
<p>「${productName}」は、間違いなくあなたの生活の質（QOL）を引き上げてくれる投資価値のあるプロダクトです。</p>
<p>Amazonアソシエイトにも対応しており、現在割引セールが行われていることも多いため、気になる方はぜひお早めにチェックしてみてください！</p>

<div class="cta-box" style="text-align: center; margin: 30px 0; padding: 20px; border: 1px solid #d4af37; border-radius: 12px; background: rgba(212,175,55,0.05);">
  <p style="margin-bottom: 12px; font-weight: bold;">お得なAmazonセール会場はこちら</p>
  <a href="${affUrl}" target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #ff9900 0%, #e68a00 100%); color: #000; font-weight: 700; padding: 12px 24px; border-radius: 30px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(255,153,0,0.3);">
    🛒 Amazonで「${productName}」の最新価格を見る
  </a>
</div>`;

    return { markdown, html };
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
      honest: '中立で誠実な専門家風の文体で、良い点だけでなく悪い点も徹底検証する本音レビュー記事',
      beginner: '難しい用語を使わず、メリットをわかりやすく解説する初心者向けの紹介記事',
      promotional: 'コンバージョン率（購入率）を重視し、今すぐ購入したくなるような魅力的なコピーを多用したセールスレター風記事',
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

        const prompt = `あなたはトップクラスのAmazonアフィリエイターです。
以下の入力情報に基づいて、読者が「欲しい！」と思えるような魅力的な商品紹介ブログ記事を作成してください。

【入力された商品情報】
${productInput}

【記事のトーン・マナー】
${styleGuide}

【アフィリエイトリンク】
必ず記事の最後やおすすめポイントの直後など、要所に以下のアフィリエイトリンクを設置してください。
・リンク先URL: ${affiliateUrl}
・アンカーテキスト（リンクの文字）例: 「Amazonで詳細と最新価格をチェックする」

【構成案】
1. 読者の目を引く魅力的なタイトル
2. 導入文（読者の悩みへの共感、この記事でわかること）
3. 商品の概要・基本スペック（見やすい箇条書き）
4. 実際に使ってわかったメリット（3つ、見出しをつけて詳しく解説）
5. 購入前に知っておくべきデメリット（2つ、誠実に解説することで信頼性を高める）
6. ユーザーの代表的な口コミ（2件、リアルなトーンで）
7. まとめとターゲット層（どんな人におすすめか）
8. アフィリエイトリンク付きのCTA（購入誘導エリア）

【出力フォーマット】
Markdown形式で出力してください。見出しは「#」や「##」を適切に使い、太字やリストを活用して読みやすく整えてください。`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        setGeneratedMarkdown(responseText);
        
        // 簡易Markdown to HTML変換 (簡易パーサー)
        let htmlConverted = responseText
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^\* (.*$)/gim, '<li>$1</li>')
          .replace(/^- (.*$)/gim, '<li>$1</li>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
          .replace(/\n\n/g, '</p><p>')
          .replace(/\n/g, '<br>');
        
        // 全体を段落で囲み、リストをulで囲む処理
        htmlConverted = `<p>${htmlConverted}</p>`;
        htmlConverted = htmlConverted.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
        setGeneratedHtml(htmlConverted);
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
        <p className="subtitle">Amazonの商品URLや商品名から、高成約率のブログレビュー記事をAIが自動で執筆します</p>
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
              APIキーを入力すると、本物のAIがどんな商品でもリアルタイムに執筆します。入力がない場合は、デモモードで超リアルな執筆体験が動きます。
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
                  { id: 'honest', label: '辛口・本音レビュー' },
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
