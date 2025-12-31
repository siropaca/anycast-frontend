import { StatusCodes } from 'http-status-codes';

/**
 * orval が生成したレスポンスからデータを取り出す
 *
 * @param response - orval が生成したレスポンス
 * @param defaultValue - エラー時のデフォルト値
 * @returns 成功時はレスポンスデータ、エラー時はデフォルト値
 *
 * @example
 * const channels = unwrapResponse<Response[]>(data, []);
 */
export function unwrapResponse<T>(
  response: { status: number; data: unknown } | undefined,
  defaultValue: T,
): T {
  if (
    response?.status === StatusCodes.OK ||
    response?.status === StatusCodes.CREATED
  ) {
    const data = response.data as { data?: T } | undefined;
    return data?.data ?? defaultValue;
  }

  return defaultValue;
}
