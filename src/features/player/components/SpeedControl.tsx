import { CheckIcon } from '@phosphor-icons/react';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

interface Props {
  playbackRate: number;
  onPlaybackRateChange: (rate: number) => void;
}

/**
 * 再生速度を選択するドロップダウンメニュー
 *
 * @param playbackRate - 現在の再生速度
 * @param onPlaybackRateChange - 再生速度変更時のコールバック
 */
export function SpeedControl({ playbackRate, onPlaybackRateChange }: Props) {
  function formatRate(rate: number): string {
    return `${rate}x`;
  }

  return (
    <DropdownMenu
      side="top"
      trigger={
        <button
          type="button"
          aria-label="再生速度"
          className="text-xs font-medium text-text-subtle hover:text-text-main transition-colors px-1.5 py-1 rounded min-w-[3rem] text-center"
        >
          {formatRate(playbackRate)}
        </button>
      }
    >
      {PLAYBACK_RATES.map((rate) => (
        <DropdownMenuItem
          key={rate}
          icon={
            rate === playbackRate ? (
              <CheckIcon size={14} weight="bold" />
            ) : (
              <span className="w-3.5" />
            )
          }
          onClick={() => onPlaybackRateChange(rate)}
        >
          {formatRate(rate)}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  );
}
