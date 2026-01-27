# BottomPlayer

## 概要

画面下部に固定表示されるオーディオプレイヤー。エピソードやボイスサンプルを再生する。

### 前提条件

- 状態管理に Zustand を使用（[ADR-007](../adr/007-state-management-zustand.md)）
- アイコンは Phosphor Icons を使用
- 外部オーディオライブラリは使用せず、HTML5 Audio API で実装

### 参考サービス

- [Spotify](https://open.spotify.com/)（ミニプレイヤーの構成）

## コンポーネント構成

### レイアウト図（デスクトップ）

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ BottomPlayer (h-bottom-player: 88px, 画面下部固定)                          │
│                                                                             │
│  ┌─ Left ──────────────┐ ┌─ Center ────────────────────┐ ┌─ Right ───────┐ │
│  │                      │ │                              │ │               │ │
│  │ [Artwork] Title      │ │    advancement controls       │ │ Volume slider │ │
│  │           Channel    │ │    advancement controls       │ │               │ │
│  │                      │ │   progress bar               │ │               │ │
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

### コンポーネントツリー

```
BottomPlayer
├── BottomPlayerDesktop         # デスクトップ表示
│   ├── TrackInfo               # 左: アートワーク + タイトル + チャンネル名
│   ├── PlaybackControls        # 中央: 再生コントロール + プログレスバー
│   │   ├── ControlButtons      # Previous / Play|Pause / Next
│   │   └── ProgressBar         # シークバー + 経過時間 / 総時間
│   └── VolumeControl           # 右: ボリューム
│       ├── VolumeIcon          # ミュート/音量アイコン
│       └── VolumeSlider        # スライダー
└── BottomPlayerMobile          # モバイル表示
    ├── MobileProgressBar       # 上部の極細プログレスバー
    ├── TrackInfo               # アートワーク + タイトル + チャンネル名
    └── PlayPauseButton         # Play/Pause ボタン
```

## 状態管理設計

### Player Store

`src/stores/playerStore.ts` に Zustand ストアを配置する。

#### State

```typescript
interface Track {
  id: string;
  type: 'episode' | 'voiceSample';
  title: string;
  channelName?: string;
  artworkUrl?: string;
  audioUrl: string;
  durationMs: number;
}

interface PlayerState {
  // トラック
  currentTrack: Track | null;
  queue: Track[];
  queueIndex: number;

  // 再生状態
  isPlaying: boolean;
  currentTimeMs: number;
  durationMs: number;

  // 音量（persist 対象）
  volume: number;          // 0.0 ~ 1.0
  isMuted: boolean;
}
```

#### Actions

```typescript
interface PlayerActions {
  // トラック操作
  play: (track: Track, queue?: Track[]) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;

  // キュー操作
  next: () => void;
  previous: () => void;

  // シーク
  seek: (timeMs: number) => void;

  // 音量
  setVolume: (volume: number) => void;
  toggleMute: () => void;

  // 内部更新（useAudioPlayer から呼ばれる）
  setCurrentTime: (timeMs: number) => void;
  setDuration: (durationMs: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}
```

#### Actions 詳細

| アクション | 説明 |
|-----------|------|
| `play` | トラックを再生する。`queue` が渡された場合、キューを置き換える。`queueIndex` は該当トラックのインデックスに設定 |
| `pause` | 再生を一時停止する |
| `resume` | 一時停止中のトラックを再開する |
| `stop` | 再生を停止し、`currentTrack` を `null` にする |
| `next` | キューの次のトラックを再生する。末尾の場合は何もしない |
| `previous` | 再生位置が 3 秒以上なら先頭にシーク、3 秒未満ならキューの前のトラックを再生。先頭の場合は先頭にシーク |
| `seek` | 指定した時間にシークする |
| `setVolume` | 音量を設定する（0.0 ~ 1.0） |
| `toggleMute` | ミュート状態を切り替える |

#### volume の永続化

Zustand の `persist` ミドルウェアを使用し、`volume` と `isMuted` のみを `localStorage` に保存する。

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePlayerStore = create<PlayerState & PlayerActions>()(
  persist(
    (set, get) => ({
      // ... state & actions
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
      }),
    },
  ),
);
```

## オーディオ再生方式

### useAudioPlayer フック

HTML5 Audio API をラップするカスタムフック。`src/features/app/hooks/useAudioPlayer.ts` に配置する。

#### 責務

- `Audio` インスタンスの生成・管理
- Player Store の状態に応じた Audio 操作（play / pause / seek / volume）
- Audio イベントの監視と Store への状態同期

#### 動作フロー

```
PlayerStore (状態)          useAudioPlayer (副作用)           Audio API
─────────────────          ───────────────────────           ─────────
currentTrack 変更  ──────>  audio.src を設定 & play()  ────>  音声再生
isPlaying: true    ──────>  audio.play()               ────>  再生
isPlaying: false   ──────>  audio.pause()              ────>  一時停止
seek(timeMs)       ──────>  audio.currentTime 設定     ────>  シーク
volume 変更        ──────>  audio.volume 設定           ────>  音量変更

                            timeupdate イベント        <────  Audio API
                   ──────>  setCurrentTime 呼び出し
                            ended イベント             <────  Audio API
                   ──────>  next() 呼び出し
