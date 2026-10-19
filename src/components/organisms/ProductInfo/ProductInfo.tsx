import { AddToCartButton } from '@/components/atoms/AddToCartButton';
import { ColorSelectorRadio } from '@/components/atoms/ColorSelectorRadio';
import { ToggleFavouriteButton } from '@/components/atoms/ToggleFavouriteButton';
import { Typography } from '@/components/atoms/Typography';
import { ProductPrice } from '@/components/molecules/ProductPrice/ProductPrice';
import { ProductSpec } from '@/components/molecules/ProductSpec';
import type { Gadget, Product } from '@/types/Products';

type Props = {
  productId: Product['id'] | undefined;
  product: Gadget;
  onColorChange: (newColor: string) => void;
  onCapacityChange?: (newCapacity: string) => void;
};

export const ProductInfo = ({ productId, product, onColorChange }: Props) => {
  const currentColor = product?.color ?? '';
  const params = [
    {
      name: 'Screen',
      value: product.screen,
    },
    {
      name: 'Resolution',
      value: product.resolution,
    },
    {
      name: 'Processor',
      value: product.processor,
    },
    {
      name: 'RAM',
      value: product.ram,
    },
  ];

  return (
    <div className=" flex flex-col">
      <div className="flex mb-2 items-baseline justify-between">
        <Typography
          variant="small"
          as="h3"
          className=" text-text-secondary"
        >
          Available colors
        </Typography>
        <Typography
          variant="uppercase"
          as="p"
          className="text-icon-border"
        >
          {`ID: ${productId}`}
        </Typography>
      </div>

      <div className="desktop:pr-48">
        <ColorSelectorRadio
          currentColor={currentColor || ''}
          colorRange={product?.colorsAvailable || []}
          onColorChange={onColorChange}
        />
        <div className="w-full mb-6 border-b border-elements" />
        <Typography
          variant="small"
          as="h3"
          className=" text-text-secondary"
        >
          Select capacity
        </Typography>
        <div className="mb-6">Radibutton</div>
        <div className="w-full mb-8 border-b border-elements" />

        <div className="mb-4">
          <ProductPrice
            regularPrice={product.priceRegular}
            discountPrice={product?.priceDiscount}
            variant="accent"
          />
        </div>

        <div className="mb-8 flex  w-full items-stretch gap-2">
          <div className="min-w-0 flex-1">
            <AddToCartButton
              size="lg"
              productId={product.id}
            />
          </div>

          <div className="shrink-0">
            <ToggleFavouriteButton
              size="lg"
              productId={product.id}
            />
          </div>
        </div>

        <ProductSpec specs={params} />
      </div>
    </div>
  );
};
