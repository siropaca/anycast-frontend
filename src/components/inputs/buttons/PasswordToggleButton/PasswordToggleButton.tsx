import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

interface Props {
  visible: boolean;
  onToggle: () => void;
}

export function PasswordToggleButton({ visible, onToggle }: Props) {
  return (
    <button
      type="button"
      className="cursor-pointer text-text-placeholder transition-colors hover:text-text-main"
      onClick={onToggle}
      aria-label={visible ? 'パスワードを隠す' : 'パスワードを表示'}
    >
      {visible ? <EyeSlashIcon /> : <EyeIcon />}
    </button>
  );
}
