import { useTranslation } from 'react-i18next';

import { SLIDER_PRODUCTS_COUNT } from '@/constants/Products';
import { useProductsStore } from '@/stores/productsStore';

import { ProductsSlider } from '../ProductsSlider';

export const BrandNewModelSection = () => {
  const { t } = useTranslation('', { keyPrefix: 'components.organisms' });
  const products = useProductsStore((state) => state.products);

  const brandNewProducts = products
    .sort((a, b) => b.year - a.year)
    .slice(0, SLIDER_PRODUCTS_COUNT);

  return (
    <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
      <div className="container">
        <ProductsSlider
          title={t('brandNewProdTitle')}
          products={brandNewProducts}
          goTo="/catalog?sort=age-desc"
        />
      </div>
    </section>
  );
};
