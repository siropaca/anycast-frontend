import type { OptionalFieldString } from '@/libs/api/generated/schemas';

/**
 * nullable なフォーム値を API リクエスト用の値に変換する
 *
 * API は string | null を期待するが、生成型では OptionalFieldString となっている。
 * undefined はフィールド省略（変更なし）、null は削除、string は設定を表す。
 *
 * @param value - フォーム値（string = 設定、null = 削除、undefined = 変更なし）
 * @returns API リクエスト用の値
 *
 * @example
 * toOptionalField("abc")     // => "abc"
 * toOptionalField(null)       // => null
 * toOptionalField(undefined)  // => undefined
 */
export function toOptionalField(
  value: string | null | undefined,
): OptionalFieldString | undefined {
  if (value === undefined) return undefined;
  // 生成型は OptionalFieldString だが API は string | null を受け付ける
  return value as unknown as OptionalFieldString;
}
