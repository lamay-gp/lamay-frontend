import { CartItem } from '@/components/molecules/CartItem';
import type { Product } from '@/types/Products';

type Props = {
  cartProducts: Product[];
};

export const CartItemList = ({ cartProducts }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {cartProducts.map((cartProduct) => (
        <CartItem
          key={cartProduct.id}
          product={cartProduct}
        />
      ))}
    </div>
  );
};
