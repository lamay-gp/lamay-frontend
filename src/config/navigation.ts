import { HeartIcon, ShoppingBagIcon } from 'lucide-react';

export const NAV_LINKS = [
  { to: '/', labelKey: 'navigation.home', end: true },
  { to: '/catalog', labelKey: 'navigation.catalog' },
] as const;

export const ACTION_LINKS = [
  { to: '/favourites', labelKey: 'navigation.favourites', icon: HeartIcon },
  { to: '/cart', labelKey: 'navigation.shoppingCart', icon: ShoppingBagIcon },
] as const;
