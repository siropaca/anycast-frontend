'use client';

import { MusicNoteIcon } from '@phosphor-icons/react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { SegmentedControl } from '@/components/inputs/SegmentedControl/SegmentedControl';
import { Modal } from '@/components/utils/Modal/Modal';
import { BgmRadioList } from '@/features/studio/bgm/components/BgmRadioList';
import { useEpisodeBgmModal } from '@/features/studio/episodes/hooks/useEpisodeBgmModal';
import { useToast } from '@/hooks/useToast';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

const TAB_OPTIONS = [
  { label: '既存から選択', value: 'select' as const },
  { label: '新規追加', value: 'upload' as const },
];

interface Props {
  channelId: string;
  episodeId: string;
  currentBgm?: ResponseEpisodeResponseBgm;
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function EpisodeBgmModal({
  channelId,
  episodeId,
  currentBgm,
  open,
  onOpenChange,
}: Props) {
  const toast = useToast();
  const {
    allBgms,
    tab,
    selectedValue,
    selectedFile,
    bgmName,
    hasChanged,
    isBgmLoading,
    isUpdating,
    isUploading,
    error,
    uploadError,
    bgmFileInputRef,
    switchTab,
    select,
    selectFile,
    updateBgmName,
    save,
    upload,
    openFilePicker,
  } = useEpisodeBgmModal(channelId, episodeId, currentBgm);

  function handleSave() {
    const message = selectedValue ? 'BGMを設定しました' : 'BGMを解除しました';

    save({
      onSuccess: () => {
        onOpenChange(false);
        toast.success({ title: message });
      },
    });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) selectFile(file);
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>BGM</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="p-0">
          <div className="space-y-6">
            <div className="pt-6 px-6">
              <SegmentedControl
                options={TAB_OPTIONS}
                value={tab}
                onValueChange={switchTab}
              />
            </div>

            {tab === 'select' ? (
              <div className="space-y-4">
                <BgmRadioList
                  allBgms={allBgms}
                  selectedValue={selectedValue}
                  isLoading={isBgmLoading}
                  onSelect={select}
                />
                {error && <HelperText error>{error}</HelperText>}
              </div>
            ) : (
              <div className="space-y-6 px-6 pb-6">
                <FormField label="ファイル" required>
                  {() => (
                    <>
                      <input
                        ref={bgmFileInputRef}
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
                          onClick={openFilePicker}
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
                      onChange={(e) => updateBgmName(e.target.value)}
                    />
                  )}
                </FormField>

                {uploadError && <HelperText error>{uploadError}</HelperText>}
              </div>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button
              variant="outline"
              color="secondary"
              disabled={isUpdating || isUploading}
              disabledReason="処理中はキャンセルできません"
            >
              キャンセル
            </Button>
          </Modal.Close>

          {tab === 'select' ? (
            <Button
              disabled={!hasChanged || isUpdating}
              disabledReason={isUpdating ? '保存中...' : '変更がありません'}
              onClick={handleSave}
            >
              {isUpdating ? '処理中...' : '保存'}
            </Button>
          ) : (
            <Button
              disabled={!selectedFile || isUploading}
              disabledReason={
                isUploading ? 'アップロード中...' : 'ファイルを選択してください'
              }
              onClick={upload}
            >
              {isUploading ? 'アップロード中...' : 'アップロード'}
            </Button>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
