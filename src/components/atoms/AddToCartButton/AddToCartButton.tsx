import { cn } from 'cn';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type React from 'react';

type Props = {
  productId: number;
  //Gets value based on presence in Zustand
  isInCart: boolean;
  //in ItemCard page will be 'lg'
  size?: 'sm' | 'lg';
};
export const AddToCartButton: React.FC<Props> = ({ isInCart, size = 'sm' }) => {
  /*
  ///toggleCart() is passed here from the Zustand store
  const toggleCart = useCartStore(
  (state) => state.toggleCart,
);
*/
  return (
    <Button
      variant="primaryAction"
      className={cn(
        'border',
        size === 'sm' ? 'py-[10px]' : 'py-[14px]',
        isInCart ?
          'border-[#e2e6e9] bg-transparent text-[#216cff]'
        : 'border-[#216cff] bg-[#216cff]',
      )}
      aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
      aria-pressed={isInCart}
      //onClick={() => toggleCart(productId)}
    >
      {isInCart ?
        <Trash2 className="size-3 text-[#216cff]" />
      : 'Add to cart'}
    </Button>
  );
};
