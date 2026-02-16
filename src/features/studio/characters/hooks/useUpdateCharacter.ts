import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type { CharacterFormInput } from '@/features/studio/characters/schemas/character';
import { useToast } from '@/hooks/useToast';
import {
  getGetMeCharactersQueryKey,
  usePatchMeCharactersCharacterId,
} from '@/libs/api/generated/me/me';
import { toOptionalField } from '@/libs/api/optionalField';
import { trimFullWidth } from '@/utils/trim';

/**
 * キャラクター更新ミューテーションを提供する
 *
 * @returns 更新関数、更新中フラグ、エラー
 */
export function useUpdateCharacter() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = usePatchMeCharactersCharacterId();

  const [error, setError] = useState<string>();

  /**
   * キャラクターを更新する
   *
   * @param characterId - 更新するキャラクターのID
   * @param data - フォーム入力データ
   * @returns 更新が成功したかどうか
   */
  async function updateCharacter(
    characterId: string,
    data: CharacterFormInput,
  ): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({
        characterId,
        data: {
          name: trimFullWidth(data.name),
          voiceId: data.voiceId,
          persona: data.persona ? trimFullWidth(data.persona) : undefined,
          avatarId: toOptionalField(data.avatarImageId),
        },
      });

      if (response.status !== StatusCodes.OK) {
        setError(response.data.error.message);
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeCharactersQueryKey(),
      });
      toast.success({ title: 'キャラクターを更新しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'キャラクターの更新に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * エラー状態をクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    isUpdating: mutation.isPending,
    error,

    updateCharacter,
    clearError,
  };
}
