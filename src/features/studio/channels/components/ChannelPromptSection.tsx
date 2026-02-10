'use client';

import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ChannelPromptModal } from '@/features/studio/channels/components/ChannelPromptModal';

interface Props {
  channelId: string;
  userPrompt: string;
}

export function ChannelPromptSection({ channelId, userPrompt }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      <SectionTitle
        title="台本プロンプト"
        level="h3"
        action={
          <Button
            size="sm"
            variant="outline"
            color="secondary"
            leftIcon={<PencilSimpleIcon size={16} />}
            onClick={() => setModalOpen(true)}
          >
            編集
          </Button>
        }
      />
      {userPrompt ? (
        <p className="whitespace-pre-wrap text-sm text-text-subtle">
          {userPrompt}
        </p>
      ) : (
        <p className="text-sm text-text-placeholder">未設定</p>
      )}

      {modalOpen && (
        <ChannelPromptModal
          channelId={channelId}
          currentUserPrompt={userPrompt}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  );
}
