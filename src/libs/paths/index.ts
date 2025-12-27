import { buildQuery } from '@/libs/paths/buildQuery';

/**
 * アプリケーションのパス定義
 *
 * @example
 * Paths.home()                            // => '/'
 * Paths.login()                           // => '/login'
 * Paths.login({ redirect: '/dashboard' }) // => '/login?redirect=%2Fdashboard'
 */
export const Paths = {
  /** ホームページ */
  home: () => '/',

  /** ログインページ */
  login: (params?: {
    redirect?: string; // ログイン後のリダイレクト先
  }) => `/login${buildQuery(params)}`,

  /** サインアップページ */
  signup: (params?: {
    redirect?: string; // サインアップ後のリダイレクト先
  }) => `/signup${buildQuery(params)}`,
} as const;
