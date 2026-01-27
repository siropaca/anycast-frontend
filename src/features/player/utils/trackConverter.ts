import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas/responseVoiceResponse';
import type { Track } from '@/stores/playerStore';

/**
 * エピソードレスポンスを Track に変換する
 *
 * @param episode - エピソードレスポンス
 * @param channelName - チャンネル名
 * @returns Track オブジェクト
 * @throws fullAudio が存在しない場合
 *
 * @example
 * toTrackFromEpisode(episode, 'My Channel')
 * // => { id: '...', type: 'episode', title: '...', ... }
 */
export function toTrackFromEpisode(
  episode: ResponseEpisodeResponse,
  channelName: string,
): Track {
  if (!episode.fullAudio) {
    throw new Error('エピソードに音声データが存在しません');
  }

  return {
    id: episode.id,
    type: 'episode',
    title: episode.title,
    channelName,
    artworkUrl: episode.artwork?.url,
    audioUrl: episode.fullAudio.url,
    durationMs: episode.fullAudio.durationMs,
  };
}

/**
 * ボイスレスポンスを Track に変換する
 *
 * @param voice - ボイスレスポンス
 * @returns Track オブジェクト
 *
 * @example
 * toTrackFromVoice(voice)
 * // => { id: '...', type: 'voiceSample', title: '...', ... }
 */
export function toTrackFromVoice(voice: ResponseVoiceResponse): Track {
  return {
    id: voice.id,
    type: 'voiceSample',
    title: voice.name,
    channelName: undefined,
    artworkUrl: undefined,
    audioUrl: voice.sampleAudioUrl,
    durationMs: 0,
  };
}
