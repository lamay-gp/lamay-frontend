import type { Product, Gadget } from '@/types/Products';

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
export const getPhones = () => fetchGadgets<Gadget[]>('phones.json');
export const getTablets = () => fetchGadgets<Gadget[]>('tablets.json');
export const getAccessories = () => fetchGadgets<Gadget[]>('accessories.json');
