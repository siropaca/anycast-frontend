import { getSession } from 'next-auth/react';
import { auth } from '@/libs/auth/auth';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8081';

/**
 * アクセストークンを取得する
 *
 * @returns アクセストークン（存在しない場合は undefined）
 */
async function getAccessToken(): Promise<string | undefined> {
  // クライアントサイド
  if (typeof window !== 'undefined') {
    const session = await getSession();
    return session?.accessToken;
  }

  // サーバーサイド
  const { session } = await auth();
  return session?.accessToken;
}

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
  const headers: HeadersInit = {
    ...options?.headers,
  };

  const accessToken = await getAccessToken();
  if (accessToken) {
    (headers as Record<string, string>).Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1${url}`, {
    ...options,
    headers,
  });

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
