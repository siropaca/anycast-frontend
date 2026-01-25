import { useJobWebSocket } from '@/libs/websocket/useJobWebSocket';

interface ProgressPayload {
  jobId: string;
  progress: number;
  message?: string;
}

interface CompletedPayload {
  jobId: string;
  audio: {
    id: string;
    url: string;
    durationMs: number;
  };
}

interface FailedPayload {
  jobId: string;
  errorCode: string;
  errorMessage: string;
}

interface CancelingPayload {
  jobId: string;
}

interface CanceledPayload {
  jobId: string;
}

interface UseAudioJobWebSocketOptions {
  onProgress?: (payload: ProgressPayload) => void;
  onCompleted?: (payload: CompletedPayload) => void;
  onFailed?: (payload: FailedPayload) => void;
  onCanceling?: (payload: CancelingPayload) => void;
  onCanceled?: (payload: CanceledPayload) => void;
  onConnectionError?: () => void;
}

/**
 * 音声生成ジョブの WebSocket 接続を管理するフック
 *
 * 内部で汎用の useJobWebSocket を使用し、音声ジョブ用のインターフェースを提供する。
 *
 * @param options - コールバックオプション
 * @returns WebSocket 操作用の関数と状態
 */
export function useAudioJobWebSocket(
  options: UseAudioJobWebSocketOptions = {},
) {
  const {
    onProgress,
    onCompleted,
    onFailed,
    onCanceling,
    onCanceled,
    onConnectionError,
  } = options;

  return useJobWebSocket({
    onAudioProgress: onProgress,
    onAudioCompleted: onCompleted,
    onAudioFailed: onFailed,
    onAudioCanceling: onCanceling,
    onAudioCanceled: onCanceled,
    onConnectionError,
  });
}
