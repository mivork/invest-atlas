# Invest Atlas

投資初心者のための日本語投資教育サイトです。GitHub Pagesで静的にホスティングされます。

## 概要

Invest Atlasは、投資に関する基礎知識を体系的に学べる教育サイトです。特定の金融商品の推奨や投資助言は行いません。

## 技術構成

- 静的HTML / CSS / Vanilla JavaScript
- ビルドステップなし、フレームワークなし、CDN依存なし
- GitHub Pages でのホスティングを想定
- PC向けレイアウト（3カラム構成）

## ファイル構成

invest-atlas/
├── index.html # トップページ
├── guide.html # 学習ガイド
├── basics.html # 01 投資の基本
├── listing.html # 02 上場とIPO
├── index-investing.html # 03 指数と投資信託
├── orukan.html # 04 オルカンとは
├── sp500.html # 05 S&P 500とは
├── compare.html # 06 オルカン vs S&P 500
├── nisa.html # 07 新しいNISA
├── products.html # 08 金融商品を知る
├── individual-stocks.html # 09 個別株投資
├── risk.html # 10 リスクと分散
├── costs-taxes.html # 11 コストと税金
├── advanced.html # 12 上級編
├── simulator.html # 複利シミュレーター
├── glossary.html # 用語集（30語以上）
├── sources.html # 出典・免責事項
├── 404.html # 404ページ
├── .nojekyll # GitHub Pages用
├── css/
│ ├── style.css # エントリポイント（@import）
│ ├── tokens.css # デザイントークン
│ ├── reset.css # リセット
│ ├── base.css # ベーススタイル
│ ├── layout.css # レイアウト
│ ├── components.css # コンポーネント
│ └── pages.css # ページ固有スタイル
└── js/
├── main.js # 共通機能（アコーディオン、TOC等）
├── simulator.js # 複利計算・Canvas描画
├── quiz.js # 理解度チェック
├── glossary.js # 用語検索・絞り込み
└── progress.js # 読了チェック・進捗バー



## 設計方針

### アクセシビリティ

- WCAG 2.2 AA準拠
- セマンティックHTML（header / nav / main / aside / footer / article / section）
- キーボード操作対応（visible focus: 暗色アウトライン + 黄色リング）
- スキップリンク
- ARIA属性（aria-label, aria-expanded, aria-controls, role）

### CSS設計

- BEM命名規則
- CSSカスタムプロパティ（デザイントークン）
- CSS論理プロパティ（inline / block）
- rem単位
- インラインスタイル禁止

### JavaScript

- Vanilla JS（フレームワーク不使用）
- 全ファイルIIFE + "use strict"
- defer属性で読み込み
- インラインスクリプト禁止

### 正確性ガードレール

- 個別ファンドの信託報酬率・純資産総額・設定日・リターン実績は記載しない
- 税率は「約20%」とのみ記載（精密な数字を避ける）
- 仮定に基づく試算には「仮定・試算」ラベルを明記
- 投資助言と誤解されうる表現（買うべき / 絶対儲かる / 今が買い時 / 一択）を使用しない
- 将来の制度変更は「将来の変更」として明記
- NISAの情報源は金融庁、最終確認日を明記

## デプロイ

1. リポジトリのルートに `.nojekyll` ファイルを配置
2. GitHub Pages の設定でソースブランチを指定
3. 外部依存なしのため、そのまま配信可能

## ライセンス

教育目的の非営利プロジェクトです。引用する場合は出典を明記してください。

以上で全7バッチの出力が完了しました。.nojekyll ファイルは空ファイルですので、リポジトリのルートに空の .nojekyll を作成してください。

全体の構成は以下のとおりです。

CSS 7ファイル（tokens / reset / base / layout / components / pages / style）
JS 5ファイル（main / simulator / quiz / glossary / progress）
HTML 17ファイル（index / guide / 学習12ページ / simulator / glossary / sources / 404）
README.md 1ファイル
.nojekyll 1ファイル（空）
