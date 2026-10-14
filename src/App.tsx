import { Outlet } from 'react-router';

import { Header } from './components/organisms/Header';

export const App = () => {
  return (
    <>
      <Header />
      {/*Header will be here*/}
      <Outlet />
      {/*Footer will be here*/}
    </>
  );
};
