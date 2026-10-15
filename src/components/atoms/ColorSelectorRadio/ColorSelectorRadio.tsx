import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/Radio-group/radio-group';

import type React from 'react';

type Props = {
  colorRange: string[];
  onClick: (newColor: string) => void;
  currentColor: string;
};

export const ColorSelectorRadio = ({
  colorRange,
  onClick,
  currentColor,
}: Props) => {
  return (
    <RadioGroup
      value={currentColor}
      onValueChange={onClick}
      className="flex w-fit flex-row gap-2"
    >
      {colorRange.map((color) => (
        <div
          key={color}
          className="flex items-center justify-center"
        >
          <RadioGroupItem
            value={color}
            id={color}
            aria-label={color}
            style={
              {
                '--swatch-color': color,
              } as React.CSSProperties
            }
            className="size-8 rounded-full border border-elements 
             !bg-transparent p-0 shadow-none
    after:absolute after:inset-px after:rounded-full  after:bg-[var(--swatch-color)]
    after:content-[''] transition-colors hover:border-icon-border data-[state=checked]:border-text  data-[state=checked]:border focus-visible:ring-1 focus-visible:ring-text"
          />
        </div>
      ))}
    </RadioGroup>
  );
};
