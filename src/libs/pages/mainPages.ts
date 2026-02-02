import { buildQuery } from '@/libs/pages/buildQuery';

/** ユーザーページのパラメータ */
export interface UserParams {
  username: string;
}

/** チャンネル詳細ページのパラメータ */
export interface ChannelParams {
  channelSlug: string;
}

/** エピソード詳細ページのパラメータ */
export interface EpisodeParams {
  channelSlug: string;
  episodeId: string;
}

/** 再生リスト詳細ページのパラメータ */
export interface PlaylistDetailParams {
  playlistId: string;
}

/** ログインページの検索パラメータ */
export type LoginSearchParams = {
  /** ログイン後のリダイレクト先 */
  redirect?: string;
};

/** 新規登録ページの検索パラメータ */
export type SignupSearchParams = {
  /** 登録後のリダイレクト先 */
  redirect?: string;
};

/** 探索ページの検索パラメータ */
export type ExploreSearchParams = {
  q?: string;
};

export const mainPages = {
  /** ホーム */
  home: {
    path: () => '/',
    title: 'ホーム',
  },
  /** ユーザー */
  user: {
    path: (params: UserParams) => `/users/${params.username}`,
    title: (params: UserParams) => `@${params.username}`,
  },
  /** チャンネル詳細 */
  channel: {
    path: (params: ChannelParams) => `/channel/${params.channelSlug}`,
    title: 'チャンネル詳細',
  },
  /** エピソード詳細 */
  episode: {
    path: (params: EpisodeParams) =>
      `/channel/${params.channelSlug}/episodes/${params.episodeId}`,
    title: 'エピソード詳細',
  },
  /** ログイン */
  login: {
    path: (params?: LoginSearchParams) => `/login${buildQuery(params)}`,
    title: 'ログイン',
  },
  /** 新規登録 */
  signup: {
    path: (params?: SignupSearchParams) => `/signup${buildQuery(params)}`,
    title: '新規登録',
  },
  /** おすすめのエピソード一覧 */
  episodes: {
    path: () => '/episodes',
    title: 'おすすめのエピソード',
  },
  /** おすすめのチャンネル一覧 */
  channels: {
    path: () => '/channels',
    title: 'おすすめのチャンネル',
  },
  /** 探索 */
  explore: {
    path: (params?: ExploreSearchParams) => `/explore${buildQuery(params)}`,
    title: '探索',
  },
  /** ライブラリ */
  library: {
    /** フォロー中 */
    following: {
      path: () => '/library/following',
      title: 'フォロー中',
      pageTitle: 'フォロー中のユーザー',
    },
    /** 再生リスト */
    playList: {
      path: () => '/library/playlist',
      title: '再生リスト',
    },
    /** 再生リスト詳細 */
    playListDetail: {
      path: (params: PlaylistDetailParams) =>
        `/library/playlist/${params.playlistId}`,
      title: '再生リスト詳細', // プレイリスト名で置換
    },
    /** 高評価 */
    likes: {
      path: () => '/library/likes',
      title: '高評価',
      pageTitle: '高評価したエピソード',
    },
    /** 履歴 */
    history: {
      path: () => '/library/history',
      title: '履歴',
    },
  },
  /** 利用規約 */
  terms: {
    path: () => '/terms',
    title: '利用規約',
  },
  /** プライバシーポリシー */
  privacy: {
    path: () => '/privacy',
    title: 'プライバシーポリシー',
  },
  /** お問い合わせ */
  contact: {
    path: () => '/contact',
    title: 'お問い合わせ',
  },
} as const;
