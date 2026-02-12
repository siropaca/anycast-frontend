'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Modal } from '@/components/utils/Modal/Modal';
import type { BgmAdvancedSettingsRef } from '@/features/studio/episodes/components/BgmAdvancedSettings';
import { BgmAdvancedSettings } from '@/features/studio/episodes/components/BgmAdvancedSettings';
import {
  BgmSelect,
  BgmSelectSkeleton,
} from '@/features/studio/episodes/components/BgmSelect';
import type { GenerateAudioFormInput } from '@/features/studio/episodes/schemas/generateAudio';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

type Mode = 'generate' | 'remix';

interface Props {
  open: boolean;
  mode: Mode;
  defaultVoiceStyle: string;
  defaultBgm?: ResponseEpisodeResponseBgm;
  hasScriptLines: boolean;
  hasVoiceAudio: boolean;

  onClose: () => void;
  onSubmit: (data: GenerateAudioFormInput) => void;
}

export function GenerateAudioModal({
  open,
  mode,
  defaultVoiceStyle,
  defaultBgm,
  hasScriptLines,
  hasVoiceAudio,
  onClose,
  onSubmit,
}: Props) {
  const [voiceStyle, setVoiceStyle] = useState(defaultVoiceStyle);
  const [selectedBgm, setSelectedBgm] = useState<string | null>(null);
  const [bgmError, setBgmError] = useState<string>();
  const advancedSettingsRef = useRef<BgmAdvancedSettingsRef>(null);

  // モーダルが開くたびに最新の defaultBgm / defaultVoiceStyle で状態をリセットする
  useEffect(() => {
    if (open) {
      setVoiceStyle(defaultVoiceStyle);
      setSelectedBgm(
        defaultBgm
          ? `${defaultBgm.isSystem ? 'system' : 'user'}:${defaultBgm.id}`
          : null,
      );
      setBgmError(undefined);
      advancedSettingsRef.current?.reset();
    }
  }, [open, defaultVoiceStyle, defaultBgm]);

  const isRemix = mode === 'remix';
  const title = isRemix ? 'BGMを差し替えて再生成' : '音声を生成';
  const submitLabel = isRemix ? '再生成' : '音声を生成';
  const canSubmit = isRemix ? hasVoiceAudio : hasScriptLines;

  function handleSubmit() {
    const hasBgm = !!selectedBgm;

    if (isRemix && !hasBgm) {
      setBgmError('BGMを選択してください');
      return;
    }

    let bgmId: string | undefined;
    let systemBgmId: string | undefined;

    if (selectedBgm) {
      const [type, id] = selectedBgm.split(':');
      if (type === 'system') {
        systemBgmId = id;
      } else {
        bgmId = id;
      }
    }

    const type = isRemix ? 'remix' : hasBgm ? 'full' : 'voice';
    const advanced = selectedBgm
      ? advancedSettingsRef.current?.getValues()
      : undefined;

    onSubmit({
      type,
      voiceStyle,
      bgmId,
      systemBgmId,
      ...advanced,
    });
  }

  function handleBgmChange(value: string | null) {
    setSelectedBgm(value);
    setBgmError(undefined);
  }

  return (
    <Modal.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="space-y-4">
          {!isRemix && (
            <FormField label="音声スタイル">
              {({ id }) => (
                <Textarea
                  id={id}
                  placeholder="音声のスタイルを指定（例: 明るくテンポよく）"
                  rows={5}
                  maxLength={500}
                  showCounter
                  value={voiceStyle}
                  onChange={(e) => setVoiceStyle(e.target.value)}
                />
              )}
            </FormField>
          )}

          <FormField label="BGM" error={bgmError}>
            {() => (
              <Suspense fallback={<BgmSelectSkeleton />}>
                <BgmSelect
                  value={selectedBgm}
                  onValueChange={handleBgmChange}
                  error={!!bgmError}
                />
              </Suspense>
            )}
          </FormField>

          {selectedBgm && <BgmAdvancedSettings ref={advancedSettingsRef} />}

          {!isRemix && !hasScriptLines && (
            <p className="text-sm text-text-subtle">
              台本がないため、音声を生成できません。先に台本を作成してください。
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            variant="outline"
            color="secondary"
            onClick={onClose}
          >
            キャンセル
          </Button>
          <Button type="button" disabled={!canSubmit} onClick={handleSubmit}>
            {submitLabel}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
