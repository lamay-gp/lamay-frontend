import { useTranslation } from 'react-i18next';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCartStore } from '@/stores/cartStore';
import { useProductsStore } from '@/stores/productsStore';

import { ProductPrice } from '../ProductPrice/ProductPrice';

export const CartCheckout = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'components.molecules.cartCheckout',
  });
  const cartItems = useCartStore((state) => state.cartItems);
  const products = useProductsStore((state) => state.products);

  const cartItemsWithProducts = cartItems.flatMap((cartItem) => {
    const product = products.find((item) => item.itemId === cartItem.productId);

    return product ? [{ product, quantity: cartItem.quantity }] : [];
  });

  const totalItems = cartItems
    .map((cartItem) => cartItem.quantity)
    .reduce((prev, acc) => prev + acc, 0);

  const totalPrice = cartItemsWithProducts.reduce(
    (total, { product, quantity }) => total + product.fullPrice * quantity,
    0,
  );
  const actualPrice = cartItemsWithProducts.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  );

  return (
    <Card className="items-center min-w-72 gap-x-4 p-6">
      <CardHeader className="flex flex-col w-full items-center p-0">
        <CardTitle>
          <ProductPrice
            regularPrice={totalPrice}
            discountPrice={actualPrice}
            variant="checkout"
          />
        </CardTitle>
        <CardDescription>
          <Typography variant="body">
            {t('total', { count: totalItems })}
          </Typography>
        </CardDescription>
      </CardHeader>
      <hr className="h-px bg-elements w-full" />
      <CardFooter className="w-full p-0">
        <Button
          variant="primaryAction"
          className="py-3.5 h-auto"
          aria-label={t('ariaCheckout')}
        >
          <Typography variant="button">{t('checkoutBtn')}</Typography>
        </Button>
      </CardFooter>
    </Card>
  );
};
