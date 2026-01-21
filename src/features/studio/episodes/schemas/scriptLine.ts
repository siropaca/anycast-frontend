import { z } from 'zod';
import { trimFullWidth } from '@/utils/trimFullWidth';

export const scriptLineFormSchema = z.object({
  emotion: z.string(),
  text: z
    .string()
    .transform((val) => trimFullWidth(val))
    .pipe(z.string().min(1, 'テキストを入力してください')),
});

export type ScriptLineFormInput = z.infer<typeof scriptLineFormSchema>;
