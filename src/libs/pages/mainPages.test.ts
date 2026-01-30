import { describe, expect, it } from 'vitest';
import { mainPages } from '@/libs/pages/mainPages';

describe('mainPages', () => {
  describe('home', () => {
    it('path が / を返す', () => {
      expect(mainPages.home.path()).toBe('/');
    });

    it('title が設定されている', () => {
      expect(mainPages.home.title).toBe('ホーム');
    });
  });

  describe('login', () => {
    it('パラメータなしで /login を返す', () => {
      expect(mainPages.login.path()).toBe('/login');
    });

    it('redirect パラメータ付きでクエリストリングを含む', () => {
      expect(mainPages.login.path({ redirect: '/dashboard' })).toBe(
        '/login?redirect=%2Fdashboard',
      );
    });

    it('title が設定されている', () => {
      expect(mainPages.login.title).toBe('ログイン');
    });
  });

  describe('signup', () => {
    it('パラメータなしで /signup を返す', () => {
      expect(mainPages.signup.path()).toBe('/signup');
    });

    it('redirect パラメータ付きでクエリストリングを含む', () => {
      expect(mainPages.signup.path({ redirect: '/studio' })).toBe(
        '/signup?redirect=%2Fstudio',
      );
    });

    it('title が設定されている', () => {
      expect(mainPages.signup.title).toBe('新規登録');
    });
  });

  describe('explore', () => {
    it('パラメータなしで /explore を返す', () => {
      expect(mainPages.explore.path()).toBe('/explore');
    });

    it('q パラメータ付きでクエリストリングを含む', () => {
      expect(mainPages.explore.path({ q: 'test' })).toBe('/explore?q=test');
    });

    it('title が設定されている', () => {
      expect(mainPages.explore.title).toBe('探索');
    });
  });

  describe('library', () => {
    it('following の path が /library/following を返す', () => {
      expect(mainPages.library.following.path()).toBe('/library/following');
    });

    it('following の title が設定されている', () => {
      expect(mainPages.library.following.title).toBe('フォロー中');
    });

    it('playList の path が /library/playlist を返す', () => {
      expect(mainPages.library.playList.path()).toBe('/library/playlist');
    });

    it('playList の title が設定されている', () => {
      expect(mainPages.library.playList.title).toBe('再生リスト');
    });

    it('favorites の path が /library/favorites を返す', () => {
      expect(mainPages.library.favorites.path()).toBe('/library/favorites');
    });

    it('favorites の title が設定されている', () => {
      expect(mainPages.library.favorites.title).toBe('お気に入り');
    });

    it('history の path が /library/history を返す', () => {
      expect(mainPages.library.history.path()).toBe('/library/history');
    });

    it('history の title が設定されている', () => {
      expect(mainPages.library.history.title).toBe('履歴');
    });
  });
});
