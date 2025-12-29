export const studioPages = {
  /** Studio トップ（-> ダッシュボード） */
  index: {
    path: () => '/studio',
    title: 'ダッシュボード',
  },
  /** ダッシュボード */
  dashboard: {
    path: () => '/studio/dashboard',
    title: 'ダッシュボード',
  },
  /** チャンネル */
  channels: {
    path: () => '/studio/channels',
    title: 'チャンネル',
  },
} as const;
