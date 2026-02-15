'use client';

import { SparkleIcon } from '@phosphor-icons/react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { InputSkeleton } from '@/components/inputs/Input/InputSkeleton';
import { TextareaSkeleton } from '@/components/inputs/Textarea/TextareaSkeleton';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function CreateEpisodeSkeleton({ channelId }: Props) {
  return (
    <div className="space-y-4">
      <SectionTitle
        title="エピソード作成"
        backHref={Pages.studio.channel.path({ id: channelId })}
      />

      <div className="space-y-6">
        {/* フォーム */}
        <div className="space-y-6">
          <FormField label="タイトル" required>
            {() => <InputSkeleton className="w-full" />}
          </FormField>

          <FormField label="説明">
            {() => <TextareaSkeleton height={166} className="w-full" />}
          </FormField>

          <FormField label="アートワーク">
            {() => (
              <div className="flex gap-3">
                <Button variant="outline" color="secondary" disabled>
                  画像を選択
                </Button>
                <Button
                  variant="outline"
                  color="secondary"
                  leftIcon={<SparkleIcon />}
                  disabled
                >
                  AIで生成
                </Button>
              </div>
            )}
          </FormField>
        </div>

        {/* 送信ボタン */}
        <div className="flex justify-end">
          <Button disabled>エピソードを作成</Button>
        </div>
      </div>
    </div>
  );
}
