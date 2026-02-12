/**
 * API エラーレスポンスを保持するエラークラス
 *
 * @param message - エラーメッセージ
 * @param status - HTTP ステータスコード
 * @param code - エラーコード（例: "SCRIPT_PARSE_ERROR"）
 * @param details - エラーの詳細情報
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;
  readonly details: unknown;

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
