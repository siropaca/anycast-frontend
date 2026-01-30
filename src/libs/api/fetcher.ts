import { StatusCodes } from 'http-status-codes';
import { getSession } from 'next-auth/react';
import { auth } from '@/libs/auth/auth';

/**
 * アクセストークンを取得する
 *
 * @returns アクセストークン（存在しない場合は undefined）
 */
export async function getAccessToken(): Promise<string | undefined> {
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
 * fetch リクエストを実行する
 *
 * @param url - API エンドポイント（ベースパスからの相対パス）
 * @param options - fetch オプション
 * @param accessToken - アクセストークン
 * @returns fetch レスポンス
 */
export async function doFetch(
  url: string,
  options: RequestInit | undefined,
  accessToken: string | undefined,
): Promise<Response> {
  const headers: HeadersInit = {
    ...options?.headers,
  };

  if (accessToken) {
    (headers as Record<string, string>).Authorization = `Bearer ${accessToken}`;
  }

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1${url}`, {
    ...options,
    headers,
  });
}

/**
 * 401 レスポンスの場合にセッションを再取得してリトライすべきかを判定する
 *
 * @param url - リクエスト先 URL
 * @returns リトライすべきなら true
 */
function shouldRetryOn401(url: string): boolean {
  return typeof window !== 'undefined' && !url.startsWith('/auth/');
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
  const accessToken = await getAccessToken();
  let response = await doFetch(url, options, accessToken);

  // 401 リアクティブリトライ
  if (response.status === StatusCodes.UNAUTHORIZED && shouldRetryOn401(url)) {
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
