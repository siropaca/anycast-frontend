'use client';

import { DownloadSimpleIcon, UploadSimpleIcon } from '@phosphor-icons/react';
import { useRef } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { ScriptLineList } from '@/features/studio/episodes/components/ScriptLineList';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useImportScript } from '@/features/studio/episodes/hooks/useImportScript';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
}

export function ScriptSection({ channelId, episodeId, episodeName }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    exportScript,
    isExporting,
    error: exportError,
  } = useExportScript(channelId, episodeId, episodeName);

  const {
    handleFileSelect,
    isImporting,
    error: importError,
  } = useImportScript(channelId, episodeId);

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  const error = exportError ?? importError;

  return (
    <div className="space-y-4">
      <SectionTitle
        title="台本"
        level="h3"
        action={
          <div className="flex items-center gap-1">
            <IconButton
              icon={<UploadSimpleIcon size={18} />}
              aria-label="台本をインポート"
              color="secondary"
              variant="text"
              size="sm"
              disabled={isImporting}
              onClick={handleImportClick}
            />
            <IconButton
              icon={<DownloadSimpleIcon size={18} />}
              aria-label="台本をエクスポート"
              color="secondary"
              variant="text"
              size="sm"
              disabled={isExporting}
              onClick={exportScript}
            />
          </div>
        }
      />

      {error && <p className="text-sm text-text-danger">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleFileSelect}
      />

      <ScriptLineList channelId={channelId} episodeId={episodeId} />
    </div>
  );
}
