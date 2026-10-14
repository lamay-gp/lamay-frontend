import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { getGadgets } from '@/api/products';
import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Typography } from '@/components/atoms/Typography';
import type { Gadget } from '@/types/Products';

export const ShopByCategory = () => {
  const [phones, setPhones] = useState<Gadget[]>([]);
  const [tablets, setTablets] = useState<Gadget[]>([]);
  const [accessories, setAccessories] = useState<Gadget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const loadGadgets = async () => {
      try {
        const [phonesData, tabletsData, accessoriesData] = await Promise.all([
          getGadgets('phones'),
          getGadgets('tablets'),
          getGadgets('accessories'),
        ]);

        setPhones(phonesData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
      } catch (error) {
        console.error('Failed to load gadgets:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadGadgets();
  }, []);
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
                {isLoading ?
                  <Loader />
                : `${phones.length} models`}
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
                {isLoading ?
                  <Loader />
                : `${tablets.length} models`}
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
                {isLoading ?
                  <Loader />
                : `${accessories.length} models`}
              </Typography>
            </article>
          </li>
        </ul>
      </div>
      {isError && <ErrorMessage message={'Failed to load gadgets'} />}
      {/*<ProductsSlider
        title={'slider'}
        products={accessories}
      />*/}
    </section>
  );
};