```

#### 使用箇所

`BottomPlayer` コンポーネントのトップレベルで 1 回だけ呼び出す。

```typescript
export function BottomPlayer() {
  useAudioPlayer();

  const currentTrack = usePlayerStore((s) => s.currentTrack);
  if (!currentTrack) return null;

  // ...
}
```

## トラック種別とデータモデル

### Track 型

再生対象を統一的に扱うための型。

```typescript
interface Track {
  id: string;
  type: 'episode' | 'voiceSample';
  title: string;
  channelName?: string;
  artworkUrl?: string;
  audioUrl: string;
  durationMs: number;
}
```

### 変換関数

API レスポンスの型から `Track` への変換関数を `src/features/app/utils/trackConverter.ts` に配置する。

#### エピソード → Track

```typescript
/**
 * エピソードレスポンスを Track に変換する
 *
 * @param episode - エピソードレスポンス
 * @param channelName - チャンネル名
 * @returns Track オブジェクト
 * @throws fullAudio が存在しない場合
 *
 * @example
 * toTrackFromEpisode(episode, 'My Channel')
 * // => { id: '...', type: 'episode', title: '...', ... }
 */
function toTrackFromEpisode(
  episode: ResponseEpisodeResponse,
  channelName: string,
): Track;
```

使用するフィールド:

| Track フィールド | 元データ |
|-----------------|---------|
| `id` | `episode.id` |
| `type` | `'episode'` |
| `title` | `episode.title` |
| `channelName` | 引数 `channelName` |
| `artworkUrl` | `episode.artwork?.url` |
| `audioUrl` | `episode.fullAudio.url` |
| `durationMs` | `episode.fullAudio.durationMs` |

#### ボイスサンプル → Track

```typescript
/**
 * ボイスレスポンスを Track に変換する
 *
 * @param voice - ボイスレスポンス
 * @returns Track オブジェクト
 *
 * @example
 * toTrackFromVoice(voice)
 * // => { id: '...', type: 'voiceSample', title: '...', ... }
 */
function toTrackFromVoice(voice: ResponseVoiceResponse): Track;
```

使用するフィールド:

| Track フィールド | 元データ |
|-----------------|---------|
| `id` | `voice.id` |
| `type` | `'voiceSample'` |
| `title` | `voice.name` |
| `channelName` | `undefined` |
| `artworkUrl` | `undefined` |
| `audioUrl` | `voice.sampleAudioUrl` |
| `durationMs` | `0`（Audio API の `loadedmetadata` で取得） |

## キュー管理設計

### キューの構造

- `queue`: トラックの配列。再生対象のリスト全体を保持
- `queueIndex`: 現在再生中のトラックのインデックス

### Next / Previous の動作

#### Next

| 条件 | 動作 |
|------|------|
| キューに次のトラックがある | 次のトラックを再生 |
| キューの末尾 | 何もしない（ボタンは disabled） |
| キューが空（単体再生） | 何もしない（ボタンは disabled） |

#### Previous

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

## UI 仕様

### 全体

- 高さ: `var(--spacing-bottom-player)` = 88px
- 背景: `var(--color-bg-main)` = `#0a0a0a`
- 上部ボーダー: `var(--color-border)` = `#3a3a3a`
- トラック未選択時（`currentTrack === null`）: **コンポーネント自体を非表示**（`return null`）

