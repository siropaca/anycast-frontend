import type {
  IsActivePathOptions,
  MenuSection,
} from '@/components/navigation/SideMenu/types';
import { Pages } from '@/libs/pages';

export type { IsActivePathOptions } from '@/components/navigation/SideMenu/types';

/**
 * パスから query string を除去する
 *
 * @param path - パス
 * @returns query string を除去したパス
 *
 * @example
 * removeQueryString('/explore?q=test') // => '/explore'
 * removeQueryString('/settings') // => '/settings'
 */
export function removeQueryString(path: string): string {
  const index = path.indexOf('?');

  return index === -1 ? path : path.slice(0, index);
}

/**
 * 現在のパスがメニューアイテムのパスと一致するかを判定する
 *
 * @param pathname - 現在のパス（query string を含む場合があるので除去する）
 * @param href - メニューアイテムのパス
 * @param options - マッチングオプション
 * @param options.matchPaths - 追加でマッチさせるパス（完全一致）
 * @param options.matchPrefix - 前方一致でマッチさせるパス
 * @returns 一致する場合は true
 *
 * @example
 * isActivePath('/settings/account', '/settings/account') // => true
 * isActivePath('/settings/account?tab=1', '/settings/account') // => true
 * isActivePath('/settings', '/settings/account', { matchPaths: ['/settings'] }) // => true
 * isActivePath('/studio/channels/123/edit', '/studio/channels', { matchPrefix: ['/studio/channels/'] }) // => true
 * isActivePath('/studio/dashboard', '/studio/channels') // => false
 */
export function isActivePath(
  pathname: string,
  href: string,
  options?: IsActivePathOptions,
): boolean {
  const normalizedPathname = removeQueryString(pathname);

  // 完全一致チェック（href + matchPaths）
  const paths = [href, ...(options?.matchPaths ?? [])];
  if (paths.includes(normalizedPathname)) {
    return true;
  }

  // 前方一致チェック（matchPrefix）
  const prefixes = options?.matchPrefix ?? [];

  return prefixes.some((prefix) => normalizedPathname.startsWith(prefix));
}

/**
 * セクションの各アイテムに isActive を付与する
 *
 * @param sections - メニューセクション
 * @param pathname - 現在のパス
 * @returns isActive が付与されたセクション
 */
export function withActiveState(
  sections: MenuSection[],
  pathname: string,
): MenuSection[] {
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      isActive: isActivePath(pathname, item.href, {
        matchPaths: item.matchPaths,
        matchPrefix: item.matchPrefix,
      }),
    })),
  }));
}

/**
 * プロフィールアイテムの href をユーザー名で置き換える
 *
 * @param sections - メニューセクション
 * @param username - ユーザー名
 * @returns プロフィールの href が更新されたセクション
 */
export function withProfileHref(
  sections: MenuSection[],
  username: string,
): MenuSection[] {
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) =>
      item.label === 'プロフィール'
        ? { ...item, href: Pages.user.path(username) }
        : item,
    ),
  }));
}
