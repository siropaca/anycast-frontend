import { act, renderHook } from '@testing-library/react';
import { useElapsedTime } from '@/hooks/useElapsedTime';

describe('useElapsedTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('startedAt が null なら null を返す', () => {
    const { result } = renderHook(() => useElapsedTime(null));
    expect(result.current).toBeNull();
  });

  it('初期値として現在時刻との差を返す', () => {
    vi.setSystemTime(new Date('2024-01-01T00:00:10.000Z'));
    const startedAt = new Date('2024-01-01T00:00:00.000Z').getTime();

    const { result } = renderHook(() => useElapsedTime(startedAt));
    expect(result.current).toBe(10_000);
  });

  it('1秒ごとに経過時間を更新する', () => {
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
    const startedAt = Date.now();

    const { result } = renderHook(() => useElapsedTime(startedAt));
    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(result.current).toBe(1_000);

    act(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(result.current).toBe(2_000);
  });

  it('startedAt が null に変わるとタイマーを停止して null を返す', () => {
    vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
    const startedAt = Date.now();

    const { result, rerender } = renderHook(
      ({ value }) => useElapsedTime(value),
      { initialProps: { value: startedAt as number | null } },
    );

    act(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(result.current).toBe(1_000);

    rerender({ value: null });
    expect(result.current).toBeNull();

    // タイマーが停止していることを確認
    act(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(result.current).toBeNull();
  });

  it('startedAt が変わると新しい開始時刻で再計算する', () => {
    vi.setSystemTime(new Date('2024-01-01T00:00:05.000Z'));
    const startedAt1 = new Date('2024-01-01T00:00:00.000Z').getTime();

    const { result, rerender } = renderHook(
      ({ value }) => useElapsedTime(value),
      { initialProps: { value: startedAt1 } },
    );
    expect(result.current).toBe(5_000);

    // 新しい開始時刻に変更
    const startedAt2 = new Date('2024-01-01T00:00:03.000Z').getTime();
    rerender({ value: startedAt2 });
    expect(result.current).toBe(2_000);
  });
});
