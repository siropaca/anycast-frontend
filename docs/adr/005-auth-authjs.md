# ADR-005: 認証ライブラリ: Auth.js (NextAuth.js v5)

## ステータス

Accepted

## コンテキスト

Anycast ではユーザー認証機能が必要である。

以下の認証方式をサポートする必要がある:
- メール/パスワード認証
- Google OAuth

また、バックエンド API（Go + Gin）と連携し、ユーザー情報をバックエンドで管理する設計が求められる。

## 決定

Auth.js v5（next-auth@beta）を採用する。

フロントエンド主導のアーキテクチャを採用し、Auth.js が JWT を発行・セッション管理を行い、バックエンドはユーザーの作成・検証 API を提供する。

## 選択肢

### 選択肢 1: Auth.js v5 (NextAuth.js)

- メリット
  - Next.js との統合が優れている
  - 多数の OAuth プロバイダをサポート
  - JWT とセッションベースの両方をサポート
  - App Router に対応
  - 活発なコミュニティとドキュメント
- デメリット
  - v5 は beta 版（ただし production ready とされている）
  - 型定義の拡張が一部困難

### 選択肢 2: Clerk

- メリット
  - マネージドサービスで設定が簡単
  - UI コンポーネントが充実
- デメリット
  - 有料サービス（無料枠あり）
  - ベンダーロックイン
  - バックエンドとの連携に追加設定が必要

### 選択肢 3: 自前実装

- メリット
  - 完全なコントロール
  - 外部依存なし
- デメリット
  - 実装コストが高い
  - セキュリティリスク
  - OAuth 実装の複雑さ

## 理由

1. **Next.js との親和性**: Auth.js は Next.js のために設計されており、App Router、Server Components、Middleware との統合がスムーズ
2. **柔軟性**: Credentials プロバイダでバックエンド API と連携可能。OAuth も簡単に追加できる
3. **コスト**: OSS であり、追加コストなし
4. **実績**: NextAuth.js として長い実績があり、v5 も十分に安定している

## 結果

- `src/libs/auth/auth.ts` に Auth.js の設定を集約
- `src/app/api/auth/[...nextauth]/route.ts` でルートハンドラーを提供
- バックエンド API 実装まではモック認証を使用（`src/mocks/auth.ts`）
- Google OAuth は Google Cloud Console での設定が必要
