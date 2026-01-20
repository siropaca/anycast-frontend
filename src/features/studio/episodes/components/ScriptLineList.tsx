'use client';

import { StatusCodes } from 'http-status-codes';
import { useRef, useState } from 'react';
import { ScriptGenerateForm } from '@/features/studio/episodes/components/ScriptGenerateForm';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useGenerateEpisodeAudio } from '@/features/studio/episodes/hooks/useGenerateEpisodeAudio';
import { useImportScript } from '@/features/studio/episodes/hooks/useImportScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import type { ResponseEpisodeResponseFullAudio } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
  fullAudio?: ResponseEpisodeResponseFullAudio;
}

export function ScriptLineList({
  channelId,
  episodeId,
  episodeName,
  fullAudio,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { scriptLines } = useScriptLines(channelId, episodeId);
  const { generateAudioMutation } = useGenerateEpisodeAudio(
    channelId,
    episodeId,
  );

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

  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [generateAudioError, setGenerateAudioError] = useState<string>();

  function handleExportClick() {
    exportScript();
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleGenerateAudioClick() {
    setGenerateAudioError(undefined);
    setIsGeneratingAudio(true);

    generateAudioMutation.mutate(
      {
        channelId,
        episodeId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setGenerateAudioError(response.data.error.message);
          }
        },
        onSettled: () => {
          setIsGeneratingAudio(false);
        },
      },
    );
  }

  return (
    <>
      <ScriptGenerateForm channelId={channelId} episodeId={episodeId} />

      {exportError && <p>{exportError}</p>}
      {importError && <p>{importError}</p>}
      {generateAudioError && <p>{generateAudioError}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleFileSelect}
      />

      <button
        type="button"
        className="border"
        disabled={isGeneratingAudio || scriptLines.length === 0}
        onClick={handleGenerateAudioClick}
      >
        {isGeneratingAudio ? '音声生成中...' : 'エピソード音声を生成'}
      </button>

      {fullAudio && (
        <audio controls preload="metadata">
          <source src={fullAudio.url} type={fullAudio.mimeType} />
        </audio>
      )}

      <button type="button" className="border">
        BGMを追加
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
        onClick={handleExportClick}
      >
        {isExporting ? 'エクスポート中...' : '台本をエクスポート'}
      </button>

      <hr className="my-4" />

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
