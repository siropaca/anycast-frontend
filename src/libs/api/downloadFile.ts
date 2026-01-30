import { StatusCodes } from 'http-status-codes';
import { getSession } from 'next-auth/react';
import { doFetch, getAccessToken } from '@/libs/api/fetcher';

/**
 * API からファイルをダウンロードする
 *
 * @param url - API エンドポイント（ベースパスからの相対パス）
 * @param filename - ダウンロード時のファイル名
 * @param options - fetch オプション
 * @throws HTTP エラー時にエラーをスロー
 */
export async function downloadFile(
  url: string,
  filename: string,
  options?: RequestInit,
): Promise<void> {
  const accessToken = await getAccessToken();
  let response = await doFetch(url, options, accessToken);

  // 401 リアクティブリトライ
  if (response.status === StatusCodes.UNAUTHORIZED) {
    const session = await getSession();
    const newToken = session?.accessToken;
    if (newToken && newToken !== accessToken) {
      response = await doFetch(url, options, newToken);
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `HTTP error: ${response.status}`);
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}
