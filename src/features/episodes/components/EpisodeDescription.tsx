'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  description: string | undefined;
}

export function EpisodeDescription({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // description が変わったときに切り詰め状態を再判定する必要がある
  // biome-ignore lint/correctness/useExhaustiveDependencies: description の変化で ref の高さが変わるため必要
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [description]);

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
        ref={textRef}
        className={`whitespace-pre-wrap text-sm text-text-subtle ${isExpanded ? '' : 'line-clamp-3'}`}
      >
        {description}
      </p>
      {!isExpanded && isClamped && (
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
