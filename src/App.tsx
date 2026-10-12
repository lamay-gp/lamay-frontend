import { FavoriteButton } from './components/atoms/FavoriteButton';
import { Button } from './components/ui/button';

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
    </>
  );
};
