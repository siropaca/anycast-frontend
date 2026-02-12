import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useRef, useState } from 'react';

import { POLLING_INTERVAL } from '@/features/studio/episodes/constants/polling';
import { useToast } from '@/hooks/useToast';
import { useGetMeScriptJobsSuspense } from '@/libs/api/generated/me/me';
import type {
  RequestGenerateScriptAsyncRequest,
  ResponseScriptJobResponse,
} from '@/libs/api/generated/schemas';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerateAsync,
} from '@/libs/api/generated/script/script';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptJobsLatestQueryKey,
  getScriptJobsJobId,
  useGetChannelsChannelIdEpisodesEpisodeIdScriptJobsLatest,
  usePostScriptJobsJobIdCancel,
} from '@/libs/api/generated/script-jobs/script-jobs';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { useJobWebSocket } from '@/libs/websocket/useJobWebSocket';
import type { JobStatus } from '@/types/job';
import { trimFullWidth } from '@/utils/trim';

interface ScriptJobState {
  jobId: string | null;
  status: JobStatus;
  progress: number;
  errorMessage: string | null;
  prompt: string | null;
  durationMinutes: number | null;
  startedAt: number | null;
}

/**
 * 台本生成ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 台本生成関数、生成状態、進捗、エラー
 */
export function useGenerateScriptAsync(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Suspense でジョブデータを取得
  const { data: pendingResponse } = useGetMeScriptJobsSuspense({
    status: 'pending',
  });
  const { data: processingResponse } = useGetMeScriptJobsSuspense({
    status: 'processing',
  });

  const pendingJobs = unwrapResponse<ResponseScriptJobResponse[]>(
    pendingResponse,
    [],
  );
  const processingJobs = unwrapResponse<ResponseScriptJobResponse[]>(
    processingResponse,
    [],
  );
  const runningJob =
    [...pendingJobs, ...processingJobs].find(
      (job) => job.episodeId === episodeId,
    ) ?? null;

  // 最新完了ジョブを取得（実行中ジョブがない場合のプロンプト復元用）
  const { data: latestJobResponse } =
    useGetChannelsChannelIdEpisodesEpisodeIdScriptJobsLatest(
      channelId,
      episodeId,
      {
        query: {
          enabled: !runningJob,
        },
      },
    );
  const latestCompletedJob =
    latestJobResponse?.status === StatusCodes.OK
      ? latestJobResponse.data.data
      : null;

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const jobIdRef = useRef<string | null>(null);

  const [jobState, setJobState] = useState<ScriptJobState>(() => {
    if (runningJob) {
      return {
        jobId: runningJob.id,
        status: runningJob.status as JobStatus,
        progress: runningJob.progress,
        errorMessage: null,
        prompt: runningJob.prompt ?? null,
        durationMinutes: runningJob.durationMinutes ?? null,
        startedAt: Date.parse(
          runningJob.startedAt ?? runningJob.createdAt,
        ),
      };
    }

    return {
      jobId: null,
      status: 'idle',
      progress: 0,
      errorMessage: null,
      prompt: null,
      durationMinutes: null,
      startedAt: null,
    };
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
      startedAt: null,
    }));

    toast.success({ title: '台本の生成が完了しました' });
    clearPolling();

    queryClient.invalidateQueries({
      queryKey: getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
        channelId,
        episodeId,
      ),
    });

    queryClient.invalidateQueries({
      queryKey:
        getGetChannelsChannelIdEpisodesEpisodeIdScriptJobsLatestQueryKey(
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
      startedAt: null,
    }));

    toast.error({
      title: '台本の生成に失敗しました',
      description: errorMessage,
    });
    clearPolling();
  }

  function handleJobCanceling() {
    setJobState((prev) => ({
      ...prev,
      status: 'canceling',
    }));
  }

  function handleJobCanceled() {
    setJobState((prev) => ({
      ...prev,
      status: 'canceled',
      startedAt: null,
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
            startedAt:
              prev.startedAt ??
              (job.startedAt ? Date.parse(job.startedAt) : null),
          }));

          if (job.status === 'completed') {
            handleJobCompleted();
          } else if (job.status === 'failed') {
            handleJobFailed(job.errorMessage ?? '台本生成に失敗しました');
          } else if (job.status === 'canceling') {
            handleJobCanceling();
          } else if (job.status === 'canceled') {
            handleJobCanceled();
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
        clearPolling();
        setJobState((prev) => ({
          ...prev,
          progress: payload.progress,
          status: 'processing',
        }));
      }
    },
    onScriptCompleted: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        clearPolling();
        handleJobCompleted();
        unsubscribe(payload.jobId);
      }
    },
    onScriptFailed: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        clearPolling();
        handleJobFailed(payload.errorMessage);
        unsubscribe(payload.jobId);
      }
    },
    onScriptCanceling: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        handleJobCanceling();
      }
    },
    onScriptCanceled: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        clearPolling();
        handleJobCanceled();
        unsubscribe(payload.jobId);
      }
    },
    onConnectionError: () => {
      // WebSocket 接続エラー時はポーリングで監視
      const currentJobId = jobIdRef.current;
      if (currentJobId && !pollingIntervalRef.current) {
        startPolling(currentJobId);
      }
    },
  });

  // WebSocket 接続エラーが発生した場合のフォールバック
  // biome-ignore lint/correctness/useExhaustiveDependencies: startPolling は状態変化時のみ実行したいため除外
  useEffect(() => {
    if (
      connectionError &&
      jobState.jobId &&
      jobState.status !== 'completed' &&
      jobState.status !== 'failed' &&
      jobState.status !== 'canceled' &&
      !pollingIntervalRef.current
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

  // マウント時に実行中ジョブの監視を開始
  // biome-ignore lint/correctness/useExhaustiveDependencies: 初回マウント時のみ実行
  useEffect(() => {
    if (runningJob) {
      subscribe(runningJob.id);
      startPolling(runningJob.id);
    }
  }, [episodeId]);

  const mutation =
    usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerateAsync();

  const cancelMutation = usePostScriptJobsJobIdCancel();

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
      prompt: null,
      durationMinutes: null,
      startedAt: Date.now(),
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
                  : '台本生成の開始に失敗しました',
              startedAt: null,
            }));
            return;
          }

          const job = response.data.data;

          setJobState((prev) => ({
            ...prev,
            jobId: job.id,
            status: 'pending',
            startedAt: Date.parse(job.createdAt),
          }));

          // WebSocket で購読開始
          subscribe(job.id);

          // WebSocket 接続確立までの間もステータスを監視するため、
          // ポーリングも同時に開始する（WebSocket からメッセージを受信したら停止）
          startPolling(job.id);
        },
        onError: (error: unknown) => {
          const message =
            error instanceof Error
              ? error.message
              : '台本生成の開始に失敗しました';
          setJobState((prev) => ({
            ...prev,
            status: 'failed',
            errorMessage: message,
            startedAt: null,
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
      prompt: null,
      durationMinutes: null,
      startedAt: null,
    });
  }

  /**
   * 台本生成をキャンセルする
   *
   * API が成功した時点でキャンセルは確定しているため、
   * WebSocket の script_canceled を待たずに即座に canceled 状態に変更する。
   */
  function cancelScript() {
    if (!jobState.jobId) {
      return;
    }

    const currentJobId = jobState.jobId;

    cancelMutation.mutate(
      { jobId: currentJobId },
      {
        onSuccess: () => {
          clearPolling();
          unsubscribe(currentJobId);
          setJobState((prev) => ({
            ...prev,
            status: 'canceled',
            startedAt: null,
          }));
          toast.info({ title: '台本の生成をキャンセルしました' });
        },
        onError: (error: unknown) => {
          const message =
            error instanceof Error
              ? error.message
              : '台本生成のキャンセルに失敗しました';
          setJobState((prev) => ({
            ...prev,
            errorMessage: message,
          }));
          toast.error({ title: message });
        },
      },
    );
  }

  const isGenerating =
    jobState.status === 'pending' ||
    jobState.status === 'processing' ||
    jobState.status === 'canceling';

  const isCancelable =
    jobState.status === 'pending' || jobState.status === 'processing';

  const isCanceling = jobState.status === 'canceling';

  return {
    isGenerating,
    isCancelable,
    isCanceling,
    jobId: jobState.jobId,
    status: jobState.status,
    progress: jobState.progress,
    error: jobState.errorMessage,
    startedAt: jobState.startedAt,
    restoredPrompt: jobState.prompt ?? latestCompletedJob?.prompt ?? null,
    restoredDurationMinutes:
      jobState.durationMinutes ?? latestCompletedJob?.durationMinutes ?? null,

    generateScript,
    cancelScript,
    reset,
  };
}
