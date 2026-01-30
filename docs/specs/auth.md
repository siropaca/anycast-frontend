# 認証仕様

## 概要

Anycast では Auth.js v5（next-auth@beta）を使用した認証を実装している。

### 対応認証方式

- メール/パスワード認証（Credentials プロバイダ）
- Google OAuth

## アーキテクチャ

```
Frontend (Next.js + Auth.js)
  │
  │ authorize() / signIn callback
  ▼
Backend API (Go + Gin)
  │
  ▼
PostgreSQL (users, credentials, oauth_accounts)
```

### フロントエンド主導

- Auth.js が JWT を発行・セッション管理
- バックエンドはユーザー作成/検証 API を提供
- バックエンド API は Auth.js の JWT を検証して認可

## 関連ディレクトリ

| ディレクトリ | 説明 |
|-------------|------|
| `src/libs/auth/` | Auth.js 設定 |
| `src/libs/api/generated/auth/` | orval 生成の認証 API クライアント |
| `src/app/api/auth/` | Auth.js ルートハンドラー |
| `src/app/(auth)/` | 認証ページ（ログイン、新規登録） |
| `src/features/auth/schemas/` | Zod バリデーションスキーマ |
| `src/features/auth/components/` | 認証関連コンポーネント |

## バックエンド API 仕様

### POST /api/v1/auth/register

ユーザー登録

```json
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "表示名"
}

// Response 201
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "表示名",
    "displayName": "表示名",
    "avatarUrl": null
  }
}

// Error 409 (Conflict)
{
  "error": "email_exists",
  "message": "このメールアドレスは既に使用されています"
}
```

### POST /api/v1/auth/login

メール/パスワード認証

```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response 200
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "表示名",
    "displayName": "表示名",
    "avatarUrl": "https://..."
  }
}

// Error 401
{
  "error": "invalid_credentials",
  "message": "メールアドレスまたはパスワードが正しくありません"
}
```

### POST /api/v1/auth/oauth/google

Google OAuth ユーザー作成/更新

```json
// Request
{
  "providerUserId": "google-provider-id",
  "email": "user@gmail.com",
  "displayName": "表示名",
  "accessToken": "...",
  "refreshToken": "...",
  "expiresAt": 1234567890
}

// Response 200/201
{
  "data": {
    "id": "uuid",
    "email": "user@gmail.com",
    "username": "表示名",
    "displayName": "表示名",
    "avatarUrl": "https://...",
    "isNewUser": false
  }
}
```

## 環境変数

```bash
# Auth.js
AUTH_SECRET=           # openssl rand -base64 32 で生成

# Google OAuth (Google Cloud Console から取得)
AUTH_GOOGLE_CLIENT_ID=
AUTH_GOOGLE_CLIENT_SECRET=

# Backend API
BACKEND_URL=http://localhost:8081              # サーバーサイド用
NEXT_PUBLIC_BACKEND_URL=http://localhost:8081  # クライアントサイド用

# App URL
NEXTAUTH_URL=http://localhost:3210
```

## セッション管理

- **戦略**: JWT
- **保存場所**: Cookie
- **有効期限**: Auth.js デフォルト（30日）

## 保護されたルート

`src/middleware.ts` で認証必須ページへのアクセスを制御している。

| パス | 説明 |
|------|------|
| `/library/*` | ライブラリ（フォロー中、再生リスト、お気に入り、履歴） |
| `/studio/*` | Studio（クリエイター向け機能） |
| `/settings/*` | 設定 |

未認証ユーザーがこれらのページにアクセスすると、ログインページにリダイレクトされる。ログイン後は元のページに戻る。

## Google OAuth 設定

Google Cloud Console での設定手順:

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクトを作成または選択
3. 「API とサービス」→「認証情報」
4. 「認証情報を作成」→「OAuth クライアント ID」
5. アプリケーションの種類: ウェブアプリケーション
6. 承認済みのリダイレクト URI を追加:
   - 開発: `http://localhost:3210/api/auth/callback/google`
   - 本番: `https://your-domain.com/api/auth/callback/google`
7. クライアント ID とシークレットを `.env` に設定
