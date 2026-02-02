'use client';

import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import type { ResponseCategoryResponse } from '@/libs/api/generated/schemas/responseCategoryResponse';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * カテゴリ一覧を取得する
 *
 * @returns アクティブなカテゴリ一覧（sortOrder 順）
 */
export function useCategories() {
  const { data } = useGetCategoriesSuspense();

  const categories = unwrapResponse<ResponseCategoryResponse[]>(data, []);

  return {
    categories: categories
      .filter((c) => c.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  };
}
