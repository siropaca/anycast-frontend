# Anycast Frontend

AI 音声生成専門のポッドキャストプラットフォーム「Anycast」のフロントエンドアプリケーション。

## 必要条件

- Node.js 22.x (LTS) - [mise](https://mise.jdx.dev/) で管理
- pnpm

## 概要

Anycast は、AI を活用して台本から音声を生成し、ポッドキャストを作成・配信できるプラットフォームです。

## 機能

### 現在開発中

- **音声生成エディタ**: 台本から音声を生成・調整するエディタ画面

### 予定機能

- エピソードの管理
- 台本の作成
- 他のポッドキャストプラットフォームへの配信 (Spotify, Apple Podcasts)
- ポッドキャストプラットフォーム機能
- ポッドキャストへの投稿

## 技術スタック

### 導入済み

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| フレームワーク | Next.js (App Router + Turbopack) | 16.0.10 |
| UI ライブラリ | React | 19.2.1 |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 4.x |
| リンター/フォーマッター | Biome | 2.3.x |
| パッケージマネージャー | pnpm | 10.x |
| ランタイム管理 | mise | - |

### 導入予定

| カテゴリ | 技術 |
|---------|------|
| 認証 | NextAuth.js |
| データフェッチング | TanStack Query |
| UI コンポーネント | Base UI |
| デプロイ | Vercel |

## セットアップ

```bash
# Node.js バージョンの設定 (mise)
mise trust && mise install

# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env.local

# 開発サーバーの起動
pnpm dev
```

## スクリプト

```bash
pnpm dev      # 開発サーバー起動 (Turbopack)
pnpm build    # プロダクションビルド
pnpm start    # プロダクションサーバー起動
pnpm lint     # Biome によるリント
pnpm format   # Biome によるフォーマット
pnpm check    # Biome によるリント + フォーマット
```

## バックエンド連携

バックエンドは [anycast-backend](https://github.com/siropaca/anycast-backend) で管理しています。

### API エンドポイント（予定）

- 台本生成 API
- 音声生成 API

> 現在バックエンドは開発中のため、フロントエンドはモックデータで動作します。

## ディレクトリ構成

```
src/
├── app/          # Next.js App Router
├── components/   # 共通コンポーネント
├── features/     # 機能ごとのモジュール
├── hooks/        # カスタムフック
├── lib/          # ユーティリティ
├── mocks/        # モックデータ
└── types/        # 型定義
```

## ブランチ戦略

GitHub Flow を採用しています。

- `main`: 本番環境にデプロイされるブランチ
- 機能開発は `main` から feature ブランチを作成し、PR でマージ

## ライセンス

Private
