import type { ResponseChannelResponseDefaultBgm } from '@/libs/api/generated/schemas';

interface ParsedBgmValue {
  type: 'user' | 'system';
  id: string;
}

/**
 * デフォルトBGM から Select の値を算出する
 *
 * @param bgm - デフォルトBGM（undefined の場合は空文字を返す）
 * @returns "user:{id}" または "system:{id}" 形式の文字列
 *
 * @example
 * toSelectValue({ id: '1', isSystem: false, name: 'My BGM', audio: ... }) // => 'user:1'
 * toSelectValue({ id: '2', isSystem: true, name: 'System BGM', audio: ... }) // => 'system:2'
 * toSelectValue(undefined) // => ''
 */
export function toSelectValue(bgm?: ResponseChannelResponseDefaultBgm): string {
  if (!bgm) return '';
  return `${bgm.isSystem ? 'system' : 'user'}:${bgm.id}`;
}

/**
 * Select の値をパースして type と id に分解する
 *
 * @param value - "user:{id}" または "system:{id}" 形式の文字列
 * @returns パース結果（無効な値の場合は undefined）
 *
 * @example
 * parseSelectValue('user:abc') // => { type: 'user', id: 'abc' }
 * parseSelectValue('system:123') // => { type: 'system', id: '123' }
 * parseSelectValue('') // => undefined
 */
export function parseSelectValue(value: string): ParsedBgmValue | undefined {
  const [type, id] = value.split(':');
  if (!id || (type !== 'user' && type !== 'system')) return undefined;
  return { type, id };
}
