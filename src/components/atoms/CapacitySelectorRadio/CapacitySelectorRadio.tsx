import { useTranslation } from 'react-i18next';

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/Radio-group/radio-group';
import { formatCapacity } from '@/utils/formatCapacity';

import type React from 'react';

type Props = {
  currentCapacity: string;
  capacityRange: string[];
  onCapacityChange: (newCapacity: string) => void;
};

export const CapacitySelectorRadio = ({
  currentCapacity,
  capacityRange,
  onCapacityChange,
}: Props) => {
  const { i18n } = useTranslation('', {
    keyPrefix: 'components.atoms',
  });

  return (
    <RadioGroup
      value={currentCapacity}
      onValueChange={onCapacityChange}
      className="flex w-fit flex-row gap-2 p-0"
    >
      {capacityRange.map((capacity) => {
        const label = formatCapacity(capacity, i18n.language);

        return (
          <div
            key={capacity}
            className="flex"
          >
            <RadioGroupItem
              value={capacity}
              id={capacity}
              aria-label={capacity}
              style={
                {
                  '--swatch-color': capacity,
                } as React.CSSProperties
              }
              className=" peer hidden "
            />
            <label
              htmlFor={capacity}
              className="flex items-center justify-center cursor-pointer
                        rounded-md border border-icon-border
                        px-2 py-[7px]
                        text-sm font-semibold transition-colors
                        hover:border-text-secondary
                        peer-data-checked:border-text
                        peer-data-checked:bg-text
                      peer-data-checked:text-white
                        "
            >
              {label}
            </label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
