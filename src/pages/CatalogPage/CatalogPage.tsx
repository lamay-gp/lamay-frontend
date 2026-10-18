import { useSearchParams } from 'react-router';

import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Loader } from '@/components/atoms/Loader';
import { Sort } from '@/components/atoms/Sort';
import { Typography } from '@/components/atoms/Typography';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import {
  FiltersSidebar,
  FiltersTrigger,
} from '@/components/organisms/FiltersPanel';
import { ProductCard } from '@/components/organisms/ProductCard';
import { Button } from '@/components/ui/Button/button';
import { useCatalogSort, useFilteredProducts } from '@/hooks/useCatalogFilters';
import { useGridColumns } from '@/hooks/useGridColumns';
import { useLoadMore } from '@/hooks/useLoadMore';
import { useProductsStore } from '@/stores/productsStore';

export const CatalogPage = () => {
  const { sortBy, setSortBy } = useCatalogSort();
  const filteredProducts = useFilteredProducts(sortBy);

  // будь-яка зміна фільтрів чи сортування змінює цей рядок і скидає показ
  const [searchParams] = useSearchParams();
  const { gridRef, columns } = useGridColumns();
  const {
    visibleItems: shownProducts,
    hasMore,
    loadMore,
  } = useLoadMore(filteredProducts, columns, searchParams.toString());

  const isLoading = useProductsStore((state) => state.isLoading);
  const errorMessage = useProductsStore((state) => state.errorMessage);

  const modelsCount = filteredProducts.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="flex-1 overflow-x-clip overflow-y-visible mb-14 tablet:mb-16 tablet-lg:mb-20">
        <div className="container mx-auto">
          <Breadcrumbs
            items={[{ label: 'Home', to: '/' }, { label: 'Catalog' }]}
            className="mt-6 mb-6"
          />
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
            <FiltersSidebar className="w-57.5 shrink-0 self-start sticky top-16 max-h-[calc(100vh-5rem)] overflow-y-auto desktop:top-20 desktop:max-h-[calc(100vh-6rem)]" />

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

              {!isLoading && !errorMessage && filteredProducts.length > 0 && (
                <>
                  <div
                    ref={gridRef}
                    className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] justify-items-center gap-4"
                  >
                    {shownProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <Button
                      type="button"
                      variant="primaryAction"
                      size="lg"
                      className="self-center w-auto px-10"
                      onClick={loadMore}
                    >
                      Load more
                    </Button>
                  )}
                </>
              )}

              {!isLoading && !errorMessage && filteredProducts.length === 0 && (
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
