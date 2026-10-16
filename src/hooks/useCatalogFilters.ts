import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { useProductsStore } from '@/stores/productsStore';
import type { ChecklistItem } from '@/types/Products';

const FACET_KEYS = [
  'color',
  'capacity',
  'ram',
  'category',
  'screen',
  'year',
] as const;

type FacetKey = (typeof FACET_KEYS)[number];

// природне сортування: 4GB < 8GB, a < b
const naturalCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

// capacity: GB → TB → mm (окремими групами), усередині — за числом
const capacityCompare = (a: string, b: string) => {
  const parse = (value: string) => {
    const match = value.match(/^([\d.]+)\s*(\D+)$/);
    const num = match ? parseFloat(match[1]) : 0;
    const unit = match ? match[2].toLowerCase() : '';
    const rank =
      unit === 'gb' ? 0
      : unit === 'tb' ? 1
      : 2;
    return { rank, num };
  };

  const left = parse(a);
  const right = parse(b);

  return left.rank - right.rank || left.num - right.num;
};

// year: новіші зверху
const yearCompare = (a: string, b: string) => Number(b) - Number(a);

const SORTERS: Partial<Record<FacetKey, (a: string, b: string) => number>> = {
  capacity: capacityCompare,
  year: yearCompare,
};

const toOptions = (
  values: (string | number)[],
  compare: (a: string, b: string) => number,
): ChecklistItem[] => {
  const unique = Array.from(new Set(values.map(String)));
  unique.sort(compare);
  return unique.map((value) => ({ id: value, label: value }));
};

export const useCatalogFilters = () => {
  const products = useProductsStore((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const options = useMemo(() => {
    return FACET_KEYS.reduce(
      (acc, key) => {
        acc[key] = toOptions(
          products.map((product) => product[key]),
          SORTERS[key] ?? naturalCompare,
        );
        return acc;
      },
      {} as Record<FacetKey, ChecklistItem[]>,
    );
  }, [products]);

  const priceBounds = useMemo(() => {
    const prices = products.map((product) => product.price);
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    };
  }, [products]);

  const selected = FACET_KEYS.reduce(
    (acc, key) => {
      const raw = searchParams.get(key);
      acc[key] = raw ? raw.split(',') : [];
      return acc;
    },
    {} as Record<FacetKey, string[]>,
  );

  const query = searchParams.get('query') ?? '';

  const priceValue: [number, number] = [
    Number(searchParams.get('minPrice')) || priceBounds.min,
    Number(searchParams.get('maxPrice')) || priceBounds.max,
  ];

  const setSelected = (key: FacetKey, ids: string[]) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (ids.length) next.set(key, ids.join(','));
      else next.delete(key);
      return next;
    });
  };

  const setQuery = (value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set('query', value);
      else next.delete('query');
      return next;
    });
  };

  const setPrice = ([min, max]: [number, number]) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('minPrice', String(min));
      next.set('maxPrice', String(max));
      return next;
    });
  };

  return {
    options,
    selected,
    setSelected,
    priceBounds,
    priceValue,
    setPrice,
    query,
    setQuery,
  };
};
