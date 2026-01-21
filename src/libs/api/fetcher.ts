import { StatusCodes } from 'http-status-codes';
import { getSession } from 'next-auth/react';
import { auth } from '@/libs/auth/auth';

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
 * orval 用のカスタムフェッチャー
 *
 * @param url - API エンドポイント（ベースパスからの相対パス）
 * @param options - fetch オプション
 * @returns レスポンスデータ
 * @throws HTTP エラー時にエラーをスロー
 */
export async function customFetcher<TResponse>(
  url: string,
  options?: RequestInit,
): Promise<TResponse> {
  const headers: HeadersInit = {
    ...options?.headers,
  };

  const accessToken = await getAccessToken();
  if (accessToken) {
    (headers as Record<string, string>).Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `HTTP error: ${response.status}`);
  }

  // 204 No Content の場合はボディがないため JSON パースをスキップ
  const data =
    response.status === StatusCodes.NO_CONTENT
      ? undefined
      : await response.json();

  return {
    data,
    status: response.status,
    headers: response.headers,
  } as TResponse;
}

export default customFetcher;
