import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavouritesState = {
  favouriteIds: number[];
  addToFavourites: (id: number) => void;
  removeFromFavourites: (id: number) => void;
  clearFavourites: () => void;
};

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set) => ({
      favouriteIds: [],

      addToFavourites: (id) => {
        set((state) => {
          if (state.favouriteIds.includes(id)) {
            return state;
          }

          return {
            favouriteIds: [...state.favouriteIds, id],
          };
        });
      },

      removeFromFavourites: (id) => {
        set((state) => ({
          favouriteIds: state.favouriteIds.filter(
            (favouriteId) => favouriteId !== id,
          ),
        }));
      },

      clearFavourites: () => {
        set({ favouriteIds: [] });
      },
    }),
    { name: 'lamay-favourites' },
  ),
);
