'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useReorderScriptLines } from '@/features/studio/episodes/hooks/useReorderScriptLines';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import { getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey } from '@/libs/api/generated/script/script';

const CHARACTER_COLORS = ['#f59e0b', '#8b5cf6'] as const;

interface Props {
  channelId: string;
  episodeId: string;
  onGenerateClick?: () => void;
  onImportClick?: () => void;
}

export function ScriptLineList({
  channelId,
  episodeId,
  onGenerateClick,
  onImportClick,
}: Props) {
  const { channel } = useChannelDetail(channelId);
  const { scriptLines } = useScriptLines(channelId, episodeId);

  const queryClient = useQueryClient();
  const { reorderLines, error: reorderError } = useReorderScriptLines(
    channelId,
    episodeId,
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const characterIds = channel.characters.map((c) => c.id);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const lineIds = scriptLines.map((line) => line.id);

  const activeLine = activeId
    ? scriptLines.find((line) => line.id === activeId)
    : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = lineIds.indexOf(String(active.id));
      const newIndex = lineIds.indexOf(String(over.id));

      const queryKey =
        getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
          channelId,
          episodeId,
        );
      queryClient.setQueryData(queryKey, (old: unknown) => {
        const typed = old as
          | { status: number; data: { data: unknown[] } }
          | undefined;
        if (!typed?.data?.data) return old;
        return {
          ...typed,
          data: {
            ...typed.data,
            data: arrayMove([...typed.data.data], oldIndex, newIndex),
          },
        };
      });

      const newLineIds = arrayMove(lineIds, oldIndex, newIndex);
      reorderLines(newLineIds);
    }
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  return (
    <>
      {reorderError && (
        <p className="text-sm text-text-danger">{reorderError}</p>
      )}

      {scriptLines.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-sm bg-bg-elevated px-6 py-8 text-sm">
          <p className="text-text-subtle">台本はまだありません</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {onGenerateClick && (
              <button
                type="button"
                className="cursor-pointer inline-block text-text-link hover:underline"
                onClick={onGenerateClick}
              >
                台本を生成
              </button>
            )}

            {onGenerateClick && onImportClick && (
              <span className="inline-block text-text-subtle">または</span>
            )}

            {onImportClick && (
              <button
                type="button"
                className="cursor-pointer inline-block text-text-link hover:underline"
                onClick={onImportClick}
              >
                ファイルからインポート
              </button>
            )}
          </div>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={lineIds}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-3">
              {scriptLines.map((line) => (
                <ScriptLineItem
                  key={`${line.id}-${line.updatedAt}`}
                  channelId={channelId}
                  episodeId={episodeId}
                  line={line}
                  characters={channel.characters}
                  characterColor={
                    CHARACTER_COLORS[characterIds.indexOf(line.speaker.id)] ??
                    CHARACTER_COLORS[0]
                  }
                />
              ))}
            </ul>
          </SortableContext>
          <DragOverlay dropAnimation={null}>
            {activeLine ? (
              <div className="rounded-sm bg-bg-main p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <span
                    className="rounded px-2 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${
                        CHARACTER_COLORS[
                          characterIds.indexOf(activeLine.speaker.id)
                        ] ?? CHARACTER_COLORS[0]
                      }26`,
                    }}
                  >
                    {activeLine.speaker.name}
                  </span>
                  {activeLine.emotion && (
                    <span className="text-xs text-text-subtle">
                      {activeLine.emotion}
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-text-main">
                  {activeLine.text || '(空行)'}
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </>
  );
}
