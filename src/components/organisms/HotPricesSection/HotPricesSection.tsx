import { SLIDER_PRODUCTS_COUNT } from '@/constants/Products';
import { useProductsStore } from '@/stores/productsStore';

import { ProductsSlider } from '../ProductsSlider';

export const HotPricesSection = () => {
  const products = useProductsStore((state) => state.products);

  const hotPricesProducts = products
    .toSorted((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, SLIDER_PRODUCTS_COUNT);

  return (
    <section className="mb-20">
      <div className="container">
        <ProductsSlider
          title="Hot prices"
          products={hotPricesProducts}
        />
      </div>
    </section>
  );
};
