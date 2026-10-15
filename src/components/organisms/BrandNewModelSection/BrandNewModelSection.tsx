import { useProductsStore } from '@/stores/productsStore';

import { ProductsSlider } from '../ProductsSlider';

const SLIDER_PRODUCTS_COUNT = 10;

export const BrandNewModelSection = () => {
  const products = useProductsStore((state) => state.products);

  const brandNewProducts = products
    .sort((a, b) => b.year - a.year)
    .slice(0, SLIDER_PRODUCTS_COUNT);

  return (
    <section className="mb-20">
      <div className="container">
        <ProductsSlider
          title="Brand new models"
          products={brandNewProducts}
        />
      </div>
    </section>
  );
};
