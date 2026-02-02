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

  describe('channel', () => {
    it('path が /channel/:channelSlug を返す', () => {
      expect(mainPages.channel.path({ channelSlug: 'my-channel' })).toBe(
        '/channel/my-channel',
      );
    });

    it('title が設定されている', () => {
      expect(mainPages.channel.title).toBe('チャンネル詳細');
    });
  });

  describe('episode', () => {
    it('path が /channel/:channelId/episodes/:episodeId を返す', () => {
      expect(
        mainPages.episode.path({ channelSlug: 'ch-456', episodeId: 'ep-123' }),
      ).toBe('/channel/ch-456/episodes/ep-123');
    });

    it('title が設定されている', () => {
      expect(mainPages.episode.title).toBe('エピソード詳細');
    });
  });

  describe('episodes', () => {
    it('path が /episodes を返す', () => {
      expect(mainPages.episodes.path()).toBe('/episodes');
    });

    it('title が設定されている', () => {
      expect(mainPages.episodes.title).toBe('おすすめのエピソード');
    });
  });

  describe('channels', () => {
    it('path が /channels を返す', () => {
      expect(mainPages.channels.path()).toBe('/channels');
    });

    it('title が設定されている', () => {
      expect(mainPages.channels.title).toBe('おすすめのチャンネル');
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

  describe('terms', () => {
    it('path が /terms を返す', () => {
      expect(mainPages.terms.path()).toBe('/terms');
    });

    it('title が設定されている', () => {
      expect(mainPages.terms.title).toBe('利用規約');
    });
  });

  describe('privacy', () => {
    it('path が /privacy を返す', () => {
      expect(mainPages.privacy.path()).toBe('/privacy');
    });

    it('title が設定されている', () => {
      expect(mainPages.privacy.title).toBe('プライバシーポリシー');
    });
  });

  describe('contact', () => {
    it('path が /contact を返す', () => {
      expect(mainPages.contact.path()).toBe('/contact');
    });

    it('title が設定されている', () => {
      expect(mainPages.contact.title).toBe('お問い合わせ');
    });
  });

  describe('library', () => {
    it('following の path が /library/following を返す', () => {
      expect(mainPages.library.following.path()).toBe('/library/following');
    });

    it('following の title が設定されている', () => {
      expect(mainPages.library.following.title).toBe('フォロー中');
    });

    it('following の pageTitle が設定されている', () => {
      expect(mainPages.library.following.pageTitle).toBe(
        'フォロー中のユーザー',
      );
    });

    it('playList の path が /library/playlist を返す', () => {
      expect(mainPages.library.playList.path()).toBe('/library/playlist');
    });

    it('playList の title が設定されている', () => {
      expect(mainPages.library.playList.title).toBe('再生リスト');
    });

    it('playListDetail の path が /library/playlist/:playlistId を返す', () => {
      expect(
        mainPages.library.playListDetail.path({ playlistId: 'pl-123' }),
      ).toBe('/library/playlist/pl-123');
    });

    it('playListDetail の title が設定されている', () => {
      expect(mainPages.library.playListDetail.title).toBe('再生リスト詳細');
    });

    it('likes の path が /library/likes を返す', () => {
      expect(mainPages.library.likes.path()).toBe('/library/likes');
    });

    it('likes の title が設定されている', () => {
      expect(mainPages.library.likes.title).toBe('高評価');
    });

    it('likes の pageTitle が設定されている', () => {
      expect(mainPages.library.likes.pageTitle).toBe('高評価したエピソード');
    });

    it('history の path が /library/history を返す', () => {
      expect(mainPages.library.history.path()).toBe('/library/history');
    });

    it('history の title が設定されている', () => {
      expect(mainPages.library.history.title).toBe('履歴');
    });
  });
});
