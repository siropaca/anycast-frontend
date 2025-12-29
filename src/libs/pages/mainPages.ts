import { buildQuery } from '@/libs/pages/buildQuery';

export const mainPages = {
  /** ホーム */
  home: {
    path: () => '/',
    title: 'ホーム',
  },

  /** ログイン */
  login: {
    path: (params?: {
      redirect?: string; // ログイン後のリダイレクト先
    }) => `/login${buildQuery(params)}`,
    title: 'ログイン',
  },

  /** 新規登録 */
  signup: {
    path: (params?: {
      redirect?: string; // ログイン後のリダイレクト先
    }) => `/signup${buildQuery(params)}`,
    title: '新規登録',
  },

  /** 検索 */
  search: {
    path: () => '/search',
    title: '検索',
  },

  /** ライブラリ */
  library: {
    /** お気に入り */
    favorites: {
      path: () => '/library/favorites',
      title: 'お気に入り',
    },
    /** フォロー中 */
    following: {
      path: () => '/library/following',
      title: 'フォロー中',
    },
  },
} as const;
