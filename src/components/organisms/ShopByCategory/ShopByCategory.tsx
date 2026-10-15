import { NavLink } from 'react-router';

import { Typography } from '@/components/atoms/Typography';
import { useProductsStore } from '@/stores/productsStore';

export const ShopByCategory = () => {
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
    <section>
      <div className=" py-7 tablet:py-8 desktop:py-10 container">
        {/*<div
        className="py-7 tablet:py-8 desktop:py-10 px-4 tablet:px-6
    desktop:px-8 mx-auto max-w-284"
      >*/}
        <Typography
          variant="h2"
          as="h2"
          className="mb-6"
        >
          Shop by category
        </Typography>
        <ul className="flex flex-col gap-8  tablet:flex-row tablet:gap-4">
          <li className="min-w-0 tablet:flex-1">
            <article>
              <img
                className="aspect-square mb-6 w-full object-cover"
                src="/src/assets/images/category-phones-desktop.png"
                alt="Phones"
              />
              <NavLink
                to="/catalog"
                className="hover:text-text-secondary"
              >
                <Typography
                  variant="h3"
                  as="h3"
                  className="mb-1"
                >
                  Mobile phone
                </Typography>
              </NavLink>

              <Typography
                variant="button"
                as="p"
                className="text-text-secondary"
              >
                {`${phoneCount} models`}
              </Typography>
            </article>
          </li>
          <li className="min-w-0 tablet:flex-1">
            <article>
              <img
                className="aspect-square mb-6 w-full object-cover"
                src="/src/assets/images/category-tablets-desktop.png"
                alt="Tablets"
              />
              <NavLink
                to="/catalog"
                className="hover:text-text-secondary"
              >
                <Typography
                  variant="h3"
                  as="h3"
                  className="mb-1"
                >
                  Tablets
                </Typography>
              </NavLink>
              <Typography
                variant="button"
                as="p"
                className="text-text-secondary"
              >
                {`${tabletCount} models`}
              </Typography>
            </article>
          </li>
          <li className="min-w-0 tablet:flex-1">
            <article>
              <img
                className="aspect-square mb-6 w-full object-cover"
                src="/src/assets/images/category-accessories-desktop.png"
                alt="Accessories"
              />
              <NavLink
                to="/catalog"
                className="hover:text-text-secondary"
              >
                <Typography
                  variant="h3"
                  as="h3"
                  className="mb-1"
                >
                  Accessories
                </Typography>
              </NavLink>
              <Typography
                variant="button"
                as="p"
                className="text-text-secondary"
              >
                {`${accessoryCount} models`}
              </Typography>
            </article>
          </li>
        </ul>
      </div>
      {/*<ProductsSlider
        title={'slider'}
        products={accessoryCount}
      />*/}
    </section>
  );
};
