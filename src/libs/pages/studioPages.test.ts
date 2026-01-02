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

  describe('newChannel', () => {
    it('path が /studio/channels/new を返す', () => {
      expect(studioPages.newChannel.path()).toBe('/studio/channels/new');
    });

    it('title が設定されている', () => {
      expect(studioPages.newChannel.title).toBe('チャンネル作成');
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
});
