import { Typography } from '@/components/atoms/Typography';
import type { TypographyVariant } from '@/components/atoms/Typography/typography-variants';
import type { ProductSpecification } from '@/types/Products';

type Props = {
  specs: ProductSpecification[];
  nameVariant?: TypographyVariant;
  valueVariant?: TypographyVariant;
  nameWeight?: string;
  valueWeight?: string;
};

export const ProductSpec = ({
  nameVariant,
  valueVariant,
  nameWeight,
  valueWeight,
  specs,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 items-center w-full py-2">
      {specs.map((spec) => (
        <div
          key={spec.name}
          className="flex justify-between items-center w-full"
        >
          <Typography
            variant={nameVariant ?? 'small'}
            className={`text-text-secondary ${nameWeight ?? ''}`}
          >
            {spec.name}
          </Typography>
          <Typography
            variant={valueVariant ?? 'small'}
            className={`text-text ${valueWeight ?? 'font-bold'} text-right`}
          >
            {spec.value}
          </Typography>
        </div>
      ))}
    </div>
  );
};
