import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';

const SKELETON_COUNT = 12;

export function PlaybackHistoryListSkeleton() {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
        <ArtworkSkeleton key={i} />
      ))}
    </div>
  );
}
