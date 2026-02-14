import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const characterFormSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('名前'))
    .max(255, VALIDATION_MESSAGES.maxLength('名前', 255)),
  voiceId: z.string().min(1, VALIDATION_MESSAGES.select('ボイス')),
  persona: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('特徴', 2000))
    .optional(),
  avatarImageId: z.string().optional(),
});

export type CharacterFormInput = z.infer<typeof characterFormSchema>;
