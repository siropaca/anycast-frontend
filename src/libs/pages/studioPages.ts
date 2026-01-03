/** チャンネル詳細ページのパラメータ */
export interface ChannelParams {
  id: string;
}

/** チャンネル編集ページのパラメータ */
export interface EditChannelParams {
  id: string;
}

/** エピソード作成ページのパラメータ */
export interface NewEpisodeParams {
  id: string;
}

/** エピソード編集ページのパラメータ */
export interface EditEpisodeParams {
  id: string;
  episodeId: string;
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
  /** エピソード作成 */
  newEpisode: {
    path: (params: NewEpisodeParams) =>
      `/studio/channels/${params.id}/episodes/new`,
    title: 'エピソード作成',
  },
  /** エピソード編集 */
  editEpisode: {
    path: (params: EditEpisodeParams) =>
      `/studio/channels/${params.id}/episodes/${params.episodeId}/edit`,
    title: 'エピソード編集',
  },
} as const;
