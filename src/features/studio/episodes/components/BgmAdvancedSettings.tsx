'use client';

import { Collapsible } from '@base-ui/react/collapsible';
import { CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react';
import { type Ref, useImperativeHandle, useState } from 'react';
import { FormField } from '@/components/inputs/FormField/FormField';
import { Input } from '@/components/inputs/Input/Input';

const BGM_DEFAULTS = {
  volumeDb: -20,
  fadeOutSeconds: 3,
  paddingStartSeconds: 1,
  paddingEndSeconds: 3,
};

export interface BgmAdvancedSettingsValues {
  bgmVolumeDb: number;
  fadeOutMs: number;
  paddingStartMs: number;
  paddingEndMs: number;
}

export interface BgmAdvancedSettingsRef {
  getValues: () => BgmAdvancedSettingsValues;
  reset: () => void;
}

interface Props {
  ref: Ref<BgmAdvancedSettingsRef>;
}

export function BgmAdvancedSettings({ ref }: Props) {
  const [volumeDb, setVolumeDb] = useState(BGM_DEFAULTS.volumeDb);
  const [fadeOutSeconds, setFadeOutSeconds] = useState(
    BGM_DEFAULTS.fadeOutSeconds,
  );
  const [paddingStartSeconds, setPaddingStartSeconds] = useState(
    BGM_DEFAULTS.paddingStartSeconds,
  );
  const [paddingEndSeconds, setPaddingEndSeconds] = useState(
    BGM_DEFAULTS.paddingEndSeconds,
  );
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      bgmVolumeDb: volumeDb,
      fadeOutMs: fadeOutSeconds * 1000,
      paddingStartMs: paddingStartSeconds * 1000,
      paddingEndMs: paddingEndSeconds * 1000,
    }),
    reset: () => {
      setVolumeDb(BGM_DEFAULTS.volumeDb);
      setFadeOutSeconds(BGM_DEFAULTS.fadeOutSeconds);
      setPaddingStartSeconds(BGM_DEFAULTS.paddingStartSeconds);
      setPaddingEndSeconds(BGM_DEFAULTS.paddingEndSeconds);
      setOpen(false);
    },
  }));

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="mt-4">
      <Collapsible.Trigger className="flex cursor-pointer items-center gap-1 text-sm text-text-subtle transition-colors hover:text-text-main">
        {open ? <CaretDownIcon size={14} /> : <CaretRightIcon size={14} />}
        高度な設定
      </Collapsible.Trigger>
      <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0">
        <div className="mt-3 grid grid-cols-2 gap-3">
          <FormField label="BGM音量">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                size="sm"
                min={-60}
                max={0}
                value={volumeDb}
                onChange={(e) => setVolumeDb(Number(e.target.value))}
                rightIcon={<span className="text-xs">dB</span>}
              />
            )}
          </FormField>
          <FormField label="フェードアウト">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                size="sm"
                min={0}
                max={30}
                value={fadeOutSeconds}
                onChange={(e) => setFadeOutSeconds(Number(e.target.value))}
                rightIcon={<span className="text-xs">秒</span>}
              />
            )}
          </FormField>
          <FormField label="開始の余白">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                size="sm"
                min={0}
                max={10}
                step={0.5}
                value={paddingStartSeconds}
                onChange={(e) => setPaddingStartSeconds(Number(e.target.value))}
                rightIcon={<span className="text-xs">秒</span>}
              />
            )}
          </FormField>
          <FormField label="終了の余白">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                size="sm"
                min={0}
                max={10}
                step={0.5}
                value={paddingEndSeconds}
                onChange={(e) => setPaddingEndSeconds(Number(e.target.value))}
                rightIcon={<span className="text-xs">秒</span>}
              />
            )}
          </FormField>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
