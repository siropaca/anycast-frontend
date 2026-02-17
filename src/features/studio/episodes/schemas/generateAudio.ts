import { z } from 'zod';

const generateAudioTypeSchema = z.enum(['voice', 'full', 'remix']);

export const generateAudioFormSchema = z
  .object({
    type: generateAudioTypeSchema,
    bgmId: z.string().optional(),
    systemBgmId: z.string().optional(),
    bgmVolumeDb: z.number().min(-60).max(0).optional(),
    fadeOutMs: z.number().int().min(0).max(30000).optional(),
    paddingStartMs: z.number().int().min(0).max(10000).optional(),
    paddingEndMs: z.number().int().min(0).max(10000).optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'full' || data.type === 'remix') {
        return !!data.bgmId || !!data.systemBgmId;
      }
      return true;
    },
    { message: 'BGMを選択してください', path: ['bgmId'] },
  )
  .refine(
    (data) => {
      return !(data.bgmId && data.systemBgmId);
    },
    {
      message: 'BGMとシステムBGMは同時に指定できません',
      path: ['bgmId'],
    },
  );

export type GenerateAudioFormInput = z.infer<typeof generateAudioFormSchema>;
