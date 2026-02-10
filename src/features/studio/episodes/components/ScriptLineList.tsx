'use client';

import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useReorderScriptLines } from '@/features/studio/episodes/hooks/useReorderScriptLines';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import {
  moveLineDown,
  moveLineUp,
} from '@/features/studio/episodes/utils/reorderScriptLines';

interface Props {
  channelId: string;
  episodeId: string;
}

export function ScriptLineList({ channelId, episodeId }: Props) {
  const { channel } = useChannelDetail(channelId);
  const { scriptLines } = useScriptLines(channelId, episodeId);

  const {
    reorderLines,
    isReordering,
    error: reorderError,
  } = useReorderScriptLines(channelId, episodeId);

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
      {reorderError && (
        <p className="text-sm text-text-danger">{reorderError}</p>
      )}

      {scriptLines.length === 0 ? (
        <p className="text-sm text-text-subtle">
          台本はまだありません。「台本を作成」から生成できます。
        </p>
      ) : (
        <ul className="space-y-2">
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
      )}
    </>
  );
}
