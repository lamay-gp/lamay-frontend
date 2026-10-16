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
  modal?: boolean;
};

export const Dropdown = ({
  trigger,
  children,
  contentClassName,
  contentProps,
  modal = true,
}: DropdownProps) => (
  <DropdownMenu modal={modal}>
    <DropdownMenuTrigger render={trigger} />
    <DropdownMenuContent
      className={contentClassName}
      {...contentProps}
    >
      {children}
    </DropdownMenuContent>
  </DropdownMenu>
);
