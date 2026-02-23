# Anycast Frontend

AIポッドキャスト作成・配信プラットフォーム「Anycast」のフロントエンドアプリケーションです。

## 関連リポジトリ

- [anycast-backend](https://github.com/siropaca/anycast-backend) - バックエンド API
- [anycast-mcp-server](https://github.com/siropaca/anycast-mcp-server) - MCP Server

## MCP Server

[anycast-mcp-server](https://www.npmjs.com/package/anycast-mcp-server) は、anycast-backend の REST API をラップする MCP（Model Context Protocol）Server です。Claude Code などの MCP クライアントからチャンネルやエピソードの作成・管理が行えます。

### セットアップ

Node.js 22 以上が必要です。`.claude/settings.json` に以下を追加してください。

```json
{
  "mcpServers": {
    "anycast": {
      "command": "npx",
      "args": ["-y", "anycast-mcp-server"],
      "env": {
        "ANYCAST_API_KEY": "ak_...",
        "ANYCAST_BASE_URL": "https://api.anycast.audio"
      }
    }
  }
}
```

### 利用可能なツール

| カテゴリ | ツール |
|----------|--------|
| チャンネル | `list_channels`, `get_channel`, `create_channel`, `update_channel`, `publish_channel` |
| エピソード | `list_episodes`, `get_episode`, `create_episode`, `update_episode`, `publish_episode` |
| 台本 | `generate_script`, `get_script_job`, `list_script_lines` |
| その他 | `list_categories`, `list_voices`, `list_characters` |

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js (App Router + Turbopack)
- **UI ライブラリ**: React
- **UI コンポーネント**: Base UI
- **アイコン**: [Phosphor Icons](https://phosphoricons.com/)
- **スタイリング**: Tailwind CSS
- **認証**: Auth.js (next-auth)
- **データフェッチ**: TanStack Query
- **状態管理**: Zustand
- **API クライアント生成**: orval
- **フォーム**: react-hook-form + Zod
- **コンポーネントカタログ**: Storybook
- **テスト**: Vitest + Testing Library + Playwright
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
# プロジェクトのセットアップ（mise install, pnpm install, .env コピー）
mise trust && mise run bootstrap

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
| `pnpm check` | Biome によるチェック（リント + フォーマット） |
| `pnpm check:fix` | Biome によるチェック + 自動修正 |
| `pnpm typecheck` | TypeScript の型チェック |
| `pnpm storybook` | Storybook を起動 |
| `pnpm build-storybook` | Storybook のビルド |
| `pnpm test` | テストを実行 |
| `pnpm test:watch` | テストをウォッチモードで実行 |
| `pnpm gen:api` | OpenAPI 定義から API クライアントを生成 |
| `pnpm knip` | 未使用コード・依存関係の検出 |
| `pnpm ncu` | 依存パッケージの更新確認 |
| `pnpm sort-package-json` | package.json のソート |
| `pnpm clean` | node_modules と dist を削除 |

## ディレクトリ構成

```
.
├── .storybook/          # Storybook 設定
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (auth)/      #   認証ページ（ログイン、新規登録）
│   │   ├── (main)/      #   公開ページ
│   │   ├── (settings)/  #   設定ページ（認証必須）
│   │   └── (studio)/    #   Studio ページ（認証必須）
│   ├── components/      # 共通コンポーネント
│   │   ├── dataDisplay/ #   データ表示（Avatar, Badge, DataTable, Tag, Tooltip, artworks）
│   │   ├── feedback/    #   フィードバック（Toast, Skeleton）
│   │   ├── inputs/      #   入力（Input, Textarea, Select, Checkbox, buttons）
│   │   ├── navigation/  #   ナビゲーション（Header, SideMenu, Sidebar, Pagination）
│   │   ├── surface/     #   サーフェス（ContentSection）
│   │   └── utils/       #   汎用 UI（Dialog, Modal, Drawer）
│   ├── constants/       # 定数ファイル
│   ├── features/        # 機能ごとのモジュール
│   │   ├── app/         #   アプリ基盤（レイアウト、プロバイダー）
│   │   ├── auth/        #   認証
│   │   ├── channels/    #   チャンネル詳細（公開側）
│   │   ├── episodes/    #   エピソード詳細（公開側）
│   │   ├── explore/     #   探索
│   │   ├── home/        #   ホーム
│   │   ├── library/     #   ライブラリ（following, history, likes, playlist）
│   │   ├── notification/ #  通知
│   │   ├── player/      #   オーディオプレイヤー
│   │   ├── settings/    #   設定
│   │   ├── studio/      #   Studio 機能
│   │   │   ├── bgm/        # BGM 管理
│   │   │   ├── channels/   # チャンネル管理
│   │   │   ├── characters/ # キャラクター管理
│   │   │   ├── episodes/   # エピソード管理
│   │   │   ├── settings/   # Studio 設定
│   │   │   └── voices/     # ボイス管理
│   │   └── users/       #   ユーザープロフィール
│   ├── hooks/           # カスタムフック
│   ├── libs/            # 外部ライブラリ統合
│   │   ├── api/         #   API クライアント（generated/ は orval 生成）
│   │   ├── auth/        #   認証ライブラリ
│   │   ├── pages/       #   ページパス定義
│   │   ├── storybook/   #   Storybook ヘルパー
│   │   └── websocket/   #   WebSocket
│   ├── stores/          # Zustand ストア
│   ├── styles/          # グローバルスタイル
│   ├── test/            # テスト設定
│   ├── types/           # 型定義
│   ├── utils/           # 汎用ユーティリティ
│   └── middleware.ts    # 認証ガード
├── public/              # 静的ファイル
├── docs/
│   ├── adr/             # Architecture Decision Records
│   ├── design/          # デザイン指示書
│   ├── pages/           # ページ構成と URL 設計
│   └── specs/           # 仕様書
├── .env.example         # 環境変数のサンプル
├── .mise.toml           # mise 設定
├── biome.json           # Biome 設定
├── knip.json            # knip 設定
├── openapi.json         # OpenAPI 定義（バックエンドから取得）
├── orval.config.ts      # orval 設定
├── package.json
├── README.md
└── AGENTS.md            # AI エージェント向け開発規約
```
