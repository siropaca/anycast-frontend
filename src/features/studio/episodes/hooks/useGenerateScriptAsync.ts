import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useRef, useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import { POLLING_INTERVAL } from '@/features/studio/episodes/constants/polling';
import type { RequestGenerateScriptAsyncRequest } from '@/libs/api/generated/schemas';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerateAsync,
} from '@/libs/api/generated/script/script';
import { getScriptJobsJobId } from '@/libs/api/generated/script-jobs/script-jobs';
import { useJobWebSocket } from '@/libs/websocket/useJobWebSocket';
import type { JobStatus } from '@/types/job';
import { trimFullWidth } from '@/utils/trim';

interface ScriptJobState {
  jobId: string | null;
  status: JobStatus;
  progress: number;
  errorMessage: string | null;
}

/**
 * 台本生成ミューテーションを提供する（非同期版）
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 台本生成関数、生成状態、進捗、エラー
 */
export function useGenerateScriptAsync(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const jobIdRef = useRef<string | null>(null);

  const [jobState, setJobState] = useState<ScriptJobState>({
    jobId: null,
    status: 'idle',
    progress: 0,
    errorMessage: null,
  });

  // jobId を ref で同期
  jobIdRef.current = jobState.jobId;

  function clearPolling() {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }

  function handleJobCompleted() {
    setJobState((prev) => ({
      ...prev,
      status: 'completed',
      progress: 100,
    }));

    clearPolling();

    queryClient.invalidateQueries({
      queryKey: getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
        channelId,
        episodeId,
      ),
    });
  }

  function handleJobFailed(errorMessage: string) {
    setJobState((prev) => ({
      ...prev,
      status: 'failed',
      errorMessage,
    }));

    clearPolling();
  }

  function startPolling(jobId: string) {
    clearPolling();

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await getScriptJobsJobId(jobId);

        if (response.status === StatusCodes.OK) {
          const job = response.data.data;

          setJobState((prev) => ({
            ...prev,
            progress: job.progress,
            status: job.status as JobStatus,
          }));

          if (job.status === 'completed') {
            handleJobCompleted();
          } else if (job.status === 'failed') {
            handleJobFailed(job.errorMessage ?? MESSAGES.script.generateError);
          }
        }
      } catch {
        // ポーリングエラーは無視して継続
      }
    }, POLLING_INTERVAL);
  }

  const { subscribe, unsubscribe, connectionError } = useJobWebSocket({
    onScriptProgress: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        setJobState((prev) => ({
          ...prev,
          progress: payload.progress,
          status: 'processing',
        }));
      }
    },
    onScriptCompleted: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        handleJobCompleted();
        unsubscribe(payload.jobId);
      }
    },
    onScriptFailed: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        handleJobFailed(payload.errorMessage);
        unsubscribe(payload.jobId);
      }
    },
    onConnectionError: () => {
      // WebSocket 接続エラー時はポーリングにフォールバック
      const currentJobId = jobIdRef.current;
      if (currentJobId) {
        setJobState((prev) => {
          if (prev.status !== 'completed' && prev.status !== 'failed') {
            startPolling(currentJobId);
          }
          return prev;
        });
      }
    },
  });

  // WebSocket 接続エラーが発生した場合、ポーリングにフォールバック
  // biome-ignore lint/correctness/useExhaustiveDependencies: startPolling は状態変化時のみ実行したいため除外
  useEffect(() => {
    if (
      connectionError &&
      jobState.jobId &&
      jobState.status !== 'completed' &&
      jobState.status !== 'failed'
    ) {
      startPolling(jobState.jobId);
    }
  }, [connectionError, jobState.jobId, jobState.status]);

  // クリーンアップ
  // biome-ignore lint/correctness/useExhaustiveDependencies: クリーンアップは初回マウント時のみ
  useEffect(() => {
    return () => {
      clearPolling();
      if (jobIdRef.current) {
        unsubscribe(jobIdRef.current);
      }
    };
  }, []);

  const mutation =
    usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerateAsync();

  /**
   * 台本を非同期で生成する
   *
   * @param data - 台本生成リクエスト
   */
  function generateScript(data: RequestGenerateScriptAsyncRequest) {
    // 状態をリセット
    setJobState({
      jobId: null,
      status: 'pending',
      progress: 0,
      errorMessage: null,
    });

    mutation.mutate(
      {
        channelId,
        episodeId,
        data: {
          ...data,
          prompt: trimFullWidth(data.prompt ?? ''),
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.ACCEPTED) {
            setJobState((prev) => ({
              ...prev,
              status: 'failed',
              errorMessage:
                'error' in response.data
                  ? response.data.error.message
                  : MESSAGES.script.generateStartError,
            }));
            return;
          }

          const jobId = response.data.data.id;

          setJobState((prev) => ({
            ...prev,
            jobId,
            status: 'pending',
          }));

          // WebSocket で購読開始
          subscribe(jobId);
        },
        onError: (error: unknown) => {
          const message =
            error instanceof Error
              ? error.message
              : MESSAGES.script.generateStartError;
          setJobState((prev) => ({
            ...prev,
            status: 'failed',
            errorMessage: message,
          }));
        },
      },
    );
  }

  /**
   * 生成状態をリセットする
   */
  function reset() {
    clearPolling();
    if (jobState.jobId) {
      unsubscribe(jobState.jobId);
    }
    setJobState({
      jobId: null,
      status: 'idle',
      progress: 0,
      errorMessage: null,
    });
  }

  const isGenerating =
    jobState.status === 'pending' || jobState.status === 'processing';

  return {
    isGenerating,
    jobId: jobState.jobId,
    status: jobState.status,
    progress: jobState.progress,
    error: jobState.errorMessage,

    generateScript,
    reset,
  };
}
