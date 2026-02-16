import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  useDeleteChannelsChannelIdCharactersCharacterId,
  usePostChannelsChannelIdCharacters,
  usePutChannelsChannelIdCharactersCharacterId,
} from '@/libs/api/generated/channels/channels';
import { getGetMeChannelsChannelIdQueryKey } from '@/libs/api/generated/me/me';

/**
 * チャンネルキャラクターの追加・置換・削除ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @returns 各操作関数と状態
 */
export function useChannelCharacterActions(channelId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const addMutation = usePostChannelsChannelIdCharacters();
  const replaceMutation = usePutChannelsChannelIdCharactersCharacterId();
  const deleteMutation = useDeleteChannelsChannelIdCharactersCharacterId();

  const [error, setError] = useState<string>();

  function invalidateChannel() {
    queryClient.invalidateQueries({
      queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
    });
  }

  /**
   * チャンネルにキャラクターを追加する
   *
   * @param characterId - 追加するキャラクターの ID
   * @returns 成功したかどうか
   */
  async function addCharacter(characterId: string): Promise<boolean> {
    setError(undefined);

    try {
      const response = await addMutation.mutateAsync({
        channelId,
        data: { connect: { id: characterId } },
      });

      if (response.status !== StatusCodes.CREATED) {
        const message =
          response.data.error?.message ?? 'キャラクターの追加に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      invalidateChannel();
      toast.success({ title: 'キャラクターを追加しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'キャラクターの追加に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * チャンネルのキャラクターを置換する
   *
   * @param currentCharacterId - 現在のキャラクターの ID
   * @param newCharacterId - 新しいキャラクターの ID
   * @returns 成功したかどうか
   */
  async function replaceCharacter(
    currentCharacterId: string,
    newCharacterId: string,
  ): Promise<boolean> {
    setError(undefined);

    try {
      const response = await replaceMutation.mutateAsync({
        channelId,
        characterId: currentCharacterId,
        data: { connect: { id: newCharacterId } },
      });

      if (response.status !== StatusCodes.OK) {
        const message =
          response.data.error?.message ?? 'キャラクターの変更に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      invalidateChannel();
      toast.success({ title: 'キャラクターを変更しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'キャラクターの変更に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * チャンネルからキャラクターを削除する
   *
   * @param characterId - 削除するキャラクターの ID
   * @returns 成功したかどうか
   */
  async function removeCharacter(characterId: string): Promise<boolean> {
    setError(undefined);

    try {
      const response = await deleteMutation.mutateAsync({
        channelId,
        characterId,
      });

      if (response.status !== StatusCodes.OK) {
        const message =
          response.data.error?.message ?? 'キャラクターの削除に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      invalidateChannel();
      toast.success({ title: 'キャラクターを外しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'キャラクターの削除に失敗しました';
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
    isPending:
      addMutation.isPending ||
      replaceMutation.isPending ||
      deleteMutation.isPending,
    error,

    addCharacter,
    replaceCharacter,
    removeCharacter,
    clearError,
  };
}
