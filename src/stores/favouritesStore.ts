import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavouritesState = {
  favouriteIds: number[];
  toggleFavourite: (id: number) => void;
};

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set) => ({
      favouriteIds: [],

      toggleFavourite: (id) => {
        set((state) => ({
          favouriteIds:
            state.favouriteIds.includes(id) ?
              state.favouriteIds.filter((favouriteId) => favouriteId !== id)
            : [...state.favouriteIds, id],
        }));
      },
    }),
    { name: 'lamay-favourites' },
  ),
);
