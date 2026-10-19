import { Grid2X2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import halloweenBanner from '@/assets/images/banner-halloween-sale.png';
import salesBanner from '@/assets/images/banner-sales.png';
import { Typography } from '@/components/atoms/Typography';
import { HeroCarousel, heroSlides } from '@/components/molecules/HeroCarousel';

export const HeroSection = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'components.organisms.heroSection',
  });
  return (
    <>
      <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
        <div className="container">
          <Typography
            variant="h1"
            as="h1"
            className="mb-4 tablet-lg:mb-8 desktop:mb-6 tablet-lg:mt-2 desktop:mt-4"
          >
            <span className="text-button">LAMAY</span> {t('welcome')}
          </Typography>

          <div className="flex flex-col gap-4">
            <HeroCarousel slides={heroSlides} />
            <Link
              to="/catalog"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-button text-white shadow-sm tablet:py-4 tablet-lg:hidden"
            >
              <Grid2X2 className="size-4" />
              <Typography variant="button">{t('catalogBtn')}</Typography>
            </Link>
            <div className="flex gap-4 w-full">
              <div className="rounded-xl overflow-hidden relative h-30 ring-0 inset-ring-1 inset-ring-elements flex flex-1 min-w-0 items-center justify-center">
                <img
                  src={salesBanner}
                  alt={t('halloweenBannerAlt')}
                  className="w-full scale-120 tablet:scale-100"
                />
              </div>
              <div className="rounded-xl overflow-hidden relative h-30 ring-0 inset-ring-1 inset-ring-elements flex flex-1 min-w-0 items-center justify-center">
                <img
                  src={halloweenBanner}
                  alt={t('salesBannerAlt')}
                  className="w-full scale-200 tablet:scale-200 desktop:scale-130"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
