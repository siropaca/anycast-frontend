# Anycast Frontend - Claude Code 向けガイド

## ドキュメント

| ファイル | 説明 |
|----------|------|
| [docs/adr/](docs/adr/) | Architecture Decision Records |
| [docs/auth.md](docs/auth.md) | 認証仕様 |
| [docs/page-structure.md](docs/page-structure.md) | ページ構成 |
| [docs/ui-layout.md](docs/ui-layout.md) | UI レイアウト |

## ドキュメント管理ルール

- README.md から読み取れる情報（技術スタック、ディレクトリ構成、コマンドなど）は CLAUDE.md に重複して記載しない
- ディレクトリ構成、技術スタック、バージョンなどプロジェクトの基本情報が変わった際は、README.md と CLAUDE.md の両方を更新する
- ADR を追加した際は `docs/adr/README.md` の一覧にも追記する

## 開発規約

### 基本姿勢

- ユーザーの指示であっても、設計として良くないものや一般的でないものがあれば、修正を実行する前に確認を入れる
- 常にメンテナビリティやテスタビリティを意識した実装を心がける

### コーディング規約

- TypeScript を使用し、型安全性を重視する
- Biome の設定に従ってフォーマットする
- バレルファイル（index.ts）は作成しない
- import のパスは相対パスではなく `@` エイリアスを使用する
- オブジェクトの型定義には `type` より `interface` を優先する

### JSDoc

- 基本的に関数には JSDoc を記載する
- React コンポーネントには JSDoc を記載しない
- 説明文と `@param` の間には空行を入れる
- 使用するタグ: `@param`, `@returns`, `@throws`, `@example`（必要に応じて）
- `@example` にはコードブロック（` ``` `）や import 文は不要、呼び出しと返却値のみ記載

```typescript
/**
 * 2つの数値を加算する
 *
 * @param a - 1つ目の数値
 * @param b - 2つ目の数値
 * @returns 加算結果
 *
 * @example
 * add(1, 2) // => 3
 */
function add(a: number, b: number): number {
  return a + b;
}
```

### React

- コンポーネントは関数コンポーネント + hooks を使用
- `use client` / `use server` ディレクティブを適切に使い分ける
- 最新の hooks・API・手法を積極的に採用する（例: `use`、`useActionState`、`useOptimistic`、Server Components など）
- コンポーネントの props は必ず `interface Props` で定義してから使用する
- `src/components/` 配下のコンポーネントはできるだけ Presentational Component にする
- `className` の結合や条件式を使う場合は `cn()` を使用する（`src/utils/cn.ts`）

### Git / GitHub

- ユーザーから指示があるまでコミットやプッシュを行わない（勝手にプッシュしない）
- コミット前に `pnpm check` でリント + フォーマットを実行する
- PR 作成時は `.github/PULL_REQUEST_TEMPLATE.md` をテンプレートとして使用する

### テスト

- 外部依存がないユニットテストは、実装時に必ず作成する

## 開発環境

| 項目 | URL |
|------|-----|
| フロントエンド | http://localhost:3210 |
| Storybook | http://localhost:6006 |
| バックエンド | http://localhost:8081 |

### Next.js

- page.tsx には必ず `export const metadata` を定義する
- 認証必須ページ（`(studio)`, `(settings)` など）には `robots: { index: false }` を付与する

## 実装上の注意事項

- TanStack Query でデータフェッチを管理する
- API クライアントは `src/libs/api/` に配置する
- カスタムフックは `src/features/*/hooks/` に配置する

### ページパスの管理

- ページのパスとタイトルは `src/libs/pages/index.ts` の `Pages` オブジェクトで一元管理する
- 動的ルート（`[id]` など）を持つページは、パラメータ型を定義して `path()` と `page.tsx` の両方で使用する

```typescript
// src/libs/pages/studioPages.ts
export interface ChannelParams {
  id: string;
}

export const studioPages = {
  channel: {
    path: (params: ChannelParams) => `/studio/channels/${params.id}`,
    title: 'チャンネル詳細',
  },
} as const;

// src/app/(studio)/studio/channels/[id]/page.tsx
interface Props {
  params: Promise<ChannelParams>;
}
```

## 用語

| 英語 | 日本語 |
|------|--------|
| Script | 台本 |

## 学習事項

このセクションには、実装中にユーザーから指摘された内容のうち、今後の実装に役立つものを抽象化して記載する。具体的なケースではなく、同様の状況に適用できる一般的なルールとして記述すること。

### ファイル・ディレクトリ管理

- 新しいディレクトリを作成する際、空のままでも Git で管理する必要がある場合は `.gitkeep` を追加する

### 環境変数

- 環境変数を追加・変更した際は `.env.example` も更新する

### パッケージ管理

- 依存パッケージを追加・削除した後は整合性を確認する
- 新しいパッケージを追加する際は、そのパッケージが広く使われているか確認する
