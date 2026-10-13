import { Outlet } from 'react-router';

import { Button } from '@/components/ui/button';

export const App = () => {
  return (
    <>
      <Button>LAMAY</Button>
      {/*Header will be here*/}
      <Outlet />
      {/*Footer will be here*/}
    </>
  );
};
