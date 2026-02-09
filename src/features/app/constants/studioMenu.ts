import {
  GearIcon,
  MusicNotesIcon,
  SquaresFourIcon,
  UserSoundIcon,
  UsersIcon,
  VideoIcon,
} from '@phosphor-icons/react';
import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';
import { Pages } from '@/libs/pages';

interface CreateStudioMenuSectionsOptions {
  onSettingsClick: () => void;
}

interface StudioMenuSections {
  sections: MenuSection[];
  bottomSections: MenuSection[];
}

/**
 * スタジオ用のメニューセクションを生成する
 *
 * @param options - 設定ボタンのクリックハンドラーなどのオプション
 * @returns メニューセクション（上部と下部固定）
 */
export function createStudioMenuSections(
  options: CreateStudioMenuSectionsOptions,
): StudioMenuSections {
  return {
    sections: [
      {
        title: 'Studio',
        items: [
          {
            label: Pages.studio.dashboard.title,
            href: Pages.studio.dashboard.path(),
            icon: SquaresFourIcon,
            matchPaths: [Pages.studio.index.path()],
          },
          {
            label: Pages.studio.channels.title,
            href: Pages.studio.channels.path(),
            icon: VideoIcon,
            matchPrefix: ['/studio/channels/'],
          },
          {
            label: Pages.studio.characters.title,
            href: Pages.studio.characters.path(),
            icon: UsersIcon,
          },
          {
            label: Pages.studio.bgm.title,
            href: Pages.studio.bgm.path(),
            icon: MusicNotesIcon,
          },
          {
            label: Pages.studio.voices.title,
            href: Pages.studio.voices.path(),
            icon: UserSoundIcon,
          },
        ],
      },
    ],
    bottomSections: [
      {
        items: [
          {
            label: '設定',
            icon: GearIcon,
            onClick: options.onSettingsClick,
          },
        ],
      },
    ],
  };
}
