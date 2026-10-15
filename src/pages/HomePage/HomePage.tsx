import { BrandNewModelSection } from '@/components/organisms/BrandNewModelSection';
import { HeroSection } from '@/components/organisms/HeroSection';
import { HotPricesSection } from '@/components/organisms/HotPricesSection/HotPricesSection';

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <BrandNewModelSection />
      <HotPricesSection />
    </main>
  );
};
