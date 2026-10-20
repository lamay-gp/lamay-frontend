import { useTranslation } from 'react-i18next';

import { AddToCartButton } from '@/components/atoms/AddToCartButton';
import { CapacitySelectorRadio } from '@/components/atoms/CapacitySelectorRadio';
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
  onCapacityChange: (newCapacity: string) => void;
};

export const ProductInfo = ({
  productId,
  product,
  onColorChange,
  onCapacityChange,
}: Props) => {
  const { t } = useTranslation('', {
    keyPrefix: 'components.organisms.productInfo',
  });

  const params = [
    {
      name: t('screen'),
      value: product.screen,
    },
    {
      name: t('resolution'),
      value: product.resolution,
    },
    {
      name: t('processor'),
      value: product.processor,
    },
    {
      name: t('ram'),
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
          {t('availableColors')}
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
          currentColor={product.color || ''}
          colorRange={product?.colorsAvailable || []}
          onColorChange={onColorChange}
        />
        <div className="w-full mb-6 border-b border-elements" />
        <div className="mb-2">
          <Typography
            variant="small"
            as="h3"
            className="text-text-secondary"
          >
            {t('selectCapacity')}
          </Typography>
        </div>

        <div className="mb-6">
          <CapacitySelectorRadio
            currentCapacity={product?.capacity || ''}
            capacityRange={product?.capacityAvailable || []}
            onCapacityChange={onCapacityChange}
          />
        </div>
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
