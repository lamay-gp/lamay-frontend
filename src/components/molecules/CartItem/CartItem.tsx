import { Button } from '@base-ui/react';
import { XIcon } from 'lucide-react';

import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/ui/card';
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types/Products';

import { ProductPrice } from '../ProductPrice/ProductPrice';
import { QuantitySelector } from '../QuantitySelector';

type Props = {
  product: Product;
};

export const CartItem = ({ product }: Props) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const cartItem =
    cartItems.find((item) => item.productId === product.itemId) || null;

  return (
    <Card className="px-4 tablet:px-6 bg-card flex flex-row items-center rounded-lg gap-0 justify-between gap-x-8 flex-wrap gap-y-4">
      <div className="flex items-center">
        <Button
          className="p-2 inline-block cursor-pointer w-fit mr-2 tablet:mr-4"
          onClick={() => removeFromCart(cartItem?.productId || '')}
        >
          <XIcon className="text-icon-border" />
        </Button>
        <div className="w-20 h-20 flex items-center justify-center mr-4 tablet:mr-6">
          <img
            src={`${import.meta.env.VITE_GADGETS_URL}/${product.image}`}
            alt={product.name}
            className="h-16.5"
          />
        </div>
        <Typography
          variant="h4"
          as="h4"
        >
          {product.name}
        </Typography>
      </div>
      <div className="flex items-center w-full justify-between desktop:w-auto desktop:gap-x-14">
        <QuantitySelector
          id={product.itemId}
          quantity={cartItem?.quantity}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
        />
        <ProductPrice
          regularPrice={product.fullPrice}
          discountPrice={product.price}
          variant="accent"
        />
      </div>
    </Card>
  );
};
