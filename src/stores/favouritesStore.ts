import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavouritesState = {
  favouriteIds: string[];
  addToFavourites: (id: string) => void;
  removeFromFavourites: (id: string) => void;
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
