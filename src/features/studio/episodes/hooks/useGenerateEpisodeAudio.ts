import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useRef, useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import { POLLING_INTERVAL } from '@/features/studio/episodes/constants/polling';
import {
  getAudioJobsJobId,
  usePostAudioJobsJobIdCancel,
} from '@/libs/api/generated/audio-jobs/audio-jobs';
import { usePostChannelsChannelIdEpisodesEpisodeIdAudioGenerateAsync } from '@/libs/api/generated/episodes/episodes';
import {
  getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey,
  getMeAudioJobs,
} from '@/libs/api/generated/me/me';
import type { RequestGenerateAudioAsyncRequest } from '@/libs/api/generated/schemas';
import { useAudioJobWebSocket } from '@/libs/websocket/useAudioJobWebSocket';
import type { JobStatus } from '@/types/job';
import { trimFullWidth } from '@/utils/trim';

interface AudioJobState {
  jobId: string | null;
  status: JobStatus;
  progress: number;
  errorMessage: string | null;
}

/**
 * エピソード音声生成ミューテーションを提供する（非同期版）
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 音声生成関数、生成状態、進捗、エラー
 */
export function useGenerateEpisodeAudio(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const jobIdRef = useRef<string | null>(null);

  const [jobState, setJobState] = useState<AudioJobState>({
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

    queryClient.refetchQueries({
      queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
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
    }));

    clearPolling();
  }

  function startPolling(jobId: string) {
    clearPolling();

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await getAudioJobsJobId(jobId);

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
            handleJobFailed(job.errorMessage ?? MESSAGES.audio.generateError);
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

  const { subscribe, unsubscribe, connectionError } = useAudioJobWebSocket({
    onProgress: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        clearPolling();
        setJobState((prev) => ({
          ...prev,
          progress: payload.progress,
          status: 'processing',
        }));
      }
    },
    onCompleted: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        clearPolling();
        handleJobCompleted();
        unsubscribe(payload.jobId);
      }
    },
    onFailed: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        clearPolling();
        handleJobFailed(payload.errorMessage);
        unsubscribe(payload.jobId);
      }
    },
    onCanceling: (payload) => {
      if (payload.jobId === jobIdRef.current) {
        handleJobCanceling();
      }
    },
    onCanceled: (payload) => {
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

  // マウント時に処理中のジョブを確認して復帰
  // biome-ignore lint/correctness/useExhaustiveDependencies: 初回マウント時のみ実行
  useEffect(() => {
    async function restoreRunningJob() {
      try {
        // pending と processing のジョブを取得
        const [pendingResponse, processingResponse] = await Promise.all([
          getMeAudioJobs({ status: 'pending' }),
          getMeAudioJobs({ status: 'processing' }),
        ]);

        const allJobs = [
          ...(pendingResponse.status === StatusCodes.OK
            ? pendingResponse.data.data
            : []),
          ...(processingResponse.status === StatusCodes.OK
            ? processingResponse.data.data
            : []),
        ];

        // 対象エピソードのジョブを探す
        const targetJob = allJobs.find((job) => job.episodeId === episodeId);

        if (targetJob) {
          // 状態を復帰
          setJobState({
            jobId: targetJob.id,
            status: targetJob.status as JobStatus,
            progress: targetJob.progress,
            errorMessage: null,
          });

          // WebSocket で購読開始
          subscribe(targetJob.id);

          // ポーリングも開始
          startPolling(targetJob.id);
        }
      } catch {
        // 復帰失敗は無視
      }
    }

    restoreRunningJob();
  }, [episodeId]);

  const mutation =
    usePostChannelsChannelIdEpisodesEpisodeIdAudioGenerateAsync();

  const cancelMutation = usePostAudioJobsJobIdCancel();

  /**
   * 音声を非同期で生成する
   *
   * @param data - 音声生成リクエスト
   */
  function generateAudio(data: RequestGenerateAudioAsyncRequest) {
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
          voiceStyle: data.voiceStyle
            ? trimFullWidth(data.voiceStyle)
            : undefined,
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
                  : MESSAGES.audio.generateStartError,
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

          // WebSocket 接続確立までの間もステータスを監視するため、
          // ポーリングも同時に開始する（WebSocket からメッセージを受信したら停止）
          startPolling(jobId);
        },
        onError: (error: unknown) => {
          const message =
            error instanceof Error
              ? error.message
              : MESSAGES.audio.generateStartError;
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

  /**
   * 音声生成をキャンセルする
   *
   * API が成功した時点でキャンセルは確定しているため、
   * WebSocket の audio_canceled を待たずに即座に canceled 状態に変更する。
   */
  function cancelAudio() {
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
          }));
        },
        onError: (error: unknown) => {
          const message =
            error instanceof Error
              ? error.message
              : MESSAGES.audio.cancelError;
          setJobState((prev) => ({
            ...prev,
            errorMessage: message,
          }));
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

    generateAudio,
    cancelAudio,
    reset,
  };
}
