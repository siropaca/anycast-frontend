'use client';

import { useEffect, useRef, useState } from 'react';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';

interface Props {
  scriptLines: ResponseScriptLineResponse[];
}

const COLLAPSED_MAX_HEIGHT = 160;

export function EpisodeScript({ scriptLines }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > COLLAPSED_MAX_HEIGHT);
  }, []);

  if (scriptLines.length === 0) {
    return null;
  }

  function handleToggle() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">会話テキスト</h2>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: conditional role/button based on expand state */}
      <div
        className="cursor-pointer rounded-xl bg-bg-elevated p-4"
        onClick={!isExpanded ? handleToggle : undefined}
        role={!isExpanded ? 'button' : undefined}
        tabIndex={!isExpanded ? 0 : undefined}
        onKeyDown={
          !isExpanded
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggle();
                }
              }
            : undefined
        }
      >
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={!isExpanded ? { maxHeight: COLLAPSED_MAX_HEIGHT } : undefined}
        >
          <ul className="space-y-3">
            {scriptLines.map((line) => (
              <li key={line.id} className="text-sm">
                <span className="font-semibold text-text-main">
                  {line.speaker.name}
                </span>
                <p className="mt-0.5 whitespace-pre-wrap text-text-subtle">
                  {line.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {!isExpanded && isClamped && (
          <p className="mt-2 text-sm font-medium text-text-subtle">
            ...さらに表示
          </p>
        )}

        {isExpanded && (
          <button
            type="button"
            className="mt-3 cursor-pointer text-sm font-medium text-text-subtle hover:underline"
            onClick={handleToggle}
          >
            一部を表示
          </button>
        )}
      </div>
    </section>
  );
}
