import { cn } from 'cn';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { Button } from '@/components/ui/Button/button';
import { buttonVariants } from '@/components/ui/Button/button-variants';
import { toast } from '@/components/ui/toast';
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types/Products';

import type React from 'react';

type Props = {
  productId: Product['itemId'];
  size?: 'sm' | 'lg';
};
export const AddToCartButton: React.FC<Props> = ({
  productId,
  size = 'sm',
}) => {
  const { t } = useTranslation('', {
    keyPrefix: 'components.atoms.addToCartBtn',
  });
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);

  const isInCart = cartItems.some((item) => item.productId === productId);

  const className = cn(
    'border h-full w-full cursor-pointer',
    size === 'sm' ? 'py-2.5' : 'py-3.5',
    isInCart ?
      'border-elements bg-transparent text-button'
    : 'border-button bg-button',
  );

  const handleAddToCart = () => {
    addToCart(productId);
    toast.add({
      title: t('toastTitle'),
      description: t('toastDescription'),
      type: 'success',
    });
  };

  if (isInCart) {
    return (
      <NavLink
        to="/cart"
        className={cn(buttonVariants({ variant: 'primaryAction' }), className)}
        aria-label={t('linkToCard')}
      >
        {t('linkToCard')}
      </NavLink>
    );
  }
  return (
    <Button
      variant="primaryAction"
      className={className}
      aria-label={t('linkAddToCartAria')}
      onClick={handleAddToCart}
    >
      {t('linkAddToCart')}
    </Button>
  );
};
