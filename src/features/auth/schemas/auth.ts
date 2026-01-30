import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const loginSchema = z.object({
  email: z.email(VALIDATION_MESSAGES.invalidFormat('メールアドレス')),
  password: z.string().min(1, VALIDATION_MESSAGES.required('パスワード')),
});

export const signupSchema = z
  .object({
    displayName: z
      .string()
      .min(1, VALIDATION_MESSAGES.required('表示名'))
      .max(20, VALIDATION_MESSAGES.maxLength('表示名', 20)),
    email: z.email(VALIDATION_MESSAGES.invalidFormat('メールアドレス')),
    password: z
      .string()
      .min(8, VALIDATION_MESSAGES.minLength('パスワード', 8))
      .max(100, VALIDATION_MESSAGES.maxLength('パスワード', 100)),
    confirmPassword: z
      .string()
      .min(1, VALIDATION_MESSAGES.required('確認用パスワード')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.mismatch('パスワード'),
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
