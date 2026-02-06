# ページ構成

## 概要

Anycast のページ構成と URL 設計を定義する。

関連: [UI レイアウト](../specs/ui-layout.md)

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

| ページ | URL | 説明 | 作成済み | 実装完了 | 詳細 |
**|--------|-----|------|:--------:|:--------:|------|
| ログイン | `/login` | ログインページ | ✅ | | |
| 新規登録 | `/signup` | 新規登録ページ | ✅ | | |**

### 公開ページ（認証不要）

| ページ        | URL                                       | 説明 | 作成済み | 実装完了 | 詳細 |
|------------|-------------------------------------------|------|:--------:|:--------:|------|
| ホーム        | `/`                                       | チャンネル一覧を表示 | ✅ | | |
| 探索       | `/explore`                                | カテゴリ一覧・検索（`?q=xxx`） | ✅ | | |
| カテゴリ別      | `/explore/:category`                      | 特定カテゴリのチャンネル一覧 | ✅ | | |
| おすすめのエピソード | `/episodes`                               | おすすめエピソード一覧 | ✅ | | [詳細](./episodes.md) |
| おすすめのチャンネル | `/channels`                               | おすすめチャンネル一覧 | ✅ | | [詳細](./channels.md) |
| ユーザー       | `/users/:username`                        | ユーザーが配信しているチャンネル一覧 | ✅ | | |
| チャンネル      | `/channel/:channelId`                     | チャンネル詳細とエピソード一覧 | ✅ | | [詳細](./channel-detail.md) |
| エピソード      | `/channel/:channelId/episodes/:episodeId` | エピソード再生ページ | ✅ | | [詳細](./episode-detail.md) |
| 利用規約       | `/terms`                                  | 利用規約 | ✅ | | |
| プライバシーポリシー | `/privacy`                                | プライバシーポリシー | ✅ | | |
| お問い合わせ     | `/contact`                                | お問い合わせ | ✅ | | |

### ライブラリ（認証必須 / リスナー向け）

| ページ | URL | 説明 | 作成済み | 実装完了 | 詳細 |
|--------|-----|------|:--------:|:--------:|------|
| フォロー中 | `/library/following` | フォロー中のユーザーとチャンネル一覧 | ✅ | | |
| 再生リスト | `/library/playlist` | 再生リスト一覧 | ✅ | | |
| 再生リスト詳細 | `/library/playlist/:id` | 再生リスト内のエピソード一覧 | ✅ | | [詳細](./playlist.md) |
| 高評価 | `/library/likes` | 高評価一覧 | ✅ | | |
| 履歴 | `/library/history` | 再生履歴一覧 | ✅ | | |

### Studio（認証必須 / クリエイター向け）

| ページ | URL | 説明 | 作成済み | 実装完了 | 詳細 |
|--------|-----|------|:--------:|:--------:|------|
| Studio | `/studio` | Studio トップ（ダッシュボードを表示） | ✅ | | |
| ダッシュボード | `/studio/dashboard` | クリエイター向けダッシュボード | ✅ | | |
| チャンネル一覧 | `/studio/channels` | 自分のチャンネル一覧 | ✅ | | |
| チャンネル作成 | `/studio/channels/new` | 新規チャンネル作成 | ✅ | | |
| チャンネル詳細 | `/studio/channels/:id` | チャンネル詳細とエピソード一覧 | ✅ | | |
| チャンネル編集 | `/studio/channels/:id/edit` | チャンネル情報の編集 | ✅ | | |
| エピソード作成 | `/studio/channels/:id/episodes/new` | 新規エピソード作成（台本作成→音声生成） | ✅ | | |
| エピソード詳細 | `/studio/channels/:id/episodes/:episodeId` | エピソード詳細（プレビュー） | ✅ | | |
| エピソード編集 | `/studio/channels/:id/episodes/:episodeId/edit` | エピソードの編集 | ✅ | | |
| キャラクター一覧 | `/studio/characters` | 自分のキャラクター一覧 | ✅ | | |
| BGM 一覧 | `/studio/bgm` | BGM 一覧・管理 | ✅ | | |
| ボイス一覧 | `/studio/voices` | ボイス一覧 | ✅ | | |

### 設定（認証必須）

| ページ | URL | 説明 | 作成済み | 実装完了 | 詳細 |
|--------|-----|------|:--------:|:--------:|------|
| 設定 | `/settings` | 設定トップ（アカウントを表示） | ✅ | | |
| アカウント | `/settings/account` | プロフィール・アカウント設定 | ✅ | | |
| サブスクリプション | `/settings/subscription` | サブスクリプション管理 | ✅ | | |

---

## URL 設計方針

### エピソード URL

エピソードはチャンネル配下のパス `/channel/:channelId/episodes/:episodeId` を採用。

**理由:**

- チャンネルとエピソードの親子関係が URL に反映される
- API エンドポイント `GET /channels/{channelId}/episodes/{episodeId}` と一致する

### ユーザー URL

`/users/:username` 形式を採用。

**理由:**

- `/users/` プレフィックスにより他のルートとの競合を回避

### クリエイター機能

`/studio` 配下にまとめる。

**理由:**

- リスナー向け UI とクリエイター向け UI を明確に分離
- 将来的に分析機能などを追加しやすい
- YouTube Studio などの先行サービスと同様の構成

---

## 今後の検討事項

- 通知ページ (`/notifications`)
- 再生キュー / プレイリスト機能
- 下書き管理の UI（`/studio/drafts` として分けるか、エピソード一覧でフィルタするか）
- プロフィールとアカウントページの分離（現在は `/settings/account` に統合）
