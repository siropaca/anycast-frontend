import { useRef, useState } from 'react';
import { useUpdateChannelDefaultBgm } from '@/features/studio/channels/hooks/useUpdateChannelDefaultBgm';
import {
  buildBgmOptions,
  parseSelectValue,
  toSelectValue,
} from '@/features/studio/channels/utils/bgmSelect';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';
import { useGetMeBgms } from '@/libs/api/generated/me/me';
import type {
  ResponseBgmWithEpisodesResponse,
  ResponseChannelResponseDefaultBgm,
} from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

interface SaveOptions {
  onSuccess?: () => void;
}

/**
 * ChannelDefaultBgmModal のデータ取得と状態管理を提供する
 *
 * @param channelId - チャンネル ID
 * @param currentDefaultBgm - 現在のデフォルトBGM
 * @returns BGMオプション、選択状態、操作関数
 */
export function useChannelDefaultBgmModal(
  channelId: string,
  currentDefaultBgm?: ResponseChannelResponseDefaultBgm,
) {
  const { data: bgmsData, isLoading: isBgmLoading } = useGetMeBgms({
    include_system: true,
  });
  const allBgms = unwrapResponse<ResponseBgmWithEpisodesResponse[]>(
    bgmsData,
    [],
  );
  const bgmOptions = buildBgmOptions(allBgms);

  const { isUpdating, error, setDefaultBgm, removeDefaultBgm } =
    useUpdateChannelDefaultBgm(channelId);
  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  const bgmFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState(
    toSelectValue(currentDefaultBgm),
  );
  const [bgmName, setBgmName] = useState('');

  const hasChanged = selectedValue !== toSelectValue(currentDefaultBgm);

  /**
   * BGM を選択する
   *
   * @param value - Select の値
   */
  function select(value: string) {
    setSelectedValue(value);
  }

  /**
   * BGM の選択を解除する
   */
  function clearSelection() {
    setSelectedValue('');
  }

  /**
   * BGM名を更新する
   *
   * @param name - BGM名
   */
  function updateBgmName(name: string) {
    setBgmName(name);
  }

  /**
   * 選択した BGM を保存する
   *
   * 値が未選択の場合はデフォルトBGMを解除する。
   *
   * @param options - オプション（成功時コールバック）
   */
  function save(options?: SaveOptions) {
    if (!selectedValue) {
      removeDefaultBgm(options);
      return;
    }

    const parsed = parseSelectValue(selectedValue);
    if (!parsed) return;

    setDefaultBgm(
      parsed.type === 'user' ? parsed.id : undefined,
      parsed.type === 'system' ? parsed.id : undefined,
      options,
    );
  }

  /**
   * BGM ファイルをアップロードする
   *
   * @param file - アップロードする音声ファイル
   */
  function upload(file: File) {
    uploadBgm(file, bgmName);
    setBgmName('');
    resetFileInput();
  }

  /**
   * ファイル選択ダイアログを開く
   */
  function openFilePicker() {
    bgmFileInputRef.current?.click();
  }

  /**
   * ファイル入力をリセットする
   */
  function resetFileInput() {
    if (bgmFileInputRef.current) {
      bgmFileInputRef.current.value = '';
    }
  }

  return {
    bgmOptions,
    selectedValue,
    bgmName,
    hasChanged,
    isBgmLoading,
    isUpdating,
    isUploading,
    error,
    uploadError,
    bgmFileInputRef,

    select,
    clearSelection,
    updateBgmName,
    save,
    upload,
    openFilePicker,
  };
}
