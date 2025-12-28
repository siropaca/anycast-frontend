import { Paths } from '@/libs/paths';

describe('Paths', () => {
  describe('home', () => {
    it('ホームページのパスを返す', () => {
      expect(Paths.home()).toBe('/');
    });
  });

  describe('login', () => {
    it('ログインページのパスを返す', () => {
      expect(Paths.login()).toBe('/login');
    });

    it('redirect パラメータ付きのパスを返す', () => {
      expect(Paths.login({ redirect: '/dashboard' })).toBe(
        '/login?redirect=%2Fdashboard',
      );
    });

    it('redirect が undefined の場合はパラメータなしのパスを返す', () => {
      expect(Paths.login({ redirect: undefined })).toBe('/login');
    });
  });

  describe('signup', () => {
    it('サインアップページのパスを返す', () => {
      expect(Paths.signup()).toBe('/signup');
    });

    it('redirect パラメータ付きのパスを返す', () => {
      expect(Paths.signup({ redirect: '/settings' })).toBe(
        '/signup?redirect=%2Fsettings',
      );
    });
  });

  describe('studio', () => {
    it('Studio ダッシュボードのパスを返す', () => {
      expect(Paths.studio.index()).toBe('/studio');
    });
  });

  describe('settings', () => {
    it('設定ページのパスを返す', () => {
      expect(Paths.settings.index()).toBe('/settings');
    });
  });
});
