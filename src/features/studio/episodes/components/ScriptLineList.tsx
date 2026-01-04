'use client';

import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';

interface Props {
  channelId: string;
  episodeId: string;
}

export function ScriptLineList({ channelId, episodeId }: Props) {
  const { scriptLines } = useScriptLines(channelId, episodeId);

  if (scriptLines.length === 0) {
    return <p>台本がありません</p>;
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
