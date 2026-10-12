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
    </>
  );
};
