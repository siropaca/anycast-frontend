# Anycast Frontend

AI 専用のポッドキャストを作成・配信できるプラットフォーム「Anycast」のフロントエンドアプリケーションです。

## バックエンド

- https://github.com/siropaca/anycast-backend

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js (App Router + Turbopack)
- **UI ライブラリ**: React
- **UI コンポーネント**: Base UI
- **アイコン**: React Icons
- **スタイリング**: Tailwind CSS
- **認証**: Auth.js (next-auth)
- **データフェッチ**: TanStack Query
- **状態管理**: Zustand
- **API クライアント生成**: orval
- **フォーム**: react-hook-form + Zod
- **コンポーネントカタログ**: Storybook
- **テスト**: Vitest + Playwright
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
| `pnpm storybook` | Storybook を起動 |
| `pnpm build-storybook` | Storybook のビルド |
| `pnpm test` | テストを実行 |
| `pnpm test:watch` | テストをウォッチモードで実行 |
| `pnpm gen:api` | OpenAPI 定義から API クライアントを生成 |
| `pnpm ncu` | 依存パッケージの更新確認 |
| `pnpm sort-package-json` | package.json のソート |

## ディレクトリ構成

```
.
├── .storybook/       # Storybook 設定
├── src/
│   ├── app/          # Next.js App Router
│   │   ├── (auth)/   # 認証ページ（ログイン、新規登録）
│   │   ├── (main)/   # 公開ページ
│   │   ├── (settings)/ # 設定ページ（認証必須）
│   │   └── (studio)/ # Studio ページ（認証必須）
│   ├── components/   # 共通コンポーネント
│   ├── config/       # 設定ファイル
│   ├── features/     # 機能ごとのモジュール
│   │   └── app/
│   │       ├── layouts/  # レイアウトコンポーネント
│   │       ├── providers/ # プロバイダー
│   │       └── ui/       # UI コンポーネント
│   ├── hooks/        # カスタムフック
│   ├── libs/         # 機能別ライブラリ（auth, api, paths など）
│   ├── stores/       # Zustand ストア
│   ├── types/        # 型定義
│   ├── utils/        # 汎用ユーティリティ
│   └── middleware.ts # 認証ガード
├── public/           # 静的ファイル
├── docs/
│   └── adr/          # Architecture Decision Records
├── .env.example      # 環境変数のサンプル
├── .mise.toml        # mise 設定
├── biome.json        # Biome 設定
├── openapi.json      # OpenAPI 定義（バックエンドから取得）
├── orval.config.ts   # orval 設定
├── package.json
├── README.md
└── CLAUDE.md
```
