import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { Outlet } from 'react-router';

import { Button } from '@/components/ui/button';

import { AddToCartButton } from './components/atoms/AddToCartButton';
import { FavoriteButton } from './components/atoms/FavoriteButton';

export const App = () => {
  return (
    //it is just for visuality
    <>
      <Button>LAMAY</Button>
      <br />
      <FavoriteButton
        isFavorite={true}
        productId={2}
      />
      <br />
      <FavoriteButton
        isFavorite={false}
        productId={3}
        size={'lg'}
      />
      <br />
      <AddToCartButton
        isInCart={true}
        productId={4}
        //size={'lg'}
      />
      <br />
      <br />
      <AddToCartButton
        isInCart={false}
        productId={4}
        //size={'lg'}
      />
      <br />
      <br />
      <Button
        variant="primaryAction"
        className="py-[14px]"
        aria-label="Checkout"
        //onClick={}
      >
        Checkout
      </Button>
      <br />
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronRight className="size-4" />
      </Button>
      <br />
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <br />
      <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronUp className="size-4" />
      </Button>
      <br />
      <Button
        variant="default"
        size="icon-sm"
        aria-current="page"
      >
        1
      </Button>
      <br />
      <Button
        variant="paginationArrow"
        //onClick={}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <br />
      <ChevronRight className="size-4 text-[#b4bdc3]" />
      {/*Header will be here*/}
      <Outlet />
      {/*Footer will be here*/}
    </>
  );
};
