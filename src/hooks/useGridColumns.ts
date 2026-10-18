import { useEffect, useState } from 'react';

export const useGridColumns = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver(() => {
      const template = getComputedStyle(element).gridTemplateColumns;
      setColumns(template.split(' ').filter(Boolean).length || 1);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return { gridRef: setElement, columns };
};
