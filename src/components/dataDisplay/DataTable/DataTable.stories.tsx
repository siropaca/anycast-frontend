import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { cn } from '@/utils/cn';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleUsers: User[] = [
  {
    id: '1',
    name: '山田太郎',
    email: 'yamada@example.com',
    role: '管理者',
    status: 'active',
  },
  {
    id: '2',
    name: '鈴木花子',
    email: 'suzuki@example.com',
    role: '編集者',
    status: 'active',
  },
  {
    id: '3',
    name: '佐藤次郎',
    email: 'sato@example.com',
    role: '閲覧者',
    status: 'inactive',
  },
];

const columns = [
  {
    key: 'name',
    header: '名前',
    accessor: (user: User) => <span className="text-sm">{user.name}</span>,
  },
  {
    key: 'email',
    header: 'メールアドレス',
    accessor: (user: User) => (
      <span className="text-sm text-text-secondary">{user.email}</span>
    ),
  },
  {
    key: 'role',
    header: 'ロール',
    accessor: (user: User) => (
      <span className="text-sm text-text-secondary">{user.role}</span>
    ),
  },
  {
    key: 'status',
    header: 'ステータス',
    accessor: (user: User) => (
      <span
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs',
          user.status === 'active'
            ? 'bg-status-published-bg text-status-published'
            : 'bg-status-draft-bg text-status-draft',
        )}
      >
        {user.status === 'active' ? '有効' : '無効'}
      </span>
    ),
  },
];

const meta = {
  title: 'dataDisplay/DataTable',
  component: DataTable<User>,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable<User>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data: sampleUsers,
    keyExtractor: (user) => user.id,
  },
};

export const WithRowClick: Story = {
  args: {
    columns,
    data: sampleUsers,
    keyExtractor: (user) => user.id,
    onRowClick: (user) => alert(`Clicked: ${user.name}`),
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    keyExtractor: (user) => user.id,
    emptyMessage: 'ユーザーが見つかりません',
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    columns,
    data: [],
    keyExtractor: (user) => user.id,
    emptyMessage: 'データがありません。新しいユーザーを追加してください。',
  },
};
