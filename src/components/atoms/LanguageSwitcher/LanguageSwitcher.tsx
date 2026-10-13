import { Button } from '@/components/ui/Button/button';
import { DropdownMenuItem } from '@/components/ui/Dropdown-menu/dropdown-menu';

import { Dropdown } from '../Dropdown/Dropdown';

export const LanguageSwitcher = () => {
  return (
    <Dropdown
      trigger={
        <Button
          className="
            flex h-12 w-12 items-center justify-center
            rounded-none border-2 border-t-0 border-elements
            bg-transparent p-0 text-[12px]! font-medium text-black shadow-none
            hover:bg-transparent
            desktop:h-16 desktop:w-16 desktop:text-sm!
          "
        >
          EN
        </Button>
      }
      contentClassName="
        w-12 min-w-12 rounded-none border-2 border-t-0 border-elements p-0
        desktop:w-16 desktop:min-w-16
      "
    >
      <DropdownMenuItem
        className="
          flex h-12 cursor-pointer items-center justify-center
          rounded-none p-0 text-[12px] font-medium
          focus:bg-gray-100 focus:text-black
          desktop:h-16 desktop:text-[14px]
        "
        onClick={() => {
          // TODO: implement language change
        }}
      >
        UA
      </DropdownMenuItem>
    </Dropdown>
  );
};
