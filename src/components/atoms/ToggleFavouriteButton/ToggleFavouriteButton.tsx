import { cn } from 'cn';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button/button';
import { toast } from '@/components/ui/toast';
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
  const { t } = useTranslation('', {
    keyPrefix: 'components.atoms.toggleFavouritesBtn',
  });
  const favouriteIds = useFavouritesStore((state) => state.favouriteIds);
  const addToFavourites = useFavouritesStore((state) => state.addToFavourites);
  const removeFromFavourites = useFavouritesStore(
    (state) => state.removeFromFavourites,
  );

  const isFavorite = favouriteIds.includes(productId);

  const handleClick = () => {
    if (isFavorite) {
      removeFromFavourites(productId);
      toast.add({
        title: t('toastRemoveTitle'),
        description: t('toastRemoveDescription'),
        type: 'warning',
      });
    } else {
      addToFavourites(productId);
      toast.add({
        title: t('toastAddTitle'),
        description: t('toastAddDescription'),
        type: 'success',
      });
      console.log(favouriteIds);
    }
  };

  return (
    <Button
      variant="default"
      className={cn(
        'cursor-pointer bg-white',
        size === 'sm' ? 'w-7 h-7 px-1 absolute top-2 right-2' : 'size-12',
        isFavorite ? 'border-elements' : 'border-icon-border',
      )}
      aria-label={isFavorite ? t('ariaRemoveFrom') : t('ariaAddTo')}
      aria-pressed={isFavorite}
      onClick={handleClick}
    >
      <Heart
        className={
          isFavorite ? 'size-4 fill-button text-button' : 'size-4 text-button'
        }
      />
    </Button>
  );
};
