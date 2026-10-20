import { createBrowserRouter } from 'react-router';

import { App } from '@/App';
import { CartPage } from '@/pages/CartPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { FavouritesPage } from '@/pages/FavouritesPage';
import { GadgetDetailsPage } from '@/pages/GadgetDetailsPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: App,
      children: [
        {
          index: true,
          Component: HomePage,
        },
        {
          path: 'catalog',
          Component: CatalogPage,
        },
        {
          path: 'cart',
          Component: CartPage,
        },
        {
          path: 'checkout',
          Component: CheckoutPage,
        },
        {
          path: 'favourites',
          Component: FavouritesPage,
        },
        {
          path: 'product/:category/:itemId',
          Component: GadgetDetailsPage,
        },
        {
          path: '*',
          Component: NotFoundPage,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
);
