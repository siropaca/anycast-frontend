export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '新しいフォロワー',
    body: 'さくらさんがあなたをフォローしました',
    read: false,
    createdAt: new Date('2026-01-28T10:00:00'),
  },
  {
    id: '2',
    title: 'エピソード公開完了',
    body: '「第5話 - 新たな冒険」の公開が完了しました',
    read: false,
    createdAt: new Date('2026-01-27T18:30:00'),
  },
  {
    id: '3',
    title: 'コメントが届きました',
    body: '小狼さんがあなたのエピソードにコメントしました',
    read: true,
    createdAt: new Date('2026-01-26T14:00:00'),
  },
  {
    id: '4',
    title: '音声生成完了',
    body: '「朝のニュース」の音声生成が完了しました',
    read: true,
    createdAt: new Date('2026-01-25T09:15:00'),
  },
  {
    id: '5',
    title: 'チャンネル登録者数',
    body: 'チャンネル「Anycast Radio」の登録者が100人を突破しました！',
    read: true,
    createdAt: new Date('2026-01-24T20:00:00'),
  },
];
