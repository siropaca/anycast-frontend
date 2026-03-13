import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SessionGuard } from '@/libs/auth/SessionGuard';

// next-auth/react のモック
const mockSignOut = vi.fn();
const mockUpdate = vi.fn();
const mockUseSession = vi.fn();
vi.mock('next-auth/react', () => ({
  useSession: () => mockUseSession(),
  signOut: (...args: unknown[]) => mockSignOut(...args),
}));

describe('SessionGuard', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('子要素をレンダリングする', () => {
    mockUseSession.mockReturnValue({ data: null, update: mockUpdate });

    render(
      <SessionGuard>
        <div>テストコンテンツ</div>
      </SessionGuard>,
    );

    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });

  it('セッションエラーがない場合はサインアウトしない', () => {
    mockUseSession.mockReturnValue({
      data: { accessToken: 'valid-token' },
      update: mockUpdate,
    });

    render(
      <SessionGuard>
        <div>コンテンツ</div>
      </SessionGuard>,
    );

    expect(mockSignOut).not.toHaveBeenCalled();
  });

  it('RefreshTokenError 時にまずセッション再取得を試みる', () => {
    mockUseSession.mockReturnValue({
      data: { error: 'RefreshTokenError' },
      update: mockUpdate,
    });

    render(
      <SessionGuard>
        <div>コンテンツ</div>
      </SessionGuard>,
    );

    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockSignOut).not.toHaveBeenCalled();
  });

  it('RefreshTokenError がリトライ上限を超えたら自動ログアウトする', () => {
    // update の参照を毎回変えることで useEffect の deps を変化させ、再実行を促す
    // 実際の動作: update() → セッション再取得 → error 継続 → effect 再実行
    const updateFns = [vi.fn(), vi.fn(), vi.fn()];
    let callIndex = 0;
    mockUseSession.mockImplementation(() => {
      const fn = updateFns[Math.min(callIndex, updateFns.length - 1)];
      return { data: { error: 'RefreshTokenError' }, update: fn };
    });

    const { rerender } = render(
      <SessionGuard>
        <div>コンテンツ</div>
      </SessionGuard>,
    );

    // 1回目: update() でリトライ
    expect(updateFns[0]).toHaveBeenCalledTimes(1);
    expect(mockSignOut).not.toHaveBeenCalled();

    // 2回目: update() でリトライ
    callIndex = 1;
    rerender(
      <SessionGuard>
        <div>コンテンツ</div>
      </SessionGuard>,
    );
    expect(updateFns[1]).toHaveBeenCalledTimes(1);
    expect(mockSignOut).not.toHaveBeenCalled();

    // 3回目: リトライ上限（MAX_REFRESH_RETRIES = 2）に達し signOut
    callIndex = 2;
    rerender(
      <SessionGuard>
        <div>コンテンツ</div>
      </SessionGuard>,
    );
    expect(mockSignOut).toHaveBeenCalledWith({
      callbackUrl: '/login',
    });
  });
});
