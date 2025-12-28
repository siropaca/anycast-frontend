# ADR-006: API クライアント生成ツール: orval

## ステータス

Accepted

## コンテキスト

バックエンド API との通信において、型安全性を確保しつつ開発効率を高める必要がある。
バックエンドは OpenAPI (Swagger) 仕様でドキュメント化されており、これを活用して TypeScript の型定義と API クライアントを自動生成したい。
また、本プロジェクトでは TanStack Query を使用してサーバー状態を管理するため、TanStack Query のカスタムフックも自動生成できることが望ましい。

## 決定

API クライアント生成ツールとして **orval** を採用する。

## 選択肢

### 選択肢 1: orval

- メリット
  - TanStack Query のカスタムフック（useQuery, useMutation 等）を自動生成できる
  - Query Key も自動生成され、キャッシュ管理が容易
  - MSW モックの自動生成が可能
  - Zod スキーマの生成にも対応
  - Swagger 2.0 / OpenAPI 3.x 両対応
  - 活発にメンテナンスされている（GitHub スター 3k+、週間ダウンロード 300k+）
- デメリット
  - 設定ファイルの学習コストがある

### 選択肢 2: @hey-api/openapi-ts + TanStack Query プラグイン

- メリット
  - モダンなプラグイン方式で必要な機能だけ追加できる
  - React/Vue/Angular/Svelte/Solid など多フレームワーク対応
- デメリット
  - orval と比較して実績が少ない
  - ドキュメントがやや少ない

### 選択肢 3: openapi-generator

- メリット
  - OpenAPI 公式ツールで信頼性が高い
  - 多言語対応
- デメリット
  - TanStack Query のフックは生成されない（手動で書く必要がある）
  - Query Key の生成もない
  - Java ランタイムが必要

### 選択肢 4: openapi-react-query-codegen

- メリット
  - シンプルで React に特化
  - TanStack Query フックを生成
- デメリット
  - orval と比較して機能が限定的
  - コミュニティが小さい

## 理由

1. **TanStack Query との親和性**: orval は TanStack Query のフックを直接生成でき、手動でフックを書く必要がない
2. **実績と信頼性**: 最も広く使われており、活発にメンテナンスされている
3. **機能の豊富さ**: 型生成だけでなく、MSW モックや Zod スキーマ生成など、開発効率を高める機能が充実
4. **Swagger 2.0 対応**: 現在のバックエンド API 仕様（Swagger 2.0）と互換性がある

## 結果

- orval をインストールし、設定ファイル（`orval.config.ts`）を作成する
- `pnpm gen:api` コマンドで API クライアントを生成できるようにする
- 生成されたコードは `src/libs/api/generated/` に配置する
- `openapi.json` が更新されたら、コマンドを再実行して再生成する
