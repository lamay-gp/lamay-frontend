import { useTranslation } from 'react-i18next';

import categoryAccessories from '@/assets/images/category-accessories-desktop.png';
import categoryPhones from '@/assets/images/category-phones-desktop.png';
import categoryTablets from '@/assets/images/category-tablets-desktop.png';
import { Typography } from '@/components/atoms/Typography';
import { CategoryCard } from '@/components/molecules/CategoryCard';
import { useProductsStore } from '@/stores/productsStore';

export const ShopByCategory = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'components.organisms.shopByCategory',
  });

  const products = useProductsStore((state) => state.products);

  const phoneCount = products.filter(
    (product) => product.category === 'phones',
  ).length;

  const tabletCount = products.filter(
    (product) => product.category === 'tablets',
  ).length;

  const accessoryCount = products.filter(
    (product) => product.category === 'accessories',
  ).length;

  return (
    <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
      <div className="container">
        <Typography
          variant="h2"
          as="h2"
          className="mb-6"
        >
          {t('title')}
        </Typography>
        <ul className="flex flex-col gap-8  tablet:flex-row tablet:gap-4">
          <li className="min-w-0 tablet:flex-1">
            <CategoryCard
              title={t('mobileCardTitle')}
              category="phones"
              gadgetCount={phoneCount}
              imgUrl={categoryPhones}
            />
          </li>
          <li className="min-w-0 tablet:flex-1">
            <CategoryCard
              title={t('tabletCardTitle')}
              category="tablets"
              gadgetCount={tabletCount}
              imgUrl={categoryTablets}
            />
          </li>
          <li className="min-w-0 tablet:flex-1">
            <CategoryCard
              title={t('accessoriesCardTitle')}
              category="accessories"
              gadgetCount={accessoryCount}
              imgUrl={categoryAccessories}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};
