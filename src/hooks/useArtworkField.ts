import { useRef, useState } from 'react';

import { useGenerateArtwork } from '@/hooks/useGenerateArtwork';
import { useUploadArtwork } from '@/hooks/useUploadArtwork';

const SYSTEM_PROMPT =
  '人物は描かないでください。ネオン、発光、ホログラム、SF的な要素は避けてください。写真のようにリアルなスタイル。画像に文字やテキストを含めないでください。';

interface ArtworkFieldOptions {
  onUpload: (id: string) => void;
  initialPreviewUrl?: string;
  systemPrompt?: string;

  onRemove?: () => void;
}

/**
 * アートワーク画像のアップロード・AI生成・プレビュー・モーダル状態を管理する
 *
 * @param options - コールバックと初期プレビュー URL
 * @returns アートワークフィールドの状態と操作関数
 */
export function useArtworkField(options: ArtworkFieldOptions) {
  const callbacks = options;
  const { uploadArtwork, isUploading, error: uploadError } = useUploadArtwork();

  const {
    generateArtwork,
    isGenerating,
    error: generateError,
  } = useGenerateArtwork();

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    options.initialPreviewUrl,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [generateModalDefaultPrompt, setGenerateModalDefaultPrompt] =
    useState('');

  /**
   * ファイル選択ダイアログを開く
   */
  function openFilePicker() {
    fileInputRef.current?.click();
  }

  /**
   * ファイルをアップロードしてプレビューを更新する
   *
   * @param file - アップロードする画像ファイル
   */
  function upload(file: File) {
    uploadArtwork(file, ({ id, url }) => {
      callbacks.onUpload(id);
      setPreviewUrl(url);
    });
  }

  /**
   * プレビューとファイル入力をクリアし、onRemove を呼び出す
   */
  function remove() {
    callbacks.onRemove?.();
    setPreviewUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  // setPreviewUrl は React が参照安定を保証するため、そのまま公開する
  const resetPreview = setPreviewUrl;

  /**
   * AI 生成モーダルを開く
   *
   * @param defaultPrompt - モーダルに設定するデフォルトプロンプト
   */
  function openGenerateModal(defaultPrompt: string) {
    setGenerateModalDefaultPrompt(defaultPrompt);
    setGenerateModalOpen(true);
  }

  /**
   * AI 生成モーダルを閉じる
   */
  function closeGenerateModal() {
    setGenerateModalOpen(false);
  }

  /**
   * ユーザー入力プロンプトにシステムプロンプトを結合してアートワークを生成する
   *
   * @param userPrompt - ユーザーが入力したプロンプト
   */
  function submitGenerate(userPrompt: string) {
    const fullPrompt = `${userPrompt}\n${options.systemPrompt ?? SYSTEM_PROMPT}`;

    generateArtwork(fullPrompt, ({ id, url }) => {
      callbacks.onUpload(id);
      setPreviewUrl(url);
      setGenerateModalOpen(false);
    });
  }

  return {
    previewUrl,
    fileInputRef,
    isUploading,
    isGenerating,
    uploadError,
    generateError,

    generateModalOpen,
    generateModalDefaultPrompt,

    openFilePicker,
    upload,
    remove,
    resetPreview,
    openGenerateModal,
    closeGenerateModal,
    submitGenerate,
  };
}
