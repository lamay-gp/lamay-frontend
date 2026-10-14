import { cn } from 'cn';
import { useParams } from 'react-router';

import { Typography } from '@/components/atoms/Typography';

type Props = {
  regularPrice: number;
  discountPrice: number;
};

export const ProductPrice = ({ regularPrice, discountPrice }: Props) => {
  const { itemId } = useParams();

  const hasDiscount = regularPrice - discountPrice > 0;

  return (
    <div className="flex items-center gap-2">
      <Typography
        variant={itemId ? 'h2' : 'h3'}
        as={itemId ? 'h2' : 'h3'}
        className="before:content-['$'] text-text"
      >
        {regularPrice}
      </Typography>
      {hasDiscount && (
        <Typography
          variant="h3"
          as="h3"
          className={cn(
            "before:content-['$'] line-through text-text-secondary font-medium tablet:font-medium",
          )}
        >
          {discountPrice}
        </Typography>
      )}
    </div>
  );
};
