# 完了の定義（Definition of Done）

タスク完了時に以下のチェックリストを満たすこと。

## 共通

- [ ] `pnpm check` が通る（リント + フォーマット）
- [ ] `pnpm typecheck` が通る（型チェック）
- [ ] 既存テストが全てパスする
- [ ] 外部依存がないユニットテストを作成済み

## 変更種別ごとの追加要件

### 新規ページ追加

- [ ] `docs/pages/INDEX.md` のページ一覧を更新
- [ ] `src/libs/pages/` にページパスを追加
- [ ] `export const metadata` を定義
- [ ] 認証必須ページの場合、`robots: { index: false }` を付与

### 新規コンポーネント追加（src/components/）

- [ ] Storybook の Stories ファイルを作成
- [ ] Skeleton コンポーネントを作成（必要な場合）

### 新規ライブラリ導入

- [ ] ADR を作成し、`docs/adr/INDEX.md` に追記

### 環境変数の追加・変更

- [ ] `.env.example` を更新
