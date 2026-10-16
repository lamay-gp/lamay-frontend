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
    modal={false}
    contentProps={contentProps}
    trigger={
      <Button
        className={cn(
          'flex h-12 w-12 cursor-pointer items-center justify-center rounded-none border border-t-0 border-b-0 border-elements bg-transparent p-0 text-[12px] font-medium text-text shadow-none transition-colors',
          'hover:border-text-secondary hover:bg-transparent',
          'data-popup-open:border-text-secondary data-popup-open:shadow-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-inset',
          'desktop:h-16 desktop:w-16 desktop:text-sm',
          className,
        )}
      >
        EN
      </Button>
    }
    contentClassName={cn(
      'w-12 min-w-12 rounded-none border border-t-0 border-elements p-0 shadow-none ring-0 desktop:w-16 desktop:min-w-16',
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
