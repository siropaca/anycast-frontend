'use client';

import { ScriptGenerateForm } from '@/features/studio/episodes/components/ScriptGenerateForm';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useExportScript } from '@/features/studio/episodes/hooks/useExportScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';

interface Props {
  channelId: string;
  episodeId: string;
  episodeName: string;
}

export function ScriptLineList({ channelId, episodeId, episodeName }: Props) {
  const { scriptLines } = useScriptLines(channelId, episodeId);
  const { exportScript, isExporting, error } = useExportScript(
    channelId,
    episodeId,
    episodeName,
  );

  if (scriptLines.length === 0) {
    return <ScriptGenerateForm channelId={channelId} episodeId={episodeId} />;
  }

  function handleExport() {
    exportScript();
  }

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}

      <button type="button" className="border">
        全体の音声を生成
      </button>

      <button type="button" className="border">
        台本をインポート
      </button>

      <button
        type="button"
        className="border"
        onClick={handleExport}
        disabled={isExporting}
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
