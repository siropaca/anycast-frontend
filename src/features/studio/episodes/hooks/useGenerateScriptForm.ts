import { useGenerateScriptAsync } from '@/features/studio/episodes/hooks/useGenerateScriptAsync';
import type { RequestGenerateScriptAsyncRequest } from '@/libs/api/generated/schemas';
import type { JobStatus } from '@/types/job';

/**
 * 台本生成フォーム用のミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 台本生成関数、生成中フラグ、エラー、進捗
 */
export function useGenerateScriptForm(channelId: string, episodeId: string) {
  const {
    isGenerating,
    status,
    progress,
    error,
    generateScript: generateScriptAsync,
    reset,
  } = useGenerateScriptAsync(channelId, episodeId);

  /**
   * 台本を生成する
   *
   * @param data - 台本生成リクエスト
   */
  function generateScript(data: RequestGenerateScriptAsyncRequest) {
    generateScriptAsync(data);
  }

  return {
    generateScript,
    isGenerating,
    status,
    progress,
    error,
    reset,
  };
}

export type { JobStatus };