### 左セクション: TrackInfo

| 要素 | 仕様 |
|------|------|
| Artwork | 56x56px、角丸 `rounded-sm`。`Artwork` コンポーネントを使用 |
| タイトル | `var(--text-sm)` = 14px、`var(--color-text-main)` = `#ffffff`、1行省略 |
| チャンネル名 | `var(--text-xs)` = 12px、`var(--color-text-subtle)` = `#aaaaaa`、1行省略。`voiceSample` の場合は非表示 |

### 中央セクション: PlaybackControls

#### ControlButtons

| ボタン | アイコン | サイズ |
|--------|---------|-------|
| Previous | `SkipBack` (weight: fill) | 20px |
| Play | `Play` (weight: fill) | 24px、背景あり（白丸） |
| Pause | `Pause` (weight: fill) | 24px、背景あり（白丸） |
| Next | `SkipForward` (weight: fill) | 20px |

Play/Pause ボタン:
- 背景: `var(--color-text-main)` = 白
- アイコン色: `var(--color-bg-main)` = 黒
- サイズ: 32x32px の円
- ホバー時: `scale-105`

Previous / Next ボタン:
- アイコン色: `var(--color-text-subtle)` = `#aaaaaa`
- ホバー時: `var(--color-text-main)` = `#ffffff`
- disabled 時: `opacity-50`、ホバー効果なし

#### ProgressBar

| 要素 | 仕様 |
|------|------|
| 経過時間 | 左端、`var(--text-xs)`、`var(--color-text-subtle)` |
| スライダー | input[type="range"] をカスタムスタイル。高さ 4px、ホバー時にスクラブハンドル表示 |
| トラック（未再生部分） | `var(--color-bg-elevated)` = `#272727` |
| トラック（再生済み部分） | `var(--color-text-main)` = `#ffffff` |
| 総時間 | 右端、`var(--text-xs)`、`var(--color-text-subtle)` |

時間表示フォーマット: `m:ss`（例: `1:23`、`0:05`、`12:34`）

### 右セクション: VolumeControl

| 要素 | 仕様 |
|------|------|
| アイコン（音量あり） | `SpeakerHigh` (volume > 0.5), `SpeakerLow` (volume > 0), `SpeakerNone` (volume === 0) |
| アイコン（ミュート） | `SpeakerSlash` |
| アイコンサイズ | 20px |
| アイコン色 | `var(--color-text-subtle)` |
| スライダー | 幅 100px、高さ 4px。ProgressBar と同じスタイル |

## レスポンシブ対応

### ブレークポイント

| デバイス | 条件 | 表示 |
|---------|------|------|
| デスクトップ | `md` 以上（768px〜） | フル表示 |
| モバイル | `md` 未満（〜767px） | コンパクト表示 |

### デスクトップ表示

前述の通り、左・中央・右の 3 セクション構成。

### モバイル表示

- 高さ: 56px + プログレスバー（4px）= 60px
- 上部にプログレスバーを配置（タップ操作不可、表示のみ）
- アートワーク（40x40px）+ タイトル / チャンネル名 + Play/Pause ボタン
- Previous / Next、ボリュームは非表示
- タップで将来的にフルスクリーンプレイヤーを展開（初期実装では未対応）

### CSS 変数の切り替え

`--spacing-bottom-player` はデスクトップ用の値（88px）。モバイル時は BottomPlayer 内で高さを直接指定する。レイアウト全体の調整は、BottomPlayer の表示/非表示に応じて `LayoutBody` 側で対応する。

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

