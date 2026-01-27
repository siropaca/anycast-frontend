import {
  HeartIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/inputs/Button/Button';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 'md',
    color: 'primary',
    variant: 'solid',
    children: 'Button',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Solid">
        <Stack>
          <Button color="primary" variant="solid">
            Primary
          </Button>
          <Button color="white" variant="solid">
            White
          </Button>
        </Stack>
      </Section>

      <Section title="Outline">
        <Stack>
          <Button color="primary" variant="outline">
            Primary
          </Button>
          <Button color="white" variant="outline">
            White
          </Button>
        </Stack>
      </Section>
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Primary Solid">
        <Stack>
          <Button size="sm" color="primary" variant="solid">
            Small
          </Button>
          <Button size="md" color="primary" variant="solid">
            Medium
          </Button>
          <Button size="lg" color="primary" variant="solid">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Primary Outline">
        <Stack>
          <Button size="sm" color="primary" variant="outline">
            Small
          </Button>
          <Button size="md" color="primary" variant="outline">
            Medium
          </Button>
          <Button size="lg" color="primary" variant="outline">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="White Solid">
        <Stack>
          <Button size="sm" color="white" variant="solid">
            Small
          </Button>
          <Button size="md" color="white" variant="solid">
            Medium
          </Button>
          <Button size="lg" color="white" variant="solid">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="White Outline">
        <Stack>
          <Button size="sm" color="white" variant="outline">
            Small
          </Button>
          <Button size="md" color="white" variant="outline">
            Medium
          </Button>
          <Button size="lg" color="white" variant="outline">
            Large
          </Button>
        </Stack>
      </Section>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Left Icon">
        <Stack>
          <Button size="sm" leftIcon={<PlusIcon size={14} />}>
            追加
          </Button>
          <Button size="md" leftIcon={<PlusIcon size={16} />}>
            追加
          </Button>
          <Button size="lg" leftIcon={<PlusIcon size={18} />}>
            追加
          </Button>
        </Stack>
      </Section>

      <Section title="Right Icon">
        <Stack>
          <Button size="sm" rightIcon={<MagnifyingGlassIcon size={14} />}>
            検索
          </Button>
          <Button size="md" rightIcon={<MagnifyingGlassIcon size={16} />}>
            検索
          </Button>
          <Button size="lg" rightIcon={<MagnifyingGlassIcon size={18} />}>
            検索
          </Button>
        </Stack>
      </Section>

      <Section title="Both Icons">
        <Stack>
          <Button
            leftIcon={<HeartIcon size={16} />}
            rightIcon={<PlusIcon size={16} />}
          >
            お気に入りに追加
          </Button>
        </Stack>
      </Section>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Enabled">
        <Stack>
          <Button color="primary" variant="solid">
            Primary Solid
          </Button>
          <Button color="primary" variant="outline">
            Primary Outline
          </Button>
          <Button color="white" variant="solid">
            White Solid
          </Button>
          <Button color="white" variant="outline">
            White Outline
          </Button>
        </Stack>
      </Section>

      <Section title="Disabled">
        <Stack>
          <Button color="primary" variant="solid" disabled>
            Primary Solid
          </Button>
          <Button color="primary" variant="outline" disabled>
            Primary Outline
          </Button>
          <Button color="white" variant="solid" disabled>
            White Solid
          </Button>
          <Button color="white" variant="outline" disabled>
            White Outline
          </Button>
        </Stack>
      </Section>
    </Stack>
  ),
};
