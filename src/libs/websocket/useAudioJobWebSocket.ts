import { getSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

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

type WebSocketMessage =
  | { type: 'progress'; payload: ProgressPayload }
  | { type: 'completed'; payload: CompletedPayload }
  | { type: 'failed'; payload: FailedPayload }
  | { type: 'pong' };

interface UseAudioJobWebSocketOptions {
  onProgress?: (payload: ProgressPayload) => void;
  onCompleted?: (payload: CompletedPayload) => void;
  onFailed?: (payload: FailedPayload) => void;
  onConnectionError?: () => void;
}

interface UseAudioJobWebSocketReturn {
  subscribe: (jobId: string) => void;
  unsubscribe: (jobId: string) => void;
  isConnected: boolean;
  connectionError: boolean;
}

const PING_INTERVAL = 30000;
const RECONNECT_DELAY = 3000;
const MAX_RECONNECT_ATTEMPTS = 3;

/**
 * 音声生成ジョブの WebSocket 接続を管理するフック
 *
 * @param options - コールバックオプション
 * @returns WebSocket 操作用の関数と状態
 */
export function useAudioJobWebSocket(
  options: UseAudioJobWebSocketOptions = {},
): UseAudioJobWebSocketReturn {
  const { onProgress, onCompleted, onFailed, onConnectionError } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const subscribedJobIds = useRef<Set<string>>(new Set());

  // コールバックを ref で保持して最新の値を参照
  const callbacksRef = useRef({
    onProgress,
    onCompleted,
    onFailed,
    onConnectionError,
  });
  callbacksRef.current = {
    onProgress,
    onCompleted,
    onFailed,
    onConnectionError,
  };

  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  function clearPingInterval() {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  }

  function startPingInterval() {
    clearPingInterval();
    pingIntervalRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, PING_INTERVAL);
  }

  async function connect() {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const session = await getSession();
    const token = session?.accessToken;

    if (!token) {
      setConnectionError(true);
      callbacksRef.current.onConnectionError?.();
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseUrl) {
      setConnectionError(true);
      callbacksRef.current.onConnectionError?.();
      return;
    }

    const wsUrl = baseUrl.replace(/^http/, 'ws');
    const ws = new WebSocket(`${wsUrl}/api/v1/ws/audio-jobs?token=${token}`);

    ws.onopen = () => {
      setIsConnected(true);
      setConnectionError(false);
      reconnectAttempts.current = 0;
      startPingInterval();

      // 再接続時に購読中のジョブを再購読
      subscribedJobIds.current.forEach((jobId) => {
        ws.send(JSON.stringify({ type: 'subscribe', payload: { jobId } }));
      });
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;

        switch (message.type) {
          case 'progress':
            callbacksRef.current.onProgress?.(message.payload);
            break;
          case 'completed':
            callbacksRef.current.onCompleted?.(message.payload);
            break;
          case 'failed':
            callbacksRef.current.onFailed?.(message.payload);
            break;
          case 'pong':
            // ping/pong は接続維持用
            break;
        }
      } catch {
        // JSON パースエラーは無視
      }
    };

    ws.onerror = () => {
      setConnectionError(true);
    };

    ws.onclose = () => {
      setIsConnected(false);
      clearPingInterval();

      // 自動再接続
      if (
        reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS &&
        subscribedJobIds.current.size > 0
      ) {
        reconnectAttempts.current += 1;
        setTimeout(() => {
          connect();
        }, RECONNECT_DELAY);
      } else if (reconnectAttempts.current >= MAX_RECONNECT_ATTEMPTS) {
        setConnectionError(true);
        callbacksRef.current.onConnectionError?.();
      }
    };

    wsRef.current = ws;
  }

  function subscribe(jobId: string) {
    subscribedJobIds.current.add(jobId);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ type: 'subscribe', payload: { jobId } }),
      );
    } else {
      connect();
    }
  }

  function unsubscribe(jobId: string) {
    subscribedJobIds.current.delete(jobId);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ type: 'unsubscribe', payload: { jobId } }),
      );
    }

    // 購読がなくなったら接続を閉じる
    if (subscribedJobIds.current.size === 0 && wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }

  // クリーンアップ
  // biome-ignore lint/correctness/useExhaustiveDependencies: クリーンアップは初回マウント時のみ
  useEffect(() => {
    return () => {
      clearPingInterval();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  return {
    subscribe,
    unsubscribe,
    isConnected,
    connectionError,
  };
}
