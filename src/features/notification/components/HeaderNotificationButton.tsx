'use client';

import { Popover } from '@base-ui/react/popover';
import { BellIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import {
  mockNotifications,
  type Notification,
} from '@/features/notification/mocks/notifications';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/date';

// TODO: モック実装
export function HeaderNotificationButton() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleMarkAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function handleMarkAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <Popover.Root>
      <div className="relative">
        <Popover.Trigger
          render={
            <IconButton
              icon={<BellIcon size={20} />}
              aria-label="お知らせ"
              color="secondary"
              variant="text"
            />
          }
        />

        {/* バッヂ */}
        {unreadCount > 0 && (
          <span className="pointer-events-none absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-badge text-[10px] font-semibold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>

      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="w-80 rounded-md border border-border bg-bg-elevated shadow-lg">
            {/* ヘッダー */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold">お知らせ</h3>
              {unreadCount > 0 && (
                <button
                  type="button"
                  className="cursor-pointer text-xs text-primary hover:underline"
                  onClick={handleMarkAllAsRead}
                >
                  すべて既読
                </button>
              )}
            </div>

            {/* リスト */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-text-subtle">
                  お知らせはありません
                </p>
              ) : (
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <button
                        type="button"
                        className={cn(
                          'flex w-full cursor-pointer flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-white/5',
                          !notification.read && 'bg-white/[0.03]',
                        )}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                          )}

                          <span
                            className={cn(
                              'text-sm font-medium',
                              notification.read && 'text-text-subtle',
                            )}
                          >
                            {notification.title}
                          </span>
                        </div>

                        <p className="text-xs text-text-subtle">
                          {notification.body}
                        </p>

                        <time className="text-[11px] text-text-subtle/70">
                          {formatDate(notification.createdAt)}
                        </time>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
