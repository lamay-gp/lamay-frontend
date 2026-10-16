import favouriteIsEmpty from '@/assets/images/favorites-is-empty.png';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Loader } from '@/components/atoms/Loader';
import { Typography } from '@/components/atoms/Typography';
import { ProductCard } from '@/components/organisms/ProductCard';
import { Button } from '@/components/ui/Button/button';
import { useFavouritesStore } from '@/stores/favouritesStore';
import { useProductsStore } from '@/stores/productsStore';

export const FavouritesPage = () => {
  const favouriteIds = useFavouritesStore((state) => state.favouriteIds);
  const products = useProductsStore((state) => state.products);

  const clearFavourites = useFavouritesStore((state) => state.clearFavourites);

  const favouriteProducts = products.filter((product) =>
    favouriteIds.includes(product.itemId),
  );

  const isLoading = useProductsStore((state) => state.isLoading);
  const errorMessage = useProductsStore((state) => state.errorMessage);

  const hasFavouritesItems = favouriteProducts.length > 0;

  return (
    <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
      <div className="container">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <Typography
              variant="h1"
              as="h1"
              className="mb-2 tablet-lg:mb-3 tablet-lg:mt-2 desktop:mt-8"
            >
              Favourites
            </Typography>

            <Typography variant="body">
              <span className="text-text-secondary">
                {favouriteProducts.length}{' '}
                {favouriteProducts.length === 1 ? 'item' : 'items'}
              </span>
            </Typography>
          </div>

          {hasFavouritesItems && (
            <Button
              variant="destructive"
              className="p-3 desktop:p-5"
              onClick={clearFavourites}
            >
              <Typography variant="button">Clear all</Typography>
            </Button>
          )}
        </div>

        {isLoading && <Loader />}

        {!isLoading && errorMessage && <ErrorMessage message={errorMessage} />}

        {!isLoading && !errorMessage && hasFavouritesItems && (
          <div className="mt-6 flex flex-wrap justify-center gap-4 tablet-lg:justify-start">
            {favouriteProducts.map((product) => (
              <div key={product.itemId}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && !errorMessage && !hasFavouritesItems && (
          <Typography
            variant="body"
            className="mt-8 text-center text-text-secondary"
          >
            <img
              src={favouriteIsEmpty}
              alt="Your favourites list is empty"
              className="mx-auto max-w-80 mt-15 tablet:max-w-120"
            />
            You haven&apos;t added any favourites yet.
          </Typography>
        )}
      </div>
    </section>
  );
};
