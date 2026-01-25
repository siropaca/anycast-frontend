/**
 * アプリケーション全体で使用するメッセージ定数
 */
export const MESSAGES = {
  validation: {
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
  },
  channel: {
    createError: 'チャンネルの作成に失敗しました',
    updateError: 'チャンネルの更新に失敗しました',
    deleteError: 'チャンネルの削除に失敗しました',
    publishError: 'チャンネルの公開に失敗しました',
    unpublishError: 'チャンネルの非公開に失敗しました',
    notFound: 'チャンネルが見つかりません',
  },
  episode: {
    createError: 'エピソードの作成に失敗しました',
    updateError: 'エピソードの更新に失敗しました',
    deleteError: 'エピソードの削除に失敗しました',
    publishError: 'エピソードの公開に失敗しました',
    unpublishError: 'エピソードの非公開に失敗しました',
  },
  script: {
    generateError: '台本生成に失敗しました',
    generateStartError: '台本生成の開始に失敗しました',
    exportError: '台本のエクスポートに失敗しました',
    importError: '台本のインポートに失敗しました',
    cancelError: '台本生成のキャンセルに失敗しました',
  },
  scriptLine: {
    createError: '台本行の作成に失敗しました',
    updateError: '台本行の更新に失敗しました',
    deleteError: '台本行の削除に失敗しました',
    reorderError: '台本行の並び替えに失敗しました',
  },
  audio: {
    generateError: '音声生成に失敗しました',
    generateStartError: '音声生成の開始に失敗しました',
    cancelError: '音声生成のキャンセルに失敗しました',
  },
  bgm: {
    setError: 'BGMの設定に失敗しました',
    deleteError: 'BGMの削除に失敗しました',
  },
  image: {
    uploadError: '画像のアップロードに失敗しました',
  },
  auth: {
    signupError: 'ユーザー登録に失敗しました',
  },
  settings: {
    updateUserPromptError: 'マスタープロンプトの更新に失敗しました',
  },
} as const;
