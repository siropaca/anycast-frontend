'use client';

import type { ReactNode } from 'react';
import { useId } from 'react';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { cn } from '@/utils/cn';

interface ChildProps {
  id: string;
  hasError: boolean;
}

interface Props {
  label: string;
  required?: boolean;
  description?: string;
  helpText?: string;
  error?: string;
  className?: string;

  children: (props: ChildProps) => ReactNode;
}

export function FormField({
  label,
  required,
  description,
  helpText,
  error,
  className,
  children,
}: Props) {
  const id = useId();
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      <FormLabel
        htmlFor={id}
        required={required}
        description={description}
        helpText={helpText}
      >
        {label}
      </FormLabel>
      {children({ id, hasError })}
      {error && <HelperText error>{error}</HelperText>}
    </div>
  );
}
