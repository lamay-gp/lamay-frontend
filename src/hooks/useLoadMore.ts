import { useState } from 'react';

const MIN_INITIAL_ITEMS = 12;

export const useLoadMore = <T>(
  items: T[],
  columns: number,
  resetKey: string,
) => {
  const pageSize = Math.ceil(MIN_INITIAL_ITEMS / columns) * columns;

  const [paging, setPaging] = useState({ key: resetKey, pages: 1 });
  const pages = paging.key === resetKey ? paging.pages : 1;

  const visibleItems = items.slice(0, pages * pageSize);
  const hasMore = visibleItems.length < items.length;

  const loadMore = () => setPaging({ key: resetKey, pages: pages + 1 });

  return { visibleItems, hasMore, loadMore };
};
