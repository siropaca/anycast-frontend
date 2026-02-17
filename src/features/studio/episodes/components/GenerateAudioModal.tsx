'use client';

import { MusicNoteIcon } from '@phosphor-icons/react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Spinner } from '@/components/feedback/Spinner/Spinner';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { SegmentedControl } from '@/components/inputs/SegmentedControl/SegmentedControl';
import { Modal } from '@/components/utils/Modal/Modal';
import { BgmRadioList } from '@/features/studio/bgm/components/BgmRadioList';
import type { BgmAdvancedSettingsRef } from '@/features/studio/episodes/components/BgmAdvancedSettings';
import { BgmAdvancedSettings } from '@/features/studio/episodes/components/BgmAdvancedSettings';
import { useBgmOptions } from '@/features/studio/episodes/hooks/useBgmOptions';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';
import type { GenerateAudioFormInput } from '@/features/studio/episodes/schemas/generateAudio';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

type Mode = 'generate' | 'remix';
type BgmTab = 'select' | 'upload';

const BGM_TAB_OPTIONS = [
  { label: '既存から選択', value: 'select' as const },
  { label: '新規追加', value: 'upload' as const },
];

interface Props {
  open: boolean;
  mode: Mode;
  defaultBgm?: ResponseEpisodeResponseBgm;
  hasScriptLines: boolean;
  hasVoiceAudio: boolean;

  onClose: () => void;
  onSubmit: (data: GenerateAudioFormInput) => void;
}

export function GenerateAudioModal({
  open,
  mode,
  defaultBgm,
  hasScriptLines,
  hasVoiceAudio,
  onClose,
  onSubmit,
}: Props) {
  const [selectedBgm, setSelectedBgm] = useState<string | null>(null);
  const advancedSettingsRef = useRef<BgmAdvancedSettingsRef>(null);

  const [bgmTab, setBgmTab] = useState<BgmTab>('select');
  const [bgmName, setBgmName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  // モーダルが開くたびに最新の defaultBgm で状態をリセットする
  useEffect(() => {
    if (open) {
      setSelectedBgm(
        defaultBgm
          ? `${defaultBgm.isSystem ? 'system' : 'user'}:${defaultBgm.id}`
          : null,
      );
      setBgmTab('select');
      setBgmName('');
      setSelectedFile(null);
      advancedSettingsRef.current?.reset();
    }
  }, [open, defaultBgm]);

  const isRemix = mode === 'remix';
  const title = isRemix ? 'BGMを差し替えて再生成' : '音声を生成';
  const submitLabel = isRemix ? '再生成' : '音声を生成';
  const canSubmit = isRemix ? hasVoiceAudio : hasScriptLines;

  /**
   * 選択中の BGM から bgmId / systemBgmId を解決する
   */
  function resolveBgmIds() {
    if (!selectedBgm) return { bgmId: undefined, systemBgmId: undefined };

    const [type, id] = selectedBgm.split(':');
    return type === 'system'
      ? { bgmId: undefined, systemBgmId: id }
      : { bgmId: id, systemBgmId: undefined };
  }

  function submitWithBgm(type: GenerateAudioFormInput['type']) {
    const { bgmId, systemBgmId } = resolveBgmIds();
    const advanced = advancedSettingsRef.current?.getValues();
    onSubmit({ type, bgmId, systemBgmId, ...advanced });
  }

  function handleSubmit() {
    // 新規追加タブ: アップロード → 生成をチェーン実行
    if (bgmTab === 'upload') {
      if (!selectedFile) return;

      const type = isRemix ? 'remix' : 'full';
      uploadBgm(selectedFile, bgmName, {
        onSuccess: (bgmId) => {
          const advanced = advancedSettingsRef.current?.getValues();
          onSubmit({ type, bgmId, systemBgmId: undefined, ...advanced });
        },
      });
      return;
    }

    if (isRemix) {
      submitWithBgm('remix');
    } else if (selectedBgm) {
      submitWithBgm('full');
    } else {
      onSubmit({ type: 'voice' });
    }
  }

  function handleBgmChange(value: string) {
    setSelectedBgm(value || null);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  }

  const isSubmitDisabled =
    isUploading || (bgmTab === 'upload' ? !selectedFile : !canSubmit);

  return (
    <Modal.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="p-0">
          <div className="space-y-4">
            <div className="px-6 pt-6">
              <SegmentedControl
                options={BGM_TAB_OPTIONS}
                value={bgmTab}
                onValueChange={setBgmTab}
              />
            </div>

            {bgmTab === 'select' ? (
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-8">
                    <Spinner />
                  </div>
                }
              >
                <BgmRadioListWithData
                  selectedValue={selectedBgm ?? ''}
                  onSelect={handleBgmChange}
                />
              </Suspense>
            ) : (
              <div className="space-y-6 px-6 pb-6">
                <FormField label="ファイル" required>
                  {() => (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          color="secondary"
                          leftIcon={<MusicNoteIcon size={16} />}
                          disabled={isUploading}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          ファイルを選択
                        </Button>
                        {selectedFile && (
                          <span className="text-sm text-text-subtle">
                            {selectedFile.name}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </FormField>

                <FormField
                  label="BGM名"
                  description="省略時はファイル名になります"
                >
                  {({ id }) => (
                    <Input
                      id={id}
                      value={bgmName}
                      placeholder="BGM名を入力"
                      disabled={isUploading}
                      onChange={(e) => setBgmName(e.target.value)}
                    />
                  )}
                </FormField>

                {uploadError && <HelperText error>{uploadError}</HelperText>}
              </div>
            )}

            {bgmTab === 'select' && selectedBgm && (
              <div className="px-6 pb-6">
                <BgmAdvancedSettings ref={advancedSettingsRef} />
              </div>
            )}

            {!isRemix && !hasScriptLines && (
              <div className="px-6 pb-6">
                <p className="text-sm text-text-subtle">
                  台本がないため、音声を生成できません。先に台本を作成してください。
                </p>
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            variant="outline"
            color="secondary"
            disabled={isUploading}
            onClick={onClose}
          >
            キャンセル
          </Button>

          <Button
            type="button"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            {isUploading ? 'アップロード中...' : submitLabel}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}

function BgmRadioListWithData({
  selectedValue,
  onSelect,
}: {
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  const { allBgms } = useBgmOptions();

  return (
    <BgmRadioList
      allBgms={allBgms}
      selectedValue={selectedValue}
      isLoading={false}
      onSelect={onSelect}
    />
  );
}
