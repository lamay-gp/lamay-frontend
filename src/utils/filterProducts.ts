import type { Product } from '@/types/Products';

export const filterProducts = (
  products: Product[],
  query: string,
): Product[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return products.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery),
  );
};
