import type { Product, Gadget, Category } from '@/types/Products';

const GADGETS_URL =
  'https://raw.githubusercontent.com/superpooperxxx/mate-group-project/refs/heads/master/public/gadgets';

const fetchGadgets = async <T>(filename: string): Promise<T> => {
  const response = await fetch(`${GADGETS_URL}/${filename}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${filename}`);
  }

  return response.json();
};

export const getProducts = () => fetchGadgets<Product[]>('products.json');
export const getGadgets = async (category: Category): Promise<Gadget[]> => {
  return fetchGadgets<Gadget[]>(`${category}.json`);
};
