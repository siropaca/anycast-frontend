'use client';

import { useState } from 'react';

interface Props {
  description: string | undefined;
}

export function EpisodeDescription({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleToggle() {
    setIsExpanded(!isExpanded);
  }

  if (!description) {
    return (
      <section>
        <h2 className="mb-3 text-lg font-bold">説明</h2>
        <p className="text-sm text-text-subtle">説明はありません</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">説明</h2>
      <p
        className={`whitespace-pre-wrap text-sm text-text-subtle ${isExpanded ? '' : 'line-clamp-3'}`}
      >
        {description}
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-1 text-sm text-text-subtle hover:underline cursor-pointer"
          onClick={handleToggle}
        >
          ...さらに表示
        </button>
      )}
    </section>
  );
}
