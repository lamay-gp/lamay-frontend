import { Checklist } from '@/components/atoms/Checklist';
import { PriceRange } from '@/components/atoms/PriceRange';
import { SearchBar } from '@/components/atoms/SearchBar';
import { Typography } from '@/components/atoms/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion/accordion';

const noop = () => undefined;

export const FiltersContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar />

      <Accordion multiple>
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
          <AccordionContent>
            <Checklist
              items={[]}
              selectedIds={[]}
              onChange={noop}
            />
          </AccordionContent>
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
          <AccordionContent>
            <Checklist
              items={[]}
              selectedIds={[]}
              onChange={noop}
            />
          </AccordionContent>
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
          <AccordionContent>
            <Checklist
              items={[]}
              selectedIds={[]}
              onChange={noop}
            />
          </AccordionContent>
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
          <AccordionContent>
            <Checklist
              items={[]}
              selectedIds={[]}
              onChange={noop}
            />
          </AccordionContent>
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
          <AccordionContent>
            <Checklist
              items={[]}
              selectedIds={[]}
              onChange={noop}
            />
          </AccordionContent>
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
          <AccordionContent>
            <Checklist
              items={[]}
              selectedIds={[]}
              onChange={noop}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
