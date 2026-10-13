import { cn } from 'cn';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/Button/button';
import { useFavouritesStore } from '@/stores/favouritesStore';
import type { Product } from '@/types/Products';

import type React from 'react';

type Props = {
  productId: Product['itemId'];
  //in ItemCard page will be 'lg'
  size?: 'sm' | 'lg';
};
export const ToggleFavouriteButton: React.FC<Props> = ({
  productId,
  size = 'sm',
}) => {
  const favouriteIds = useFavouritesStore((state) => state.favouriteIds);
  const addToFavourites = useFavouritesStore((state) => state.addToFavourites);
  const removeFromFavourites = useFavouritesStore(
    (state) => state.removeFromFavourites,
  );

  const isFavorite = favouriteIds.includes(productId);

  const handleClick = () => {
    if (isFavorite) {
      removeFromFavourites(productId);
    } else {
      addToFavourites(productId);
      console.log(favouriteIds);
    }
  };

  return (
    <Button
      variant="default"
      className={cn(
        'cursor-pointer',
        size === 'sm' ? 'size-10' : 'size-12',
        isFavorite ? 'border-elements' : 'border-icon-border',
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      onClick={handleClick}
    >
      <Heart
        className={
          isFavorite ?
            'size-3.5 fill-secondary-accent text-secondary-accent'
          : 'size-3.5 text-text'
        }
      />
    </Button>
  );
};
