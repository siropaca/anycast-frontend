import { z } from 'zod';

export const generateAudioFormSchema = z.object({
  voiceStyle: z.string().max(500, '音声スタイルは500文字以内で入力してください'),
});

export type GenerateAudioFormInput = z.infer<typeof generateAudioFormSchema>;
