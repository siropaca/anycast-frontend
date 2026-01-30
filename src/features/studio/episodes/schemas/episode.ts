import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const episodeFormSchema = z.object({
  title: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('タイトル'))
    .max(255, VALIDATION_MESSAGES.maxLength('タイトル', 255)),
  description: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('説明', 2000)),
  artworkImageId: z.string().optional(),
});

export type EpisodeFormInput = z.infer<typeof episodeFormSchema>;
