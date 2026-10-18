import { Link } from 'react-router';

import { AddToCartButton } from '@/components/atoms/AddToCartButton';
import { ToggleFavouriteButton } from '@/components/atoms/ToggleFavouriteButton';
import { Typography } from '@/components/atoms/Typography';
import { ProductPrice } from '@/components/molecules/ProductPrice/ProductPrice';
import type { Product } from '@/types/Products';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <article className="bg-card px-4 py-4 rounded-lg flex flex-col items-center max-w-50 min-w-45 gap-2 ring-0 inset-ring-1 inset-ring-elements w-full">
      <Link
        to={`/product/${product.category}/${product.itemId}`}
        className="block w-full"
      >
        <div className="flex flex-col px-0 items-center">
          <img
            src={`${import.meta.env.VITE_GADGETS_URL}/${product.image}`}
            alt={product.name}
            className="max-w-40 max-h-40 mb-6"
          />
          <div className="mb-2 w-full">
            <Typography
              variant="body"
              className="w-full"
            >
              {product.name}
            </Typography>
          </div>
          <div className="w-full">
            <ProductPrice
              regularPrice={product.fullPrice}
              discountPrice={product.price}
            />
          </div>
        </div>
      </Link>
      <hr className="h-px bg-elements w-full" />
      {/*<div className="w-full px-0">
        <ProductSpec
          specs={[
            { name: 'Screen', value: product.screen },
            { name: 'Capacity', value: product.capacity },
            { name: 'RAM', value: product.ram },
          ]}
        />
      </div>*/}
      <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 px-0">
        <AddToCartButton productId={product.itemId} />
        <ToggleFavouriteButton productId={product.itemId} />
      </div>
    </article>
  );
};
