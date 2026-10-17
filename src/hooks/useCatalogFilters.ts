import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { useProductsStore } from '@/stores/productsStore';
import type { ChecklistItem, Product, SortOption } from '@/types/Products';

const FACET_KEYS = [
  'color',
  'capacity',
  'ram',
  'category',
  'screen',
  'year',
] as const;

type FacetKey = (typeof FACET_KEYS)[number];

// усі параметри URL, що належать фільтрам (для скидання)
const FILTER_PARAMS = [...FACET_KEYS, 'minPrice', 'maxPrice'];

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

const SORT_VALUES: SortOption[] = [
  'price-asc',
  'price-desc',
  'title',
  'age-desc',
  'age-asc',
];

const DEFAULT_SORT: SortOption = 'price-asc';

const isSortOption = (value: string | null): value is SortOption =>
  SORT_VALUES.includes(value as SortOption);

const bySortOption =
  (sortBy: SortOption) =>
  (a: Product, b: Product): number => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'title':
        return a.name.localeCompare(b.name);
      case 'age-desc':
        return b.year - a.year;
      case 'age-asc':
        return a.year - b.year;
      default:
        return 0;
    }
  };

const toOptions = (
  values: (string | number)[],
  compare: (a: string, b: string) => number,
): ChecklistItem[] => {
  const unique = Array.from(new Set(values.map(String)));
  unique.sort(compare);
  return unique.map((value) => ({ id: value, label: value }));
};

// вибрані значення фасету з URL
const getSelected = (searchParams: URLSearchParams, key: FacetKey) => {
  const raw = searchParams.get(key);
  return raw ? raw.split(',') : [];
};

const matchesFacets = (
  product: Product,
  searchParams: URLSearchParams,
  exclude?: FacetKey,
) =>
  FACET_KEYS.every((key) => {
    if (key === exclude) return true;
    const selected = getSelected(searchParams, key);
    return selected.length === 0 || selected.includes(String(product[key]));
  });

const matchesPrice = (product: Product, searchParams: URLSearchParams) => {
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || Infinity;
  return product.price >= minPrice && product.price <= maxPrice;
};

export const useCatalogFilters = () => {
  const products = useProductsStore((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const options = useMemo(() => {
    return FACET_KEYS.reduce(
      (acc, key) => {
        const pool = products.filter((product) =>
          matchesFacets(product, searchParams, key),
        );

        const values = [
          ...pool.map((product) => product[key]),
          ...getSelected(searchParams, key),
        ];
        acc[key] = toOptions(values, SORTERS[key] ?? naturalCompare);
        return acc;
      },
      {} as Record<FacetKey, ChecklistItem[]>,
    );
  }, [products, searchParams]);

  const priceBounds = useMemo(() => {
    const prices = products.map((product) => product.price);
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    };
  }, [products]);

  const selected = FACET_KEYS.reduce(
    (acc, key) => {
      acc[key] = getSelected(searchParams, key);
      return acc;
    },
    {} as Record<FacetKey, string[]>,
  );

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

  const setPrice = ([min, max]: [number, number]) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('minPrice', String(min));
      next.set('maxPrice', String(max));
      return next;
    });
  };

  const hasActiveFilters = FILTER_PARAMS.some((key) => searchParams.has(key));

  const clearFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      FILTER_PARAMS.forEach((key) => next.delete(key));
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
    hasActiveFilters,
    clearFilters,
  };
};

export const useFilteredProducts = (sortBy?: SortOption) => {
  const products = useProductsStore((state) => state.products);
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const filtered = products.filter(
      (product) =>
        matchesFacets(product, searchParams) &&
        matchesPrice(product, searchParams),
    );

    return sortBy ? [...filtered].sort(bySortOption(sortBy)) : filtered;
  }, [products, searchParams, sortBy]);
};

export const useCatalogSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get('sort');
  const sortBy: SortOption = isSortOption(param) ? param : DEFAULT_SORT;

  const setSortBy = (value: SortOption) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value === DEFAULT_SORT) next.delete('sort');
      else next.set('sort', value);
      return next;
    });
  };

  return { sortBy, setSortBy };
};
