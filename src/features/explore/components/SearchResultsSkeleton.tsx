import { SearchChannelsSkeleton } from '@/features/explore/components/SearchChannelsSkeleton';
import { SearchEpisodesSkeleton } from '@/features/explore/components/SearchEpisodesSkeleton';
import { SearchUsersSkeleton } from '@/features/explore/components/SearchUsersSkeleton';

export function SearchResultsSkeleton() {
  return (
    <div className="mt-4 flex flex-col gap-6">
      <SearchEpisodesSkeleton />
      <SearchChannelsSkeleton />
      <SearchUsersSkeleton />
    </div>
  );
}
