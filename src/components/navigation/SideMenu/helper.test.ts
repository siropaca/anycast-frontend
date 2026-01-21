import { describe, expect, it } from 'vitest';
import {
  isActivePath,
  removeQueryString,
  withActiveState,
} from '@/components/navigation/SideMenu/helper';
import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';

describe('helper', () => {
  describe('removeQueryString()', () => {
    it('query string を除去する', () => {
      expect(removeQueryString('/explore?q=test')).toBe('/explore');
      expect(removeQueryString('/settings?tab=1&page=2')).toBe('/settings');
    });

    it('query string がない場合はそのまま返す', () => {
      expect(removeQueryString('/settings')).toBe('/settings');
      expect(removeQueryString('/')).toBe('/');
    });
  });

  describe('isActivePath()', () => {
    describe('完全一致', () => {
      it('パスが完全一致する場合は true を返す', () => {
        expect(isActivePath('/', '/')).toBe(true);
        expect(isActivePath('/studio/channels', '/studio/channels')).toBe(true);
      });

      it('パスが一致しない場合は false を返す', () => {
        expect(isActivePath('/explore', '/')).toBe(false);
        expect(isActivePath('/studio/dashboard', '/studio/channels')).toBe(
          false,
        );
      });

      it('前方一致でも完全一致しない場合は false を返す', () => {
        expect(isActivePath('/studio/channels/123', '/studio/channels')).toBe(
          false,
        );
        expect(
          isActivePath('/studio/channels/123/edit', '/studio/channels'),
        ).toBe(false);
      });
    });

    describe('query string の除去', () => {
      it('query string を除去してから比較する', () => {
        expect(
          isActivePath('/settings/account?tab=1', '/settings/account'),
        ).toBe(true);
        expect(isActivePath('/explore?q=test', '/explore')).toBe(true);
      });
    });

    describe('matchPaths', () => {
      it('matchPaths に含まれるパスと一致した場合は true を返す', () => {
        expect(
          isActivePath('/settings', '/settings/account', {
            matchPaths: ['/settings'],
          }),
        ).toBe(true);
      });

      it('複数の matchPaths をサポートする', () => {
        expect(
          isActivePath('/settings', '/settings/account', {
            matchPaths: ['/settings', '/config'],
          }),
        ).toBe(true);
        expect(
          isActivePath('/config', '/settings/account', {
            matchPaths: ['/settings', '/config'],
          }),
        ).toBe(true);
      });

      it('href にも matchPaths にも一致しない場合は false を返す', () => {
        expect(
          isActivePath('/other', '/settings/account', {
            matchPaths: ['/settings'],
          }),
        ).toBe(false);
      });
    });

    describe('matchPrefix', () => {
      it('matchPrefix に含まれるプレフィックスで始まる場合は true を返す', () => {
        expect(
          isActivePath('/studio/channels/new', '/studio/channels', {
            matchPrefix: ['/studio/channels/'],
          }),
        ).toBe(true);
      });

      it('動的パスにマッチする', () => {
        expect(
          isActivePath('/studio/channels/123/edit', '/studio/channels', {
            matchPrefix: ['/studio/channels/'],
          }),
        ).toBe(true);
      });

      it('プレフィックスに一致しない場合は false を返す', () => {
        expect(
          isActivePath('/studio/dashboard', '/studio/channels', {
            matchPrefix: ['/studio/channels/'],
          }),
        ).toBe(false);
      });

      it('matchPaths と matchPrefix を併用できる', () => {
        const options = {
          matchPaths: ['/studio'],
          matchPrefix: ['/studio/channels/'],
        };

        // matchPaths でマッチ
        expect(isActivePath('/studio', '/studio/channels', options)).toBe(true);

        // matchPrefix でマッチ
        expect(
          isActivePath(
            '/studio/channels/123/edit',
            '/studio/channels',
            options,
          ),
        ).toBe(true);

        // どちらにもマッチしない
        expect(
          isActivePath('/studio/dashboard', '/studio/channels', options),
        ).toBe(false);
      });
    });
  });

  describe('withActiveState()', () => {
    const mockIcon = (() => null) as unknown as MenuSection['items'][0]['icon'];

    it('現在のパスに一致するアイテムに isActive: true を付与する', () => {
      const sections: MenuSection[] = [
        {
          items: [
            { label: 'Home', href: '/', icon: mockIcon },
            { label: 'Explore', href: '/explore', icon: mockIcon },
          ],
        },
      ];

      const result = withActiveState(sections, '/');

      expect(result[0].items[0].isActive).toBe(true);
      expect(result[0].items[1].isActive).toBe(false);
    });

    it('完全一致でアクティブ状態を判定する', () => {
      const sections: MenuSection[] = [
        {
          items: [
            { label: 'Channels', href: '/studio/channels', icon: mockIcon },
            { label: 'Dashboard', href: '/studio/dashboard', icon: mockIcon },
          ],
        },
      ];

      const result = withActiveState(sections, '/studio/channels');

      expect(result[0].items[0].isActive).toBe(true);
      expect(result[0].items[1].isActive).toBe(false);
    });

    it('matchPaths を使用してアクティブ状態を判定する', () => {
      const sections: MenuSection[] = [
        {
          items: [
            {
              label: 'Account',
              href: '/settings/account',
              icon: mockIcon,
              matchPaths: ['/settings'],
            },
            {
              label: 'Subscription',
              href: '/settings/subscription',
              icon: mockIcon,
            },
          ],
        },
      ];

      const result = withActiveState(sections, '/settings');

      expect(result[0].items[0].isActive).toBe(true);
      expect(result[0].items[1].isActive).toBe(false);
    });

    it('matchPrefix を使用してアクティブ状態を判定する', () => {
      const sections: MenuSection[] = [
        {
          items: [
            {
              label: 'Channels',
              href: '/studio/channels',
              icon: mockIcon,
              matchPrefix: ['/studio/channels/'],
            },
            { label: 'Dashboard', href: '/studio/dashboard', icon: mockIcon },
          ],
        },
      ];

      const result = withActiveState(sections, '/studio/channels/123/edit');

      expect(result[0].items[0].isActive).toBe(true);
      expect(result[0].items[1].isActive).toBe(false);
    });

    it('複数セクションを処理できる', () => {
      const sections: MenuSection[] = [
        {
          title: 'Main',
          items: [{ label: 'Home', href: '/', icon: mockIcon }],
        },
        {
          title: 'Library',
          items: [
            { label: 'Favorites', href: '/library/favorites', icon: mockIcon },
          ],
        },
      ];

      const result = withActiveState(sections, '/library/favorites');

      expect(result[0].items[0].isActive).toBe(false);
      expect(result[1].items[0].isActive).toBe(true);
    });

    it('元のセクションを変更しない', () => {
      const sections: MenuSection[] = [
        {
          items: [{ label: 'Home', href: '/', icon: mockIcon }],
        },
      ];

      withActiveState(sections, '/');

      expect(sections[0].items[0].isActive).toBeUndefined();
    });
  });
});
