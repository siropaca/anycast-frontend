import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const feedbackSchema = z.object({
  content: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('フィードバックの内容'))
    .max(1000, VALIDATION_MESSAGES.maxLength('フィードバックの内容', 1000)),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
