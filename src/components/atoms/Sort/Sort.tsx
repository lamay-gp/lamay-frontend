import { ArrowUpDown } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

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

type SortProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
};

export const Sort: React.FC<SortProps> = ({ value, onChange, className }) => {
  const { t } = useTranslation('', { keyPrefix: 'components.atoms.sort' });

  const SORT_OPTIONS = [
    { value: 'price-asc', label: t('cheapestFirst') },
    { value: 'price-desc', label: t('expensiveFirst') },
    { value: 'title', label: t('alphabetically') },
    { value: 'age-desc', label: t('newestFirst') },
    { value: 'age-asc', label: t('oldestFirst') },
  ] as const;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-end gap-2">
        <Typography
          variant="small"
          as="span"
          className="text-text-secondary"
        >
          {t('labelSort')}
        </Typography>
        <ArrowUpDown className="size-4 text-text-secondary" />
      </div>

      <Select
        items={SORT_OPTIONS}
        value={value}
        onValueChange={(val) => onChange(val as SortOption)}
      >
        <SelectTrigger className="w-full h-10">
          <SelectValue
            placeholder={t('placeholderSort')}
            className="justify-end text-right"
          />
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
              className="cursor-pointer justify-end text-right"
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
