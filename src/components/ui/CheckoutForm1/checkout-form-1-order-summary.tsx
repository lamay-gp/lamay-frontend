import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/stores/cartStore';
import { useProductsStore } from '@/stores/productsStore';

import { Typography } from '../../atoms/Typography';
import { ProductPrice } from '../../molecules/ProductPrice/ProductPrice';

type CheckoutForm1OrderSummaryProps = {
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
};

export function CheckoutForm1OrderSummary({
  promoCode,
  onPromoCodeChange,
}: CheckoutForm1OrderSummaryProps) {
  const { t } = useTranslation('', {
    keyPrefix: 'components.organisms.checkoutForm.orderSummary',
  });
  const products = useProductsStore((state) => state.products);

  const cartItems = useCartStore((state) => state.cartItems);

  const cartProducts = cartItems.flatMap((cartItem) => {
    const product = products.find((item) => item.itemId === cartItem.productId);

    return product ? product : [];
  });

  const subtotal = cartProducts.reduce((sum, product) => {
    const cartItem = cartItems.find(
      (cartItem) => cartItem.productId === product.itemId,
    );

    return sum + product.price * (cartItem?.quantity ?? 0);
  }, 0);
  const total = subtotal;

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-balance">
          <Typography
            variant="h3"
            as="h3"
          >
            {t('title')}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {cartProducts.map((item) => {
            const productQuantity =
              cartItems.find((cartItem) => cartItem.productId === item.itemId)
                ?.quantity ?? 0;

            return (
              <Link
                key={item.id}
                to={`/product/${item.category}/${item.itemId}`}
              >
                <div className="flex gap-4">
                  <div className="relative size-16 flex items-center justify-center">
                    <img
                      src={`${import.meta.env.VITE_GADGETS_URL}/${item.image}`}
                      alt={item.name}
                      className="h-full w-auto max-w-full object-contain"
                    />
                    <Badge
                      variant="secondary"
                      className="px-2.5 py-0.5 font-semibold absolute -end-2 -top-2 size-6 rounded-full p-0 text-xs bg-button text-white"
                    >
                      <Typography variant="button">
                        {productQuantity}
                      </Typography>
                    </Badge>
                  </div>
                  <div className="min-w-0 flex flex-col items-start justify-between">
                    <Typography
                      variant="body"
                      className="font-semibold"
                    >
                      {item.name}
                    </Typography>
                    <ProductPrice
                      regularPrice={item.fullPrice}
                      discountPrice={item.price}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Separator />

        <Field>
          <FieldLabel
            htmlFor="promoCode-kL1m67Q"
            className="text-sm"
          >
            <Typography
              variant="body"
              className="font-semibold"
            >
              {t('promoCode')}
            </Typography>
          </FieldLabel>
          <div className="flex gap-2">
            <Input
              id="promoCode-kL1m67Q"
              placeholder={t('enterCode')}
              value={promoCode}
              className="h-9"
              onChange={(event) => onPromoCodeChange(event.target.value)}
            />
            <Button
              variant="outline"
              className="h-9 px-4 py-2 cursor-pointer"
            >
              <Typography variant="button">{t('apply')}</Typography>
            </Button>
          </div>
        </Field>

        <Separator />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('subtotal')}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <Typography
            variant="body"
            className="font-semibold"
          >
            {t('total')}
          </Typography>
          <Typography
            variant="body"
            className="font-semibold"
          >
            ${total.toFixed(2)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
