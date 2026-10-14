import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown-menu/dropdown-menu';

import type { ReactElement, ReactNode } from 'react';

type DropdownProps = {
  trigger: ReactElement;
  children: ReactNode;
  contentClassName?: string;
};

export const Dropdown = ({
  trigger,
  children,
  contentClassName,
}: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger} />

      <DropdownMenuContent
        align="start"
        side="bottom"
        sideOffset={0}
        className={contentClassName}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
