import { describe, expect, it } from 'vitest';
import { channelFormSchema } from '@/features/studio/channels/schemas/channel';

describe('channelFormSchema', () => {
  const validInput = {
    name: 'テストチャンネル',
    description: 'テスト説明',
    userPrompt: 'テストプロンプト',
    categoryId: 'category-1',
    characters: [
      {
        name: 'キャラクター1',
        voiceId: 'voice-1',
        persona: 'テストペルソナ',
      },
    ],
  };

  it('有効な入力でパースが成功する', () => {
    const result = channelFormSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('persona が空でもパースが成功する', () => {
    const input = {
      ...validInput,
      characters: [{ name: 'キャラクター1', voiceId: 'voice-1' }],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('2人のキャラクターでパースが成功する', () => {
    const input = {
      ...validInput,
      characters: [
        { name: 'キャラクター1', voiceId: 'voice-1' },
        { name: 'キャラクター2', voiceId: 'voice-2' },
      ],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('name が空の場合はエラー', () => {
    const input = { ...validInput, name: '' };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('characters が空の場合はエラー', () => {
    const input = { ...validInput, characters: [] };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('characters が3人以上の場合はエラー', () => {
    const input = {
      ...validInput,
      characters: [
        { name: 'キャラクター1', voiceId: 'voice-1' },
        { name: 'キャラクター2', voiceId: 'voice-2' },
        { name: 'キャラクター3', voiceId: 'voice-3' },
      ],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('categoryId が空の場合はエラー', () => {
    const input = { ...validInput, categoryId: '' };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
