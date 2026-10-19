import { MoveRight } from 'lucide-react';
import { Link } from 'react-router';

import pageNotFound from '@/assets/images/page-not-found.png';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';

export const NotFoundPage = () => {
  return (
    <section className="pt-10">
      <div className="container flex flex-col gap-8 items-center">
        <Typography
          variant="h4"
          as="h4"
          className="text-center text-text-secondary"
        >
          <img
            src={pageNotFound}
            alt="Your favourites list is empty"
            className="mx-auto max-w-80 tablet:max-w-90 mb-4"
          />
          Page not found.
        </Typography>
        <Link to="/">
          <Button
            variant="primaryAction"
            className="w-fit mb-4 group p-5"
          >
            Go to Home
            <MoveRight className="duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
