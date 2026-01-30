import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const generateAudioFormSchema = z.object({
  voiceStyle: z
    .string()
    .max(500, VALIDATION_MESSAGES.maxLength('音声スタイル', 500)),
});

export type GenerateAudioFormInput = z.infer<typeof generateAudioFormSchema>;
