# BottomPlayer

## 概要

画面下部に固定表示されるオーディオプレイヤー。エピソードやボイスサンプルを再生する。

### 前提条件

- 状態管理に Zustand を使用（[ADR-007](../adr/007-state-management-zustand.md)）
- アイコンは Phosphor Icons を使用
- 外部オーディオライブラリは使用せず、HTML5 Audio API で実装

### 参考サービス

- [Spotify](https://open.spotify.com/)（ミニプレイヤーの構成）

## 関連ファイル

| パス | 説明 |
|------|------|
| src/stores/playerStore.ts | Zustand ストア（State / Actions） |
| src/features/player/components/BottomPlayer.tsx | エントリーポイント |
| src/features/player/components/BottomPlayerDesktop.tsx | デスクトップ表示 |
| src/features/player/components/BottomPlayerMobile.tsx | モバイル表示 |
| src/features/player/components/TrackInfo.tsx | トラック情報表示 |
| src/features/player/components/PlaybackControls.tsx | 再生コントロール |
| src/features/player/components/ProgressBar.tsx | プログレスバー |
| src/features/player/components/VolumeControl.tsx | ボリュームコントロール |
| src/features/player/components/SpeedControl.tsx | 再生速度コントロール |
| src/features/player/hooks/useAudioPlayer.ts | Audio API フック |
| src/features/player/hooks/usePlaybackTracking.ts | 再生履歴トラッキング |
| src/features/player/hooks/usePlayEpisode.ts | エピソード再生フック |
| src/features/player/hooks/useBottomPlayer.ts | BottomPlayer フック |
| src/features/player/hooks/useDocumentTitle.ts | ドキュメントタイトル更新 |
| src/features/player/hooks/useDownloadTrack.ts | トラックダウンロード |
| src/features/player/hooks/useNowPlayingEpisodeId.ts | 再生中エピソード ID |
| src/features/player/utils/trackConverter.ts | Track 変換関数 |
| src/features/player/styles/player-slider.css | スライダースタイル |
| src/utils/date.ts | 時間フォーマット（`formatTime`） |

## コンポーネント構成

### レイアウト図（デスクトップ）

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ BottomPlayer (h-bottom-player: 88px, 画面下部固定)                          │
│                                                                             │
│  ┌─ Left ──────────────┐ ┌─ Center ────────────────────┐ ┌─ Right ───────┐ │
│  │                      │ │                              │ │               │ │
│  │ [Artwork] Title      │ │    再生コントロール            │ │ Volume slider │ │
│  │           Channel    │ │    プログレスバー              │ │               │ │
│  │                      │ │                              │ │               │ │
│  └──────────────────────┘ └──────────────────────────────┘ └───────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### レイアウト図（モバイル）

```
┌─────────────────────────────────────────────────┐
│ [極細プログレスバー (h-1)]                        │
├─────────────────────────────────────────────────┤
│                                                  │
│ [Artwork] Title / Channel       [Play/Pause]     │
│                                                  │
└─────────────────────────────────────────────────┘
```

## キュー管理の振る舞い

### Next

| 条件 | 動作 |
|------|------|
| キューに次のトラックがある | 次のトラックを再生 |
| キューの末尾 | 何もしない（ボタンは disabled） |
| キューが空（単体再生） | 何もしない（ボタンは disabled） |

### Previous

| 条件 | 動作 |
|------|------|
| 再生位置 >= 3 秒 | 現在のトラックの先頭にシーク |
| 再生位置 < 3 秒 かつ 前のトラックがある | 前のトラックを再生 |
| 再生位置 < 3 秒 かつ キューの先頭 | 現在のトラックの先頭にシーク |
| キューが空（単体再生） | 先頭にシーク |

### ボタンの無効状態

| ボタン | disabled 条件 |
|--------|--------------|
| Next | `queueIndex >= queue.length - 1` または `queue.length <= 1` |
| Previous | 常に有効（先頭シークがフォールバック動作のため） |

## レスポンシブ対応

| デバイス | 条件 | 表示 |
|---------|------|------|
| デスクトップ | `md` 以上（768px〜） | フル表示（左・中央・右の 3 セクション） |
| モバイル | `md` 未満（〜767px） | コンパクト表示（高さ 60px、Play/Pause のみ） |

## アクセシビリティ

### ARIA 属性

| 要素 | 属性 |
|------|------|
| BottomPlayer ルート | `role="region"`, `aria-label="オーディオプレイヤー"` |
| Play/Pause ボタン | `aria-label="再生"` / `aria-label="一時停止"` |
| Previous ボタン | `aria-label="前のトラック"` |
| Next ボタン | `aria-label="次のトラック"` |
| プログレスバー | `role="slider"`, `aria-label="再生位置"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext="1:23 / 4:56"` |
| ボリュームスライダー | `role="slider"`, `aria-label="音量"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow` |
| ミュートボタン | `aria-label="ミュート"` / `aria-label="ミュート解除"` |

### キーボード操作

| キー | 動作 |
|------|------|
| `Space` | Play / Pause（フォーカスがプレイヤー内にある場合） |
| `ArrowLeft` / `ArrowRight` | プログレスバーのシーク（フォーカスがスライダーにある場合） |
| `ArrowUp` / `ArrowDown` | ボリューム調整（フォーカスがボリュームスライダーにある場合） |
| `M` | ミュート切り替え（フォーカスがプレイヤー内にある場合） |

## 再生履歴トラッキング

エピソード再生中の進捗をサーバーに記録する。`episode` タイプのみ対象。

### トラッキングタイミング

| タイミング | 送信内容 |
|-----------|---------|
| 再生開始時 | `progressMs: 現在位置`, `completed: false` |
| 再生中 30 秒ごと | `progressMs: 現在位置`, `completed: false` |
| 一時停止時 | `progressMs: 現在位置`, `completed: false` |
| トラック変更時（前トラック分） | `progressMs: 最終位置`, `completed: 残り1秒以内なら true` |

### API

`PUT /episodes/{episodeId}/playback` — 失敗時は `console.warn` のみ出力し、再生体験を妨げない。

## 注意事項

- **自動再生ポリシー**: `audio.play()` の Promise を適切にハンドリングし、失敗時は `isPlaying` を `false` に戻す
- **メモリリーク防止**: `useAudioPlayer` のクリーンアップで Audio イベントリスナーの解除と `audio.src` のクリアを行う
- **SSR 対応**: `useAudioPlayer` 内で `typeof window !== 'undefined'` のガードが必要

## 将来の拡張候補

| 機能 | 説明 |
|------|------|
| シャッフル再生 | キューをシャッフルして再生する |
| リピート再生 | 1曲リピート / 全曲リピート |
| フルスクリーンプレイヤー | モバイルでタップ時に展開 |
| MediaSession API | OS のメディアコントロールとの連携 |
| キーボードショートカット（グローバル） | プレイヤーにフォーカスがない状態でも操作可能 |
