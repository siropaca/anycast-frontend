import { Pages } from '@/libs/pages';

describe('Pages', () => {
  describe('home', () => {
    it('ホームページのパスを返す', () => {
      expect(Pages.home.path()).toBe('/');
    });

    it('タイトルを返す', () => {
      expect(Pages.home.title).toBe('ホーム');
    });
  });

  describe('login', () => {
    it('ログインページのパスを返す', () => {
      expect(Pages.login.path()).toBe('/login');
    });

    it('redirect パラメータ付きのパスを返す', () => {
      expect(Pages.login.path({ redirect: '/dashboard' })).toBe(
        '/login?redirect=%2Fdashboard',
      );
    });

    it('redirect が undefined の場合はパラメータなしのパスを返す', () => {
      expect(Pages.login.path({ redirect: undefined })).toBe('/login');
    });

    it('タイトルを返す', () => {
      expect(Pages.login.title).toBe('ログイン');
    });
  });

  describe('signup', () => {
    it('サインアップページのパスを返す', () => {
      expect(Pages.signup.path()).toBe('/signup');
    });

    it('redirect パラメータ付きのパスを返す', () => {
      expect(Pages.signup.path({ redirect: '/settings' })).toBe(
        '/signup?redirect=%2Fsettings',
      );
    });

    it('タイトルを返す', () => {
      expect(Pages.signup.title).toBe('新規登録');
    });
  });

  describe('search', () => {
    it('検索ページのパスを返す', () => {
      expect(Pages.search.path()).toBe('/search');
    });

    it('タイトルを返す', () => {
      expect(Pages.search.title).toBe('検索');
    });
  });

  describe('library', () => {
    it('お気に入りページのパスを返す', () => {
      expect(Pages.library.favorites.path()).toBe('/library/favorites');
    });

    it('お気に入りのタイトルを返す', () => {
      expect(Pages.library.favorites.title).toBe('お気に入り');
    });

    it('フォロー中ページのパスを返す', () => {
      expect(Pages.library.following.path()).toBe('/library/following');
    });

    it('フォロー中のタイトルを返す', () => {
      expect(Pages.library.following.title).toBe('フォロー中');
    });
  });

  describe('studio', () => {
    it('Studio トップのパスを返す', () => {
      expect(Pages.studio.index.path()).toBe('/studio');
    });

    it('Studio トップのタイトルを返す', () => {
      expect(Pages.studio.index.title).toBe('ダッシュボード');
    });

    it('ダッシュボードページのパスを返す', () => {
      expect(Pages.studio.dashboard.path()).toBe('/studio/dashboard');
    });

    it('ダッシュボードのタイトルを返す', () => {
      expect(Pages.studio.dashboard.title).toBe('ダッシュボード');
    });

    it('チャンネルページのパスを返す', () => {
      expect(Pages.studio.channels.path()).toBe('/studio/channels');
    });

    it('チャンネルのタイトルを返す', () => {
      expect(Pages.studio.channels.title).toBe('チャンネル');
    });
  });

  describe('settings', () => {
    it('設定トップのパスを返す', () => {
      expect(Pages.settings.index.path()).toBe('/settings');
    });

    it('設定トップのタイトルを返す', () => {
      expect(Pages.settings.index.title).toBe('アカウント');
    });

    it('アカウントページのパスを返す', () => {
      expect(Pages.settings.account.path()).toBe('/settings/account');
    });

    it('アカウントのタイトルを返す', () => {
      expect(Pages.settings.account.title).toBe('アカウント');
    });

    it('サブスクリプションページのパスを返す', () => {
      expect(Pages.settings.subscription.path()).toBe('/settings/subscription');
    });

    it('サブスクリプションのタイトルを返す', () => {
      expect(Pages.settings.subscription.title).toBe('サブスクリプション');
    });
  });
});
