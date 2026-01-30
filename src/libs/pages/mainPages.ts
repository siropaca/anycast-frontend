import { buildQuery } from '@/libs/pages/buildQuery';

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
    path: (username: string) => `/users/${username}`,
    title: (username: string) => `@${username}`,
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
    },
    /** 再生リスト */
    playList: {
      path: () => '/library/playlist',
      title: '再生リスト',
    },
    /** お気に入り */
    favorites: {
      path: () => '/library/favorites',
      title: 'お気に入り',
    },
    /** 履歴 */
    history: {
      path: () => '/library/history',
      title: '履歴',
    },
  },
} as const;
