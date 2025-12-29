# ページ構成

## 概要

Anycast のページ構成と URL 設計を定義する。

関連: [UI レイアウト](./ui-layout.md)

### 参考サービス

- [Spotify](https://open.spotify.com/)
- [Apple Podcasts](https://podcasts.apple.com/)
- [Amazon Music Podcasts](https://music.amazon.co.jp/podcasts)
- [Voicy](https://voicy.jp/)
- [Spoon](https://www.spooncast.net/)
- [YouTube](https://www.youtube.com/)
- [Netflix](https://www.netflix.com/)

## ページ一覧

### 認証

| ページ | URL | 説明 | 作成済み | 実装完了 |
|--------|-----|------|:--------:|:--------:|
| ログイン | `/login` | ログインページ | ✅ | |
| 新規登録 | `/signup` | 新規登録ページ | ✅ | |

### 公開ページ（認証不要）

| ページ | URL | 説明 | 作成済み | 実装完了 |
|--------|-----|------|:--------:|:--------:|
| ホーム | `/` | チャンネル一覧を表示 | ✅ | |
| カテゴリ一覧 | `/browse` | カテゴリ一覧を表示 | | |
| カテゴリ別 | `/browse/:category` | 特定カテゴリのチャンネル一覧 | | |
| ユーザー | `/@:username` | ユーザーが配信しているチャンネル一覧 | | |
| チャンネル | `/channel/:channelSlug` | チャンネル詳細とエピソード一覧 | | |
| エピソード | `/episode/:episodeId` | エピソード再生ページ | | |
| 検索 | `/search` | チャンネル・エピソードの検索 | ✅ | |
| 利用規約 | `/legal/terms` | 利用規約 | | |
| プライバシーポリシー | `/legal/privacy` | プライバシーポリシー | | |

### ライブラリ（認証必須 / リスナー向け）

| ページ | URL | 説明 | 作成済み | 実装完了 |
|--------|-----|------|:--------:|:--------:|
| お気に入り | `/library/favorites` | お気に入り一覧 | ✅ | |
| フォロー中 | `/library/following` | フォロー中のユーザー一覧 | ✅ | |

### Studio（認証必須 / クリエイター向け）

| ページ | URL | 説明 | 作成済み | 実装完了 |
|--------|-----|------|:--------:|:--------:|
| Studio | `/studio` | Studio トップ（ダッシュボードを表示） | - | - |
| ダッシュボード | `/studio/dashboard` | クリエイター向けダッシュボード | ✅ | |
| チャンネル一覧 | `/studio/channels` | 自分のチャンネル一覧 | ✅ | |
| チャンネル作成 | `/studio/channels/new` | 新規チャンネル作成 | | |
| チャンネル編集 | `/studio/channels/:id/edit` | チャンネル情報の編集 | | |
| エピソード一覧 | `/studio/channels/:id/episodes` | チャンネル内のエピソード一覧 | | |
| エピソード作成 | `/studio/channels/:id/episodes/new` | 新規エピソード作成（台本作成→音声生成） | | |
| エピソード編集 | `/studio/channels/:id/episodes/:id/edit` | エピソードの編集 | | |

### 設定（認証必須）

| ページ | URL | 説明 | 作成済み | 実装完了 |
|--------|-----|------|:--------:|:--------:|
| 設定 | `/settings` | 設定トップ（アカウントを表示） | - | - |
| アカウント | `/settings/account` | プロフィール・アカウント設定 | ✅ | |
| サブスクリプション | `/settings/subscription` | サブスクリプション管理 | ✅ | |

## URL 設計方針

### エピソード URL

エピソードは独立したパス `/episode/:episodeId` を採用。

**理由:**

- シンプルで共有しやすい
- Spotify、YouTube などの主要サービスと同様の方式

### ユーザー URL

`/@:username` 形式を採用。

**理由:**

- Twitter、GitHub など多くのサービスで採用されている馴染みのある形式
- ユーザーページであることが URL から明確

### クリエイター機能

`/studio` 配下にまとめる。

**理由:**

- リスナー向け UI とクリエイター向け UI を明確に分離
- 将来的に分析機能などを追加しやすい
- YouTube Studio などの先行サービスと同様の構成

## 今後の検討事項

- 通知ページ (`/notifications`)
- 再生キュー / プレイリスト機能
- 下書き管理の UI（`/studio/drafts` として分けるか、エピソード一覧でフィルタするか）
- プロフィールとアカウントページの分離（現在は `/settings/account` に統合）
