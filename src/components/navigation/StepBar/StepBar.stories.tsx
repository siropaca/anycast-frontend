import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StepBar } from '@/components/navigation/StepBar/StepBar';

const meta = {
  title: 'navigation/StepBar',
  component: StepBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StepBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const twoSteps = [{ label: '基本情報' }, { label: 'キャラクター設定' }];

const threeSteps = [
  { label: '基本情報' },
  { label: 'キャラクター設定' },
  { label: '確認' },
];

export const FirstStep: Story = {
  args: {
    steps: twoSteps,
    currentStep: 1,
  },
};

export const SecondStep: Story = {
  args: {
    steps: twoSteps,
    currentStep: 2,
  },
};

export const Completed: Story = {
  args: {
    steps: twoSteps,
    currentStep: 3,
  },
};

export const ThreeStepsFirst: Story = {
  args: {
    steps: threeSteps,
    currentStep: 1,
  },
};

export const ThreeStepsMiddle: Story = {
  args: {
    steps: threeSteps,
    currentStep: 2,
  },
};

export const ThreeStepsLast: Story = {
  args: {
    steps: threeSteps,
    currentStep: 3,
  },
};
