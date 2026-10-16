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

/* < tablet-lg: кнопка, що відкриває фільтри у висувній панелі */
export const FiltersTrigger = ({ className }: FiltersPanelProps) => {
  return (
    <div className={cn('tablet-lg:hidden', className)}>
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
              >
                <Filter />
              </Button>
            }
          />
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
  );
};

/* >= tablet-lg: постійний сайдбар збоку */
export const FiltersSidebar = ({ className }: FiltersPanelProps) => {
  return (
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
  );
};

export const FiltersPanel = ({ className }: FiltersPanelProps) => {
  return (
    <>
      <FiltersTrigger />
      <FiltersSidebar className={className} />
    </>
  );
};
