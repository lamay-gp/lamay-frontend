import { ChevronRight, Home } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Sort } from '@/components/atoms/Sort';
import { Typography } from '@/components/atoms/Typography';
import {
  FiltersSidebar,
  FiltersTrigger,
} from '@/components/organisms/FiltersPanel';
import { cn } from '@/lib/utils';
import type { SortOption } from '@/types/Products';

export const CatalogPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  const modelsCount = 95;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="flex-1 py-6">
        <div className="container mx-auto px-4 tablet:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-6 text-sm"
          >
            <Link
              to="/"
              className="text-text-secondary hover:text-primary transition-colors flex items-center"
            >
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 text-text-secondary" />
            <Typography
              variant="small"
              as="span"
              className="text-text font-medium"
            >
              Phones
            </Typography>
          </nav>
          <header className="mb-8">
            <Typography
              variant="h1"
              as="h1"
              className="mb-2 text-text"
            >
              Mobile phones
            </Typography>
            <Typography
              variant="body"
              className="text-text-secondary"
            >
              {modelsCount} models
            </Typography>
          </header>

          <div className="flex flex-col tablet-lg:flex-row gap-8 items-start">
            <FiltersSidebar className="w-57.5 shrink-0" />

            <div className="flex-1 w-full flex flex-col gap-6">
              <div className="flex items-end justify-between gap-4 tablet-lg:justify-end">
                <FiltersTrigger />

                <Sort
                  value={sortBy}
                  onChange={setSortBy}
                />
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'border border-elements rounded-2xl p-6 h-96',
                      'flex items-center justify-center bg-card shadow-sm',
                    )}
                  >
                    <Typography
                      variant="body"
                      className="text-text-secondary"
                    >
                      Product Card Placeholder #{idx + 1}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
