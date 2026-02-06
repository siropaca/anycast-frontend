export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'inverse';
export type ButtonVariant = 'solid' | 'outline' | 'text';

export const buttonBaseClasses =
  'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full border leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-50';

export const colorVariantClasses: Record<
  ButtonColor,
  Record<ButtonVariant, string>
> = {
  primary: {
    solid:
      'bg-primary text-white border-transparent hover:bg-primary-hover active:bg-primary-active',
    outline:
      'bg-transparent text-primary border-primary hover:bg-primary/10 active:bg-primary/20',
    text: 'bg-transparent text-primary border-transparent hover:bg-primary/10 active:bg-primary/20',
  },
  secondary: {
    solid:
      'bg-secondary text-black border-transparent hover:bg-secondary/80 active:bg-secondary/70',
    outline:
      'bg-transparent text-secondary border-secondary hover:bg-secondary/10 active:bg-secondary/20',
    text: 'bg-transparent text-secondary border-transparent hover:bg-secondary/10 active:bg-secondary/20',
  },
  danger: {
    solid:
      'bg-text-danger text-white border-transparent hover:bg-text-danger/80 active:bg-text-danger/70',
    outline:
      'bg-transparent text-text-danger border-text-danger hover:bg-text-danger/10 active:bg-text-danger/20',
    text: 'bg-transparent text-text-danger border-transparent hover:bg-text-danger/10 active:bg-text-danger/20',
  },
  inverse: {
    solid:
      'bg-white text-text-inverse border-transparent hover:bg-white/90 active:bg-white/80',
    outline:
      'bg-white text-text-inverse border-border hover:bg-white/90 active:bg-white/80',
    text: 'bg-transparent text-text-inverse border-transparent hover:bg-white/10 active:bg-white/20',
  },
};
