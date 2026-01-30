import { StatusCodes } from 'http-status-codes';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadFile } from '@/libs/api/downloadFile';

// next-auth/react のモック
const mockGetSession = vi.fn();
vi.mock('next-auth/react', () => ({
  getSession: (...args: unknown[]) => mockGetSession(...args),
}));

// auth のモック（fetcher.ts 経由でインポートされるため）
vi.mock('@/libs/auth/auth', () => ({
  auth: vi.fn().mockResolvedValue({ session: null }),
}));

// fetch のモック
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// URL / DOM 操作のモック
const mockCreateObjectURL = vi.fn().mockReturnValue('blob:test-url');
const mockRevokeObjectURL = vi.fn();
vi.stubGlobal('URL', {
  ...globalThis.URL,
  createObjectURL: mockCreateObjectURL,
  revokeObjectURL: mockRevokeObjectURL,
});

/**
 * Blob レスポンスを返す Response モックを生成する
 *
 * @param status - HTTP ステータスコード
 * @param blobData - Blob データ（省略時はダミー）
 * @returns Response オブジェクト
 */
function createBlobResponse(
  status: number,
  blobData: Blob = new Blob(['test']),
): Partial<Response> {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(),
    blob: vi.fn().mockResolvedValue(blobData),
    json: vi
      .fn()
      .mockResolvedValue({ error: { message: `HTTP error: ${status}` } }),
  };
}

describe('downloadFile', () => {
  let mockLink: {
    href: string;
    download: string;
    click: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockGetSession.mockResolvedValue({ accessToken: 'access-token-1' });

    mockLink = { href: '', download: '', click: vi.fn() };
    vi.spyOn(document, 'createElement').mockReturnValue(
      mockLink as unknown as HTMLElement,
    );
    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockFetch.mockReset();
    mockGetSession.mockReset();
  });

  it('ファイルをダウンロードする', async () => {
    mockFetch.mockResolvedValue(createBlobResponse(StatusCodes.OK));

    await downloadFile('/files/123', 'test.mp3');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/files/123'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer access-token-1',
        }),
      }),
    );
    expect(mockLink.download).toBe('test.mp3');
    expect(mockLink.click).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:test-url');
  });

  it('エラーレスポンス時にエラーをスローする', async () => {
    mockFetch.mockResolvedValue(
      createBlobResponse(StatusCodes.INTERNAL_SERVER_ERROR),
    );

    await expect(downloadFile('/files/123', 'test.mp3')).rejects.toThrow();
  });

  describe('401 リアクティブリトライ', () => {
    it('401 レスポンス時にセッションを再取得してリトライする', async () => {
      mockFetch
        .mockResolvedValueOnce(createBlobResponse(StatusCodes.UNAUTHORIZED))
        .mockResolvedValueOnce(createBlobResponse(StatusCodes.OK));

      mockGetSession
        .mockResolvedValueOnce({ accessToken: 'access-token-1' })
        .mockResolvedValueOnce({ accessToken: 'access-token-2' });

      await downloadFile('/files/123', 'test.mp3');

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockLink.click).toHaveBeenCalled();
    });

    it('新しいトークンが同じ場合はリトライしない', async () => {
      mockFetch.mockResolvedValue(createBlobResponse(StatusCodes.UNAUTHORIZED));
      mockGetSession.mockResolvedValue({ accessToken: 'access-token-1' });

      await expect(downloadFile('/files/123', 'test.mp3')).rejects.toThrow();
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});
