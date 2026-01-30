/**
 * Base64URL 文字列をデコードする
 *
 * @param base64Url - Base64URL エンコードされた文字列
 * @returns デコード済み文字列
 */
function decodeBase64Url(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return atob(base64);
}

/**
 * JWT トークンから exp クレーム（有効期限）を取得する
 *
 * @param token - JWT アクセストークン
 * @returns Unix 秒での有効期限。取得できない場合は undefined
 *
 * @example
 * getTokenExpiry('eyJ...') // => 1700000000
 */
export function getTokenExpiry(token: string): number | undefined {
  try {
    const payload = token.split('.')[1];
    if (!payload) return undefined;

    const decoded = decodeBase64Url(payload);
    const parsed = JSON.parse(decoded) as { exp?: number };

    return parsed.exp;
  } catch {
    return undefined;
  }
}

/**
 * JWT トークンの有効期限が間もなく切れるかどうかを判定する
 *
 * @param token - JWT アクセストークン
 * @param bufferSeconds - 残り秒数がこの値以下なら true を返す（デフォルト: 300 = 5分）
 * @returns 有効期限が近い（または既に切れている）場合 true
 *
 * @example
 * isTokenExpiringSoon('eyJ...') // => true
 * isTokenExpiringSoon('eyJ...', 60) // => false
 */
export function isTokenExpiringSoon(
  token: string,
  bufferSeconds: number = 300,
): boolean {
  const exp = getTokenExpiry(token);
  if (exp === undefined) return true;

  const nowSeconds = Math.floor(Date.now() / 1000);
  return exp - nowSeconds <= bufferSeconds;
}
