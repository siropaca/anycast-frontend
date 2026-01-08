import { z } from 'zod';

const characterSchema = z.object({
  name: z.string().min(1, '名前を入力してください').max(255),
  voiceId: z.string().min(1, 'ボイスを選択してください'),
  persona: z
    .string()
    .max(2000, 'ペルソナは2000文字以内で入力してください')
    .optional(),
});

export const channelFormSchema = z.object({
  name: z
    .string()
    .min(1, 'チャンネル名を入力してください')
    .max(255, 'チャンネル名は255文字以内で入力してください'),
  description: z
    .string()
    .min(1, '説明を入力してください')
    .max(2000, '説明は2000文字以内で入力してください'),
  userPrompt: z
    .string()
    .min(1, 'プロンプトを入力してください')
    .max(2000, 'プロンプトは2000文字以内で入力してください'),
  categoryId: z.string().min(1, 'カテゴリを選択してください'),
  artworkImageId: z.string().optional(),
  characters: z
    .array(characterSchema)
    .min(1, 'キャラクターを1人以上追加してください')
    .max(2, 'キャラクターは2人までです'),
});

export type ChannelFormInput = z.infer<typeof channelFormSchema>;
