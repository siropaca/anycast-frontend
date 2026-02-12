'use client';

import { DownloadSimpleIcon, UploadSimpleIcon } from '@phosphor-icons/react';
import { useRef } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ScriptLineList } from '@/features/studio/episodes/components/ScriptLineList';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useImportScript } from '@/features/studio/episodes/hooks/useImportScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
  onGenerateClick?: () => void;
}

export function ScriptSection({
  channelId,
  episodeId,
  episodeName,
  onGenerateClick,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scriptLines } = useScriptLines(channelId, episodeId);

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
        title={`台本（${scriptLines.length}行）`}
        level="h3"
        action={
          <div className="flex items-center gap-3">
            <Button
              leftIcon={<DownloadSimpleIcon size={14} />}
              variant="outline"
              color="secondary"
              size="sm"
              disabled={isImporting}
              onClick={handleImportClick}
            >
              インポート
            </Button>

            <Button
              leftIcon={<UploadSimpleIcon size={14} />}
              variant="outline"
              color="secondary"
              size="sm"
              disabled={isExporting || scriptLines.length === 0}
              onClick={exportScript}
            >
              エクスポート
            </Button>
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

      <ScriptLineList
        channelId={channelId}
        episodeId={episodeId}
        onGenerateClick={onGenerateClick}
        onImportClick={handleImportClick}
      />
    </div>
  );
}
