import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { Footer } from './components/organisms/Footer';
import { Header } from './components/organisms/Header';
import { ShopByCategory } from './components/organisms/ShopByCategory';
import { useProductsStore } from './stores/productsStore';

export const App = () => {
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen grid grid-rows grid-rows-[auto_1fr_auto]">
      <Header />

      <Outlet />
      <ShopByCategory />
      <Footer />
    </div>
  );
};
