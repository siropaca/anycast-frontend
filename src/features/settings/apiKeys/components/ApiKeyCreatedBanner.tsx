'use client';

import { CheckIcon, CopyIcon, XIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { useToast } from '@/hooks/useToast';

interface Props {
  apiKey: string;

  onDismiss: () => void;
}

export function ApiKeyCreatedBanner({ apiKey, onDismiss }: Props) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      toast.success({ title: 'APIキーをコピーしました' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error({ title: 'コピーに失敗しました' });
    }
  }

  return (
    <div className="relative rounded-md border border-border bg-bg-surface p-4">
      <IconButton
        icon={<XIcon size={18} />}
        aria-label="閉じる"
        variant="text"
        color="secondary"
        onClick={onDismiss}
        className="absolute top-2 right-2"
      />
      <div className="space-y-1">
        <p className="text-sm font-medium">APIキーを作成しました</p>
        <p className="text-sm text-text-subtle">
          このキーは再表示できません。安全な場所に保存してください。
        </p>
        <div className="mt-2 flex items-center gap-1.5 rounded-sm border border-border bg-bg-elevated px-4 py-2 text-sm">
          <code className="min-w-0 flex-1 break-all">{apiKey}</code>
          <button
            type="button"
            className="shrink-0 cursor-pointer text-text-placeholder transition-colors hover:text-text-main"
            aria-label="コピー"
            onClick={handleCopy}
          >
            {copied ? (
              <CheckIcon className="size-4" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
