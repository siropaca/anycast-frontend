import { ChannelListSkeletonRow } from '@/features/studio/channels/components/ChannelListSkeletonRow';

const SKELETON_ROW_COUNT = 3;

export function ChannelListSkeleton() {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-bg-elevated">
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              チャンネル
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              カテゴリ
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              ステータス
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              エピソード数
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: スケルトン行は固定で並び替えが発生しない
            <ChannelListSkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
