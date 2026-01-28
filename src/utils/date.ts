/**
 * 日付を相対的な表示文字列に変換
 *
 * @param date - 変換対象の日付
 * @returns 「今日」「昨日」「○日前」「M/D」形式の文字列
 */
export function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今日';
  if (diffDays === 1) return '昨日';
  if (diffDays < 7) return `${diffDays}日前`;
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

/**
 * ミリ秒を m:ss 形式の文字列に変換する
 *
 * @param ms - ミリ秒
 * @returns m:ss 形式の文字列
 *
 * @example
 * formatTime(83000) // => '1:23'
 * formatTime(5000) // => '0:05'
 * formatTime(754000) // => '12:34'
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
