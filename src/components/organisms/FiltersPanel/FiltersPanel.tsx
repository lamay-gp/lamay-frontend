import { Filter } from 'lucide-react';

import { PriceRange } from '@/components/atoms/PriceRange';
import { SearchBar } from '@/components/atoms/SearchBar';
import { Typography } from '@/components/atoms/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion/accordion';
import { Button } from '@/components/ui/Button/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet/sheet';
import { cn } from '@/lib/utils';

const FiltersContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar />

      <Accordion>
        <AccordionItem value="price">
          <AccordionTrigger>
            <Typography
              variant="button"
              as="span"
            >
              Price
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            <PriceRange />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>
            <Typography
              variant="button"
              as="span"
            >
              Color
            </Typography>
          </AccordionTrigger>
          <AccordionContent>{/* TODO: color options */}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="capacity">
          <AccordionTrigger>
            <Typography
              variant="button"
              as="span"
            >
              Capacity
            </Typography>
          </AccordionTrigger>
          <AccordionContent>{/* TODO: capacity options */}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="ram">
          <AccordionTrigger>
            <Typography
              variant="button"
              as="span"
            >
              RAM
            </Typography>
          </AccordionTrigger>
          <AccordionContent>{/* TODO: RAM options */}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>
            <Typography
              variant="button"
              as="span"
            >
              Category
            </Typography>
          </AccordionTrigger>
          <AccordionContent>{/* TODO: category options */}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="year">
          <AccordionTrigger>
            <Typography
              variant="button"
              as="span"
            >
              Year
            </Typography>
          </AccordionTrigger>
          <AccordionContent>{/* TODO: year options */}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="screen">
          <AccordionTrigger>
            <Typography
              variant="button"
              as="span"
            >
              Screen
            </Typography>
          </AccordionTrigger>
          <AccordionContent>{/* TODO: screen options */}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

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
