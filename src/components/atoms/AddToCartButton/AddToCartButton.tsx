import { cn } from 'cn';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/Button/button';
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types/Products';

import type React from 'react';

type Props = {
  productId: Product['itemId'];
  //in ItemCard page will be 'lg'
  size?: 'sm' | 'lg';
};
export const AddToCartButton: React.FC<Props> = ({
  productId,
  size = 'sm',
}) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const isInCart = cartItems.some((item) => item.productId === productId);

  const handleClick = () => {
    if (isInCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };

  return (
    <Button
      variant="primaryAction"
      className={cn(
        'border cursor-pointer',
        size === 'sm' ? 'py-2.5' : 'py-3.5',
        isInCart ?
          'border-elements bg-transparent text-button'
        : 'border-button bg-button',
      )}
      aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
      aria-pressed={isInCart}
      onClick={handleClick}
    >
      {isInCart ?
        <Trash2 className="size-3 text-button" />
      : 'Add to cart'}
    </Button>
  );
};
/*//it is just for visuality
          
      <FavoriteButton productId={'2'} />
      <br />
      <FavoriteButton
        productId={'3'}
        size={'lg'}
      />
      <br />
      <AddToCartButton
        productId={'4'}
        //size={'lg'}
      />
      <br />
      <br />
      <AddToCartButton
        productId={'4'}
        //size={'lg'}
      />
      <br />
      <br />
      <Button
        variant="primaryAction"
        className="py-[14px]"
        aria-label="Checkout"
        //onClick={}
      >
        Checkout
      </Button>
      <br />
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronRight className="size-4" />
      </Button>
      <br />
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <br />
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronUp className="size-4" />
      </Button>
      <br />
      <Button
        variant="default"
        size="icon-sm"
        aria-current="page"
      >
        1
      </Button>
      <br />
      <Button
        variant="paginationArrow"
        //onClick={}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <br />
      <ChevronRight className="size-4 text-[#b4bdc3]" />*/
