import { Checklist } from '@/components/atoms/Checklist';
import { PriceRange } from '@/components/atoms/PriceRange';
import { Typography } from '@/components/atoms/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion/accordion';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';

const FACETS = [
  { key: 'color', label: 'Color' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'ram', label: 'RAM' },
  { key: 'year', label: 'Year' },
  { key: 'screen', label: 'Screen' },
] as const;

type FiltersContentProps = {
  // змінюється при «Clear», щоб перемонтувати PriceRange зі скинутими значеннями
  resetKey?: number;
};

export const FiltersContent = ({ resetKey = 0 }: FiltersContentProps) => {
  const { options, selected, priceBounds, priceValue, setSelected, setPrice } =
    useCatalogFilters();

  return (
    <div className="flex flex-col gap-2">
      <Accordion
        multiple
        defaultValue={['category', 'price']}
      >
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
              items={options.category}
              selectedIds={selected.category}
              onChange={(ids) => setSelected('category', ids)}
            />
          </AccordionContent>
        </AccordionItem>

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
            <PriceRange
              key={`${priceBounds.min}-${priceBounds.max}-${resetKey}`}
              min={priceBounds.min}
              max={priceBounds.max}
              defaultMinPrice={priceValue[0]}
              defaultMaxPrice={priceValue[1]}
              onChange={setPrice}
            />
          </AccordionContent>
        </AccordionItem>

        {FACETS.map((facet) => (
          <AccordionItem
            key={facet.key}
            value={facet.key}
          >
            <AccordionTrigger>
              <Typography
                variant="button"
                as="span"
              >
                {facet.label}
              </Typography>
            </AccordionTrigger>
            <AccordionContent>
              <Checklist
                items={options[facet.key]}
                selectedIds={selected[facet.key]}
                onChange={(ids) => setSelected(facet.key, ids)}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
