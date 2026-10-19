import { useTranslation } from 'react-i18next';

import favouriteIsEmpty from '@/assets/images/favorites-is-empty.png';
import { BackButton } from '@/components/atoms/BackButton';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Loader } from '@/components/atoms/Loader';
import { Typography } from '@/components/atoms/Typography';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { ProductCard } from '@/components/organisms/ProductCard';
import { Button } from '@/components/ui/Button/button';
import { useFavouritesStore } from '@/stores/favouritesStore';
import { useProductsStore } from '@/stores/productsStore';

export const FavouritesPage = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'favouritesPage',
  });
  const favouriteIds = useFavouritesStore((state) => state.favouriteIds);
  const products = useProductsStore((state) => state.products);

  const clearFavourites = useFavouritesStore((state) => state.clearFavourites);

  const favouriteProducts = products.filter((product) =>
    favouriteIds.includes(product.itemId),
  );

  const isLoading = useProductsStore((state) => state.isLoading);
  const errorMessage = useProductsStore((state) => state.errorMessage);

  const hasFavouritesItems = favouriteProducts.length > 0;
  const favouritesCount = favouriteProducts.length;

  return (
    <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
      <div className="container">
        <Breadcrumbs
          items={[{ label: 'home', to: '/' }, { label: 'favourites' }]}
          className="mb-4 tablet:mb-6"
        />

        <div className="mb-6 tablet:mb-10">
          <BackButton />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <Typography
              variant="h1"
              as="h1"
              className="mb-2 tablet-lg:mb-3"
            >
              {t('title')}
            </Typography>

            <Typography variant="body">
              <span className="text-text-secondary">
                {t('item', { count: favouritesCount })}
              </span>
            </Typography>
          </div>

          {hasFavouritesItems && (
            <Button
              variant="destructive"
              className="p-3 desktop:p-5"
              onClick={clearFavourites}
            >
              <Typography variant="button">{t('clearBtn')}</Typography>
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
            variant="h4"
            as="h4"
            className="text-center text-text-secondary"
          >
            <img
              src={favouriteIsEmpty}
              alt={t('favouritesEmptyAlt')}
              className="mx-auto max-w-80 tablet:max-w-90"
            />
            {t('favouritesEmpty')}
          </Typography>
        )}
      </div>
    </section>
  );
};
