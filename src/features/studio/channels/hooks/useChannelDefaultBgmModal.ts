import { useRef, useState } from 'react';
import { useUpdateChannelDefaultBgm } from '@/features/studio/channels/hooks/useUpdateChannelDefaultBgm';
import {
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
  const { isUpdating, error, setDefaultBgm, removeDefaultBgm } =
    useUpdateChannelDefaultBgm(channelId);
  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  const bgmFileInputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<'select' | 'upload'>('select');
  const [selectedValue, setSelectedValue] = useState(
    toSelectValue(currentDefaultBgm),
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bgmName, setBgmName] = useState('');

  const hasChanged = selectedValue !== toSelectValue(currentDefaultBgm);

  /**
   * タブを切り替える
   *
   * @param newTab - 切り替え先のタブ
   */
  function switchTab(newTab: 'select' | 'upload') {
    setTab(newTab);
  }

  /**
   * BGM を選択する
   *
   * @param value - Select の値
   */
  function select(value: string) {
    setSelectedValue(value);
  }

  /**
   * アップロードするファイルを選択する
   *
   * @param file - 選択されたファイル
   */
  function selectFile(file: File) {
    setSelectedFile(file);
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
   * 選択済みファイルを BGM としてアップロードする
   *
   * 成功時はフォームをリセットし「既存から選択」タブに切り替える。
   */
  function upload() {
    if (!selectedFile) return;

    uploadBgm(selectedFile, bgmName, {
      onSuccess: () => {
        setBgmName('');
        setSelectedFile(null);
        resetFileInput();
        setTab('select');
      },
    });
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
    allBgms,
    tab,
    selectedValue,
    selectedFile,
    bgmName,
    hasChanged,
    isBgmLoading,
    isUpdating,
    isUploading,
    error,
    uploadError,
    bgmFileInputRef,

    switchTab,
    select,
    selectFile,
    updateBgmName,
    save,
    upload,
    openFilePicker,
  };
}
