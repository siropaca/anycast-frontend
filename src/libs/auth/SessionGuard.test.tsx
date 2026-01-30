import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SessionGuard } from '@/libs/auth/SessionGuard';

// next-auth/react のモック
const mockSignOut = vi.fn();
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
    mockUseSession.mockReturnValue({ data: null });

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
    });

    render(
      <SessionGuard>
        <div>コンテンツ</div>
      </SessionGuard>,
    );

    expect(mockSignOut).not.toHaveBeenCalled();
  });

  it('RefreshTokenError 時に自動ログアウトする', () => {
    mockUseSession.mockReturnValue({
      data: { error: 'RefreshTokenError' },
    });

    render(
      <SessionGuard>
        <div>コンテンツ</div>
      </SessionGuard>,
    );

    expect(mockSignOut).toHaveBeenCalledWith({
      callbackUrl: '/login',
    });
  });
});
