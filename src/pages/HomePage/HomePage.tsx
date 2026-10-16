import { BrandNewModelSection } from '@/components/organisms/BrandNewModelSection';
import { HeroSection } from '@/components/organisms/HeroSection';
import { HotPricesSection } from '@/components/organisms/HotPricesSection/HotPricesSection';
import { ShopByCategory } from '@/components/organisms/ShopByCategory';

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <BrandNewModelSection />
      <ShopByCategory />
      <HotPricesSection />
    </main>
  );
};
