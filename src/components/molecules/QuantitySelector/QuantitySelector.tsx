import { MinusIcon, PlusIcon } from 'lucide-react';

import { QuantitySelectorButton } from '@/components/atoms/QuantitySelectorButton';
import { Typography } from '@/components/atoms/Typography';
import { toast } from '@/components/ui/toast';
import type { Action, CartItem } from '@/types/Products';

type Props = {
  id: string;
  quantity?: number;
  cartItems: CartItem[];
  updateQuantity: (action: Action, id: string) => void;
};

export const QuantitySelector = ({
  id,
  quantity = 0,
  cartItems,
  updateQuantity,
}: Props) => {
  const handleIncrement = () => {
    updateQuantity('increment', id);
    toast.add({
      title: 'Cart updated',
      description: 'Item quantity increased.',
      type: 'success',
    });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity('decrement', id);
      toast.add({
        title: 'Cart updated',
        description: 'Item quantity decreased.',
        type: 'warning',
      });
    } else {
      updateQuantity('decrement', id);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <QuantitySelectorButton action={handleDecrement}>
        <MinusIcon
          className={cartItems.length >= 1 ? 'text-icon-border' : ''}
        />
      </QuantitySelectorButton>
      <Typography
        variant="h4"
        as="h4"
      >
        {quantity}
      </Typography>
      <QuantitySelectorButton action={handleIncrement}>
        <PlusIcon />
      </QuantitySelectorButton>
    </div>
  );
};
