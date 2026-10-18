import { ChevronRight } from 'lucide-react';

import { ProductPrice } from '@/components/molecules/ProductPrice/ProductPrice';
import { Button } from '@/components/ui/Button/button';
import type { Product } from '@/types/Products';

type SearchResultItemProps = {
  product: Product;
  onClick?: () => void;
};

export const SearchResultItem = ({
  product,
  onClick,
}: SearchResultItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="flex h-auto w-full cursor-pointer items-center justify-start gap-3 rounded-none border border-transparent border-b-elements px-3 py-3 text-left whitespace-normal transition-colors hover:border-2 hover:border-text-secondary hover:bg-hover tablet-lg:px-4"
    >
      <img
        src={`${import.meta.env.VITE_GADGETS_URL}/${product.image}`}
        alt={product.name}
        className="size-14 shrink-0 object-contain"
      />

      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 block text-sm text-text">
          {product.name}
        </span>
        <div className="mt-1">
          <ProductPrice
            regularPrice={product.fullPrice}
            discountPrice={product.price}
            variant="default"
          />
        </div>
      </span>

      <ChevronRight className="size-5 shrink-0 text-text-secondary" />
    </Button>
  );
};
