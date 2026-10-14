import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Dropdown } from '@/components/atoms/Dropdown';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';
import { DropdownMenuItem } from '@/components/ui/Dropdown-menu/dropdown-menu';

const SORT_OPTIONS = ['Newest', 'Alphabetically', 'Cheapest'] as const;

type SortByProps = {
  className?: string;
};

export const SortBy = ({ className }: SortByProps) => {
  const [selected, setSelected] = useState<string>(SORT_OPTIONS[0]);

  return (
    <div className={className}>
      <Typography
        variant="small"
        as="span"
        className="mb-1 block text-(--color-text-secondary)"
      >
        Sort by
      </Typography>

      <Dropdown
        contentClassName="w-40"
        trigger={
          <Button
            type="button"
            variant="outline"
            className="w-40 justify-between"
          >
            <Typography
              variant="body"
              as="span"
            >
              {selected}
            </Typography>
            <ChevronDown />
          </Button>
        }
      >
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setSelected(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </Dropdown>
    </div>
  );
};
