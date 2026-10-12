import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { Outlet } from 'react-router';

import { Button } from '@/components/ui/button';

import { AddToCartButton } from './components/atoms/AddToCartButton';
import { FavoriteButton } from './components/atoms/FavoriteButton';

export const App = () => {
  return (
    //it is just for visuality
    <>
      <Button>LAMAY</Button>;
      <FavoriteButton
        isFavorite={true}
        productId={2}
      />
      <FavoriteButton
        isFavorite={false}
        productId={3}
        size={'lg'}
      />
      <AddToCartButton
        isInCart={false}
        productId={4}
        //size={'lg'}
      />
      <Button
        variant="primaryAction"
        className="py-[14px]"
        aria-label="Checkout"
        //onClick={}
      >
        Checkout
      </Button>
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronRight className="size-4" />
      </Button>
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronUp className="size-4" />
      </Button>
      <Button
        variant="default"
        size="icon-sm"
        aria-current="page"
      >
        1
      </Button>
      {/*Header will be here*/}
      <Outlet />
      {/*Footer will be here*/}
    </>
  );
};
