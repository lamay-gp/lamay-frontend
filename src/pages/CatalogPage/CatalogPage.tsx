import { useState } from 'react';

import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Loader } from '@/components/atoms/Loader';
import { Sort } from '@/components/atoms/Sort';
import { Typography } from '@/components/atoms/Typography';
import {
  FiltersSidebar,
  FiltersTrigger,
} from '@/components/organisms/FiltersPanel';
import { ProductCard } from '@/components/organisms/ProductCard';
import { useProductsStore } from '@/stores/productsStore';
import type { SortOption } from '@/types/Products';

export const CatalogPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  const products = useProductsStore((state) => state.products);
  const isLoading = useProductsStore((state) => state.isLoading);
  const errorMessage = useProductsStore((state) => state.errorMessage);

  const modelsCount = products.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="flex-1">
        <div className="container mx-auto">
          <header className="mb-8">
            <Typography
              variant="h1"
              as="h1"
              className="mb-2 text-text"
            >
              Catalog
            </Typography>
            <Typography
              variant="body"
              className="text-text-secondary"
            >
              {modelsCount} models
            </Typography>
          </header>

          <div className="flex flex-col tablet-lg:flex-row gap-8 items-start">
            <FiltersSidebar className="w-57.5 shrink-0" />

            <div className="flex-1 w-full flex flex-col gap-6">
              <div className="flex items-end justify-between gap-4 tablet-lg:justify-end">
                <FiltersTrigger />

                <Sort
                  value={sortBy}
                  onChange={setSortBy}
                />
              </div>

              {isLoading && <Loader />}

              {!isLoading && errorMessage && (
                <ErrorMessage message={errorMessage} />
              )}

              {!isLoading && !errorMessage && products.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] justify-items-center gap-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              )}

              {!isLoading && !errorMessage && products.length === 0 && (
                <Typography
                  variant="body"
                  className="text-center text-text-secondary"
                >
                  No products
                </Typography>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
