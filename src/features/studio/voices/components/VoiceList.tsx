'use client';

import { PauseIcon, PlayIcon, StarIcon } from '@phosphor-icons/react';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { useFavoriteVoice } from '@/features/studio/voices/hooks/useFavoriteVoice';
import { useVoiceList } from '@/features/studio/voices/hooks/useVoiceList';
import { useVoicePlayer } from '@/features/studio/voices/hooks/useVoicePlayer';
import {
  getGenderLabel,
  getProviderLabel,
} from '@/features/studio/voices/utils/voiceLabels';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';

export function VoiceList() {
  const { voices } = useVoiceList();
  const { isVoicePlaying, playVoice, pauseVoice } = useVoicePlayer();
  const { toggleFavorite, isPending } = useFavoriteVoice();

  function handlePlayClick(
    e: React.MouseEvent<HTMLButtonElement>,
    voice: ResponseVoiceResponse,
  ) {
    e.stopPropagation();

    if (isVoicePlaying(voice)) {
      pauseVoice();
    } else {
      playVoice(voice, voices);
    }
  }

  function handleFavoriteClick(
    e: React.MouseEvent<HTMLButtonElement>,
    voice: ResponseVoiceResponse,
  ) {
    e.stopPropagation();
    toggleFavorite(voice.id, voice.isFavorite ?? false);
  }

  const columns = [
    {
      key: 'name',
      header: 'ボイス名',
      accessor: (voice: ResponseVoiceResponse) => <span>{voice.name}</span>,
    },
    {
      key: 'gender',
      header: '性別',
      accessor: (voice: ResponseVoiceResponse) => (
        <span>{getGenderLabel(voice.gender)}</span>
      ),
    },
    {
      key: 'provider',
      header: 'プロバイダー',
      accessor: (voice: ResponseVoiceResponse) => (
        <span>{getProviderLabel(voice.provider)}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-0 px-4 py-3',
      accessor: (voice: ResponseVoiceResponse) => (
        <div className="flex items-center justify-end gap-2">
          <IconButton
            icon={
              isVoicePlaying(voice) ? (
                <PauseIcon size={16} weight="fill" />
              ) : (
                <PlayIcon size={16} weight="fill" />
              )
            }
            aria-label={isVoicePlaying(voice) ? '一時停止' : '再生'}
            size="sm"
            color="secondary"
            variant="solid"
            className="transition-transform hover:scale-105 mr-2"
            onClick={(e) => handlePlayClick(e, voice)}
          />
          <IconButton
            icon={
              <StarIcon
                size={18}
                weight={voice.isFavorite ? 'fill' : 'regular'}
                className={voice.isFavorite ? 'text-text-favorite' : ''}
              />
            }
            aria-label={
              voice.isFavorite ? 'お気に入りを解除' : 'お気に入りに追加'
            }
            color="secondary"
            variant="text"
            disabled={isPending}
            onClick={(e) => handleFavoriteClick(e, voice)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={voices}
        emptyMessage="ボイスがありません"
        keyExtractor={(voice) => voice.id}
      />
    </div>
  );
}
