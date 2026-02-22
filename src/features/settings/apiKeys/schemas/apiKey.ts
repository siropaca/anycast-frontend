import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const createApiKeySchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('キー名'))
    .max(100, VALIDATION_MESSAGES.maxLength('キー名', 100)),
});

export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
