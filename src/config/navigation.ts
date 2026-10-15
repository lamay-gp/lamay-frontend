import { HeartIcon, ShoppingBagIcon } from 'lucide-react';

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/catalog', label: 'Catalog' },
] as const;

export const ACTION_LINKS = [
  { to: '/favourites', label: 'Favourites', icon: HeartIcon },
  { to: '/cart', label: 'Shopping cart', icon: ShoppingBagIcon },
] as const;
