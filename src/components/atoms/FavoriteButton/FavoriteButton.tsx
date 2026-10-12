import { cn } from 'cn';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type React from 'react';

type Props = {
  productId: number;
  //Gets value based on presence in Zustand
  isFavorite: boolean;
  //in ItemCard page will be 'lg'
  size?: 'sm' | 'lg';
};
export const FavoriteButton: React.FC<Props> = ({
  isFavorite,
  size = 'sm',
}) => {
  /*
  ///toggleFavorite() is passed here from the Zustand store
  const toggleFavorite = useFavoriteStore(
  (state) => state.toggleFavorite,
);
*/
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'rounded-full border bg-transparent hover:border-[#0f0f11] hover:bg-transparent',
        size === 'sm' ? 'size-10' : 'size-12',
        isFavorite ? 'border-[#e2e6e9]' : 'border-[#b4bdc3]',
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      //onClick={() => toggleFavorite(productId)}
    >
      <Heart
        className={
          isFavorite ?
            'size-[14px] fill-[#F447AF] text-[#F447AF]'
          : 'size-[14px] text-[#0f0f11]'
        }
      />
    </Button>
  );
};
