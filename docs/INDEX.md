# ドキュメント

## ディレクトリ構成

| パス | 内容 | 概要 |
|------|------|------|
| [design/INDEX.md](design/INDEX.md) | デザイン | UI デザインガイドライン、デザイン指示書 |
| [specs/INDEX.md](specs/INDEX.md) | 仕様書 | 認証、UI レイアウト、オーディオプレイヤーの仕様 |
| [pages/INDEX.md](pages/INDEX.md) | ページ構成 | ページ一覧と URL 設計 |
| [adr/INDEX.md](adr/INDEX.md) | ADR | 技術選定の意思決定記録（7件） |
| [conventions.md](conventions.md) | 実装パターン | コーディング規約、React、TanStack Query 等の実装パターン集 |
| [testing.md](testing.md) | テストガイド | テスト規約・実行手順 |
| [definition-of-done.md](definition-of-done.md) | DoD | タスク完了の判断基準チェックリスト |
| [ubiquitous-language.md](ubiquitous-language.md) | ユビキタス言語集 | プロジェクト全体で統一する用語の定義 |

## ドキュメント間の依存関係

仕様書を起点に、各ドキュメントは以下の依存関係を持つ。変更時は上流から順に更新する。

```
specs/          ──→  pages/         ──→  design/
 (機能仕様)          (ページ構成)         (デザイン指示書)

conventions.md  ← 実装時に参照（全レイヤー共通）
testing.md      ← テスト実装時に参照
adr/            ← 新規ライブラリ導入時に作成、技術選定の理由確認時に参照
```
