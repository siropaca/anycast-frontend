import { BgmListSkeletonRow } from '@/features/studio/bgm/components/BgmListSkeletonRow';

const SKELETON_ROW_COUNT = 8;

export function BgmListSkeleton() {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-bg-elevated">
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              BGM名
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              タイプ
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              使用チャンネル
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              使用エピソード
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold" />
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: スケルトン行は固定で並び替えが発生しない
            <BgmListSkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
