import { Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@/components/ui/Button/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/Input-group/input-group';
import { useDebounce } from '@/hooks/useDebounce';
import { useProductsStore } from '@/stores/productsStore';
import { filterProducts } from '@/utils/filterProducts';

import { SearchResultItem } from './SearchResultItem';

type SearchBarHeaderProps = {
  className?: string;
  iconClassName?: string;
  onFocusChange?: (isFocused: boolean) => void;
};

const MAX_PREVIEW_RESULTS = 3;
const DEBOUNCE_MS = 300;

export const SearchBarHeader = ({
  className,
  iconClassName,
  onFocusChange,
}: SearchBarHeaderProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();
  const debouncedQuery = useDebounce(trimmedQuery, DEBOUNCE_MS);
  const products = useProductsStore((state) => state.products);

  const searchResults = useMemo(
    () => filterProducts(products, debouncedQuery),
    [products, debouncedQuery],
  );
  const previewResults = searchResults.slice(0, MAX_PREVIEW_RESULTS);

  const isCatalogPage = pathname === '/catalog';
  const isDropdownVisible = isOpen && !isCatalogPage && Boolean(debouncedQuery);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    onFocusChange?.(false);
  }, [onFocusChange]);

  const goTo = (path: string) => {
    closeSearch();
    navigate(path);
  };

  //обробник кліку поза пошуком
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) closeSearch();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, closeSearch]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') closeSearch();
    if (event.key === 'Enter' && trimmedQuery) {
      goTo(`/catalog?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <div
      ref={searchRef}
      className="relative h-full w-full min-w-0 tablet-lg:max-w-125"
    >
      <InputGroup className={className}>
        <InputGroupAddon className="mr-1">
          <Search className={iconClassName} />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(Boolean(e.target.value.trim()));
          }}
          onFocus={() => {
            onFocusChange?.(true);
            if (trimmedQuery) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isDropdownVisible}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
      </InputGroup>

      {isDropdownVisible && (
        <div className="fixed top-12 right-0 left-0 z-50 border-y border-elements bg-background tablet-lg:absolute tablet-lg:top-full tablet-lg:right-auto tablet-lg:left-0 tablet-lg:w-full tablet-lg:border">
          {previewResults.length > 0 ?
            <>
              <ul role="listbox">
                {previewResults.map((product) => (
                  <li
                    key={product.id}
                    role="option"
                    aria-selected={false}
                  >
                    <SearchResultItem
                      product={product}
                      onClick={() =>
                        goTo(`/product/${product.category}/${product.itemId}`)
                      }
                    />
                  </li>
                ))}
              </ul>
              {searchResults.length > MAX_PREVIEW_RESULTS && (
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer rounded-none border-t border-elements py-3 text-button hover:bg-transparent hover:text-button"
                  onClick={() =>
                    goTo(`/catalog?query=${encodeURIComponent(trimmedQuery)}`)
                  }
                >
                  View all results
                </Button>
              )}
            </>
          : <p className="px-4 py-3 text-sm text-text-secondary">
              No products found
            </p>
          }
        </div>
      )}
    </div>
  );
};
