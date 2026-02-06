'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ReactElement, ReactNode } from 'react';

interface Props {
  label: ReactNode;
  children: ReactElement;
}

export function Tooltip({ label, children }: Props) {
  return (
    <BaseTooltip.Provider delay={0} closeDelay={0}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />

        <BaseTooltip.Portal>
          <BaseTooltip.Positioner sideOffset={6} className="z-(--z-tooltip)">
            <BaseTooltip.Popup className="max-w-xs rounded bg-bg-elevated px-3 py-1.5 text-xs text-text-main shadow-lg ring-1 ring-border">
              {label}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
