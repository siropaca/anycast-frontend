import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptImport,
} from '@/libs/api/generated/script/script';

interface UseImportScriptResult {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isImporting: boolean;
  error: string | undefined;
}

/**
 * 台本をテキストファイルからインポートする
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns ファイル選択ハンドラ、ローディング状態、エラー
 */
export function useImportScript(
  channelId: string,
  episodeId: string,
): UseImportScriptResult {
  const queryClient = useQueryClient();
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const importMutation = usePostChannelsChannelIdEpisodesEpisodeIdScriptImport({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
            channelId,
            episodeId,
          ),
        });
      },
    },
  });

  /**
   * ファイルを読み込んでインポートする
   *
   * @param event - ファイル選択イベント
   */
  async function handleFileSelect(
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setError(undefined);

    try {
      const text = await file.text();
      const response = await importMutation.mutateAsync({
        channelId,
        episodeId,
        data: { text },
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ?? '台本のインポートに失敗しました',
        );
      }
    } catch {
      setError('台本のインポートに失敗しました');
    } finally {
      setIsImporting(false);
      // ファイル入力をリセット（同じファイルを再選択できるように）
      event.target.value = '';
    }
  }

  return {
    handleFileSelect,
    isImporting,
    error,
  };
}
