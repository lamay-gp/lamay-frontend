import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Typography } from '@/components/atoms/Typography';
import { Skeleton } from '@/components/ui/skeleton';
import { useProductsStore } from '@/stores/productsStore';
import type { Category } from '@/types/Products';

type Props = {
  title: string;
  category: Category;
  gadgetCount: number;
  imgUrl: string;
};

export const CategoryCard = ({
  title,
  category,
  gadgetCount,
  imgUrl,
}: Props) => {
  const { t } = useTranslation('', {
    keyPrefix: 'components.molecules.categoryCard',
  });
  const catalogUrl = `/catalog?category=${category}`;

  const isLoading = useProductsStore((state) => state.isLoading);

  return (
    <article className="group">
      <Link to={catalogUrl}>
        <div className="rounded-lg overflow-hidden mb-6">
          <img
            className="aspect-squarew-full object-cover group-hover:scale-110 duration-300"
            src={imgUrl}
            alt={title}
          />
        </div>
      </Link>

      <Link to={catalogUrl}>
        <Typography
          variant="h4"
          as="h4"
          className="mb-1 duration-300 group-hover:text-muted-foreground"
        >
          {title}
        </Typography>
      </Link>

      {isLoading ?
        <Skeleton className="w-20 h-5 rounded-lg bg-border" />
      : <Typography
          variant="button"
          as="p"
          className="text-text-secondary"
        >
          {t('gadgetCount', { count: gadgetCount })}
        </Typography>
      }
    </article>
  );
};
