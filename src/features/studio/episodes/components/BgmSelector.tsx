'use client';

import { useBgmOptions } from '@/features/studio/episodes/hooks/useBgmOptions';
import { useDeleteEpisodeBgm } from '@/features/studio/episodes/hooks/useDeleteEpisodeBgm';
import { useSetEpisodeBgm } from '@/features/studio/episodes/hooks/useSetEpisodeBgm';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  currentBgm: ResponseEpisodeResponseBgm;
}

export function BgmSelector({ channelId, episodeId, currentBgm }: Props) {
  const { userBgms, defaultBgms } = useBgmOptions();

  const {
    setBgm,
    isSettingBgm,
    error: setError,
  } = useSetEpisodeBgm(channelId, episodeId);

  const {
    deleteBgm,
    isDeletingBgm,
    error: deleteError,
  } = useDeleteEpisodeBgm(channelId, episodeId);

  const isMutating = isSettingBgm || isDeletingBgm;
  const error = setError ?? deleteError;

  function handleBgmChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (!value) return;

    const [type, bgmId] = value.split(':');
    if (!bgmId) return;

    setBgm(bgmId, type === 'default');
  }

  function handleDeleteClick() {
    deleteBgm();
  }

  const currentValue = currentBgm
    ? `${currentBgm.isDefault ? 'default' : 'user'}:${currentBgm.id}`
    : '';

  return (
    <div>
      <label>
        <select
          className="border"
          value={currentValue}
          disabled={isMutating}
          onChange={handleBgmChange}
        >
          <option value="">BGMを選択</option>
          {userBgms.length > 0 && (
            <optgroup label="マイBGM">
              {userBgms.map((bgm) => (
                <option key={bgm.id} value={`user:${bgm.id}`}>
                  {bgm.name}
                </option>
              ))}
            </optgroup>
          )}
          {defaultBgms.length > 0 && (
            <optgroup label="デフォルト">
              {defaultBgms.map((bgm) => (
                <option key={bgm.id} value={`default:${bgm.id}`}>
                  {bgm.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </label>

      {currentBgm && (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={handleDeleteClick}
        >
          {isDeletingBgm ? '削除中...' : '削除'}
        </button>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}
