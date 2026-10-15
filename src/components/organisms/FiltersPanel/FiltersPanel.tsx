import { Filter } from 'lucide-react';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet/sheet';
import { cn } from '@/lib/utils';

import { FiltersContent } from './FiltersContent';

type FiltersPanelProps = {
  className?: string;
};

export const FiltersPanel = ({ className }: FiltersPanelProps) => {
  return (
    <>
      {/* < tablet-lg: висувна панель по кнопці */}
      <div className="tablet-lg:hidden">
        <Sheet>
          <div className="flex flex-col gap-1">
            <Typography
              variant="small"
              as="span"
              className="text-(--color-text-secondary)"
            >
              Filters
            </Typography>

            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Open filters"
                  className="rounded-full"
                />
              }
            >
              <Filter />
            </SheetTrigger>
          </div>

          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Typography
                  variant="h3"
                  as="span"
                >
                  Filters
                </Typography>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* >= tablet-lg: постійний сайдбар збоку */}
      <aside className={cn('hidden tablet-lg:block', className)}>
        <Typography
          variant="h3"
          as="h2"
          className="mb-4"
        >
          Filters
        </Typography>

        <FiltersContent />
      </aside>
    </>
  );
};
