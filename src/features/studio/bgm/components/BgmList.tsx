'use client';

import { useRef, useState } from 'react';
import { useDeleteBgm } from '@/features/studio/bgm/hooks/useDeleteBgm';
import { useMyBgmList } from '@/features/studio/bgm/hooks/useMyBgmList';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';

export function BgmList() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bgmName, setBgmName] = useState('');

  const { bgms } = useMyBgmList();
  const { deleteBgm, isDeleting, error: deleteError } = useDeleteBgm();
  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  const error = deleteError ?? uploadError;

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadBgm(file, bgmName);
    setBgmName('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleDeleteClick(bgmId: string) {
    deleteBgm(bgmId);
  }

  return (
    <div>
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="BGM名（省略時はファイル名）"
          className="border mr-2"
          value={bgmName}
          disabled={isUploading}
          onChange={(e) => setBgmName(e.target.value)}
        />
        <button
          type="button"
          className="border"
          disabled={isUploading}
          onClick={handleUploadClick}
        >
          {isUploading ? 'アップロード中...' : 'BGMをアップロード'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <hr className="my-4" />

      <ul className="space-y-2">
        {bgms.length === 0 && <li>BGMがありません</li>}

        {bgms.map((bgm) => (
          <li key={bgm.id} className="border p-2">
            <div className="flex items-center justify-between">
              <span>{bgm.name}</span>
              <button
                type="button"
                className="border px-2"
                disabled={isDeleting}
                onClick={() => handleDeleteClick(bgm.id)}
              >
                {isDeleting ? '削除中...' : '削除'}
              </button>
            </div>
            <audio controls preload="metadata" className="mt-2 w-full">
              <source src={bgm.audio.url} />
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}
