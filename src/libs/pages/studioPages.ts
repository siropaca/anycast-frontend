export const studioPages = {
  /** Studio トップ（-> ダッシュボード） */
  index: {
    path: () => '/studio',
    title: 'スタジオ',
  },
  /** ダッシュボード */
  dashboard: {
    path: () => '/studio/dashboard',
    title: 'ダッシュボード',
  },
  /** チャンネル一覧 */
  channels: {
    path: () => '/studio/channels',
    title: 'チャンネル',
  },
  /** チャンネル作成 */
  newChannel: {
    path: () => '/studio/channels/new',
    title: 'チャンネル作成',
  },
  /** チャンネル編集 */
  editChannel: {
    path: (id: string) => `/studio/channels/${id}/edit`,
    title: 'チャンネル編集',
  },
} as const;
