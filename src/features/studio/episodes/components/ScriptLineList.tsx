'use client';

import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { ScriptGenerateForm } from '@/features/studio/episodes/components/ScriptGenerateForm';
import { useGenerateScript } from '@/features/studio/episodes/hooks/useGenerateScript';
import { useScriptLines } from '@/features/studio/episodes/hooks/useScriptLines';
import type { ScriptGenerateFormInput } from '@/features/studio/episodes/schemas/scriptGenerate';

interface Props {
  channelId: string;
  episodeId: string;
}

export function ScriptLineList({ channelId, episodeId }: Props) {
  const { scriptLines } = useScriptLines(channelId, episodeId);
  const { generateMutation } = useGenerateScript(channelId, episodeId);
  const [error, setError] = useState<string>();

  const handleSubmit = (data: ScriptGenerateFormInput) => {
    setError(undefined);
    generateMutation.mutate(
      {
        channelId,
        episodeId,
        data: {
          prompt: data.prompt,
          durationMinutes: 3, // 一旦、固定 3min
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error.message);
          }
        },
      },
    );
  };

  if (scriptLines.length === 0) {
    return (
      <ScriptGenerateForm
        isSubmitting={generateMutation.isPending}
        error={error}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <ul className="space-y-2">
      {scriptLines.map((line) => (
        <li key={line.id}>
          {line.speaker?.name}:<br />
          {line.emotion && `[${line.emotion}]`} {line.text}
        </li>
      ))}
    </ul>
  );
}
