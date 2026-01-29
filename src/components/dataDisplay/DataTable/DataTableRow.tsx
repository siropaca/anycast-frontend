'use client';

import { useRef } from 'react';
import type { Column } from '@/components/dataDisplay/DataTable/types';
import { useKey } from '@/hooks/useKey';

interface Props<T> {
  columns: Column<T>[];
  row: T;

  onRowClick?: (row: T) => void;
}

export function DataTableRow<T>({ columns, row, onRowClick }: Props<T>) {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const isClickable = onRowClick !== undefined;

  function handleRowClick() {
    onRowClick?.(row);
  }

  useKey(
    ['Enter', ' '],
    (e) => {
      if (isClickable) {
        e.preventDefault();
        handleRowClick();
      }
    },
    rowRef,
  );

  function renderCell(column: Column<T>): React.ReactNode {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  }

  if (isClickable) {
    return (
      // biome-ignore lint/a11y/useSemanticElements: テーブル行のクリック可能化のため
      <tr
        ref={rowRef}
        className="cursor-pointer border-b border-border last:border-b-0 hover:bg-bg-hover"
        onClick={handleRowClick}
        tabIndex={0}
        role="button"
      >
        {columns.map((column) => (
          <td key={column.key} className={column.className ?? 'px-4 py-3'}>
            {renderCell(column)}
          </td>
        ))}
      </tr>
    );
  }

  return (
    <tr className="border-b border-border last:border-b-0">
      {columns.map((column) => (
        <td key={column.key} className={column.className ?? 'px-4 py-3'}>
          {renderCell(column)}
        </td>
      ))}
    </tr>
  );
}
