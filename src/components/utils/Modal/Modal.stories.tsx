import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Modal } from '@/components/utils/Modal/Modal';

const meta = {
  title: 'utils/Modal',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Modal.Root>
      <Modal.Trigger>
        <Button>モーダルを開く</Button>
      </Modal.Trigger>

      <Modal.Content>
        <Modal.Header>
          <Modal.Title>モーダルタイトル</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <p>モーダルの本文です。</p>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="outline" color="secondary">
              キャンセル
            </Button>
          </Modal.Close>
          <Button>保存</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  ),
};

export const Small: Story = {
  render: () => (
    <Modal.Root>
      <Modal.Trigger>
        <Button>小さいモーダル</Button>
      </Modal.Trigger>

      <Modal.Content size="sm">
        <Modal.Header>
          <Modal.Title>確認</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <p>この操作を実行しますか？</p>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="outline" color="secondary">
              いいえ
            </Button>
          </Modal.Close>
          <Button>はい</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  ),
};

export const Large: Story = {
  render: () => (
    <Modal.Root>
      <Modal.Trigger>
        <Button>大きいモーダル</Button>
      </Modal.Trigger>

      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>詳細情報</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <p>
            大きいサイズのモーダルは、より多くのコンテンツを表示するのに適しています。
            フォームや詳細情報の表示などに使用できます。
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="outline" color="secondary">
              閉じる
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  ),
};
