/**
 * 文字列の前後から空白文字を削除する（全角スペースを含む）
 *
 * @param str - トリムする文字列
 * @returns トリムされた文字列
 *
 * @example
 * trimFullWidth('  hello  ') // => 'hello'
 * trimFullWidth('　hello　') // => 'hello'
 */
export function trimFullWidth(str: string): string {
  return str.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
}

/**
 * ファイル名から拡張子を除去する
 *
 * @param fileName - ファイル名
 * @returns 拡張子を除去したファイル名
 *
 * @example
 * removeFileExtension('audio.mp3') // => 'audio'
 * removeFileExtension('my.song.wav') // => 'my.song'
 * removeFileExtension('noextension') // => 'noextension'
 */
export function removeFileExtension(fileName: string): string {
  return fileName.replace(/\.[^/.]+$/, '');
}
