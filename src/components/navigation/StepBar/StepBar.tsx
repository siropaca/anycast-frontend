import { CheckIcon } from '@phosphor-icons/react';
import { cn } from '@/utils/cn';

interface Step {
  label: string;
}

interface Props {
  steps: Step[];
  currentStep: number;
}

export function StepBar({ steps, currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={step.label} className="flex items-center gap-3">
            {index > 0 && (
              <div
                className={cn(
                  'h-px w-8',
                  isCompleted || isActive ? 'bg-primary' : 'bg-border',
                )}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  isActive && 'bg-primary text-text-inverse',
                  isCompleted && 'bg-primary text-text-inverse',
                  !isActive &&
                    !isCompleted &&
                    'bg-bg-elevated text-text-subtle',
                )}
              >
                {isCompleted ? (
                  <CheckIcon size={14} weight="bold" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  isActive ? 'text-text-main' : 'text-text-subtle',
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
