/**
 * クエリパラメータをクエリストリングに変換する
 *
 * @param params - クエリパラメータのオブジェクト
 * @returns クエリストリング（例: '?key=value'）、パラメータがない場合は空文字
 *
 * @example
 * buildQuery({ page: 1, sort: 'desc' }) // => '?page=1&sort=desc'
 * buildQuery()                          // => ''
 */
export function buildQuery(
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}
