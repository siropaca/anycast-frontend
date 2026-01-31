import {
  HeartIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ButtonSkeleton } from '@/components/inputs/buttons/Button/ButtonSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/buttons/Button',
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
          <Button color="secondary" variant="solid">
            Secondary
          </Button>
          <Button color="danger" variant="solid">
            Danger
          </Button>
          <Button color="inverse" variant="solid">
            Inverse
          </Button>
        </Stack>
      </Section>

      <Section title="Outline">
        <Stack>
          <Button color="primary" variant="outline">
            Primary
          </Button>
          <Button color="secondary" variant="outline">
            Secondary
          </Button>
          <Button color="danger" variant="outline">
            Danger
          </Button>
          <Button color="inverse" variant="outline">
            Inverse
          </Button>
        </Stack>
      </Section>

      <Section title="Text">
        <Stack>
          <Button color="primary" variant="text">
            Primary
          </Button>
          <Button color="secondary" variant="text">
            Secondary
          </Button>
          <Button color="danger" variant="text">
            Danger
          </Button>
          <Button color="inverse" variant="text">
            Inverse
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

      <Section title="Secondary Solid">
        <Stack>
          <Button size="sm" color="secondary" variant="solid">
            Small
          </Button>
          <Button size="md" color="secondary" variant="solid">
            Medium
          </Button>
          <Button size="lg" color="secondary" variant="solid">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Secondary Outline">
        <Stack>
          <Button size="sm" color="secondary" variant="outline">
            Small
          </Button>
          <Button size="md" color="secondary" variant="outline">
            Medium
          </Button>
          <Button size="lg" color="secondary" variant="outline">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Danger Solid">
        <Stack>
          <Button size="sm" color="danger" variant="solid">
            Small
          </Button>
          <Button size="md" color="danger" variant="solid">
            Medium
          </Button>
          <Button size="lg" color="danger" variant="solid">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Danger Outline">
        <Stack>
          <Button size="sm" color="danger" variant="outline">
            Small
          </Button>
          <Button size="md" color="danger" variant="outline">
            Medium
          </Button>
          <Button size="lg" color="danger" variant="outline">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Danger Text">
        <Stack>
          <Button size="sm" color="danger" variant="text">
            Small
          </Button>
          <Button size="md" color="danger" variant="text">
            Medium
          </Button>
          <Button size="lg" color="danger" variant="text">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Inverse Solid">
        <Stack>
          <Button size="sm" color="inverse" variant="solid">
            Small
          </Button>
          <Button size="md" color="inverse" variant="solid">
            Medium
          </Button>
          <Button size="lg" color="inverse" variant="solid">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Inverse Outline">
        <Stack>
          <Button size="sm" color="inverse" variant="outline">
            Small
          </Button>
          <Button size="md" color="inverse" variant="outline">
            Medium
          </Button>
          <Button size="lg" color="inverse" variant="outline">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Inverse Text">
        <Stack>
          <Button size="sm" color="inverse" variant="text">
            Small
          </Button>
          <Button size="md" color="inverse" variant="text">
            Medium
          </Button>
          <Button size="lg" color="inverse" variant="text">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Primary Text">
        <Stack>
          <Button size="sm" color="primary" variant="text">
            Small
          </Button>
          <Button size="md" color="primary" variant="text">
            Medium
          </Button>
          <Button size="lg" color="primary" variant="text">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Secondary Text">
        <Stack>
          <Button size="sm" color="secondary" variant="text">
            Small
          </Button>
          <Button size="md" color="secondary" variant="text">
            Medium
          </Button>
          <Button size="lg" color="secondary" variant="text">
            Large
          </Button>
        </Stack>
      </Section>

      <Section title="Skeleton">
        <Stack>
          <ButtonSkeleton size="sm" />
          <ButtonSkeleton size="md" />
          <ButtonSkeleton size="lg" />
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
            高評価に追加
          </Button>
        </Stack>
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Stack>
      <ButtonSkeleton size="sm" />
      <ButtonSkeleton size="md" />
      <ButtonSkeleton size="lg" />
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
          <Button color="primary" variant="text">
            Primary Text
          </Button>
          <Button color="secondary" variant="solid">
            Secondary Solid
          </Button>
          <Button color="secondary" variant="outline">
            Secondary Outline
          </Button>
          <Button color="secondary" variant="text">
            Secondary Text
          </Button>
          <Button color="danger" variant="solid">
            Danger Solid
          </Button>
          <Button color="danger" variant="outline">
            Danger Outline
          </Button>
          <Button color="danger" variant="text">
            Danger Text
          </Button>
          <Button color="inverse" variant="solid">
            Inverse Solid
          </Button>
          <Button color="inverse" variant="outline">
            Inverse Outline
          </Button>
          <Button color="inverse" variant="text">
            Inverse Text
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
          <Button color="primary" variant="text" disabled>
            Primary Text
          </Button>
          <Button color="secondary" variant="solid" disabled>
            Secondary Solid
          </Button>
          <Button color="secondary" variant="outline" disabled>
            Secondary Outline
          </Button>
          <Button color="secondary" variant="text" disabled>
            Secondary Text
          </Button>
          <Button color="danger" variant="solid" disabled>
            Danger Solid
          </Button>
          <Button color="danger" variant="outline" disabled>
            Danger Outline
          </Button>
          <Button color="danger" variant="text" disabled>
            Danger Text
          </Button>
          <Button color="inverse" variant="solid" disabled>
            Inverse Solid
          </Button>
          <Button color="inverse" variant="outline" disabled>
            Inverse Outline
          </Button>
          <Button color="inverse" variant="text" disabled>
            Inverse Text
          </Button>
        </Stack>
      </Section>
    </Stack>
  ),
};
