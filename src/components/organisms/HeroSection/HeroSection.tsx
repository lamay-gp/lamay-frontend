import { Typography } from '@/components/atoms/Typography';
import { HeroCarousel, heroSlides } from '@/components/molecules/HeroCarousel';

export const HeroSection = () => {
  return (
    <>
      <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
        <div className="container">
          <Typography
            variant="h1"
            as="h1"
            className="mb-4 tablet-lg:mb-8 desktop:mb-6 tablet-lg:mt-2 desktop:mt-4"
          >
            Welcome to <span className="text-button">LAMAY</span> Gadgets store!
          </Typography>

          <div className="flex flex-col gap-4">
            <HeroCarousel slides={heroSlides} />
            <div className="flex gap-4 w-full">
              <div className="rounded-xl overflow-hidden relative h-30 ring-0 inset-ring-1 inset-ring-elements flex items-center justify-center">
                <img
                  src="src/assets/images/banner-sales.png"
                  alt="Sales"
                  className="w-full scale-120 tablet:scale-100"
                />
              </div>
              <div className="rounded-xl overflow-hidden relative h-30 ring-0 inset-ring-1 inset-ring-elements flex items-center justify-center">
                <img
                  src="src/assets/images/banner-halloween-sale.png"
                  alt="Halloween sale"
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
