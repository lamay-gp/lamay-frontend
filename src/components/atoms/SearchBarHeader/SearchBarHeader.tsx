import { Search } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

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
  const isCatalogPage = pathname === '/catalog';

  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('query') ?? '';
  const [localQuery, setLocalQuery] = useState('');

  const query = isCatalogPage ? urlQuery : localQuery;
  const setUrlQuery = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value.trim()) next.set('query', value);
        else next.delete('query');
        return next;
      },
      { replace: true },
    );
  };

  const [isFocusedInput, setIsFocusedInput] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();
  const debouncedQuery = useDebounce(trimmedQuery, DEBOUNCE_MS);
  const products = useProductsStore((state) => state.products);

  const searchResults = useMemo(
    () => filterProducts(products, debouncedQuery),
    [products, debouncedQuery],
  );
  const previewResults = searchResults.slice(0, MAX_PREVIEW_RESULTS);

  const isDropdownVisible =
    isFocusedInput && !isCatalogPage && Boolean(debouncedQuery);

  const closeSearch = useCallback(() => {
    setIsFocusedInput(false);
    if (!isCatalogPage) setLocalQuery('');
    onFocusChange?.(false);
  }, [onFocusChange, isCatalogPage]);

  const goTo = (path: string) => {
    closeSearch();
    navigate(path);
  };

  const goToCatalog = () =>
    goTo(`/catalog?query=${encodeURIComponent(trimmedQuery)}`);

  //обробник кліку поза пошуком
  useEffect(() => {
    if (!isFocusedInput) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) closeSearch();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isFocusedInput, closeSearch]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') closeSearch();
    if (event.key === 'Enter' && trimmedQuery && !isCatalogPage) {
      goToCatalog();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (isCatalogPage) setUrlQuery(value);
    else setLocalQuery(value);

    setIsFocusedInput(true);
  };

  const handleFocus = () => {
    onFocusChange?.(true);
    setIsFocusedInput(true);
  };

  return (
    <div
      ref={searchRef}
      className="relative h-full w-full min-w-0 tablet-lg:max-w-125"
    >
      <InputGroup
        className={`${className} shadow-none ring-0! focus-within:ring-0!`}
      >
        <InputGroupAddon className="mr-1 pl-0">
          <Search className={iconClassName} />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search products..."
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
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
                  className="w-full cursor-pointer rounded-none py-3 text-button hover:bg-transparent hover:text-button"
                  onClick={goToCatalog}
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
