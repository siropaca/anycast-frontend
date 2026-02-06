'use client';

import { useRouter } from 'next/navigation';
import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { Pagination } from '@/components/navigation/Pagination/Pagination';
import { MAIN_SCROLL_VIEWPORT_ID } from '@/features/app/components/LayoutBody';
import { StatusTag } from '@/features/studio/channels/components/StatusTag';
import { useMyChannelList } from '@/features/studio/channels/hooks/useMyChannelList';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { Pages } from '@/libs/pages';

export function ChannelList() {
  const router = useRouter();
  const { channels, currentPage, totalPages, setCurrentPage } =
    useMyChannelList();

  function handlePageChange(page: number) {
    setCurrentPage(page);
    document
      .getElementById(MAIN_SCROLL_VIEWPORT_ID)
      ?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRowClick(channel: ResponseChannelResponse) {
    router.push(Pages.studio.channel.path({ id: channel.id }));
  }

  const columns = [
    {
      key: 'channel',
      header: 'チャンネル',
      accessor: (channel: ResponseChannelResponse) => (
        <div className="flex items-center gap-4">
          <ArtworkImage
            src={channel.artwork?.url}
            alt={channel.name}
            size={50}
          />
          <span className="text-sm">{channel.name}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'カテゴリ',
      accessor: (channel: ResponseChannelResponse) => (
        <span className="text-sm text-text-subtle">
          {channel.category.name}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'ステータス',
      accessor: (channel: ResponseChannelResponse) => (
        <StatusTag isPublished={channel.publishedAt !== null} />
      ),
    },
    {
      key: 'episodeCount',
      header: 'エピソード数',
      accessor: (channel: ResponseChannelResponse) => (
        <span className="text-sm text-text-subtle">
          {channel.episodes.length}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={channels}
        emptyMessage="チャンネルがありません"
        keyExtractor={(channel) => channel.id}
        onRowClick={handleRowClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
