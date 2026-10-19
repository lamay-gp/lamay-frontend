import { useTranslation } from 'react-i18next';

import cartIsEmpty from '@/assets/images/cart-is-empty.png';
import { BackButton } from '@/components/atoms/BackButton';
import { Typography } from '@/components/atoms/Typography';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs';
import { CartCheckout } from '@/components/molecules/CartCheckout';
import { CartItemList } from '@/components/organisms/CartItemList';
import { Button } from '@/components/ui/Button/button';
import { useCartStore } from '@/stores/cartStore';
import { useProductsStore } from '@/stores/productsStore';

export const CartPage = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'cartPage',
  });
  const products = useProductsStore((state) => state.products);

  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  const cartProducts = cartItems.flatMap((cartItem) => {
    const product = products.find((item) => item.itemId === cartItem.productId);

    return product ? product : [];
  });

  const hasCartItems = cartItems.length > 0;

  return (
    <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
      <div className="container">
        <Breadcrumbs
          items={[{ label: 'home', to: '/' }, { label: 'cart' }]}
          className="mt-6"
        />

        <div className="mb-6 tablet:mb-4 ">
          <BackButton />
        </div>

        <div className="flex justify-between items-center">
          <Typography
            variant="h1"
            as="h1"
            className="mt-6 tablet-lg:mt-10 mb-8"
          >
            {t('title')}
          </Typography>
          {hasCartItems && (
            <Button
              variant="destructive"
              className="p-5"
              onClick={() => clearCart()}
            >
              <Typography variant="button">{t('clearBtn')}</Typography>
            </Button>
          )}
        </div>

        {hasCartItems ?
          <div className="flex flex-col-reverse gap-8 tablet-lg:flex-row tablet-lg:items-start tablet-lg:gap-4 justify-between">
            <CartItemList cartProducts={cartProducts} />
            <CartCheckout />
          </div>
        : <img
            src={cartIsEmpty}
            alt={t('cartEmptyAlt')}
            className="mx-auto max-w-80 mt-15 tablet:max-w-120"
          />
        }
      </div>
    </section>
  );
};
