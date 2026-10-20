import { useTranslation } from 'react-i18next';

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
import { formatCapacity } from '@/utils/formatCapacity';

const FACETS = [
  { key: 'color', label: 'color' },
  { key: 'capacity', label: 'capacity' },
  { key: 'ram', label: 'ram' },
  { key: 'year', label: 'year' },
  { key: 'screen', label: 'screen' },
] as const;

type FiltersContentProps = {
  // змінюється при «Clear», щоб перемонтувати PriceRange зі скинутими значеннями
  resetKey?: number;
};

export const FiltersContent = ({ resetKey = 0 }: FiltersContentProps) => {
  const { t, i18n } = useTranslation('', {
    keyPrefix: 'components.organisms.filterContent',
  });

  const { options, selected, priceBounds, priceValue, setSelected, setPrice } =
    useCatalogFilters();

  const formattedCategories = (options.category || []).map((item) => ({
    ...item,
    label: t(item.label ?? item.id),
  }));

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
              {t('category')}
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            <Checklist
              items={formattedCategories}
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
              {t('price')}
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

        {FACETS.map((facet) => {
          const rawItems = options[facet.key] || [];
          const formattedItems =
            facet.key === 'capacity' || facet.key === 'ram' ?
              rawItems.map((item) => ({
                ...item,
                label: formatCapacity(item.label ?? item.id, i18n.language),
              }))
            : rawItems;

          return (
            <AccordionItem
              key={facet.key}
              value={facet.key}
            >
              <AccordionTrigger>
                <Typography
                  variant="button"
                  as="span"
                >
                  {t(facet.label)}
                </Typography>
              </AccordionTrigger>
              <AccordionContent>
                <Checklist
                  items={formattedItems}
                  selectedIds={selected[facet.key]}
                  onChange={(ids) => setSelected(facet.key, ids)}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
