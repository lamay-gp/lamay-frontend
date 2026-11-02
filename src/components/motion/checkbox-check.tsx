import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

const BOX_MS = 150;
const DRAW_MS = 350;
const UNCHECK_MS = 150;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function CheckboxCheck({
  className,
  indeterminate,
  ...props
}: CheckboxPrimitive.Root.Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(15);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (path) {
      setLength(Math.ceil(path.getTotalLength()));
    }
  }, []);

  const mark =
    indeterminate ? 'M2.12 5.08H8.47' : 'M1.69 5.08L3.81 7.2L8.47 2.54';

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-button data-checked:bg-button data-checked:text-primary-foreground dark:data-checked:bg-primary',
        'motion-reduce:transition-none',
        className,
      )}
      style={{
        transition: `background-color ${BOX_MS}ms ${EASE}, border-color ${BOX_MS}ms ${EASE}`,
      }}
      indeterminate={indeterminate}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        className={cn(
          'grid size-3.5 place-content-center text-current',
          '[&_path]:[transition:stroke-dashoffset_var(--check-uncheck)_var(--check-ease)]',
          '[&_path]:[stroke-dashoffset:var(--check-len)]',
          'data-checked:[&_path]:[stroke-dashoffset:0]',
          'data-checked:[&_path]:[transition-duration:var(--check-draw)]',
          'motion-reduce:[&_path]:transition-none',
        )}
        style={
          {
            '--check-len': length,
            '--check-draw': `${DRAW_MS}ms`,
            '--check-uncheck': `${UNCHECK_MS}ms`,
            '--check-ease': EASE,
          } as React.CSSProperties
        }
      >
        <svg
          viewBox="0 0 10.1668 10.1668"
          fill="none"
          aria-hidden
          className="size-full overflow-visible"
        >
          <path
            ref={pathRef}
            d={mark}
            stroke="currentColor"
            strokeWidth={0.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: length }}
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export default CheckboxCheck;
