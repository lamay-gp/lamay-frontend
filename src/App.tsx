import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { Header } from './components/organisms/Header';
import { useProductsStore } from './stores/productsStore';

export const App = () => {
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Header />
      <Outlet />

      <Footer />
    </>
  );
};
