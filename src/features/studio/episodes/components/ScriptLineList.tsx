'use client';

import { ScriptGenerateForm } from '@/features/studio/episodes/components/ScriptGenerateForm';
import { ScriptLineItem } from '@/features/studio/episodes/components/ScriptLineItem';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';

interface Props {
  channelId: string;
  episodeId: string;
}

export function ScriptLineList({ channelId, episodeId }: Props) {
  const { scriptLines } = useScriptLines(channelId, episodeId);

  if (scriptLines.length === 0) {
    return <ScriptGenerateForm channelId={channelId} episodeId={episodeId} />;
  }

  return (
    <>
      <button type="button" className="border">
        全体の音声を生成
      </button>

      <button type="button" className="border">
        台本をインポート
      </button>

      <button type="button" className="border">
        台本をエクポート
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
