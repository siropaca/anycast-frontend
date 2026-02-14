import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

const createCharacterSchema = z.object({
  mode: z.literal('create'),
  name: z.string().min(1, VALIDATION_MESSAGES.required('名前')).max(255),
  voiceId: z.string().min(1, VALIDATION_MESSAGES.select('ボイス')),
  persona: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('特徴', 2000))
    .optional(),
});

const connectCharacterSchema = z.object({
  mode: z.literal('connect'),
  characterId: z.string().min(1, VALIDATION_MESSAGES.select('キャラクター')),
});

const characterSchema = z.discriminatedUnion('mode', [
  createCharacterSchema,
  connectCharacterSchema,
]);

export const channelBasicInfoSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('チャンネル名'))
    .max(255, VALIDATION_MESSAGES.maxLength('チャンネル名', 255)),
  description: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('説明', 2000)),
  categoryId: z.string().min(1, VALIDATION_MESSAGES.select('カテゴリ')),
  artworkImageId: z.string().optional(),
});

export const channelFormSchema = channelBasicInfoSchema.extend({
  characters: z
    .array(characterSchema)
    .min(1, VALIDATION_MESSAGES.minCount('キャラクター', 1))
    .max(2, VALIDATION_MESSAGES.maxCount('キャラクター', 2)),
});

export type ChannelBasicInfoInput = z.infer<typeof channelBasicInfoSchema>;
export type ChannelFormInput = z.infer<typeof channelFormSchema>;
