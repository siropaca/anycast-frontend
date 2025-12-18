# Anycast Frontend - Claude Code Instructions

## プロジェクト概要

Anycast は AI 音声生成専門のポッドキャストプラットフォームのフロントエンドアプリケーション。

### 現在のフェーズ

台本から音声を生成・調整するエディタ画面を優先して開発中。
バックエンドは未完成のため、モックデータを使用する。

## 技術スタック

### 導入済み

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Biome 2** - リンター/フォーマッター
- **pnpm** - パッケージマネージャー
- **mise** - Node.js バージョン管理

### 導入予定

- **NextAuth.js** - 認証
- **TanStack Query** - サーバー状態管理
- **Base UI** - ヘッドレス UI コンポーネント

## 開発ルール

### コーディング規約

- TypeScript を使用し、型安全性を重視する
- Biome の設定に従ってフォーマットする
- コンポーネントは関数コンポーネント + hooks を使用
- `use client` / `use server` ディレクティブを適切に使い分ける

### ディレクトリ構成

```
src/
├── app/          # Next.js App Router (ルーティング)
├── components/   # 共通コンポーネント
├── features/     # 機能ごとのモジュール (コンポーネント、hooks、型など)
├── hooks/        # 共通カスタムフック
├── lib/          # ユーティリティ、API クライアントなど
├── mocks/        # モックデータ、MSW ハンドラー
└── types/        # グローバル型定義
```

### コマンド

```bash
pnpm dev      # 開発サーバー起動 (Turbopack)
pnpm build    # プロダクションビルド
pnpm start    # プロダクションサーバー起動
pnpm lint     # Biome によるリント
pnpm format   # Biome によるフォーマット
pnpm check    # Biome によるリント + フォーマット (推奨)
```

## Git ワークフロー

GitHub Flow を採用。

- `main` ブランチから feature ブランチを作成
- PR を作成してレビュー後にマージ
- コミットメッセージは日本語 OK

## バックエンド連携

- バックエンドリポジトリ: https://github.com/siropaca/anycast-backend
- API:
  - 台本生成 API
  - 音声生成 API
- 現在はモックで代用

## 注意事項

- バックエンド API が未実装のため、`src/mocks/` にモックを配置する
- 本番 API 実装後にモックから切り替えられる設計にする
- TanStack Query でデータフェッチを管理し、API 切り替えを容易にする

## 学習事項

このセクションには、実装中にユーザーから指摘された内容のうち、今後の実装に役立つものを抽象化して記載する。具体的なケースではなく、同様の状況に適用できる一般的なルールとして記述すること。

### ファイル・ディレクトリ管理

- 新しいディレクトリを作成する際、空のままでも Git で管理する必要がある場合は `.gitkeep` を追加する

### ドキュメント管理

- ディレクトリ構成、技術スタック、バージョンなどプロジェクトの基本情報が変わった際は、README.md と CLAUDE.md の両方を更新する
