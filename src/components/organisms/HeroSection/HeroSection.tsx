import { Typography } from '@/components/atoms/Typography';
import { HeroCarousel, heroSlides } from '@/components/molecules/HeroCarousel';

export const HeroSection = () => {
  return (
    <>
      <section>
        <div className="container">
          <Typography
            variant="h1"
            as="h1"
            className="mb-6 tablet-lg:mb-8 desktop:mb-14 tablet-lg:mt-2 desktop:mt-8"
          >
            Welcome to <span className="text-button">LAMAY</span> Gadgets store!
          </Typography>

          <HeroCarousel slides={heroSlides} />
        </div>
      </section>
    </>
  );
};
