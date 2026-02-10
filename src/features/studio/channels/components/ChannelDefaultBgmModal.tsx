'use client';

import { TrashIcon, UploadIcon } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Select } from '@/components/inputs/Select/Select';
import { Modal } from '@/components/utils/Modal/Modal';
import { useUpdateChannelDefaultBgm } from '@/features/studio/channels/hooks/useUpdateChannelDefaultBgm';
import { useBgmOptions } from '@/features/studio/episodes/hooks/useBgmOptions';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';
import { useToast } from '@/hooks/useToast';
import type { ResponseChannelResponseDefaultBgm } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  currentDefaultBgm?: ResponseChannelResponseDefaultBgm;
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

/**
 * 現在のデフォルトBGMから Select の値を算出する
 *
 * @param bgm - 現在のデフォルトBGM
 * @returns Select の value 文字列
 */
function toSelectValue(bgm?: ResponseChannelResponseDefaultBgm): string {
  if (!bgm) return '';
  return `${bgm.isSystem ? 'system' : 'user'}:${bgm.id}`;
}

export function ChannelDefaultBgmModal({
  channelId,
  currentDefaultBgm,
  open,
  onOpenChange,
}: Props) {
  const toast = useToast();
  const { userBgms, systemBgms } = useBgmOptions();
  const { isUpdating, error, setDefaultBgm, removeDefaultBgm } =
    useUpdateChannelDefaultBgm(channelId);
  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  const bgmFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedValue, setSelectedValue] = useState(
    toSelectValue(currentDefaultBgm),
  );
  const [bgmName, setBgmName] = useState('');

  const hasChanged = selectedValue !== toSelectValue(currentDefaultBgm);

  const bgmOptions = [
    ...(userBgms.length > 0
      ? [
          {
            label: 'マイBGM',
            options: userBgms.map((bgm) => ({
              label: bgm.name,
              value: `user:${bgm.id}`,
            })),
          },
        ]
      : []),
    ...(systemBgms.length > 0
      ? [
          {
            label: 'システム',
            options: systemBgms.map((bgm) => ({
              label: bgm.name,
              value: `system:${bgm.id}`,
            })),
          },
        ]
      : []),
  ];

  function handleSave() {
    if (!selectedValue) {
      // BGM 解除
      removeDefaultBgm({
        onSuccess: () => {
          onOpenChange(false);
          toast.success({ title: 'デフォルトBGMを解除しました' });
        },
      });
      return;
    }

    const [type, bgmId] = selectedValue.split(':');
    if (!bgmId) return;

    setDefaultBgm(
      type === 'user' ? bgmId : undefined,
      type === 'system' ? bgmId : undefined,
      {
        onSuccess: () => {
          onOpenChange(false);
          toast.success({ title: 'デフォルトBGMを設定しました' });
        },
      },
    );
  }

  function handleRemove() {
    setSelectedValue('');
  }

  function handleUploadClick() {
    bgmFileInputRef.current?.click();
  }

  function handleBgmFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadBgm(file, bgmName);
    setBgmName('');

    if (bgmFileInputRef.current) {
      bgmFileInputRef.current.value = '';
    }
  }

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>デフォルトBGM</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Select
                  name="defaultBgm"
                  options={bgmOptions}
                  value={selectedValue || null}
                  onValueChange={(value) => setSelectedValue(value ?? '')}
                  placeholder="なし"
                />
              </div>
              {selectedValue && (
                <Button
                  type="button"
                  variant="outline"
                  color="danger"
                  size="sm"
                  leftIcon={<TrashIcon size={16} />}
                  onClick={handleRemove}
                >
                  解除
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={bgmFileInputRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleBgmFileChange}
              />
              <Input
                placeholder="BGM名（省略時はファイル名）"
                value={bgmName}
                disabled={isUploading}
                onChange={(e) => setBgmName(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                color="secondary"
                loading={isUploading}
                leftIcon={<UploadIcon size={16} />}
                onClick={handleUploadClick}
              >
                アップロード
              </Button>
            </div>

            {uploadError && <HelperText error>{uploadError}</HelperText>}
            {error && <HelperText error>{error}</HelperText>}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button
              variant="outline"
              color="secondary"
              disabled={isUpdating}
              disabledReason="保存中はキャンセルできません"
            >
              キャンセル
            </Button>
          </Modal.Close>

          <Button
            disabled={!hasChanged || isUpdating}
            disabledReason={isUpdating ? '保存中...' : '変更がありません'}
            onClick={handleSave}
          >
            {isUpdating ? '処理中...' : '保存'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
