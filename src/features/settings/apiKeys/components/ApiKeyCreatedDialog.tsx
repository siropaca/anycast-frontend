'use client';

import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { Dialog } from '@/components/utils/Dialog/Dialog';
import { useToast } from '@/hooks/useToast';

interface Props {
  apiKey?: string;
  open: boolean;

  onClose: () => void;
}

export function ApiKeyCreatedDialog({ apiKey, open, onClose }: Props) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!apiKey) return;

    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      toast.success({ title: 'APIキーをコピーしました' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error({ title: 'コピーに失敗しました' });
    }
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setCopied(false);
      onClose();
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <span className="hidden" />
      </Dialog.Trigger>

      <Dialog.Content size="md">
        <Dialog.Title>APIキーを作成しました</Dialog.Title>
        <Dialog.Description>
          このキーは再表示できません。安全な場所に保存してください。
        </Dialog.Description>

        <div className="mt-4 flex items-center gap-2">
          <code className="flex-1 rounded-sm border border-border bg-bg-base px-3 py-2 text-sm break-all">
            {apiKey}
          </code>
          <IconButton
            icon={copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            aria-label="コピー"
            variant="outline"
            color="secondary"
            onClick={handleCopy}
          />
        </div>

        <Dialog.Footer>
          <Button onClick={onClose}>閉じる</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
