import type { Gadget } from '@/types/Products';

type Props = {
  product: Gadget;
};

export const ProductInfo = ({ product }: Props) => {
  console.log(product);
};
