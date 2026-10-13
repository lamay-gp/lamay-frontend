import type { Product, Gadget, Category } from '@/types/Products';

const fetchGadgets = async <T>(filename: string): Promise<T> => {
  const response = await fetch(
    `${import.meta.env.VITE_GADGETS_URL}/${filename}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${filename}`);
  }

  return response.json();
};

export const getProducts = () => fetchGadgets<Product[]>('products.json');
export const getGadgets = async (category: Category): Promise<Gadget[]> => {
  return fetchGadgets<Gadget[]>(`${category}.json`);
};
