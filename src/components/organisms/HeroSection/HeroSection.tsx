import { Typography } from '@/components/atoms/Typography';
import { HeroCarousel, heroSlides } from '@/components/molecules/HeroCarousel';

export const HeroSection = () => {
  return (
    <>
      <section className="section-container">
        <Typography
          variant="h1"
          as="h1"
          className="py-6 tablet-lg:py-8 desktop:py-14"
        >
          Welcome to Nice Gadgets store!
        </Typography>
      </section>

      <HeroCarousel slides={heroSlides} />
    </>
  );
};
