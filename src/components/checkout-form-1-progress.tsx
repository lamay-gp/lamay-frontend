import { cn } from '@/lib/utils';

const STEP_COUNT = 3;

export function CheckoutForm1Progress({ step }: { step: number }) {
  return (
    <div className="mb-8 flex">
      <div className="flex items-center gap-4">
        {Array.from({ length: STEP_COUNT }, (_, index) => index + 1).map(
          (stepNumber) => (
            <div
              key={stepNumber}
              className="flex items-center"
            >
              <div
                aria-current={stepNumber === step ? 'step' : undefined}
                className={cn(
                  'flex size-10 items-center justify-center rounded-full text-sm transition-colors font-semibold',
                  stepNumber <= step ?
                    'bg-button text-primary-foreground'
                  : 'bg-muted text-muted-foreground',
                )}
              >
                {stepNumber}
              </div>
              {stepNumber < STEP_COUNT ?
                <div
                  aria-hidden="true"
                  className={cn(
                    'ml-4 h-1 w-16 rounded transition-colors',
                    stepNumber < step ? 'bg-button' : 'bg-muted',
                  )}
                />
              : null}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
