'use client';

import { PlusIcon } from '@phosphor-icons/react/ssr';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { useKey } from '@/hooks/useKey';
import { useMyChannelList } from '@/features/studio/channels/hooks/useMyChannelList';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { Pages } from '@/libs/pages';

export function ChannelList() {
  const { channels } = useMyChannelList();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button href={Pages.studio.newChannel.path()} leftIcon={<PlusIcon />}>
          新規追加
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-elevated">
              <th className="px-4 py-3 text-left text-sm text-text-secondary">
                チャンネル
              </th>
              <th className="px-4 py-3 text-left text-sm text-text-secondary">
                カテゴリ
              </th>
              <th className="px-4 py-3 text-left text-sm text-text-secondary">
                ステータス
              </th>
              <th className="px-4 py-3 text-left text-sm text-text-secondary">
                エピソード数
              </th>
            </tr>
          </thead>
          <tbody>
            {channels.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-secondary">
                  チャンネルがありません
                </td>
              </tr>
            ) : (
              channels.map((channel) => (
                <ChannelRow key={channel.id} channel={channel} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface ChannelRowProps {
  channel: ResponseChannelResponse;
}

function ChannelRow({ channel }: ChannelRowProps) {
  const router = useRouter();
  const rowRef = useRef<HTMLTableRowElement>(null);

  function handleRowClick() {
    router.push(Pages.studio.channel.path({ id: channel.id }));
  }

  useKey(
    ['Enter', ' '],
    (e) => {
      e.preventDefault();
      handleRowClick();
    },
    rowRef,
  );

  return (
    // biome-ignore lint/a11y/useSemanticElements: テーブル行のクリック可能化のため
    <tr
      ref={rowRef}
      className="cursor-pointer border-b border-border last:border-b-0 hover:bg-white/5"
      onClick={handleRowClick}
      tabIndex={0}
      role="button"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <ArtworkImage
            src={channel.artwork?.url}
            alt={channel.name}
            size={48}
          />
          <span className="text-sm">{channel.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary">
        {channel.category.name}
      </td>
      <td className="px-4 py-3">
        <StatusTag isPublished={channel.publishedAt !== null} />
      </td>
      <td className="px-4 py-3 text-sm text-text-secondary">
        {channel.episodes.length}
      </td>
    </tr>
  );
}

interface StatusTagProps {
  isPublished: boolean;
}

function StatusTag({ isPublished }: StatusTagProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs ${
        isPublished
          ? 'bg-status-published-bg text-status-published'
          : 'bg-status-draft-bg text-status-draft'
      }`}
    >
      {isPublished ? '公開中' : '下書き'}
    </span>
  );
}
