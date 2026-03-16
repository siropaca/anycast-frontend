# Anycast Frontend

AI ポッドキャスト配信プラットフォームのフロントエンド。Next.js (App Router) / React / TypeScript / Tailwind CSS / TanStack Query / Zustand。

## ドキュメントの設計と管理

このリポジトリのドキュメントは **プログレッシブディスクロージャー** で設計されている。

### 設計原則

- **AGENTS.md** は地図に徹する。詳細な情報は持たず、適切なドキュメントへのポインタを提供する
- **docs/ 配下の各ディレクトリ** には INDEX.md を設置し、そのディレクトリ内のファイル案内を担う
- エージェントは必要なときに必要なドキュメントだけを読み込む。全てを一度に読む必要はない
- AGENTS.md から最大 3 ステップ以内に目的のドキュメントへたどり着ける構造を維持する

### 管理ルール

- AGENTS.md に実装パターンやコード例を直接書かない（docs/ 配下に分離する）
- AGENTS.md は 200 行以内に収める。超える場合は docs/ へ分離する
- 新しい docs/ サブディレクトリを作成した場合は INDEX.md を設置する
- ドキュメントを追加・更新・移動した際は、関連する INDEX.md のリンクも必ず更新する
- ドキュメント内のリンクは、そのファイルからの相対パスで記述する（リンクが壊れないことを最優先）
- README.md から読み取れる情報（技術スタック、ディレクトリ構成、コマンドなど）は AGENTS.md に重複して記載しない
- ディレクトリ構成、技術スタック、バージョンなどプロジェクトの基本情報が変わった際は、README.md と AGENTS.md の両方を更新する
- ADR を追加した際は docs/adr/INDEX.md の一覧にも追記する
- ドキュメント内でファイルパスを参照として記述する際はバッククオートで囲まない（リンクまたはプレーンテキストで記述する）

## 実装規約

コード実装時は [docs/conventions.md](docs/conventions.md) を参照する（唯一の正本）。

## ドキュメントマップ

| パス | 内容 | いつ読むか |
|------|------|------------|
| [docs/INDEX.md](docs/INDEX.md) | ドキュメント全体の案内 | 初めてこのリポジトリを触るとき、ドキュメント間の依存関係を確認したいとき |
| [docs/design/INDEX.md](docs/design/INDEX.md) | デザイン | UI コンポーネントの見た目・カラー・レイアウトに関するタスク時 |
| [docs/specs/INDEX.md](docs/specs/INDEX.md) | 仕様書（認証、UI レイアウト、プレイヤー） | 認証・レイアウト・プレイヤーに関するタスク時 |
| [docs/pages/INDEX.md](docs/pages/INDEX.md) | ページ構成・URL 設計 | page.tsx の追加・変更・削除時、URL やルーティングに関する質問時 |
| [docs/adr/INDEX.md](docs/adr/INDEX.md) | Architecture Decision Records | 新規ライブラリ導入時（ADR 作成必須）、「なぜこの技術を使っているのか」を確認したいとき |
| [docs/conventions.md](docs/conventions.md) | 実装パターン・規約集 | コードを書く前（毎回）。特に冒頭の「最重要ルール」と「禁止事項」を確認 |
| [docs/testing.md](docs/testing.md) | テストガイド | テストの作成・実行時、テスト対象の判断時 |
| [docs/definition-of-done.md](docs/definition-of-done.md) | 完了の定義（DoD） | タスク完了の判断時（実装が終わったら必ず確認） |
| [docs/ubiquitous-language.md](docs/ubiquitous-language.md) | ユビキタス言語集 | 変数名・UI テキスト・コミットメッセージで用語に迷ったとき（軽量なので積極的に参照） |

## タスク別ガイド

| タスク | 読む順序 |
|--------|----------|
| 新規ページ追加 | docs/specs → docs/pages/INDEX.md → docs/conventions.md → 実装 → docs/definition-of-done.md |
| 新規コンポーネント追加 | docs/design → docs/conventions.md → 実装 → docs/definition-of-done.md |
| 既存ページ変更 | docs/pages/INDEX.md → 対象の詳細ファイル → docs/conventions.md → 実装 → docs/definition-of-done.md |
| バグ修正 | docs/conventions.md → docs/testing.md → 実装 → docs/definition-of-done.md |
| 新規ライブラリ導入 | docs/adr/INDEX.md → ADR 作成 → 実装 → docs/definition-of-done.md |
| テスト追加 | docs/testing.md → docs/conventions.md → 実装 → docs/definition-of-done.md |

## Git / GitHub

- ユーザーから指示があるまでコミットやプッシュを行わない（勝手にプッシュしない）
- ブランチを新規作成する際は、必ずユーザーに確認を取ってから作成する（勝手にブランチを切らない）
- コミット前に `pnpm check` でリント + フォーマットを実行する
- PR 作成時は .github/PULL_REQUEST_TEMPLATE.md をテンプレートとして使用する

## 基本姿勢

- ユーザーの指示であっても、設計として良くないものや一般的でないものがあれば、修正を実行する前に確認を入れる
- 常にメンテナビリティやテスタビリティを意識した実装を心がける
- API の権限・公開範囲とフロントエンドの表示が矛盾するなど、サービスとして整合性が取れない実装になり得る場合は、無理に実装せずユーザーに確認を取る

## 開発環境

| 項目 | URL |
|------|-----|
| フロントエンド | http://localhost:3210 |
| Storybook | http://localhost:6006 |
| バックエンド | http://localhost:8081 |