## 実装ファイル構成

### 新規作成ファイル

```
src/
├── stores/
│   └── playerStore.ts                          # Zustand ストア
├── features/
│   └── app/
│       ├── components/
│       │   ├── BottomPlayer.tsx                 # 既存ファイルを置き換え
│       │   ├── BottomPlayerDesktop.tsx          # デスクトップ表示
│       │   ├── BottomPlayerMobile.tsx           # モバイル表示
│       │   ├── TrackInfo.tsx                    # トラック情報表示
│       │   ├── PlaybackControls.tsx             # 再生コントロール
│       │   ├── ProgressBar.tsx                  # プログレスバー
│       │   └── VolumeControl.tsx                # ボリュームコントロール
│       ├── hooks/
│       │   └── useAudioPlayer.ts               # Audio API フック
│       └── utils/
│           ├── trackConverter.ts               # Track 変換関数
│           └── formatTime.ts                   # 時間フォーマット
```

### 既存ファイルの変更

| ファイル | 変更内容 |
|---------|---------|
| `src/features/app/components/BottomPlayer.tsx` | プレースホルダーを実際の実装に置き換え |
| `src/styles/globals.css` | モバイル用の `--spacing-bottom-player` 調整（必要に応じて） |

## 実装手順

### Step 1: Player Store

`src/stores/playerStore.ts` を作成。Zustand ストアの State / Actions を実装し、`persist` ミドルウェアで volume を永続化する。

### Step 2: Track 変換関数・ユーティリティ

- `src/features/app/utils/trackConverter.ts` に `toTrackFromEpisode`、`toTrackFromVoice` を実装
- `src/features/app/utils/formatTime.ts` に時間フォーマット関数を実装

### Step 3: useAudioPlayer フック

`src/features/app/hooks/useAudioPlayer.ts` を作成。Audio インスタンスの管理と Store との同期を実装する。

### Step 4: UI コンポーネント（デスクトップ）

以下の順で実装:

1. `TrackInfo` — アートワーク + タイトル + チャンネル名
2. `ProgressBar` — シークバー + 時間表示
3. `PlaybackControls` — Previous / Play|Pause / Next + ProgressBar
4. `VolumeControl` — ミュートボタン + スライダー
5. `BottomPlayerDesktop` — 3 セクションの統合

### Step 5: UI コンポーネント（モバイル）

1. `BottomPlayerMobile` — コンパクト表示

### Step 6: BottomPlayer 統合

`BottomPlayer.tsx` でデスクトップ / モバイルの切り替えと `useAudioPlayer` の呼び出しを実装。

### Step 7: テスト・動作確認

- Player Store のユニットテスト
- `formatTime` のユニットテスト
- `trackConverter` のユニットテスト
- Storybook で各コンポーネントの表示確認

## 注意事項・将来の拡張

### 注意事項

- **自動再生ポリシー**: ブラウザの自動再生ポリシーにより、ユーザー操作なしに `audio.play()` が失敗する場合がある。`play()` の返り値（Promise）を適切にハンドリングし、失敗時は `isPlaying` を `false` に戻す
- **メモリリーク防止**: `useAudioPlayer` のクリーンアップで、Audio イベントリスナーの解除と `audio.src` のクリアを行う
- **SSR 対応**: `Audio` はブラウザ API のため、`useAudioPlayer` 内で `typeof window !== 'undefined'` のガードが必要

### 将来の拡張候補

| 機能 | 説明 |
|------|------|
| シャッフル再生 | キューをシャッフルして再生する |
| リピート再生 | 1曲リピート / 全曲リピート |
| 再生速度変更 | 0.5x / 1x / 1.5x / 2x |
| フルスクリーンプレイヤー | モバイルでタップ時に展開 |
| MediaSession API | OS のメディアコントロールとの連携 |
| キーボードショートカット（グローバル） | プレイヤーにフォーカスがない状態でも操作可能 |
