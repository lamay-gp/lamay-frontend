import { MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import pageNotFound from '@/assets/images/page-not-found.png';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';

export const NotFoundPage = () => {
  const { t } = useTranslation('', { keyPrefix: 'notFoundPage' });
  return (
    <section className="pt-20">
      <div className="container flex flex-col gap-8 items-center">
        <Typography
          variant="h4"
          as="h4"
          className="text-center text-text-secondary"
        >
          <img
            src={pageNotFound}
            alt={t('notFoundAlt')}
            className="mx-auto max-w-80 tablet:max-w-90 mb-4"
          />
          {t('notFound')}
        </Typography>
        <Link to="/">
          <Button
            variant="primaryAction"
            className="w-fit mb-4 group p-5"
          >
            {t('goHome')}
            <MoveRight className="duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
