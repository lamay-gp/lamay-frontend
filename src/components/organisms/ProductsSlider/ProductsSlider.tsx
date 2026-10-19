import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';
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
  goTo?: string;
};
export const ProductsSlider = ({
  title,
  products,
  goTo = '/catalog',
}: Props) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-x-6 items-center flex-wrap">
          <Typography
            variant="h2"
            as="h2"
          >
            {title}
          </Typography>
          <Link to={goTo}>
            <Button
              variant="ghost"
              className="text-button pl-0 tablet:pl-2.5 cursor-pointer hover:text-button"
            >
              <Typography variant="button">View all</Typography>{' '}
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>

        <div className="flex gap-6">
          <CarouselPrevious className="static cursor-pointer" />
          <CarouselNext className="static cursor-pointer" />
        </div>
      </div>
      <div className="relative">
        <div className="h-full w-41 absolute -right-1 bottom-0 bg-linear-to-l from-background to-transparent z-10 pointer-events-none"></div>
        <CarouselContent viewportClassName="py-2.5 px-2">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-54"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  );
};
