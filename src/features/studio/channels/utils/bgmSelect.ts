import type {
  ResponseBgmWithEpisodesResponse,
  ResponseChannelResponseDefaultBgm,
} from '@/libs/api/generated/schemas';

interface BgmOptionGroup {
  label: string;
  options: { label: string; value: string }[];
}

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

/**
 * BGM一覧から Select のグループ化オプションを構築する
 *
 * @param allBgms - BGM一覧（ユーザーBGM + システムBGM）
 * @returns グループ化されたオプション配列
 *
 * @example
 * buildBgmOptions([
 *   { id: '1', name: 'My BGM', isSystem: false, ... },
 *   { id: '2', name: 'Default', isSystem: true, ... },
 * ])
 * // => [
 * //   { label: 'マイBGM', options: [{ label: 'My BGM', value: 'user:1' }] },
 * //   { label: 'システム', options: [{ label: 'Default', value: 'system:2' }] },
 * // ]
 */
export function buildBgmOptions(
  allBgms: ResponseBgmWithEpisodesResponse[],
): BgmOptionGroup[] {
  const userBgms = allBgms.filter((bgm) => !bgm.isSystem);
  const systemBgms = allBgms.filter((bgm) => bgm.isSystem);

  const groups: BgmOptionGroup[] = [];

  if (userBgms.length > 0) {
    groups.push({
      label: 'マイBGM',
      options: userBgms.map((bgm) => ({
        label: bgm.name,
        value: `user:${bgm.id}`,
      })),
    });
  }

  if (systemBgms.length > 0) {
    groups.push({
      label: 'システム',
      options: systemBgms.map((bgm) => ({
        label: bgm.name,
        value: `system:${bgm.id}`,
      })),
    });
  }

  return groups;
}
