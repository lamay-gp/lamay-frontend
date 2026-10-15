import { Dropdown } from '@/components/atoms/Dropdown';
import { Button } from '@/components/ui/Button/button';
import { DropdownMenuItem } from '@/components/ui/Dropdown-menu/dropdown-menu';
import { cn } from '@/lib/utils';

import type { ComponentProps } from 'react';

type LanguageSwitcherProps = {
  className?: string;
  contentClassName?: string;
  contentProps?: ComponentProps<typeof Dropdown>['contentProps'];
};

export const LanguageSwitcher = ({
  className,
  contentClassName,
  contentProps,
}: LanguageSwitcherProps) => (
  <Dropdown
    contentProps={contentProps}
    trigger={
      <Button
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-none border-2 border-t-0 border-b-0 border-elements bg-transparent p-0 text-[12px] font-medium text-text shadow-none hover:border-b-2 hover:border-text-secondary desktop:h-16 desktop:w-16 desktop:text-sm',
          className,
        )}
      >
        EN
      </Button>
    }
    contentClassName={cn(
      'w-12 min-w-12 rounded-none border-2 border-t-0 border-elements p-0 desktop:w-16 desktop:min-w-16',
      contentClassName,
    )}
  >
    <DropdownMenuItem
      className="flex h-12 cursor-pointer items-center justify-center rounded-none p-0 text-[12px] font-medium focus:bg-hover focus:text-text desktop:h-16 desktop:text-[14px]"
      onClick={() => {
        // TODO: implement language change
      }}
    >
      UA
    </DropdownMenuItem>
  </Dropdown>
);
