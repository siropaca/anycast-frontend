import { describe, expect, it } from 'vitest';
import {
  parseSelectValue,
  toSelectValue,
} from '@/features/studio/channels/utils/bgmSelect';
import type { ResponseChannelDefaultBgmResponse } from '@/libs/api/generated/schemas';

function createDefaultBgm(
  overrides: Partial<ResponseChannelDefaultBgmResponse> = {},
): ResponseChannelDefaultBgmResponse {
  return {
    id: 'bgm-1',
    name: 'Test BGM',
    isSystem: false,
    audio: {
      id: 'audio-1',
      url: 'https://example.com/audio.mp3',
      durationMs: 60000,
    },
    ...overrides,
  };
}

describe('bgmSelect', () => {
  describe('toSelectValue()', () => {
    it('undefined の場合は空文字を返す', () => {
      expect(toSelectValue(undefined)).toBe('');
    });

    it('null の場合は空文字を返す', () => {
      expect(toSelectValue(null)).toBe('');
    });

    it('ユーザーBGM の場合は "user:{id}" を返す', () => {
      const bgm = createDefaultBgm({ id: 'abc', isSystem: false });
      expect(toSelectValue(bgm)).toBe('user:abc');
    });

    it('システムBGM の場合は "system:{id}" を返す', () => {
      const bgm = createDefaultBgm({ id: '123', isSystem: true });
      expect(toSelectValue(bgm)).toBe('system:123');
    });
  });

  describe('parseSelectValue()', () => {
    it('"user:{id}" をパースできる', () => {
      expect(parseSelectValue('user:abc')).toEqual({
        type: 'user',
        id: 'abc',
      });
    });

    it('"system:{id}" をパースできる', () => {
      expect(parseSelectValue('system:123')).toEqual({
        type: 'system',
        id: '123',
      });
    });

    it('空文字の場合は undefined を返す', () => {
      expect(parseSelectValue('')).toBeUndefined();
    });

    it('コロンがない場合は undefined を返す', () => {
      expect(parseSelectValue('invalid')).toBeUndefined();
    });

    it('type が不正な場合は undefined を返す', () => {
      expect(parseSelectValue('unknown:abc')).toBeUndefined();
    });
  });
});
