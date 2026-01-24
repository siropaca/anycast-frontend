import { getSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

// 音声ジョブ
interface AudioProgressPayload {
  jobId: string;
  progress: number;
  message?: string;
}

interface AudioCompletedPayload {
  jobId: string;
  audio: {
    id: string;
    url: string;
    durationMs: number;
  };
}

interface AudioFailedPayload {
  jobId: string;
  errorCode: string;
  errorMessage: string;
}

// 台本ジョブ
interface ScriptProgressPayload {
  jobId: string;
  progress: number;
  message?: string;
}

interface ScriptCompletedPayload {
  jobId: string;
  scriptLinesCount: number;
}

interface ScriptFailedPayload {
  jobId: string;
  errorCode: string;
  errorMessage: string;
}

type WebSocketMessage =
  | { type: 'audio_progress'; payload: AudioProgressPayload }
  | { type: 'audio_completed'; payload: AudioCompletedPayload }
  | { type: 'audio_failed'; payload: AudioFailedPayload }
  | { type: 'script_progress'; payload: ScriptProgressPayload }
  | { type: 'script_completed'; payload: ScriptCompletedPayload }
  | { type: 'script_failed'; payload: ScriptFailedPayload }
  | { type: 'pong' };

interface UseJobWebSocketOptions {
  onAudioProgress?: (payload: AudioProgressPayload) => void;
  onAudioCompleted?: (payload: AudioCompletedPayload) => void;
  onAudioFailed?: (payload: AudioFailedPayload) => void;
  onScriptProgress?: (payload: ScriptProgressPayload) => void;
  onScriptCompleted?: (payload: ScriptCompletedPayload) => void;
  onScriptFailed?: (payload: ScriptFailedPayload) => void;
  onConnectionError?: () => void;
}

const PING_INTERVAL = 30000;
const RECONNECT_DELAY = 3000;
const MAX_RECONNECT_ATTEMPTS = 3;

/**
 * ジョブの WebSocket 接続を管理する汎用フック
 *
 * 音声生成ジョブと台本生成ジョブの両方を監視できる。
 *
 * @param options - コールバックオプション
 * @returns WebSocket 操作用の関数と状態
 */
export function useJobWebSocket(options: UseJobWebSocketOptions = {}) {
  const {
    onAudioProgress,
    onAudioCompleted,
    onAudioFailed,
    onScriptProgress,
    onScriptCompleted,
    onScriptFailed,
    onConnectionError,
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const subscribedJobIds = useRef<Set<string>>(new Set());

  // コールバックを ref で保持して最新の値を参照
  const callbacksRef = useRef({
    onAudioProgress,
    onAudioCompleted,
    onAudioFailed,
    onScriptProgress,
    onScriptCompleted,
    onScriptFailed,
    onConnectionError,
  });
  callbacksRef.current = {
    onAudioProgress,
    onAudioCompleted,
    onAudioFailed,
    onScriptProgress,
    onScriptCompleted,
    onScriptFailed,
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
    const ws = new WebSocket(`${wsUrl}/ws/jobs?token=${token}`);

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
          case 'audio_progress':
            callbacksRef.current.onAudioProgress?.(message.payload);
            break;
          case 'audio_completed':
            callbacksRef.current.onAudioCompleted?.(message.payload);
            break;
          case 'audio_failed':
            callbacksRef.current.onAudioFailed?.(message.payload);
            break;
          case 'script_progress':
            callbacksRef.current.onScriptProgress?.(message.payload);
            break;
          case 'script_completed':
            callbacksRef.current.onScriptCompleted?.(message.payload);
            break;
          case 'script_failed':
            callbacksRef.current.onScriptFailed?.(message.payload);
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
