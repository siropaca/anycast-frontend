'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { BgmSelector } from '@/features/studio/episodes/components/BgmSelector';
import { ScriptGenerateForm } from '@/features/studio/episodes/components/ScriptGenerateForm';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useGenerateEpisodeAudio } from '@/features/studio/episodes/hooks/useGenerateEpisodeAudio';
import { useImportScript } from '@/features/studio/episodes/hooks/useImportScript';
import { useReorderScriptLines } from '@/features/studio/episodes/hooks/useReorderScriptLines';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import {
  type GenerateAudioFormInput,
  generateAudioFormSchema,
} from '@/features/studio/episodes/schemas/generateAudio';
import {
  moveLineDown,
  moveLineUp,
} from '@/features/studio/episodes/utils/reorderScriptLines';
import type {
  ResponseEpisodeResponseBgm,
  ResponseEpisodeResponseFullAudio,
} from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
  fullAudio?: ResponseEpisodeResponseFullAudio;
  bgm?: ResponseEpisodeResponseBgm;
}

export function ScriptLineList({
  channelId,
  episodeId,
  episodeName,
  fullAudio,
  bgm,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { channel } = useChannelDetail(channelId);
  const { scriptLines } = useScriptLines(channelId, episodeId);

  const {
    generateAudio,
    isGenerating: isGeneratingAudio,
    error: generateAudioError,
  } = useGenerateEpisodeAudio(channelId, episodeId);

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

  const {
    reorderLines,
    isReordering,
    error: reorderError,
  } = useReorderScriptLines(channelId, episodeId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenerateAudioFormInput>({
    resolver: zodResolver(generateAudioFormSchema),
    defaultValues: {
      voiceStyle: '',
    },
  });

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function onSubmit(data: GenerateAudioFormInput) {
    generateAudio({ voiceStyle: data.voiceStyle });
  }

  function handleMoveUp(lineId: string) {
    const lineIds = scriptLines.map((line) => line.id);
    const newLineIds = moveLineUp(lineIds, lineId);
    if (newLineIds) {
      reorderLines(newLineIds);
    }
  }

  function handleMoveDown(lineId: string) {
    const lineIds = scriptLines.map((line) => line.id);
    const newLineIds = moveLineDown(lineIds, lineId);
    if (newLineIds) {
      reorderLines(newLineIds);
    }
  }

  return (
    <>
      <ScriptGenerateForm channelId={channelId} episodeId={episodeId} />

      <hr className="my-4" />

      {exportError && <p>{exportError}</p>}
      {importError && <p>{importError}</p>}
      {generateAudioError && <p>{generateAudioError}</p>}
      {reorderError && <p>{reorderError}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        className="hidden"
        onChange={handleFileSelect}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          placeholder="音声のスタイルを指定"
          className="border w-full h-20"
          disabled={isGeneratingAudio}
          {...register('voiceStyle')}
        />
        {errors.voiceStyle && <p>{errors.voiceStyle.message}</p>}

        <button
          type="submit"
          className="border"
          disabled={isGeneratingAudio || scriptLines.length === 0}
        >
          {isGeneratingAudio ? '音声生成中...' : 'エピソード音声を生成'}
        </button>
      </form>

      <BgmSelector
        channelId={channelId}
        episodeId={episodeId}
        currentBgm={bgm ?? null}
      />

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
        onClick={exportScript}
      >
        {isExporting ? 'エクスポート中...' : '台本をエクスポート'}
      </button>

      <hr className="my-4" />

      {fullAudio && (
        <audio key={fullAudio.url} controls preload="metadata">
          <source src={fullAudio.url} type={fullAudio.mimeType} />
        </audio>
      )}

      <ul className="space-y-2 mt-4">
        {scriptLines.map((line, index) => (
          <ScriptLineItem
            key={line.id}
            channelId={channelId}
            episodeId={episodeId}
            line={line}
            characters={channel.characters}
            isFirst={index === 0}
            isLast={index === scriptLines.length - 1}
            isReordering={isReordering}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
          />
        ))}
      </ul>
    </>
  );
}
