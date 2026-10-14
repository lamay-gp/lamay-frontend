import { Outlet } from 'react-router';

import { Footer } from '@/components/organisms/Footer';
import { Header } from '@/components/organisms/Header';

export const App = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};
