'use client';

import { useRef } from 'react';
import { ScriptGenerateForm } from '@/features/studio/episodes/components/ScriptGenerateForm';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useImportScript } from '@/features/studio/episodes/hooks/useImportScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
}

export function ScriptLineList({ channelId, episodeId, episodeName }: Props) {
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

  if (scriptLines.length === 0) {
    return <ScriptGenerateForm channelId={channelId} episodeId={episodeId} />;
  }

  function handleExport() {
    exportScript();
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  return (
    <>
      {exportError && <p>{exportError}</p>}
      {importError && <p>{importError}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleFileSelect}
      />

      <button type="button" className="border">
        全体の音声を生成
      </button>

      <button
        type="button"
        className="border"
        disabled={isImporting}
        onClick={handleImportClick}
      >
        {isImporting ? 'インポート中...' : '台本をインポート'}
      </button>

      <button
        type="button"
        className="border"
        disabled={isExporting}
        onClick={handleExport}
      >
        {isExporting ? 'エクスポート中...' : '台本をエクスポート'}
      </button>

      <ul className="space-y-2 mt-4">
        {scriptLines.map((line) => (
          <ScriptLineItem
            key={line.id}
            channelId={channelId}
            episodeId={episodeId}
            line={line}
          />
        ))}
      </ul>
    </>
  );
}
