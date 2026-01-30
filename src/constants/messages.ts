export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field}を入力してください`,
  select: (field: string) => `${field}を選択してください`,
  maxLength: (field: string, max: number) =>
    `${field}は${max}文字以内で入力してください`,
  minLength: (field: string, min: number) =>
    `${field}は${min}文字以上で入力してください`,
  minCount: (field: string, min: number) =>
    `${field}を${min}人以上追加してください`,
  maxCount: (field: string, max: number) => `${field}は${max}人までです`,
  invalidFormat: (field: string) => `有効な${field}を入力してください`,
  mismatch: (field: string) => `${field}が一致しません`,
} as const;
