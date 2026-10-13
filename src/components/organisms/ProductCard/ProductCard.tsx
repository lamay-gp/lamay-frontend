import { Link } from 'react-router';

import { AddToCartButton } from '@/components/atoms/AddToCartButton';
import { ToggleFavouriteButton } from '@/components/atoms/ToggleFavouriteButton';
import { Typography } from '@/components/atoms/Typography';
import { ProductPrice } from '@/components/molecules/ProductPrice/ProductPrice';
import { ProductSpec } from '@/components/molecules/ProductSpec';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/types/Products';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <Card className="bg-card px-8 py-8 rounded-lg flex flex-col items-center max-w-68 min-w-53 gap-2">
      <Link
        to={`product/${product.category}/${product.itemId}`}
        className="block w-full"
      >
        <CardHeader className="flex flex-col px-0 items-center">
          <img
            src={`${import.meta.env.VITE_GADGETS_URL}/${product.image}`}
            alt={product.name}
            className="max-w-52 max-h-49 mb-6"
          />
          <CardTitle className="mb-2 w-full">
            <Typography
              variant="body"
              className="w-full"
            >
              {product.name}
            </Typography>
          </CardTitle>
          <CardDescription className="w-full">
            <ProductPrice
              regularPrice={product.fullPrice}
              discountPrice={product.price}
            />
          </CardDescription>
        </CardHeader>
      </Link>
      <hr className="h-px bg-elements w-full" />
      <CardContent className="w-full px-0">
        <ProductSpec
          specs={[
            { name: 'Screen', value: product.screen },
            { name: 'Capacity', value: product.capacity },
            { name: 'RAM', value: product.ram },
          ]}
        />
      </CardContent>
      <CardFooter className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 px-0">
        <AddToCartButton productId={product.itemId} />
        <ToggleFavouriteButton productId={product.itemId} />
      </CardFooter>
    </Card>
  );
};
