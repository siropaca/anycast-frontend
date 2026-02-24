import { CharacterListSkeletonRow } from '@/features/studio/characters/components/CharacterListSkeletonRow';

const SKELETON_ROW_COUNT = 8;

export function CharacterListSkeleton() {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-bg-elevated">
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              キャラクター
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              ボイス
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold">
              使用チャンネル
            </th>
            <th className="truncate px-4 py-3 text-left text-sm text-text-subtle font-semibold" />
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: スケルトン行は固定で並び替えが発生しない
            <CharacterListSkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
