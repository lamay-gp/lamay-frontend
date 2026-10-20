import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { Footer } from './components/organisms/Footer';
import { Header } from './components/organisms/Header';
import { Toaster } from './components/ui/toast';
import { useProductsStore } from './stores/productsStore';

export const App = () => {
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen grid grid-rows grid-rows-[auto_1fr_auto] grid-cols-[minmax(0,1fr)]">
      <Header />
      <main className="pt-6 tablet:pt-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};
