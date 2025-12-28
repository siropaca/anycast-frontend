import { buildQuery } from '@/libs/paths/buildQuery';

/**
 * アプリケーションのパス定義
 *
 * @example
 * Paths.home()                            // => '/'
 * Paths.login()                           // => '/login'
 * Paths.login({ redirect: '/dashboard' }) // => '/login?redirect=%2Fdashboard'
 * Paths.studio.index()                    // => '/studio'
 * Paths.settings.index()                  // => '/settings'
 */
export const Paths = {
  /** ホームページ */
  home: () => '/',

  /** ログインページ */
  login: (params?: {
    redirect?: string; // ログイン後のリダイレクト先
  }) => `/login${buildQuery(params)}`,

  /** 新規登録ページ */
  signup: (params?: {
    redirect?: string; // ログイン後のリダイレクト先
  }) => `/signup${buildQuery(params)}`,

  /** Studio */
  studio: {
    /** ダッシュボード */
    index: () => '/studio',
  },

  /** 設定 */
  settings: {
    /** 設定トップ */
    index: () => '/settings',
  },
} as const;
