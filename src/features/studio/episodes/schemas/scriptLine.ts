import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';
import { trimFullWidth } from '@/utils/trim';

export const scriptLineFormSchema = z.object({
  emotion: z.string(),
  text: z
    .string()
    .transform((val) => trimFullWidth(val))
    .pipe(z.string().min(1, VALIDATION_MESSAGES.required('テキスト'))),
});

export type ScriptLineFormInput = z.infer<typeof scriptLineFormSchema>;
