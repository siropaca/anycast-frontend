import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(1, VALIDATION_MESSAGES.required('表示名'))
    .max(20, VALIDATION_MESSAGES.maxLength('表示名', 20)),
  bio: z
    .string()
    .max(200, VALIDATION_MESSAGES.maxLength('自己紹介', 200))
    .optional(),
  avatarImageId: z.string().nullable().optional(),
  headerImageId: z.string().nullable().optional(),
});

export type ProfileFormInput = z.infer<typeof profileFormSchema>;
