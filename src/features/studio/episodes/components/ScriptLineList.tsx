'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
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
import { useChannelDetail } from '@/features/studio/channels/hooks/useChannelDetail';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useReorderScriptLines } from '@/features/studio/episodes/hooks/useReorderScriptLines';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';

const CHARACTER_COLORS = ['#f59e0b', '#8b5cf6'] as const;

interface Props {
  channelId: string;
  episodeId: string;
}

export function ScriptLineList({ channelId, episodeId }: Props) {
  const { channel } = useChannelDetail(channelId);
  const { scriptLines } = useScriptLines(channelId, episodeId);

  const { reorderLines, error: reorderError } = useReorderScriptLines(
    channelId,
    episodeId,
  );

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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = lineIds.indexOf(String(active.id));
      const newIndex = lineIds.indexOf(String(over.id));
      const newLineIds = arrayMove(lineIds, oldIndex, newIndex);
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
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
        </DndContext>
      )}
    </>
  );
}
