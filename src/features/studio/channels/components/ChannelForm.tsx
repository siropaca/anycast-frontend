'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  type ChannelFormInput,
  channelFormSchema,
} from '@/features/studio/channels/schemas/channel';
import type {
  ResponseCategoryResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

interface Props {
  mode: 'create' | 'edit';
  defaultValues?: ChannelFormInput;
  categories: ResponseCategoryResponse[];
  voices: ResponseVoiceResponse[];
  isSubmitting?: boolean;

  onSubmit: (data: ChannelFormInput) => void;
}

export function ChannelForm({
  mode,
  defaultValues,
  categories,
  voices,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const isEditMode = mode === 'edit';

  const {
    register,
    control,
    handleSubmit,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'characters',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">チャンネル名</label>
        <input
          id="name"
          type="text"
          className="border w-full"
          {...register('name')}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          className="border w-full h-20"
          {...register('description')}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="categoryId">カテゴリ</label>
        <select
          id="categoryId"
          className="border w-full"
          {...register('categoryId')}
        >
          <option value="">選択してください</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p>{errors.categoryId.message}</p>}
      </div>

      <div>
        <label htmlFor="userPrompt">プロンプト（台本生成用）</label>
        <textarea
          id="userPrompt"
          className="border w-full h-20"
          {...register('userPrompt')}
        />
        {errors.userPrompt && <p>{errors.userPrompt.message}</p>}
      </div>

      <fieldset>
        <legend>キャラクター</legend>

        {fields.map((field, index) => (
          <div key={field.id}>
            <h4>キャラクター {index + 1}</h4>

            <div>
              <label htmlFor={`characters.${index}.voiceId`}>ボイス</label>
              <select
                id={`characters.${index}.voiceId`}
                className="border w-full"
                disabled={isEditMode}
                {...register(`characters.${index}.voiceId`)}
              >
                <option value="">選択してください</option>
                {voices.map((voice) => (
                  <option key={voice.id} value={voice.id}>
                    {voice.name} ({voice.gender})
                  </option>
                ))}
              </select>
              {errors.characters?.[index]?.voiceId && (
                <p>{errors.characters[index].voiceId?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor={`characters.${index}.name`}>名前</label>
              <input
                id={`characters.${index}.name`}
                type="text"
                className="border w-full"
                disabled={isEditMode}
                {...register(`characters.${index}.name`)}
              />
              {errors.characters?.[index]?.name && (
                <p>{errors.characters[index].name?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor={`characters.${index}.persona`}>ペルソナ</label>
              <textarea
                id={`characters.${index}.persona`}
                className="border w-full h-20"
                disabled={isEditMode}
                {...register(`characters.${index}.persona`)}
              />
            </div>

            {!isEditMode && fields.length > 1 && (
              <button
                type="button"
                className="border"
                onClick={() => remove(index)}
              >
                − 削除
              </button>
            )}
          </div>
        ))}

        {!isEditMode && fields.length < 2 && (
          <button
            type="button"
            className="border"
            onClick={() => append({ name: '', voiceId: '', persona: '' })}
          >
            ＋ キャラクターを追加
          </button>
        )}

        {errors.characters?.root && <p>{errors.characters.root.message}</p>}
      </fieldset>

      <button type="submit" className="border" disabled={isSubmitting}>
        {isSubmitting
          ? '保存中...'
          : isEditMode
            ? 'チャンネルを更新'
            : 'チャンネルを作成'}
      </button>
    </form>
  );
}
