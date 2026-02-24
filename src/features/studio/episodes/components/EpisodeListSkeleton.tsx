import { PlusIcon } from '@phosphor-icons/react/ssr';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { EpisodeListSkeletonRow } from '@/features/studio/episodes/components/EpisodeListSkeletonRow';

const SKELETON_ROW_COUNT = 3;

export function EpisodeListSkeleton() {
  return (
    <div className="space-y-4">
      <SectionTitle
        title="エピソード"
        level="h3"
        action={
          <Button size="sm" leftIcon={<PlusIcon size={16} />} disabled>
            新規追加
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-elevated">
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                エピソード
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                ステータス
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                台本行数
              </th>
              <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
                再生数
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: スケルトン行は固定で並び替えが発生しない
              <EpisodeListSkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
