'use client';

import { BgmRadioList } from '@/features/studio/bgm/components/BgmRadioList';
import { useBgmOptions } from '@/features/studio/episodes/hooks/useBgmOptions';

interface Props {
  selectedValue: string;

  onSelect: (value: string) => void;
}

export function BgmRadioListWithData({ selectedValue, onSelect }: Props) {
  const { allBgms } = useBgmOptions();

  return (
    <BgmRadioList
      allBgms={allBgms}
      selectedValue={selectedValue}
      isLoading={false}
      onSelect={onSelect}
    />
  );
}
