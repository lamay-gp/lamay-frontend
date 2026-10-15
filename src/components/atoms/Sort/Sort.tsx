import { ArrowUpDown } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import type { SortOption } from '@/types/Products';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Typography } from '../Typography';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'price-asc', label: 'Cheapest first' },
  { value: 'price-desc', label: 'Expensive first' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'age-desc', label: 'Newest first' },
  { value: 'age-asc', label: 'Oldest first' },
];

type SortProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
};

export const Sort: React.FC<SortProps> = ({ value, onChange, className }) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
        <Typography
          variant="small"
          as="span"
        >
          Sort by
        </Typography>
      </div>

      <Select
        items={SORT_OPTIONS}
        value={value}
        onValueChange={(val) => onChange(val as SortOption)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>

        <SelectContent
          alignItemWithTrigger={false}
          side="bottom"
          align="start"
          sideOffset={4}
          className="w-(--anchor-width)"
        >
          {SORT_OPTIONS.map(({ value: optionValue, label }) => (
            <SelectItem
              key={optionValue}
              value={optionValue}
              className="cursor-pointer"
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
