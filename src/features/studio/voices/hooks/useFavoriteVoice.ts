'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import {
  getGetVoicesQueryKey,
  useDeleteVoicesVoiceIdFavorite,
  usePostVoicesVoiceIdFavorite,
} from '@/libs/api/generated/voices/voices';

/**
 * ボイスのお気に入り登録・解除を提供する
 *
 * @returns お気に入り操作
 */
export function useFavoriteVoice() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const invalidateVoicesQuery = {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getGetVoicesQueryKey(),
      });
    },
  };

  const { mutate: addFavorite, isPending: isAddPending } =
    usePostVoicesVoiceIdFavorite({
      mutation: {
        ...invalidateVoicesQuery,
        onSuccess: () => {
          invalidateVoicesQuery.onSuccess();
          toast.success({ title: 'お気に入りに追加しました' });
        },
        onError: () => {
          toast.error({ title: 'お気に入りの追加に失敗しました' });
        },
      },
    });

  const { mutate: removeFavorite, isPending: isRemovePending } =
    useDeleteVoicesVoiceIdFavorite({
      mutation: {
        ...invalidateVoicesQuery,
        onSuccess: () => {
          invalidateVoicesQuery.onSuccess();
          toast.success({ title: 'お気に入りを解除しました' });
        },
        onError: () => {
          toast.error({ title: 'お気に入りの解除に失敗しました' });
        },
      },
    });

  /**
   * お気に入り状態をトグルする
   *
   * @param voiceId - ボイスID
   * @param isFavorite - 現在のお気に入り状態
   */
  function toggleFavorite(voiceId: string, isFavorite: boolean) {
    if (isFavorite) {
      removeFavorite({ voiceId });
    } else {
      addFavorite({ voiceId });
    }
  }

  return {
    isPending: isAddPending || isRemovePending,

    toggleFavorite,
  };
}
