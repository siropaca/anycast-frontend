import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

const characterSchema = z.object({
  name: z.string().min(1, VALIDATION_MESSAGES.required('名前')).max(255),
  voiceId: z.string().min(1, VALIDATION_MESSAGES.select('ボイス')),
  persona: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('ペルソナ', 2000))
    .optional(),
});

export const channelFormSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('チャンネル名'))
    .max(255, VALIDATION_MESSAGES.maxLength('チャンネル名', 255)),
  description: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('説明', 2000)),
  userPrompt: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('プロンプト', 2000)),
  categoryId: z.string().min(1, VALIDATION_MESSAGES.select('カテゴリ')),
  artworkImageId: z.string().optional(),
  defaultBgmId: z.string().optional(),
  defaultSystemBgmId: z.string().optional(),
  characters: z
    .array(characterSchema)
    .min(1, VALIDATION_MESSAGES.minCount('キャラクター', 1))
    .max(2, VALIDATION_MESSAGES.maxCount('キャラクター', 2)),
});

export type ChannelFormInput = z.infer<typeof channelFormSchema>;
