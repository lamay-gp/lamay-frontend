import { useState } from 'react';

import { useCatalogFilters } from '@/hooks/useCatalogFilters';

export const useFiltersReset = () => {
  const { hasActiveFilters, clearFilters } = useCatalogFilters();
  const [resetKey, setResetKey] = useState(0);
  const [hadActiveFilters, setHadActiveFilters] = useState(hasActiveFilters);

  if (hadActiveFilters !== hasActiveFilters) {
    setHadActiveFilters(hasActiveFilters);

    if (!hasActiveFilters) {
      setResetKey((key) => key + 1);
    }
  }

  return { resetKey, hasActiveFilters, handleClear: clearFilters };
};
