import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Pagination } from '@/components/navigation/Pagination/Pagination';

const meta = {
  title: 'navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: () => {},
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    onPageChange: () => {},
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 10,
    totalPages: 100,
    onPageChange: () => {},
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
  },
};

function InteractiveExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-text-subtle">
        現在のページ: {currentPage} / {totalPages}
      </p>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export const Interactive: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    onPageChange: () => {},
  },
  render: () => <InteractiveExample />,
};
