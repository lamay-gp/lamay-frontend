import bannerAppleWatch12 from '@/assets/images/banner-apple-watch-12.png';
import bannerIpadAir13 from '@/assets/images/banner-ipad-air-13.png';
import bannerIphone18Pro from '@/assets/images/banner-iphone-18-pro.png';
import bannerIphoneDuo from '@/assets/images/banner-iphone-duo.png';

export type HeroSlide = {
  id: string;
  image: {
    desktop: string;
    mobile?: string;
  };
  alt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'iphone-18-pro',
    image: {
      desktop: bannerIphone18Pro,
    },
    alt: 'Iphone 18 Pro',
  },
  {
    id: 'ipad-air-13',
    image: {
      desktop: bannerIpadAir13,
    },
    alt: 'Ipad Air 13',
  },
  {
    id: 'iphone-duo',
    image: {
      desktop: bannerIphoneDuo,
    },
    alt: 'Iphone Duo',
  },
  {
    id: 'apple-watch-series-12',
    image: {
      desktop: bannerAppleWatch12,
    },
    alt: 'Apple Watch Series 12',
  },
];
