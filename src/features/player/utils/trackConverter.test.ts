import {
  toTrackFromEpisode,
  toTrackFromVoice,
} from '@/features/player/utils/trackConverter';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas/responseVoiceResponse';

function createEpisode(
  overrides: Partial<ResponseEpisodeResponse> = {},
): ResponseEpisodeResponse {
  return {
    id: 'episode-1',
    title: 'テストエピソード',
    description: 'テスト説明',

    playCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    artwork: { id: 'artwork-1', url: 'https://example.com/artwork.png' },
    owner: {
      id: 'user-1',
      username: 'testuser',
      displayName: 'テストユーザー',
    },
    fullAudio: {
      id: 'audio-1',
      url: 'https://example.com/audio.mp3',
      durationMs: 300000,
      fileSize: 1024000,
      mimeType: 'audio/mpeg',
    },
    ...overrides,
  };
}

function createVoice(
  overrides: Partial<ResponseVoiceResponse> = {},
): ResponseVoiceResponse {
  return {
    id: 'voice-1',
    name: 'テストボイス',
    gender: 'male',
    isActive: true,
    provider: 'test-provider',
    providerVoiceId: 'test-voice-id',
    sampleAudioUrl: 'https://example.com/sample.mp3',
    ...overrides,
  };
}

describe('trackConverter', () => {
  describe('toTrackFromEpisode()', () => {
    it('エピソードを Track に変換する', () => {
      const episode = createEpisode();
      const track = toTrackFromEpisode(episode, 'テストチャンネル');

      expect(track).toEqual({
        id: 'episode-1',
        type: 'episode',
        title: 'テストエピソード',
        subtitle: 'テストチャンネル',
        artworkUrl: 'https://example.com/artwork.png',
        audioUrl: 'https://example.com/audio.mp3',
        durationMs: 300000,
      });
    });

    it('artwork が null の場合は artworkUrl が undefined になる', () => {
      const episode = createEpisode({ artwork: null });
      const track = toTrackFromEpisode(episode, 'テストチャンネル');

      expect(track.artworkUrl).toBeUndefined();
    });

    it('artwork が undefined の場合は artworkUrl が undefined になる', () => {
      const episode = createEpisode({ artwork: undefined });
      const track = toTrackFromEpisode(episode, 'テストチャンネル');

      expect(track.artworkUrl).toBeUndefined();
    });

    it('fullAudio が null の場合はエラーをスローする', () => {
      const episode = createEpisode({ fullAudio: null });

      expect(() => toTrackFromEpisode(episode, 'テストチャンネル')).toThrow(
        'エピソードに音声データが存在しません',
      );
    });

    it('fullAudio が undefined の場合はエラーをスローする', () => {
      const episode = createEpisode({ fullAudio: undefined });

      expect(() => toTrackFromEpisode(episode, 'テストチャンネル')).toThrow(
        'エピソードに音声データが存在しません',
      );
    });
  });

  describe('toTrackFromVoice()', () => {
    it('ボイスを Track に変換する', () => {
      const voice = createVoice({ provider: 'google' });
      const track = toTrackFromVoice(voice);

      expect(track).toEqual({
        id: 'voice-1',
        type: 'voiceSample',
        title: 'テストボイス',
        subtitle: 'Gemini TTS',
        artworkUrl: undefined,
        audioUrl: 'https://example.com/sample.mp3',
        durationMs: 0,
      });
    });

    it('未知のプロバイダーの場合は subtitle にそのまま設定される', () => {
      const voice = createVoice({ provider: 'unknown-provider' });
      const track = toTrackFromVoice(voice);

      expect(track.subtitle).toBe('unknown-provider');
    });
  });
});
