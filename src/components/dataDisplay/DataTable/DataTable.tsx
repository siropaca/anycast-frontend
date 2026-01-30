'use client';

import { DataTableRow } from '@/components/dataDisplay/DataTable/DataTableRow';
import type { Column } from '@/components/dataDisplay/DataTable/types';

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  keyExtractor: (row: T) => string;

  onRowClick?: (row: T) => void;
}

export type { Column };

export function DataTable<T>({
  columns,
  data,
  emptyMessage = 'データがありません',
  keyExtractor,
  onRowClick,
}: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-bg-elevated">
            {columns.map((column) => (
              <th
                key={column.key}
                className="truncate px-4 py-3 text-left text-sm text-text-subtle"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-text-subtle"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <DataTableRow
                key={keyExtractor(row)}
                columns={columns}
                row={row}
                onRowClick={onRowClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
