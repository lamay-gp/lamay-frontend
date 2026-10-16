import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown-menu/dropdown-menu';

import type { ComponentProps, ReactElement, ReactNode } from 'react';

type DropdownProps = {
  trigger: ReactElement;
  children: ReactNode;
  contentClassName?: string;
  contentProps?: Omit<ComponentProps<typeof DropdownMenuContent>, 'className'>;
};

export const Dropdown = ({
  trigger,
  children,
  contentClassName,
  contentProps,
}: DropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger render={trigger} />
    <DropdownMenuContent
      className={contentClassName}
      {...contentProps}
    >
      {children}
    </DropdownMenuContent>
  </DropdownMenu>
);
