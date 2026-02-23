# Architecture Decision Records (ADR)

このディレクトリには、技術的意思決定を記録した ADR を格納しています。

## ADR とは

ADR（Architecture Decision Record）は、アーキテクチャ上の重要な決定を記録するドキュメントです。
なぜその決定を行ったのか、どのような選択肢を検討したのかを残すことで、将来の開発者が決定の背景を理解できるようにします。

## ADR 一覧

| 番号 | タイトル | ステータス |
|------|----------|------------|
| [001](001-framework-nextjs.md) | フレームワーク: Next.js | Accepted |
| [002](002-linter-formatter-biome.md) | リンター/フォーマッター: Biome | Accepted |
| [003](003-styling-tailwindcss.md) | スタイリング: Tailwind CSS | Accepted |
| [004](004-package-manager-pnpm.md) | パッケージマネージャー: pnpm | Accepted |
| [005](005-auth-authjs.md) | 認証ライブラリ: Auth.js | Accepted |
| [006](006-api-client-generator-orval.md) | API クライアント生成ツール: orval | Accepted |
| [007](007-state-management-zustand.md) | 状態管理ライブラリ: Zustand | Accepted |

## ステータス

- **Proposed**: 提案中
- **Accepted**: 採用
- **Deprecated**: 非推奨（別の ADR で置き換え）
- **Superseded**: 別の ADR で上書き

## 新しい ADR の作成

`template.md` をコピーして、連番でファイルを作成してください。

```bash
cp docs/adr/template.md docs/adr/00X-title.md
```
