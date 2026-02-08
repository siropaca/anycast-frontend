'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon, UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { useUpdateProfile } from '@/features/users/hooks/useUpdateProfile';
import {
  type ProfileFormInput,
  profileFormSchema,
} from '@/features/users/schemas/profile';
import { useUploadArtwork } from '@/hooks/useUploadArtwork';
import type { ResponsePublicUserResponse } from '@/libs/api/generated/schemas';
import { confirmDiscard } from '@/utils/confirmDiscard';

interface Props {
  user: ResponsePublicUserResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserProfileEditModal({ user, open, onOpenChange }: Props) {
  const { isUpdating, error: updateError, updateProfile } = useUpdateProfile();
  const {
    uploadArtwork: uploadAvatar,
    isUploading: isAvatarUploading,
    error: avatarUploadError,
  } = useUploadArtwork();
  const {
    uploadArtwork: uploadHeader,
    isUploading: isHeaderUploading,
    error: headerUploadError,
  } = useUploadArtwork();

  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>();
  const [headerPreviewUrl, setHeaderPreviewUrl] = useState<string>();
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const headerFileInputRef = useRef<HTMLInputElement>(null);

  const isUploading = isAvatarUploading || isHeaderUploading;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormInput>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: '',
      bio: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        displayName: user.displayName,
        bio: user.bio || '',
        avatarImageId: user.avatar?.id,
        headerImageId: user.headerImage?.id,
      });
      setAvatarPreviewUrl(user.avatar?.url);
      setHeaderPreviewUrl(user.headerImage?.url);
    }
  }, [user, open, reset]);

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && !confirmDiscard(isDirty)) return;

    onOpenChange(isOpen);
    if (!isOpen) {
      reset();
      setAvatarPreviewUrl(undefined);
      setHeaderPreviewUrl(undefined);
    }
  }

  // ヘッダー画像
  function handleHeaderButtonClick() {
    headerFileInputRef.current?.click();
  }

  function handleHeaderFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadHeader(file, ({ id, url }) => {
      setValue('headerImageId', id, { shouldDirty: true });
      setHeaderPreviewUrl(url);
    });
  }

  function handleHeaderRemove() {
    setValue('headerImageId', undefined, { shouldDirty: true });
    setHeaderPreviewUrl(undefined);
    if (headerFileInputRef.current) {
      headerFileInputRef.current.value = '';
    }
  }

  // アバター画像
  function handleAvatarButtonClick() {
    avatarFileInputRef.current?.click();
  }

  function handleAvatarFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadAvatar(file, ({ id, url }) => {
      setValue('avatarImageId', id, { shouldDirty: true });
      setAvatarPreviewUrl(url);
    });
  }

  function handleAvatarRemove() {
    setValue('avatarImageId', undefined, { shouldDirty: true });
    setAvatarPreviewUrl(undefined);
    if (avatarFileInputRef.current) {
      avatarFileInputRef.current.value = '';
    }
  }

  async function handleFormSubmit(data: ProfileFormInput) {
    const success = await updateProfile(user.username, data);
    if (success) {
      onOpenChange(false);
    }
  }

  return (
    <FormModal
      trigger={<span className="hidden" />}
      open={open}
      title="プロフィールを編集"
      size="lg"
      submitLabel="保存"
      submitDisabled={!isDirty || isUpdating || isUploading}
      submitDisabledReason={
        isUploading ? '画像アップロード中...' : '変更がありません'
      }
      isSubmitting={isUpdating}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="space-y-6">
        {/* ヘッダー画像 */}
        <div className="space-y-2">
          <FormLabel>ヘッダー画像</FormLabel>
          <div className="relative h-32 w-full overflow-hidden rounded-md border border-border">
            {headerPreviewUrl ? (
              <Image
                src={headerPreviewUrl}
                alt="ヘッダー"
                fill
                className="object-cover"
              />
            ) : (
              <button
                type="button"
                className="flex h-full w-full cursor-pointer items-center justify-center bg-bg-hover text-text-placeholder transition-colors hover:bg-bg-hover-strong"
                disabled={isHeaderUploading}
                onClick={handleHeaderButtonClick}
              >
                <ImageIcon size={32} />
              </button>
            )}
            {headerPreviewUrl && (
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  color="secondary"
                  disabled={isHeaderUploading}
                  className="bg-black/30"
                  onClick={handleHeaderButtonClick}
                >
                  {isHeaderUploading ? 'アップロード中...' : '画像を変更'}
                </Button>
                <Button
                  variant="outline"
                  color="secondary"
                  disabled={isHeaderUploading}
                  className="bg-black/30"
                  onClick={handleHeaderRemove}
                >
                  削除
                </Button>
              </div>
            )}
          </div>
          <input
            ref={headerFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleHeaderFileChange}
          />
          {!headerPreviewUrl && (
            <Button
              variant="outline"
              color="secondary"
              disabled={isHeaderUploading}
              onClick={handleHeaderButtonClick}
            >
              {isHeaderUploading ? 'アップロード中...' : '画像を選択'}
            </Button>
          )}
          {headerUploadError && (
            <HelperText error>{headerUploadError}</HelperText>
          )}
        </div>

        {/* アバター画像 */}
        <div className="space-y-2">
          <FormLabel>アバター画像</FormLabel>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="shrink-0 cursor-pointer"
              disabled={isAvatarUploading}
              onClick={handleAvatarButtonClick}
            >
              {avatarPreviewUrl ? (
                <Image
                  src={avatarPreviewUrl}
                  alt="アバター"
                  width={80}
                  height={80}
                  className="size-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-20 items-center justify-center rounded-full bg-bg-hover text-text-placeholder transition-colors hover:bg-bg-hover-strong">
                  <UserIcon size={32} />
                </div>
              )}
            </button>
            <input
              ref={avatarFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarFileChange}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                color="secondary"
                disabled={isAvatarUploading}
                onClick={handleAvatarButtonClick}
              >
                {isAvatarUploading
                  ? 'アップロード中...'
                  : avatarPreviewUrl
                    ? '画像を変更'
                    : '画像を選択'}
              </Button>
              {avatarPreviewUrl && (
                <Button
                  variant="outline"
                  color="secondary"
                  disabled={isAvatarUploading}
                  onClick={handleAvatarRemove}
                >
                  削除
                </Button>
              )}
            </div>
          </div>
          {avatarUploadError && (
            <HelperText error>{avatarUploadError}</HelperText>
          )}
        </div>

        {/* 表示名 */}
        <div className="space-y-2">
          <FormLabel htmlFor="profile-edit-displayName" required>
            表示名
          </FormLabel>
          <Input
            id="profile-edit-displayName"
            placeholder="表示名を入力"
            maxLength={20}
            disabled={isUpdating}
            error={!!errors.displayName}
            {...register('displayName')}
          />
          {errors.displayName && (
            <HelperText error>{errors.displayName.message}</HelperText>
          )}
        </div>

        {/* 自己紹介 */}
        <div className="space-y-2">
          <FormLabel htmlFor="profile-edit-bio">自己紹介</FormLabel>
          <Textarea
            id="profile-edit-bio"
            placeholder="自己紹介を入力"
            rows={5}
            maxLength={200}
            showCounter
            disabled={isUpdating}
            error={!!errors.bio}
            value={watch('bio')}
            {...register('bio')}
          />
          {errors.bio && <HelperText error>{errors.bio.message}</HelperText>}
        </div>

        {updateError && <HelperText error>{updateError}</HelperText>}
      </div>
    </FormModal>
  );
}
