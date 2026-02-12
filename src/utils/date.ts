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
 * 日付を「YYYY年M月」形式の文字列に変換する
 *
 * @param date - 変換対象の日付
 * @returns 「YYYY年M月」形式の文字列
 *
 * @example
 * formatYearMonth(new Date('2024-01-15')) // => '2024年1月'
 */
export function formatYearMonth(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
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

/**
 * 日付を「M月D日」形式の文字列に変換する
 *
 * @param date - 変換対象の日付
 * @returns 「M月D日」形式の文字列
 *
 * @example
 * formatDateJP(new Date('2024-03-15')) // => '3月15日'
 */
export function formatDateJP(date: Date): string {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * 日付を「M/D HH:mm」形式の文字列に変換する
 *
 * @param date - 変換対象の日付
 * @returns 「M/D HH:mm」形式の文字列
 *
 * @example
 * formatDateTime(new Date('2024-03-15T14:05:00')) // => '3/15 14:05'
 */
export function formatDateTime(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}/${day} ${hours}:${minutes}`;
}

/**
 * ミリ秒を「X分Y秒」形式の文字列に変換する
 *
 * @param ms - ミリ秒
 * @returns 「X分Y秒」形式の文字列
 *
 * @example
 * formatDuration(83000) // => '1分23秒'
 * formatDuration(5000) // => '0分5秒'
 */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}分${seconds}秒`;
}

/**
 * ミリ秒の経過時間を「X秒」または「X分Y秒」形式の文字列に変換する
 *
 * @param ms - 経過ミリ秒
 * @returns 経過時間の文字列
 *
 * @example
 * formatElapsedTime(5000) // => '5秒'
 * formatElapsedTime(83000) // => '1分23秒'
 */
export function formatElapsedTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}秒`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}分${seconds}秒`;
}
