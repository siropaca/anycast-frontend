import { describe, expect, it } from 'vitest';
import { studioPages } from '@/libs/pages/studioPages';

describe('studioPages', () => {
  describe('index', () => {
    it('path が /studio を返す', () => {
      expect(studioPages.index.path()).toBe('/studio');
    });

    it('title が設定されている', () => {
      expect(studioPages.index.title).toBe('スタジオ');
    });
  });

  describe('dashboard', () => {
    it('path が /studio/dashboard を返す', () => {
      expect(studioPages.dashboard.path()).toBe('/studio/dashboard');
    });

    it('title が設定されている', () => {
      expect(studioPages.dashboard.title).toBe('ダッシュボード');
    });
  });

  describe('channels', () => {
    it('path が /studio/channels を返す', () => {
      expect(studioPages.channels.path()).toBe('/studio/channels');
    });

    it('title が設定されている', () => {
      expect(studioPages.channels.title).toBe('チャンネル');
    });
  });

  describe('channel', () => {
    it('path が id を含むパスを返す', () => {
      expect(studioPages.channel.path({ id: '123' })).toBe(
        '/studio/channels/123',
      );
    });

    it('title が設定されている', () => {
      expect(studioPages.channel.title).toBe('チャンネル詳細');
    });
  });

  describe('newChannel', () => {
    it('path が /studio/channels/new を返す', () => {
      expect(studioPages.newChannel.path()).toBe('/studio/channels/new');
    });

    it('title が設定されている', () => {
      expect(studioPages.newChannel.title).toBe('チャンネル作成');
    });
  });

  describe('editChannel', () => {
    it('path が id を含むパスを返す', () => {
      expect(studioPages.editChannel.path({ id: '123' })).toBe(
        '/studio/channels/123/edit',
      );
    });

    it('title が設定されている', () => {
      expect(studioPages.editChannel.title).toBe('チャンネル編集');
    });
  });

  describe('episode', () => {
    it('path が id と episodeId を含むパスを返す', () => {
      expect(studioPages.episode.path({ id: '123', episodeId: '456' })).toBe(
        '/studio/channels/123/episodes/456',
      );
    });

    it('title が設定されている', () => {
      expect(studioPages.episode.title).toBe('エピソード詳細');
    });
  });

  describe('newEpisode', () => {
    it('path が id を含むパスを返す', () => {
      expect(studioPages.newEpisode.path({ id: '123' })).toBe(
        '/studio/channels/123/episodes/new',
      );
    });

    it('title が設定されている', () => {
      expect(studioPages.newEpisode.title).toBe('エピソード作成');
    });
  });

  describe('editEpisode', () => {
    it('path が id と episodeId を含むパスを返す', () => {
      expect(
        studioPages.editEpisode.path({ id: '123', episodeId: '456' }),
      ).toBe('/studio/channels/123/episodes/456/edit');
    });

    it('title が設定されている', () => {
      expect(studioPages.editEpisode.title).toBe('エピソード編集');
    });
  });

  describe('characters', () => {
    it('path が /studio/characters を返す', () => {
      expect(studioPages.characters.path()).toBe('/studio/characters');
    });

    it('title が設定されている', () => {
      expect(studioPages.characters.title).toBe('キャラクター');
    });
  });

  describe('bgm', () => {
    it('path が /studio/bgm を返す', () => {
      expect(studioPages.bgm.path()).toBe('/studio/bgm');
    });

    it('title が設定されている', () => {
      expect(studioPages.bgm.title).toBe('BGM');
    });
  });

  describe('voices', () => {
    it('path が /studio/voices を返す', () => {
      expect(studioPages.voices.path()).toBe('/studio/voices');
    });

    it('title が設定されている', () => {
      expect(studioPages.voices.title).toBe('ボイス');
    });
  });
});
