import bannerAccessories from '@/assets/images/banner-accessories.png';
import bannerIphone14Mobile from '@/assets/images/banner-iphone14-mobile.png';
import bannerIphone14 from '@/assets/images/banner-iphone14.png';
import bannerPhones from '@/assets/images/banner-phones.png';
import bannerTablets from '@/assets/images/banner-tablets.png';

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
    id: 'accessories',
    image: {
      desktop: bannerAccessories,
    },
    alt: 'Accessories',
  },
  {
    id: 'phones',
    image: {
      desktop: bannerPhones,
    },
    alt: 'Phones',
  },
  {
    id: 'tablets',
    image: {
      desktop: bannerTablets,
    },
    alt: 'Tablets',
  },
  {
    id: 'iphone14',
    image: {
      desktop: bannerIphone14,
      mobile: bannerIphone14Mobile,
    },
    alt: 'iPhone 14',
  },
];
