'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DotsSixVerticalIcon,
  DotsThreeIcon,
  PlusIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { useRef } from 'react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';
import { Select } from '@/components/inputs/Select/Select';
import { EMOTION_OPTIONS } from '@/features/studio/episodes/constants/emotion';
import { useCreateScriptLine } from '@/features/studio/episodes/hooks/useCreateScriptLine';
import { useDeleteScriptLine } from '@/features/studio/episodes/hooks/useDeleteScriptLine';
import { useUpdateScriptLine } from '@/features/studio/episodes/hooks/useUpdateScriptLine';
import type {
  ResponseCharacterResponse,
  ResponseScriptLineResponse,
} from '@/libs/api/generated/schemas';
import { cn } from '@/utils/cn';

interface Props {
  channelId: string;
  episodeId: string;
  line: ResponseScriptLineResponse;
  characters: ResponseCharacterResponse[];
  characterColor: string;
}

const emotionOptions = EMOTION_OPTIONS.map((option) => ({
  label: option.label,
  value: option.value,
}));

const speakerOptions = (characters: ResponseCharacterResponse[]) =>
  characters.map((character) => ({
    label: character.name,
    value: character.id,
  }));

export function ScriptLineItem({
  channelId,
  episodeId,
  line,
  characters,
  characterColor,
}: Props) {
  const textRef = useRef<HTMLDivElement>(null);

  const {
    updateLine,
    isUpdating,
    error: updateError,
  } = useUpdateScriptLine(channelId, episodeId);

  const { deleteLine, error: deleteError } = useDeleteScriptLine(
    channelId,
    episodeId,
  );

  const {
    createLine,
    isCreating,
    error: createError,
  } = useCreateScriptLine(channelId, episodeId);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: line.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function handleTextBlur() {
    const text = textRef.current?.textContent?.trim() ?? '';
    if (text !== line.text) {
      updateLine(line.id, { text });
    }
  }

  function handleTextKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      textRef.current?.blur();
    }
  }

  function handleTextPaste(event: React.ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }

  function handleEmotionChange(value: string | null) {
    const emotion = value ?? '';
    updateLine(line.id, { emotion });
  }

  function handleSpeakerChange(value: string | null) {
    if (value && value !== line.speaker.id) {
      updateLine(line.id, { speakerId: value });
    }
  }

  function handleDeleteClick() {
    deleteLine(line.id);
  }

  function handleAddLineClick() {
    createLine({
      afterLineId: line.id,
      speakerId: line.speaker.id,
      text: '',
    });
  }

  const error = updateError ?? deleteError ?? createError;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative list-none transition-shadow',
        isDragging && 'z-10 shadow-lg opacity-90',
      )}
    >
      <div className="flex items-start gap-1.5">
        {/* 左: 2段のコンテンツ */}
        <div className="min-w-0 flex-1 space-y-2">
          {/* 上段: 話者名 + 感情 + アクション */}
          <div className="flex items-center gap-1.5">
            <Select
              options={speakerOptions(characters)}
              value={line.speaker.id}
              onValueChange={handleSpeakerChange}
              size="sm"
              disabled={isUpdating}
              className="w-28 shrink-0 border-none!"
              style={{ backgroundColor: `${characterColor}26` }}
            />

            <Select
              options={emotionOptions}
              value={line.emotion ?? ''}
              onValueChange={handleEmotionChange}
              placeholder="感情"
              size="sm"
              disabled={isUpdating}
              className="w-28 shrink-0"
            />

            <div className="ml-auto">
              <DropdownMenu
                trigger={
                  <IconButton
                    icon={<DotsThreeIcon weight="bold" />}
                    aria-label="行のメニュー"
                    size="sm"
                    variant="text"
                    color="secondary"
                  />
                }
              >
                <DropdownMenuItem
                  icon={<PlusIcon size={16} />}
                  onClick={handleAddLineClick}
                >
                  下に行を追加
                </DropdownMenuItem>
                <DropdownMenuItem
                  icon={<TrashIcon size={16} />}
                  variant="danger"
                  onClick={handleDeleteClick}
                >
                  削除
                </DropdownMenuItem>
              </DropdownMenu>
            </div>
          </div>

          {/* 下段: テキスト入力 */}
          {/* biome-ignore lint/a11y/useSemanticElements: contentEditable div を可変長テキスト入力として使用 */}
          <div
            ref={textRef}
            contentEditable={!isUpdating}
            suppressContentEditableWarning
            role="textbox"
            tabIndex={0}
            aria-label="台本テキスト"
            className={cn(
              'min-h-[var(--size-sm)] w-full rounded-sm border border-transparent px-2 py-1 text-sm leading-relaxed text-text-main empty:before:text-text-placeholder empty:before:content-[attr(data-placeholder)]',
              'hover:border-border hover:bg-bg-elevated',
              'focus:border-border focus:bg-bg-elevated focus:outline-none focus:ring-2 focus:ring-primary',
            )}
            data-placeholder="台本を入力"
            onBlur={handleTextBlur}
            onKeyDown={handleTextKeyDown}
            onPaste={handleTextPaste}
          >
            {line.text}
          </div>
        </div>

        {/* 右: ドラッグハンドル（2行の中央） */}
        <button
          type="button"
          className="mt-2 shrink-0 cursor-grab self-center text-text-subtle hover:text-text-main active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <DotsSixVerticalIcon size={18} />
        </button>
      </div>

      {error && <p className="mt-0.5 text-xs text-text-danger">{error}</p>}

      {/* 行間の追加ボタン */}
      <div className="absolute -bottom-2.5 left-1/2 z-10 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-bg-elevated text-text-subtle hover:bg-bg-hover-strong hover:text-text-main"
          disabled={isCreating}
          onClick={handleAddLineClick}
        >
          <PlusIcon size={12} />
        </button>
      </div>
    </li>
  );
}
