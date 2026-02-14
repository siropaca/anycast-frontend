'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SparkleIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { ArtworkGenerateModal } from '@/components/utils/Modal/ArtworkGenerateModal';
import {
  type EpisodeFormInput,
  episodeFormSchema,
} from '@/features/studio/episodes/schemas/episode';
import { useGenerateArtwork } from '@/hooks/useGenerateArtwork';
import { useUploadArtwork } from '@/hooks/useUploadArtwork';

interface Props {
  mode: 'create' | 'edit';
  defaultValues?: EpisodeFormInput;
  defaultArtworkUrl?: string;
  isSubmitting?: boolean;
  submitError?: string;

  onSubmit: (data: EpisodeFormInput) => void;
}

export function EpisodeForm({
  mode,
  defaultValues,
  defaultArtworkUrl,
  onSubmit,
  isSubmitting = false,
  submitError,
}: Props) {
  const {
    uploadArtwork,
    isUploading: isArtworkUploading,
    error: artworkUploadError,
  } = useUploadArtwork();

  const {
    generateArtwork,
    isGenerating: isArtworkGenerating,
    error: artworkGenerateError,
  } = useGenerateArtwork();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [artworkPreviewUrl, setArtworkPreviewUrl] = useState<
    string | undefined
  >(defaultArtworkUrl);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EpisodeFormInput>({
    resolver: zodResolver(episodeFormSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
    },
  });

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateModalDefaultPrompt, setGenerateModalDefaultPrompt] =
    useState('');

  const isEditMode = mode === 'edit';

  function handleArtworkButtonClick() {
    fileInputRef.current?.click();
  }

  function handleOpenGenerateModal() {
    const title = getValues('title');
    const description = getValues('description');

    const parts = [`ポッドキャストエピソード「${title}」のアートワーク。`];
    if (description) parts.push(description);

    setGenerateModalDefaultPrompt(parts.join('\n'));
    setIsGenerateModalOpen(true);
  }

  /**
   * ユーザー入力プロンプトにシステムプロンプトを結合してアートワークを生成する
   *
   * @param userPrompt - ユーザーが入力したプロンプト
   */
  function handleGenerateSubmit(userPrompt: string) {
    const systemPrompt =
      '人物は描かないでください。ネオン、発光、ホログラム、SF的な要素は避けてください。写真のようにリアルなスタイル。画像に文字やテキストを含めないでください。';
    const fullPrompt = `${userPrompt}\n${systemPrompt}`;

    generateArtwork(fullPrompt, ({ id, url }) => {
      setValue('artworkImageId', id, { shouldDirty: true });
      setArtworkPreviewUrl(url);
      setIsGenerateModalOpen(false);
    });
  }

  function handleRemoveArtwork() {
    setValue('artworkImageId', undefined, { shouldDirty: true });
    setArtworkPreviewUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadArtwork(file, ({ id, url }) => {
      setValue('artworkImageId', id, { shouldDirty: true });
      setArtworkPreviewUrl(url);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <FormField label="タイトル" required error={errors.title?.message}>
            {({ id, hasError }) => (
              <Input
                id={id}
                maxLength={255}
                error={hasError}
                {...register('title')}
              />
            )}
          </FormField>

          <FormField label="説明" error={errors.description?.message}>
            {({ id, hasError }) => (
              <Textarea
                id={id}
                rows={6}
                maxLength={2000}
                showCounter
                error={hasError}
                {...register('description')}
              />
            )}
          </FormField>

          <FormField
            label="アートワーク"
            error={artworkUploadError ?? artworkGenerateError}
          >
            {() => (
              <>
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
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    color="secondary"
                    loading={isArtworkUploading}
                    disabled={isArtworkGenerating}
                    onClick={handleArtworkButtonClick}
                  >
                    画像を指定
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    color="secondary"
                    leftIcon={<SparkleIcon />}
                    loading={isArtworkGenerating}
                    disabled={isArtworkUploading}
                    onClick={handleOpenGenerateModal}
                  >
                    AIで生成
                  </Button>
                  {artworkPreviewUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      color="secondary"
                      disabled={isArtworkUploading || isArtworkGenerating}
                      onClick={handleRemoveArtwork}
                    >
                      削除
                    </Button>
                  )}
                </div>
              </>
            )}
          </FormField>
        </div>

        <div className="space-y-4">
          {submitError && <HelperText error>{submitError}</HelperText>}

          <div className="flex justify-end">
            <Button type="submit" loading={isSubmitting}>
              {isEditMode ? 'エピソードを更新' : 'エピソードを作成'}
            </Button>
          </div>
        </div>
      </form>

      <ArtworkGenerateModal
        open={isGenerateModalOpen}
        defaultPrompt={generateModalDefaultPrompt}
        isGenerating={isArtworkGenerating}
        onClose={() => setIsGenerateModalOpen(false)}
        onSubmit={handleGenerateSubmit}
      />
    </>
  );
}
