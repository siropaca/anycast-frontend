import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type { CharacterFormInput } from '@/features/studio/characters/schemas/character';
import { useToast } from '@/hooks/useToast';
import {
  getGetMeCharactersQueryKey,
  usePostMeCharacters,
} from '@/libs/api/generated/me/me';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';
import { useGetVoices } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { trimFullWidth } from '@/utils/trim';

interface CreateOptions {
  onSuccess?: () => void;
}

/**
 * キャラクター作成に必要なデータと操作を提供する
 *
 * @param enabled - ボイス一覧の取得を有効にするかどうか
 * @returns ボイス一覧、作成関数
 */
export function useCreateCharacter(enabled: boolean) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: voicesData, isLoading: isVoicesLoading } = useGetVoices(
    undefined,
    { query: { enabled } },
  );
  const mutation = usePostMeCharacters();

  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  const [error, setError] = useState<string>();

  /**
   * キャラクターを作成する
   *
   * @param data - フォーム入力データ
   * @param options - オプション（成功時コールバック）
   */
  function createCharacter(data: CharacterFormInput, options?: CreateOptions) {
    setError(undefined);

    mutation.mutate(
      {
        data: {
          name: trimFullWidth(data.name),
          voiceId: data.voiceId,
          persona: data.persona ? trimFullWidth(data.persona) : undefined,
          avatarId: data.avatarImageId,
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.CREATED) {
            setError(
              response.data.error?.message ??
                'キャラクターの作成に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeCharactersQueryKey(),
          });
          toast.success({ title: 'キャラクターを作成しました' });
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'キャラクターの作成に失敗しました';
          setError(message);
          toast.error({ title: message });
        },
      },
    );
  }

  return {
    voices,
    isVoicesLoading,
    isCreating: mutation.isPending,
    error,

    createCharacter,
  };
}
