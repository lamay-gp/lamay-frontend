import { Typography } from '@/components/atoms/Typography';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel/carousel';
import type { Product } from '@/types/Products';

import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
};
export const ProductsSlider = ({ title, products }: Props) => {
  return (
    <section>
      <div className="py-7 tablet:py-8 desktop:py-10 mx-auto max-w-284">
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <div
            //className="mb-6 flex items-center justify-between container"
            className="mb-6 flex items-center justify-between px-4 tablet:px-6
    desktop:px-8"
          >
            <Typography
              variant="h2"
              as="h2"
            >
              {title}
            </Typography>

            <div className="flex gap-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <div className="ml-4 tablet:ml-6 desktop:mx-8">
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem
                  key={product.itemId}
                  className="
            pl-4
            basis-[calc((100%_-_48px)*3/4_+_32px)]
            tablet:basis-[calc((100%_-_176px)*5/12_+_64px)]
            desktop:basis-1/4
          "
                >
                  <div className="h-full [&>*]:h-full [&>*]:w-full [&>*]:!max-w-none [&>*]:!min-w-0">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
