import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';
import type { Product } from '@/types/Products';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title = 'section', products }: Props) => {
  const [startIndex, setStartIndex] = useState(0);

  const visibleProducts = products.slice(startIndex, startIndex + 4);

  const handlePrev = () => {
    setStartIndex((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setStartIndex((current) => Math.min(products.length - 4, current + 1));
  };

  return (
    <section className="py-7 tablet:py-8 desktop:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Typography
          variant="h2"
          as="h2"
        >
          {title}
        </Typography>
        <div className="flex gap-4">
          <Button
            variant="default"
            size="icon-sm"
            disabled={startIndex === 0}
            onClick={handlePrev}
            aria-label="Previous products"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="default"
            size="icon-sm"
            disabled={startIndex >= products.length - 4}
            onClick={handleNext}
            aria-label="Next products"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-4">
          {visibleProducts.map((product) => (
            <div
              key={product.itemId}
              className="
          min-w-0 shrink-0
          basis-[calc((100%_-_48px)*3/4_+_32px)]
          tablet:basis-[calc((100%_-_176px)*5/12_+_64px)]
          desktop:basis-[calc((100%_-_368px)*6/24_+_80px)]
        "
            >
              {/*product*/}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
