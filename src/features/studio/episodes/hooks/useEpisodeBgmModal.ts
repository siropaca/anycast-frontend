import { useRef, useState } from 'react';
import {
  parseSelectValue,
  toSelectValue,
} from '@/features/studio/channels/utils/bgmSelect';
import { useUpdateEpisodeBgm } from '@/features/studio/episodes/hooks/useUpdateEpisodeBgm';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';
import { useGetMeBgms } from '@/libs/api/generated/me/me';
import type {
  ResponseBgmWithEpisodesResponse,
  ResponseEpisodeResponseBgm,
} from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

interface SaveOptions {
  onSuccess?: () => void;
}

/**
 * EpisodeBgmModal のデータ取得と状態管理を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @param currentBgm - 現在のBGM
 * @returns BGMオプション、選択状態、操作関数
 */
export function useEpisodeBgmModal(
  channelId: string,
  episodeId: string,
  currentBgm?: ResponseEpisodeResponseBgm,
) {
  const { data: bgmsData, isLoading: isBgmLoading } = useGetMeBgms({
    include_system: true,
  });
  const allBgms = unwrapResponse<ResponseBgmWithEpisodesResponse[]>(
    bgmsData,
    [],
  );
  const { isUpdating, error, setEpisodeBgm, removeEpisodeBgm } =
    useUpdateEpisodeBgm(channelId, episodeId);
  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  const bgmFileInputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<'select' | 'upload'>('select');
  const [selectedValue, setSelectedValue] = useState(toSelectValue(currentBgm));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bgmName, setBgmName] = useState('');

  const hasChanged = selectedValue !== toSelectValue(currentBgm);

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
   * 値が未選択の場合はBGMを解除する。
   *
   * @param options - オプション（成功時コールバック）
   */
  function save(options?: SaveOptions) {
    if (!selectedValue) {
      removeEpisodeBgm(options);
      return;
    }

    const parsed = parseSelectValue(selectedValue);
    if (!parsed) return;

    setEpisodeBgm(
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
