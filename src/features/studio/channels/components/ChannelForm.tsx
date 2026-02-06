'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, TrashIcon, UploadIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Input } from '@/components/inputs/Input/Input';
import { Select } from '@/components/inputs/Select/Select';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { useDeleteChannelDefaultBgm } from '@/features/studio/channels/hooks/useDeleteChannelDefaultBgm';
import {
  type ChannelFormInput,
  channelFormSchema,
} from '@/features/studio/channels/schemas/channel';
import { useBgmOptions } from '@/features/studio/episodes/hooks/useBgmOptions';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';
import { useUploadArtwork } from '@/hooks/useUploadArtwork';
import type {
  ResponseCategoryResponse,
  ResponseChannelResponseDefaultBgm,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

interface Props {
  mode: 'create' | 'edit';
  channelId?: string;
  defaultValues?: ChannelFormInput;
  categories: ResponseCategoryResponse[];
  voices: ResponseVoiceResponse[];
  defaultArtworkUrl?: string;
  defaultBgm?: ResponseChannelResponseDefaultBgm;
  isSubmitting?: boolean;
  submitError?: string;

  onSubmit: (data: ChannelFormInput) => void;
}

export function ChannelForm({
  mode,
  channelId,
  defaultValues,
  categories,
  voices,
  defaultArtworkUrl,
  defaultBgm,
  onSubmit,
  isSubmitting = false,
  submitError,
}: Props) {
  const {
    uploadArtwork,
    isUploading: isArtworkUploading,
    error: artworkUploadError,
  } = useUploadArtwork();

  const { userBgms, systemBgms } = useBgmOptions();

  const {
    uploadBgm,
    isUploading: isBgmUploading,
    error: bgmUploadError,
  } = useUploadBgm();

  const {
    deleteDefaultBgm,
    isDeletingDefaultBgm,
    error: bgmDeleteError,
  } = useDeleteChannelDefaultBgm(channelId ?? '');

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChannelFormInput>({
    resolver: zodResolver(channelFormSchema),
    defaultValues: defaultValues ?? {
      name: '',
      description: '',
      userPrompt: '',
      categoryId: '',
      characters: [{ name: '', voiceId: '', persona: '' }],
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgmFileInputRef = useRef<HTMLInputElement>(null);

  const [artworkPreviewUrl, setArtworkPreviewUrl] = useState<
    string | undefined
  >(defaultArtworkUrl);
  const [bgmName, setBgmName] = useState('');
  const [selectedBgmValue, setSelectedBgmValue] = useState(
    defaultBgm
      ? `${defaultBgm.isSystem ? 'system' : 'user'}:${defaultBgm.id}`
      : '',
  );

  const isEditMode = mode === 'edit';

  function handleArtworkButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadArtwork(file, ({ id, url }) => {
      setValue('artworkImageId', id, { shouldDirty: true });
      setArtworkPreviewUrl(url);
    });
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'characters',
  });

  function handleBgmChange(value: string) {
    setSelectedBgmValue(value);

    // 選択解除
    if (!value) {
      setValue('defaultBgmId', undefined, { shouldDirty: true });
      setValue('defaultSystemBgmId', undefined, { shouldDirty: true });
      return;
    }

    const [type, bgmId] = value.split(':');
    if (!bgmId) return;

    if (type === 'system') {
      setValue('defaultBgmId', undefined, { shouldDirty: true });
      setValue('defaultSystemBgmId', bgmId, { shouldDirty: true });
    } else {
      setValue('defaultBgmId', bgmId, { shouldDirty: true });
      setValue('defaultSystemBgmId', undefined, { shouldDirty: true });
    }
  }

  function handleBgmDelete() {
    if (isEditMode && channelId) {
      deleteDefaultBgm(() => {
        setSelectedBgmValue('');
        setValue('defaultBgmId', undefined, { shouldDirty: true });
        setValue('defaultSystemBgmId', undefined, { shouldDirty: true });
      });
    } else {
      handleBgmChange('');
    }
  }

  function handleBgmUploadClick() {
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

  const categoryOptions = categories.map((category) => ({
    label: category.name ?? '',
    value: category.id ?? '',
  }));

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

  const voiceOptions = voices.map((voice) => ({
    label: `${voice.name} (${voice.gender})`,
    value: voice.id ?? '',
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* チャンネル基本情報 */}
      <div className="space-y-6">
        <div className="space-y-2">
          <FormLabel htmlFor="name" required>
            チャンネル名
          </FormLabel>
          <Input
            id="name"
            maxLength={255}
            error={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-text-danger">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <FormLabel htmlFor="description">説明</FormLabel>
          <Textarea
            id="description"
            rows={4}
            maxLength={2000}
            showCounter
            error={!!errors.description}
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-text-danger">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <FormLabel>アートワーク</FormLabel>
          {artworkPreviewUrl && (
            <Image
              src={artworkPreviewUrl}
              alt="アートワーク"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div>
            <Button
              type="button"
              variant="outline"
              color="secondary"
              loading={isArtworkUploading}
              onClick={handleArtworkButtonClick}
            >
              {artworkPreviewUrl
                ? 'アートワークを変更'
                : 'アートワークを登録'}
            </Button>
          </div>
          {artworkUploadError && (
            <p className="text-sm text-text-danger">{artworkUploadError}</p>
          )}
        </div>

        <div className="space-y-2">
          <FormLabel htmlFor="categoryId" required>
            カテゴリ
          </FormLabel>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                name="categoryId"
                options={categoryOptions}
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? '')}
                placeholder="選択してください"
                error={!!errors.categoryId}
              />
            )}
          />
          {errors.categoryId && (
            <p className="text-sm text-text-danger">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      {/* デフォルトBGM */}
      <div className="space-y-6">
        <div className="space-y-2">
          <FormLabel htmlFor="defaultBgm">デフォルトBGM</FormLabel>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Select
                name="defaultBgm"
                options={bgmOptions}
                value={selectedBgmValue || null}
                onValueChange={(value) => handleBgmChange(value ?? '')}
                placeholder="なし"
              />
            </div>
            {selectedBgmValue && (
              <Button
                type="button"
                variant="outline"
                color="danger"
                size="sm"
                loading={isDeletingDefaultBgm}
                onClick={handleBgmDelete}
              >
                削除
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
              disabled={isBgmUploading}
              onChange={(e) => setBgmName(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              color="secondary"
              loading={isBgmUploading}
              leftIcon={<UploadIcon />}
              onClick={handleBgmUploadClick}
            >
              BGMをアップロード
            </Button>
          </div>
          {bgmUploadError && (
            <p className="text-sm text-text-danger">{bgmUploadError}</p>
          )}
          {bgmDeleteError && (
            <p className="text-sm text-text-danger">{bgmDeleteError}</p>
          )}
        </div>
      </div>

      {/* プロンプト */}
      <div className="space-y-6">
        <div className="space-y-2">
          <FormLabel
            htmlFor="userPrompt"
            helpText="エピソード生成時に台本プロンプトとして使用されます"
          >
            チャンネル共通の台本プロンプト
          </FormLabel>
          <Textarea
            id="userPrompt"
            rows={6}
            maxLength={2000}
            showCounter
            error={!!errors.userPrompt}
            {...register('userPrompt')}
          />
          {errors.userPrompt && (
            <p className="text-sm text-text-danger">
              {errors.userPrompt.message}
            </p>
          )}
        </div>
      </div>

      {/* キャラクター（新規作成時のみ） */}
      {!isEditMode && (
        <div className="space-y-6">
          <SectionTitle title="キャラクター" level="h3" />

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 rounded-lg border border-border-default p-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold">キャラクター {index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="text"
                    color="danger"
                    size="sm"
                    leftIcon={<TrashIcon />}
                    onClick={() => remove(index)}
                  >
                    削除
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor={`characters.${index}.voiceId`} required>
                  ボイス
                </FormLabel>
                <Controller
                  name={`characters.${index}.voiceId`}
                  control={control}
                  render={({ field: selectField }) => (
                    <Select
                      name={`characters.${index}.voiceId`}
                      options={voiceOptions}
                      value={selectField.value || null}
                      onValueChange={(value) =>
                        selectField.onChange(value ?? '')
                      }
                      placeholder="選択してください"
                      error={!!errors.characters?.[index]?.voiceId}
                    />
                  )}
                />
                {errors.characters?.[index]?.voiceId && (
                  <p className="text-sm text-text-danger">
                    {errors.characters[index].voiceId?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor={`characters.${index}.name`} required>
                  名前
                </FormLabel>
                <Input
                  id={`characters.${index}.name`}
                  maxLength={255}
                  error={!!errors.characters?.[index]?.name}
                  {...register(`characters.${index}.name`)}
                />
                {errors.characters?.[index]?.name && (
                  <p className="text-sm text-text-danger">
                    {errors.characters[index].name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor={`characters.${index}.persona`}>
                  ペルソナ
                </FormLabel>
                <Textarea
                  id={`characters.${index}.persona`}
                  rows={4}
                  maxLength={2000}
                  showCounter
                  {...register(`characters.${index}.persona`)}
                />
              </div>
            </div>
          ))}

          {fields.length < 2 && (
            <Button
              type="button"
              variant="outline"
              color="secondary"
              leftIcon={<PlusIcon />}
              onClick={() => append({ name: '', voiceId: '', persona: '' })}
            >
              キャラクターを追加
            </Button>
          )}

          {errors.characters?.root && (
            <p className="text-sm text-text-danger">
              {errors.characters.root.message}
            </p>
          )}
        </div>
      )}

      {/* 送信 */}
      <div className="space-y-4">
        {submitError && (
          <p className="text-sm text-text-danger">{submitError}</p>
        )}
        <Button type="submit" loading={isSubmitting}>
          {isEditMode ? 'チャンネルを更新' : 'チャンネルを作成'}
        </Button>
      </div>
    </form>
  );
}
