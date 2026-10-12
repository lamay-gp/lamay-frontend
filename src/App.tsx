import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      {/*Header will be here*/}

      <Outlet />

      {/*Footer will be here*/}
    </>
  );
};
