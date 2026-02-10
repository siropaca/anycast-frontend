import { describe, expect, it } from 'vitest';
import {
  buildBgmOptions,
  parseSelectValue,
  toSelectValue,
} from '@/features/studio/channels/utils/bgmSelect';
import type {
  ResponseBgmWithEpisodesResponse,
  ResponseChannelDefaultBgmResponse,
} from '@/libs/api/generated/schemas';

function createBgm(
  overrides: Partial<ResponseBgmWithEpisodesResponse> = {},
): ResponseBgmWithEpisodesResponse {
  return {
    id: 'bgm-1',
    name: 'Test BGM',
    isSystem: false,
    audio: { id: 'audio-1', url: 'https://example.com/audio.mp3' },
    channels: [],
    episodes: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    ...overrides,
  };
}

function createDefaultBgm(
  overrides: Partial<ResponseChannelDefaultBgmResponse> = {},
): ResponseChannelDefaultBgmResponse {
  return {
    id: 'bgm-1',
    name: 'Test BGM',
    isSystem: false,
    audio: { id: 'audio-1', url: 'https://example.com/audio.mp3' },
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

  describe('buildBgmOptions()', () => {
    it('空配列の場合は空配列を返す', () => {
      expect(buildBgmOptions([])).toEqual([]);
    });

    it('ユーザーBGM のみの場合はマイBGMグループのみ返す', () => {
      const bgms = [
        createBgm({ id: '1', name: 'BGM A', isSystem: false }),
        createBgm({ id: '2', name: 'BGM B', isSystem: false }),
      ];

      expect(buildBgmOptions(bgms)).toEqual([
        {
          label: 'マイBGM',
          options: [
            { label: 'BGM A', value: 'user:1' },
            { label: 'BGM B', value: 'user:2' },
          ],
        },
      ]);
    });

    it('システムBGM のみの場合はシステムグループのみ返す', () => {
      const bgms = [createBgm({ id: '1', name: 'System A', isSystem: true })];

      expect(buildBgmOptions(bgms)).toEqual([
        {
          label: 'システム',
          options: [{ label: 'System A', value: 'system:1' }],
        },
      ]);
    });

    it('両方ある場合はマイBGM → システムの順で返す', () => {
      const bgms = [
        createBgm({ id: '1', name: 'My BGM', isSystem: false }),
        createBgm({ id: '2', name: 'System BGM', isSystem: true }),
      ];

      const result = buildBgmOptions(bgms);
      expect(result).toHaveLength(2);
      expect(result[0].label).toBe('マイBGM');
      expect(result[1].label).toBe('システム');
    });
  });
});
