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
    it('新規登録ページのパスを返す', () => {
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

  describe('channel', () => {
    it('チャンネル詳細ページのパスを返す', () => {
      expect(Pages.channel.path({ channelSlug: 'my-channel' })).toBe(
        '/channel/my-channel',
      );
    });

    it('タイトルを返す', () => {
      expect(Pages.channel.title).toBe('チャンネル詳細');
    });
  });

  describe('episode', () => {
    it('エピソード詳細ページのパスを返す', () => {
      expect(
        Pages.episode.path({ channelSlug: 'ch-456', episodeId: 'ep-123' }),
      ).toBe('/channel/ch-456/episodes/ep-123');
    });

    it('タイトルを返す', () => {
      expect(Pages.episode.title).toBe('エピソード詳細');
    });
  });

  describe('episodes', () => {
    it('おすすめのエピソード一覧ページのパスを返す', () => {
      expect(Pages.episodes.path()).toBe('/episodes');
    });

    it('タイトルを返す', () => {
      expect(Pages.episodes.title).toBe('おすすめのエピソード');
    });
  });

  describe('channels', () => {
    it('おすすめのチャンネル一覧ページのパスを返す', () => {
      expect(Pages.channels.path()).toBe('/channels');
    });

    it('タイトルを返す', () => {
      expect(Pages.channels.title).toBe('おすすめのチャンネル');
    });
  });

  describe('explore', () => {
    it('見つけるページのパスを返す', () => {
      expect(Pages.explore.path()).toBe('/explore');
    });

    it('q パラメータ付きのパスを返す', () => {
      expect(Pages.explore.path({ q: 'test' })).toBe('/explore?q=test');
    });

    it('q が undefined の場合はパラメータなしのパスを返す', () => {
      expect(Pages.explore.path({ q: undefined })).toBe('/explore');
    });

    it('タイトルを返す', () => {
      expect(Pages.explore.title).toBe('見つける');
    });
  });

  describe('library', () => {
    it('フォロー中ページのパスを返す', () => {
      expect(Pages.library.following.path()).toBe('/library/following');
    });

    it('フォロー中のタイトルを返す', () => {
      expect(Pages.library.following.title).toBe('フォロー中');
    });

    it('フォロー中のページタイトルを返す', () => {
      expect(Pages.library.following.pageTitle).toBe('フォロー中のユーザー');
    });

    it('再生リストページのパスを返す', () => {
      expect(Pages.library.playList.path()).toBe('/library/playlist');
    });

    it('再生リストのタイトルを返す', () => {
      expect(Pages.library.playList.title).toBe('再生リスト');
    });

    it('再生リスト詳細ページのパスを返す', () => {
      expect(Pages.library.playListDetail.path({ playlistId: 'pl-123' })).toBe(
        '/library/playlist/pl-123',
      );
    });

    it('再生リスト詳細のタイトルを返す', () => {
      expect(Pages.library.playListDetail.title).toBe('再生リスト詳細');
    });

    it('高評価ページのパスを返す', () => {
      expect(Pages.library.likes.path()).toBe('/library/likes');
    });

    it('高評価のタイトルを返す', () => {
      expect(Pages.library.likes.title).toBe('高評価');
    });

    it('高評価のページタイトルを返す', () => {
      expect(Pages.library.likes.pageTitle).toBe('高評価したエピソード');
    });
  });

  describe('studio', () => {
    it('Studio トップのパスを返す', () => {
      expect(Pages.studio.index.path()).toBe('/studio');
    });

    it('Studio トップのタイトルを返す', () => {
      expect(Pages.studio.index.title).toBe('スタジオ');
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
      expect(Pages.settings.index.title).toBe('設定');
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
