'use client';

import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';

interface Props {
  channelId: string;
  episodeId: string;
}

export function ScriptLineList({ channelId, episodeId }: Props) {
  const { scriptLines } = useScriptLines(channelId, episodeId);

  if (scriptLines.length === 0) {
    return (
      <p>
        <textarea className="border w-full" />
        <button type="button" className="border">
          台本を作成
        </button>
      </p>
    );
  }

  return (
    <ul>
      {scriptLines.map((line) => (
        <li key={line.id}>
          {line.speaker?.name}: {line.text}
        </li>
      ))}
    </ul>
  );
}
