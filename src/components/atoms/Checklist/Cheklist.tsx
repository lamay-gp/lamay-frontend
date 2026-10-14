import { cn } from '@/lib/utils';
import type { ChecklistItem } from '@/types/Products';

import { Typography } from '../Typography';

type Props<T extends string = string> = {
  title?: string;
  items: ChecklistItem<T>[];
  selectedIds: T[];
  onChange: (selectedIds: T[]) => void;
  className?: string;
};

export const Checklist = <T extends string = string>({
  title,
  items,
  selectedIds,
  onChange,
  className,
}: Props<T>) => {
  const handleCheckboxChange = (id: T) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-3 w-full p-4 bg-card rounded-lg border border-border',
        className,
      )}
    >
      {title && (
        <Typography
          variant="h4"
          as="h4"
          className="font-semibold text-base"
        >
          {title}
        </Typography>
      )}

      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const isChecked = selectedIds.includes(item.id);

          return (
            <label
              key={item.id}
              className="flex items-center justify-between cursor-pointer group text-sm text-foreground select-none"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="size-4 rounded border-input text-primary focus:ring-ring cursor-pointer accent-primary"
                />
                <span className="group-hover:text-primary transition-colors capitalize">
                  {item.label}
                </span>
              </div>

              {item.count !== undefined && (
                <span className="text-muted-foreground text-xs">
                  {item.count}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};
