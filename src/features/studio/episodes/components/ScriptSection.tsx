'use client';

import { Collapsible } from '@base-ui/react/collapsible';
import {
  CaretDownIcon,
  CaretRightIcon,
  DownloadSimpleIcon,
  UploadSimpleIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ScriptImportModal } from '@/features/studio/episodes/components/ScriptImportModal';
import { ScriptLineList } from '@/features/studio/episodes/components/ScriptLineList';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import { formatDateTime } from '@/utils/date';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
  prompt?: string | null;
  onGenerateClick?: () => void;
}

export function ScriptSection({
  channelId,
  episodeId,
  episodeName,
  prompt,
  onGenerateClick,
}: Props) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const { scriptLines } = useScriptLines(channelId, episodeId);

  const {
    exportScript,
    isExporting,
    error: exportError,
  } = useExportScript(channelId, episodeId, episodeName);

  function handleImportClick() {
    setIsImportModalOpen(true);
  }

  return (
    <div className="space-y-4">
      <SectionTitle
        title={
          scriptLines.length > 0 ? `台本（${scriptLines.length}行）` : '台本'
        }
        level="h3"
        action={
          <div className="flex items-center gap-3">
            <Button
              leftIcon={<DownloadSimpleIcon size={14} />}
              variant="outline"
              color="secondary"
              size="sm"
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

      {scriptLines.length > 0 && (
        <p className="text-xs text-text-subtle">
          {formatDateTime(
            new Date(
              Math.max(
                ...scriptLines.map((line) => Date.parse(line.createdAt)),
              ),
            ),
          )}{' '}
          生成
        </p>
      )}

      {exportError && (
        <p className="whitespace-pre-line text-sm text-text-danger">
          {exportError}
        </p>
      )}

      {prompt && (
        <Collapsible.Root>
          <Collapsible.Trigger className="flex cursor-pointer items-center gap-1 text-sm text-text-subtle transition-colors hover:text-text-main [&[data-panel-open]>svg:first-child]:hidden [&:not([data-panel-open])>svg:last-child]:hidden">
            <CaretRightIcon size={14} />
            <CaretDownIcon size={14} />
            プロンプト
          </Collapsible.Trigger>
          <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
            <p className="mt-2 whitespace-pre-wrap text-sm text-text-subtle">
              {prompt}
            </p>
          </Collapsible.Panel>
        </Collapsible.Root>
      )}

      <ScriptLineList
        channelId={channelId}
        episodeId={episodeId}
        onGenerateClick={onGenerateClick}
        onImportClick={handleImportClick}
      />

      <ScriptImportModal
        open={isImportModalOpen}
        channelId={channelId}
        episodeId={episodeId}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
}
