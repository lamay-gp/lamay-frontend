import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/Radio-group/radio-group';

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
  return (
    <RadioGroup
      value={currentCapacity}
      onValueChange={onCapacityChange}
      className="flex w-fit flex-row gap-2 p-0"
    >
      {capacityRange.map((capacity) => (
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
            {capacity.replace('GB', ' GB')}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};
