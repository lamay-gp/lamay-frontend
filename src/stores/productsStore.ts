import { create } from 'zustand';

import { getProducts } from '@/api/products';
import type { Product } from '@/types/Products';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  errorMessage: string;
  fetchProducts: () => Promise<void>;
};

export const useProductsStore = create<ProductsState>()((set, get) => ({
  products: [],
  isLoading: false,
  errorMessage: '',

  fetchProducts: async () => {
    const { products, isLoading } = get();

    if (products.length > 0 || isLoading) {
      return;
    }

    set({ isLoading: true, errorMessage: '' });

    try {
      const products = await getProducts();

      set({ products });
    } catch {
      set({ errorMessage: 'Unable to load products' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
