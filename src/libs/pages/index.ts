import { mainPages } from '@/libs/pages/mainPages';
import { settingsPages } from '@/libs/pages/settingsPages';
import { studioPages } from '@/libs/pages/studioPages';

/**
 * アプリケーションのページ定義
 *
 * @example
 * Pages.home.path()                            // => '/'
 * Pages.home.title                             // => 'ホーム'
 * Pages.login.path()                           // => '/login'
 * Pages.login.path({ redirect: '/dashboard' }) // => '/login?redirect=%2Fdashboard'
 * Pages.studio.index.path()                    // => '/studio'
 * Pages.settings.index.path()                  // => '/settings'
 */
export const Pages = {
  ...mainPages,
  studio: studioPages,
  settings: settingsPages,
} as const;
