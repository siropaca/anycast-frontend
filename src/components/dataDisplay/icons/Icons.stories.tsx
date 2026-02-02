import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GoogleIcon } from '@/components/dataDisplay/icons/GoogleIcon';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/icons/Icons',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function IconItem({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {children}
      <span style={{ fontSize: 12, color: '#888' }}>{name}</span>
    </div>
  );
}

export const All: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="All Icons (size=32)">
        <Stack align="center" gap={24}>
          <IconItem name="GoogleIcon">
            <GoogleIcon size={32} />
          </IconItem>
        </Stack>
      </Section>

      <Section title="Sizes">
        <Stack align="center">
          <GoogleIcon size={16} />
          <GoogleIcon size={24} />
          <GoogleIcon size={32} />
          <GoogleIcon size={48} />
        </Stack>
      </Section>
    </Stack>
  ),
};
