'use client';

import { StatusCodes } from 'http-status-codes';
import { useEffect, useRef, useState } from 'react';
import { useDeleteScriptLine } from '@/features/studio/episodes/hooks/useDeleteScriptLine';
import { useGenerateLineAudio } from '@/features/studio/episodes/hooks/useGenerateLineAudio';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';
import { cn } from '@/utils/cn';

export type BulkGenerateStatus = 'idle' | 'generating' | 'pending';

interface Props {
  channelId: string;
  episodeId: string;
  line: ResponseScriptLineResponse;
  isPlaying?: boolean;
  bulkGenerateStatus?: BulkGenerateStatus;

  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export function ScriptLineItem({
  channelId,
  episodeId,
  line,
  isPlaying = false,
  bulkGenerateStatus = 'idle',
  onPlay,
  onPause,
  onEnded,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { generateAudioMutation } = useGenerateLineAudio(channelId, episodeId);
  const { deleteLineMutation } = useDeleteScriptLine(channelId, episodeId);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>();

  // isPlaying の変化に応じて audio を再生/停止
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // 自動再生がブロックされた場合は無視
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  function handleGenerateAudio() {
    setError(undefined);
    setIsGenerating(true);

    generateAudioMutation.mutate(
      {
        channelId,
        episodeId,
        lineId: line.id,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error.message);
          }
        },
        onSettled: () => {
          setIsGenerating(false);
        },
      },
    );
  }

  function handleDelete() {
    setError(undefined);
    setIsDeleting(true);

    deleteLineMutation.mutate(
      {
        channelId,
        episodeId,
        lineId: line.id,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.NO_CONTENT) {
            setError(response.data.error.message);
          }
        },
        onSettled: () => {
          setIsDeleting(false);
        },
      },
    );
  }

  return (
    <li className={cn(isPlaying && 'outline')}>
      <div>{line.speaker?.name}:</div>
      <div>
        {line.emotion && `[${line.emotion}]`} {line.text}
      </div>
      {line.audio && (
        <audio
          ref={audioRef}
          controls
          preload="metadata"
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        >
          <source src={line.audio.url} type={line.audio.mimeType} />
        </audio>
      )}
      <button
        type="button"
        className="border"
        disabled={isGenerating || bulkGenerateStatus !== 'idle'}
        onClick={handleGenerateAudio}
      >
        {bulkGenerateStatus === 'generating'
          ? '生成中...'
          : bulkGenerateStatus === 'pending'
            ? '保留中...'
            : isGenerating
              ? '生成中...'
              : '音声を生成'}
      </button>
      <button
        type="button"
        className="border"
        disabled={isDeleting}
        onClick={handleDelete}
      >
        {isDeleting ? '削除中...' : '削除'}
      </button>
      {error && <p>{error}</p>}
    </li>
  );
}
