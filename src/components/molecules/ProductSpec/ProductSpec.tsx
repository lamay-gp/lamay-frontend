import { Typography } from '@/components/atoms/Typography';
import type { ProductSpecification } from '@/types/Products';

type Props = {
  specs: ProductSpecification[];
};

export const ProductSpec = ({ specs }: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center w-full py-2">
      {specs.map((spec) => (
        <div
          key={spec.name}
          className="flex justify-between items-center w-full"
        >
          <Typography
            variant="small"
            className="text-text-secondary"
          >
            {spec.name}
          </Typography>
          <Typography
            variant="small"
            className="text-text font-bold text-right"
          >
            {spec.value}
          </Typography>
        </div>
      ))}
    </div>
  );
};
