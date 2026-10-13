import { cn } from 'cn';

import { variantClasses, type TypographyVariant } from './typography-variants';

import type { ElementType, ReactNode } from 'react';

type Props = {
  variant: TypographyVariant;
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export const Typography = ({
  variant,
  as: Component = 'p',
  children,
  className,
}: Props) => {
  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  );
};
