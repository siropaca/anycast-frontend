'use client';

import { useDeleteScriptLine } from '@/features/studio/episodes/hooks/useDeleteScriptLine';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  line: ResponseScriptLineResponse;
}

export function ScriptLineItem({ channelId, episodeId, line }: Props) {
  const { deleteLine, isDeleting, error } = useDeleteScriptLine(
    channelId,
    episodeId,
  );

  function handleDelete() {
    deleteLine(line.id);
  }

  return (
    <li>
      <div>{line.speaker.name} ({line.speaker.voice.name}):</div>
      <div>
        {line.emotion && `[${line.emotion}]`} {line.text}
      </div>
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
