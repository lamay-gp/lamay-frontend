export type Category = 'phones' | 'tablets' | 'accessories';

export type Product = {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export type ProductSpecification = {
  name: string;
  value: string;
};

export type Description = {
  title: string;
  text: string[];
};

export type Gadget = {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export type ChecklistItem<T extends string = string> = {
  id: T;
  label: string;
  count?: number;
};

export type Action = 'increment' | 'decrement';

export type CartItem = {
  productId: string;
  quantity: number;
};

export type SortOption =
  'price-asc' | 'price-desc' | 'title' | 'age-desc' | 'age-asc';
