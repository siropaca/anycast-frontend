import { useEffect, useState } from 'react';

/**
 * 開始時刻からの経過ミリ秒を1秒ごとに更新して返す
 *
 * @param startedAt - 開始時刻のタイムスタンプ（ミリ秒）。null の場合は null を返す
 * @returns 経過ミリ秒。startedAt が null なら null
 */
export function useElapsedTime(startedAt: number | null): number | null {
  const [elapsedMs, setElapsedMs] = useState<number | null>(() =>
    startedAt != null ? Date.now() - startedAt : null,
  );

  useEffect(() => {
    if (startedAt == null) {
      setElapsedMs(null);
      return;
    }

    setElapsedMs(Date.now() - startedAt);

    const intervalId = setInterval(() => {
      setElapsedMs(Date.now() - startedAt);
    }, 1_000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startedAt]);

  return elapsedMs;
}
