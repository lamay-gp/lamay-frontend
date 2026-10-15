import { SLIDER_PRODUCTS_COUNT } from '@/constants/Products';
import { useProductsStore } from '@/stores/productsStore';

import { ProductsSlider } from '../ProductsSlider';

export const HotPricesSection = () => {
  const products = useProductsStore((state) => state.products);

  const brandNewProducts = products
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, SLIDER_PRODUCTS_COUNT);

  return (
    <section className="mb-20">
      <div className="container">
        <ProductsSlider
          title="Hot prices"
          products={brandNewProducts}
        />
      </div>
    </section>
  );
};
