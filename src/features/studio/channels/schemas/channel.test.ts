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
        mode: 'create' as const,
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
      characters: [
        { mode: 'create' as const, name: 'キャラクター1', voiceId: 'voice-1' },
      ],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('2人のキャラクターでパースが成功する', () => {
    const input = {
      ...validInput,
      characters: [
        {
          mode: 'create' as const,
          name: 'キャラクター1',
          voiceId: 'voice-1',
        },
        {
          mode: 'create' as const,
          name: 'キャラクター2',
          voiceId: 'voice-2',
        },
      ],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('characters が3人以上の場合はエラー', () => {
    const input = {
      ...validInput,
      characters: [
        {
          mode: 'create' as const,
          name: 'キャラクター1',
          voiceId: 'voice-1',
        },
        {
          mode: 'create' as const,
          name: 'キャラクター2',
          voiceId: 'voice-2',
        },
        {
          mode: 'create' as const,
          name: 'キャラクター3',
          voiceId: 'voice-3',
        },
      ],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(false);
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

  it('categoryId が空の場合はエラー', () => {
    const input = { ...validInput, categoryId: '' };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('connect モードで既存キャラクターを指定できる', () => {
    const input = {
      ...validInput,
      characters: [{ mode: 'connect' as const, characterId: 'char-1' }],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('connect モードで characterId が空の場合はエラー', () => {
    const input = {
      ...validInput,
      characters: [{ mode: 'connect' as const, characterId: '' }],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('create と connect の混在でパースが成功する', () => {
    const input = {
      ...validInput,
      characters: [
        { mode: 'connect' as const, characterId: 'char-1' },
        {
          mode: 'create' as const,
          name: 'キャラクター2',
          voiceId: 'voice-2',
        },
      ],
    };
    const result = channelFormSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});
