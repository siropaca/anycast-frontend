/** チャンネル詳細ページのパラメータ */
export interface ChannelParams {
  id: string;
}

/** チャンネル編集ページのパラメータ */
export interface EditChannelParams {
  id: string;
}

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
  /** チャンネル詳細 */
  channel: {
    path: (params: ChannelParams) => `/studio/channels/${params.id}`,
    title: 'チャンネル詳細',
  },
  /** チャンネル編集 */
  editChannel: {
    path: (params: EditChannelParams) => `/studio/channels/${params.id}/edit`,
    title: 'チャンネル編集',
  },
} as const;
