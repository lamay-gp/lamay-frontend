import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/Radio-group/radio-group';
import { getColorHex, normalizeColor } from '@/utils/getColorHex';

import type React from 'react';

type Props = {
  colorRange: string[];
  onColorChange: (newColor: string) => void;
  currentColor: string;
};

export const ColorSelectorRadio = ({
  colorRange,
  onColorChange,
  currentColor,
}: Props) => {
  const activeColor =
    colorRange.find(
      (color) => normalizeColor(color) === normalizeColor(currentColor),
    ) ?? '';
  return (
    <RadioGroup
      value={activeColor}
      onValueChange={onColorChange}
      className="mb-6 flex w-fit flex-row gap-2"
    >
      {colorRange.map((color) => (
        <div
          key={color}
          className="flex cursor-pointer items-center justify-center"
        >
          <RadioGroupItem
            value={color}
            id={color}
            aria-label={color}
            style={
              {
                '--swatch-color': getColorHex(color),
              } as React.CSSProperties
            }
            className="relative shrink-0 size-8 rounded-full border border-elements bg-transparent! p-0 shadow-none
            after:absolute after:inset-px after:rounded-full  after:bg-(--swatch-color)
            after:content-[''] after:size-6 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 transition-colors hover:border-icon-border data-[state=checked]:border-text data-[state=checked]:border focus-visible:ring-1 focus-visible:ring-text"
          />
        </div>
      ))}
    </RadioGroup>
  );
};
