import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateProfile } from '@/features/users/hooks/useUpdateProfile';
import {
  type ProfileFormInput,
  profileFormSchema,
} from '@/features/users/schemas/profile';
import { useImageField } from '@/hooks/useImageField';
import type { ResponsePublicUserResponse } from '@/libs/api/generated/schemas';

/**
 * プロフィール編集フォームの状態管理・画像フィールド・送信処理を提供する
 *
 * @param user - 編集対象のユーザー
 * @param open - モーダルの開閉状態
 * @param onClose - モーダルを閉じるコールバック
 * @returns フォーム状態、画像フィールド、送信関数
 */
export function useProfileForm(
  user: ResponsePublicUserResponse,
  open: boolean,
  onClose: () => void,
) {
  const { isUpdating, error: updateError, updateProfile } = useUpdateProfile();

  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: '',
      bio: '',
    },
  });

  const avatarField = useImageField({
    onUpload: (id) => form.setValue('avatarImageId', id, { shouldDirty: true }),
    onRemove: () => form.setValue('avatarImageId', null, { shouldDirty: true }),
  });

  const headerField = useImageField({
    onUpload: (id) => form.setValue('headerImageId', id, { shouldDirty: true }),
    onRemove: () => form.setValue('headerImageId', null, { shouldDirty: true }),
  });

  const isUploading = avatarField.isUploading || headerField.isUploading;

  // biome-ignore lint/correctness/useExhaustiveDependencies: resetPreview は安定参照でないため除外
  useEffect(() => {
    if (open) {
      form.reset({
        displayName: user.displayName,
        bio: user.bio || '',
        avatarImageId: user.avatar?.id,
        headerImageId: user.headerImage?.id,
      });
      avatarField.resetPreview(user.avatar?.url);
      headerField.resetPreview(user.headerImage?.url);
    }
  }, [user, open, form.reset]);

  /**
   * フォームと画像プレビューをリセットする
   */
  function resetAll() {
    form.reset();
    avatarField.resetPreview(undefined);
    headerField.resetPreview(undefined);
  }

  /**
   * フォームを送信する
   *
   * @param data - フォーム入力データ
   */
  async function submit(data: ProfileFormInput) {
    const success = await updateProfile(user.username, data);
    if (success) {
      onClose();
    }
  }

  return {
    form,
    avatarField,
    headerField,
    isUploading,
    isUpdating,
    updateError,

    resetAll,
    submit,
  };
}
