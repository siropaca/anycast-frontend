'use client';

import { ArrowRightIcon, SparkleIcon } from '@phosphor-icons/react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { InputSkeleton } from '@/components/inputs/Input/InputSkeleton';
import { SelectSkeleton } from '@/components/inputs/Select/SelectSkeleton';
import { TextareaSkeleton } from '@/components/inputs/Textarea/TextareaSkeleton';
import { StepBar } from '@/components/navigation/StepBar/StepBar';
import { Pages } from '@/libs/pages';

export function CreateChannelSkeleton() {
  return (
    <div className="space-y-4">
      <SectionTitle
        title="チャンネル作成"
        backHref={Pages.studio.channels.path()}
      />

      <div className="space-y-6">
        <StepBar
          steps={[{ label: '基本情報' }, { label: 'キャラクター設定' }]}
          currentStep={1}
        />

        {/* フォーム */}
        <div className="space-y-6">
          <FormField label="チャンネル名" required>
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

          <FormField label="カテゴリ" required>
            {() => <SelectSkeleton width={173} />}
          </FormField>
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex justify-end">
          <Button rightIcon={<ArrowRightIcon />} disabled>
            次へ
          </Button>
        </div>
      </div>
    </div>
  );
}
