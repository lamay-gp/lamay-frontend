import { MinusIcon, PlusIcon } from 'lucide-react';

import { QuantitySelectorButton } from '@/components/atoms/QuantitySelectorButton';
import { Typography } from '@/components/atoms/Typography';
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
  return (
    <div className="flex items-center gap-4">
      <QuantitySelectorButton action={() => updateQuantity('decrement', id)}>
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
      <QuantitySelectorButton action={() => updateQuantity('increment', id)}>
        <PlusIcon />
      </QuantitySelectorButton>
    </div>
  );
};
