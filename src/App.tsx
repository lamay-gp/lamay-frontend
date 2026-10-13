import { Outlet } from 'react-router';

import { Footer } from '@/components/organisms/Footer';

export const App = () => {
  return (
    <>
      {/*Header will be here*/}

      <Outlet />

      <Footer />
    </>
  );
};
