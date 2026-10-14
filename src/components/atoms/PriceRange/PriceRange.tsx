import { Slider } from '@base-ui/react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Typography } from '../Typography';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  defaultMinPrice?: number;
  defaultMaxPrice?: number;
  onChange?: (range: [number, number]) => void;
  className?: string;
};

export const PriceRange = ({
  min = 0,
  max = 50000,
  step = 100,
  defaultMinPrice = 0,
  defaultMaxPrice = 50000,
  onChange,
  className,
}: Props) => {
  const [value, setValue] = useState<number[]>([
    defaultMinPrice,
    defaultMaxPrice,
  ]);

  const [minInput, setMinInput] = useState(String(defaultMinPrice));
  const [maxInput, setMaxInput] = useState(String(defaultMaxPrice));

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue);
    setMinInput(String(newValue[0]));
    setMaxInput(String(newValue[1]));
    onChange?.([newValue[0], newValue[1]]);
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setMinInput(text);

    if (text === '') return;

    const num = Number(text);
    if (!isNaN(num)) {
      const clamped = Math.max(min, Math.min(num, value[1]));
      const updated: number[] = [clamped, value[1]];
      setValue(updated);
      onChange?.([updated[0], updated[1]]);
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setMaxInput(text);

    if (text === '') return;

    const num = Number(text);
    if (!isNaN(num)) {
      const clamped = Math.min(max, Math.max(num, value[0]));
      const updated: number[] = [value[0], clamped];
      setValue(updated);
      onChange?.([updated[0], updated[1]]);
    }
  };

  const handleMinFocus = () => {
    if (minInput === '0') {
      setMinInput('');
    }
  };

  const handleMinBlur = () => {
    setMinInput(String(value[0]));
  };

  const handleMaxBlur = () => {
    setMaxInput(String(value[1]));
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4 w-full p-4 bg-card rounded-lg border border-border',
        className,
      )}
    >
      <Typography
        variant="h4"
        as="h4"
        className="font-semibold"
      >
        Price ($)
      </Typography>

      <div className="flex items-center gap-2">
        <div className="flex items-center border border-input rounded-md px-3 py-1.5 w-full bg-background">
          <span className="text-muted-foreground text-sm mr-1">from</span>
          <input
            type="number"
            value={minInput}
            min={min}
            max={max}
            step={step}
            onChange={handleMinChange}
            onFocus={handleMinFocus}
            onBlur={handleMinBlur}
            className="w-full bg-transparent outline-none text-sm font-medium"
          />
        </div>

        <span className="text-muted-foreground">—</span>

        <div className="flex items-center border border-input rounded-md px-3 py-1.5 w-full bg-background">
          <span className="text-muted-foreground text-sm mr-1">to</span>
          <input
            type="number"
            value={maxInput}
            min={min}
            max={max}
            step={step}
            onChange={handleMaxChange}
            onBlur={handleMaxBlur}
            className="w-full bg-transparent outline-none text-sm font-medium"
          />
        </div>
      </div>
      <Slider.Root
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={handleSliderChange}
        className="relative flex w-full touch-none select-none items-center py-4 cursor-pointer"
      >
        <Slider.Control className="w-full relative flex items-center">
          <Slider.Track className="bg-secondary relative grow rounded-full h-1.5 w-full">
            <Slider.Indicator className="absolute bg-primary rounded-full h-full" />
          </Slider.Track>

          <Slider.Thumb className="block size-4 bg-background border-2 border-primary rounded-full shadow transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring" />
          <Slider.Thumb className="block size-4 bg-background border-2 border-primary rounded-full shadow transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring" />
        </Slider.Control>
      </Slider.Root>
    </div>
  );
};
