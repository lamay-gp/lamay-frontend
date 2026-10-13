import { Outlet } from 'react-router';

import { Header } from '@/components/molecules/Header/Header';

export const App = () => {
  return (
    <>
      <Header />

      <Outlet />

      {/*Footer will be here*/}
    </>
  );
};
