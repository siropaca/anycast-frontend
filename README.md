# Anycast Frontend

AI 専用のポッドキャストを作成・配信できるプラットフォーム「Anycast」のフロントエンドアプリケーションです。

## バックエンド

- https://github.com/siropaca/anycast-backend

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js (App Router + Turbopack)
- **UI ライブラリ**: React
- **スタイリング**: Tailwind CSS
- **認証**: Auth.js (next-auth)
- **データフェッチ**: TanStack Query
- **フォーム**: react-hook-form + Zod
- **リンター/フォーマッター**: Biome
- **パッケージマネージャー**: pnpm
- **バージョン管理**: mise
- **デプロイ**: Vercel
- **API**: REST API

## セットアップ

### 前提条件

- [mise](https://mise.jdx.dev/) がインストールされていること

### インストール

```bash
# Node.js バージョンの設定 (mise)
mise trust && mise install

# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env

# 開発サーバーの起動
pnpm dev
```

## コマンド一覧

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | 開発サーバーを起動（Turbopack） |
| `pnpm build` | プロダクションビルド |
| `pnpm start` | プロダクションサーバーを起動 |
| `pnpm lint` | Biome によるリント |
| `pnpm format` | Biome によるフォーマット |
| `pnpm check` | Biome によるリント + フォーマット |
| `pnpm ncu` | 依存パッケージの更新確認 |
| `pnpm sort-package-json` | package.json のソート |

## ディレクトリ構成

```
.
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # 共通コンポーネント
│   ├── config/       # 設定ファイル
│   ├── features/     # 機能ごとのモジュール
│   ├── hooks/        # カスタムフック
│   ├── libs/         # 機能別ライブラリ（auth, api, paths など）
│   ├── types/        # 型定義
│   └── utils/        # 汎用ユーティリティ
├── public/           # 静的ファイル
├── docs/
│   └── adr/          # Architecture Decision Records
├── .env.example      # 環境変数のサンプル
├── .mise.toml        # mise 設定
├── biome.json        # Biome 設定
├── package.json
├── README.md
└── CLAUDE.md
```
