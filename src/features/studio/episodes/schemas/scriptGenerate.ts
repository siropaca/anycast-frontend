import { z } from 'zod';

/**
 * エピソードの長さ（分）
 */
export const EPISODE_DURATION_OPTIONS = [5, 10, 15] as const;

export const scriptGenerateFormSchema = z.object({
  prompt: z
    .string()
    .min(1, 'プロンプトを入力してください')
    .max(2000, 'プロンプトは2000文字以内で入力してください'),
  durationMinutes: z.number({ message: 'エピソードの長さを選択してください' }),
});

export type ScriptGenerateFormInput = z.infer<typeof scriptGenerateFormSchema>;
