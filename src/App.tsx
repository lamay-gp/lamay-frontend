import { Outlet } from 'react-router';

import { Header } from './components/organisms/Header';
import { Button } from './components/ui/Button/button';

export const App = () => {
  return (
    <>
      <Header />

      <Button>LAMAY</Button>

      {/*Header will be here*/}
      <Outlet />
      {/*Footer will be here*/}
    </>
  );
};
