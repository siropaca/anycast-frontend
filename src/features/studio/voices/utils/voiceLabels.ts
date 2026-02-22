type VoiceProvider = 'google' | 'elevenlabs';
type VoiceGender = 'male' | 'female';

const PROVIDER_LABELS: Record<VoiceProvider, string> = {
  google: 'Gemini TTS',
  elevenlabs: 'ElevenLabs',
};

const GENDER_LABELS: Record<VoiceGender, string> = {
  male: '男性',
  female: '女性',
};

/**
 * プロバイダー名を表示用ラベルに変換する
 *
 * @param provider - プロバイダー名
 * @returns 表示用ラベル
 *
 * @example
 * getProviderLabel('google') // => 'Gemini TTS'
 */
export function getProviderLabel(provider: string): string {
  if (provider in PROVIDER_LABELS) {
    return PROVIDER_LABELS[provider as VoiceProvider];
  }
  return provider;
}

/**
 * 性別を表示用ラベルに変換する
 *
 * @param gender - 性別
 * @returns 表示用ラベル
 *
 * @example
 * getGenderLabel('male') // => '男性'
 */
export function getGenderLabel(gender: string): string {
  if (gender in GENDER_LABELS) {
    return GENDER_LABELS[gender as VoiceGender];
  }
  return gender;
}
