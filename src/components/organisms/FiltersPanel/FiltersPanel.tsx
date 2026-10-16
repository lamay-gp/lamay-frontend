import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet/sheet';
import {
  useCatalogFilters,
  useFilteredProducts,
} from '@/hooks/useCatalogFilters';
import { cn } from '@/lib/utils';

import { FiltersContent } from './FiltersContent';

type FiltersPanelProps = {
  className?: string;
};

/* скидання фільтрів + перемонтування PriceRange (він тримає власний стан) */
const useFiltersReset = () => {
  const [resetKey, setResetKey] = useState(0);
  const { hasActiveFilters, clearFilters } = useCatalogFilters();

  const handleClear = () => {
    clearFilters();
    setResetKey((key) => key + 1);
  };

  return { resetKey, hasActiveFilters, handleClear };
};

/* < tablet-lg: кнопка, що відкриває фільтри у висувній панелі */
export const FiltersTrigger = ({ className }: FiltersPanelProps) => {
  const { resetKey, hasActiveFilters, handleClear } = useFiltersReset();
  const itemsCount = useFilteredProducts().length;

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
            <FiltersContent resetKey={resetKey} />
          </div>

          <SheetFooter className="flex-row border-t border-elements">
            <SheetClose
              render={
                <Button
                  type="button"
                  variant="primaryAction"
                  size="lg"
                  className="flex-1"
                >
                  {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                </Button>
              }
            />

            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={!hasActiveFilters}
              onClick={handleClear}
            >
              Clear
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

/* >= tablet-lg: постійний сайдбар збоку */
export const FiltersSidebar = ({ className }: FiltersPanelProps) => {
  const { resetKey, hasActiveFilters, handleClear } = useFiltersReset();

  return (
    <aside className={cn('hidden tablet-lg:block', className)}>
      <div className="mb-4 flex items-center justify-between">
        <Typography
          variant="h3"
          as="h2"
        >
          Filters
        </Typography>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="link"
            size="sm"
            className="px-0"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </div>

      <FiltersContent resetKey={resetKey} />
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
