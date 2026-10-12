import { create } from 'zustand';

import { getGadgets } from '@/api/products';
import type { Category, Gadget } from '@/types/Products';

type GadgetDetailsState = {
  gadgetsByCategory: Partial<Record<Category, Gadget[]>>;
  loadingCategories: Category[];
  errors: Partial<Record<Category, string>>;

  fetchGadgets: (category: Category) => Promise<void>;
};

export const useGadgetDetailsStore = create<GadgetDetailsState>()(
  (set, get) => ({
    gadgetsByCategory: {},
    loadingCategories: [],
    errors: {},

    fetchGadgets: async (category) => {
      const { gadgetsByCategory, loadingCategories } = get();

      if (gadgetsByCategory[category]) {
        return;
      }

      if (loadingCategories.includes(category)) {
        return;
      }

      set({
        loadingCategories: [...loadingCategories, category],
        errors: {
          ...get().errors,
          [category]: undefined,
        },
      });

      try {
        const gadgets = await getGadgets(category);

        set({
          gadgetsByCategory: {
            ...get().gadgetsByCategory,
            [category]: gadgets,
          },
        });
      } catch {
        set({
          errors: {
            ...get().errors,
            [category]: 'Unable to load product details',
          },
        });
      } finally {
        set({
          loadingCategories: get().loadingCategories.filter(
            (item) => item !== category,
          ),
        });
      }
    },
  }),
);
