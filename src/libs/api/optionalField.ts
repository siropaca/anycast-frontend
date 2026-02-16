import type { OptionalFieldString } from '@/libs/api/generated/schemas';

/**
 * nullable なフォーム値を OptionalFieldString に変換する
 *
 * @param value - フォーム値（string = 設定、null = 削除、undefined = 変更なし）
 * @returns API リクエスト用の OptionalFieldString
 *
 * @example
 * toOptionalField("abc")     // => { isSet: true, value: "abc" }
 * toOptionalField(null)       // => { isSet: true }
 * toOptionalField(undefined)  // => undefined
 */
function toOptionalField(
	value: string | null | undefined,
): OptionalFieldString | undefined {
	if (value === undefined) return undefined;
	if (value === null) return { isSet: true };
	return { isSet: true, value };
}

export { toOptionalField };
