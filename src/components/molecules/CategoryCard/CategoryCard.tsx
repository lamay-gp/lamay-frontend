import { Link } from 'react-router';

import { Typography } from '@/components/atoms/Typography';

type Props = {
  title: string;
  gadgetCount: number;
  imgUrl: string;
};

export const CategoryCard = ({ title, gadgetCount, imgUrl }: Props) => {
  return (
    <article className="group">
      <Link to="/catalog">
        <div className="rounded-lg overflow-hidden mb-6">
          <img
            className="aspect-squarew-full object-cover group-hover:scale-110 duration-300"
            src={imgUrl}
            alt={title}
          />
        </div>
      </Link>

      <Link to="/catalog">
        <Typography
          variant="h4"
          as="h4"
          className="mb-1"
        >
          {title}
        </Typography>
      </Link>

      <Typography
        variant="button"
        as="p"
        className="text-text-secondary"
      >
        {`${gadgetCount} models`}
      </Typography>
    </article>
  );
};
