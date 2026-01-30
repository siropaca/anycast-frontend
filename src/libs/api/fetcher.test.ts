import { StatusCodes } from 'http-status-codes';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { customFetcher } from '@/libs/api/fetcher';

// next-auth/react のモック
const mockGetSession = vi.fn();
vi.mock('next-auth/react', () => ({
  getSession: (...args: unknown[]) => mockGetSession(...args),
}));

// auth のモック（サーバーサイドでは使われないがインポート解決のため）
vi.mock('@/libs/auth/auth', () => ({
  auth: vi.fn().mockResolvedValue({ session: null }),
}));

// fetch のモック
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

/**
 * JSON レスポンスを返す Response モックを生成する
 *
 * @param status - HTTP ステータスコード
 * @param body - レスポンスボディ
 * @returns Response オブジェクト
 */
function createJsonResponse(
  status: number,
  body: unknown,
): Partial<Response> {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(),
    json: vi.fn().mockResolvedValue(body),
  };
}

describe('customFetcher', () => {
  beforeEach(() => {
    mockGetSession.mockResolvedValue({ accessToken: 'access-token-1' });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockFetch.mockReset();
    mockGetSession.mockReset();
  });

  it('アクセストークン付きでリクエストを送信する', async () => {
    mockFetch.mockResolvedValue(
      createJsonResponse(StatusCodes.OK, { id: '1' }),
    );

    await customFetcher('/users/me');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/users/me'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer access-token-1',
        }),
      }),
    );
  });

  it('200 レスポンスのデータを返す', async () => {
    mockFetch.mockResolvedValue(
      createJsonResponse(StatusCodes.OK, { name: 'test' }),
    );

    const result = await customFetcher('/users/me');

    expect(result).toEqual({
      data: { name: 'test' },
      status: StatusCodes.OK,
      headers: expect.any(Headers),
    });
  });

  it('204 No Content の場合は data を undefined にする', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: StatusCodes.NO_CONTENT,
      headers: new Headers(),
    });

    const result = await customFetcher('/some-endpoint');

    expect(result).toEqual({
      data: undefined,
      status: StatusCodes.NO_CONTENT,
      headers: expect.any(Headers),
    });
  });

  it('エラーレスポンス時にエラーをスローする', async () => {
    mockFetch.mockResolvedValue(
      createJsonResponse(StatusCodes.INTERNAL_SERVER_ERROR, {
        error: { message: 'Internal Server Error' },
      }),
    );

    await expect(customFetcher('/users/me')).rejects.toThrow(
      'Internal Server Error',
    );
  });

  describe('401 リアクティブリトライ', () => {
    it('401 レスポンス時にセッションを再取得してリトライする', async () => {
      mockFetch
        .mockResolvedValueOnce(
          createJsonResponse(StatusCodes.UNAUTHORIZED, {
            error: { message: 'Unauthorized' },
          }),
        )
        .mockResolvedValueOnce(
          createJsonResponse(StatusCodes.OK, { id: '1' }),
        );

      // 2 回目の getSession で新しいトークンを返す
      mockGetSession
        .mockResolvedValueOnce({ accessToken: 'access-token-1' })
        .mockResolvedValueOnce({ accessToken: 'access-token-2' });

      const result = await customFetcher('/users/me');

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        data: { id: '1' },
        status: StatusCodes.OK,
        headers: expect.any(Headers),
      });
    });

    it('新しいトークンが同じ場合はリトライしない', async () => {
      mockFetch.mockResolvedValue(
        createJsonResponse(StatusCodes.UNAUTHORIZED, {
          error: { message: 'Unauthorized' },
        }),
      );

      // 再取得しても同じトークン
      mockGetSession.mockResolvedValue({ accessToken: 'access-token-1' });

      await expect(customFetcher('/users/me')).rejects.toThrow('Unauthorized');
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('/auth/ パスへのリクエストではリトライしない', async () => {
      mockFetch.mockResolvedValue(
        createJsonResponse(StatusCodes.UNAUTHORIZED, {
          error: { message: 'Unauthorized' },
        }),
      );

      await expect(customFetcher('/auth/login')).rejects.toThrow(
        'Unauthorized',
      );
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('リトライも失敗した場合はエラーをスローする', async () => {
      mockFetch.mockResolvedValue(
        createJsonResponse(StatusCodes.UNAUTHORIZED, {
          error: { message: 'Unauthorized' },
        }),
      );

      mockGetSession
        .mockResolvedValueOnce({ accessToken: 'access-token-1' })
        .mockResolvedValueOnce({ accessToken: 'access-token-2' });

      await expect(customFetcher('/users/me')).rejects.toThrow('Unauthorized');
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
