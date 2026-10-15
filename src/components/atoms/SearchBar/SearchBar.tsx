'use client';

import { Search } from 'lucide-react';
import { useRef, useState } from 'react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/Input-group/input-group';

type SearchBarProps = {
  className?: string;
  iconClassName?: string;
  variant?: 'header' | 'filter';
  onFocusChange?: (isFocused: boolean) => void;
};

export const SearchBar = ({
  className,
  iconClassName,
  variant = 'filter',
  onFocusChange,
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const trimmedQuery = query.trim();
  const isHeader = variant === 'header';

  const searchRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="static h-full w-full min-w-0 tablet-lg:relative tablet-lg:max-w-125"
      ref={searchRef}
    >
      <InputGroup className={className}>
        <InputGroupAddon>
          <Search className={iconClassName} />
        </InputGroupAddon>

        <InputGroupInput
          placeholder="Search products..."
          value={query}
          onChange={(event) => {
            const value = event.target.value;

            setQuery(value);
            setIsOpen(isHeader && Boolean(value.trim()));
          }}
          onFocus={() => onFocusChange?.(true)}
          onBlur={() => {
            if (isHeader) {
              setQuery('');
              setIsOpen(false);
            }
            onFocusChange?.(false);
          }}
          aria-expanded={isOpen && Boolean(trimmedQuery)}
          aria-autocomplete="list"
        />
      </InputGroup>

      {isOpen && trimmedQuery && (
        <div className="absolute top-full left-0 z-50 w-full border-2 border-t-0 border-x-0 border-elements bg-background tablet-lg:border-x-2">
          <ul>
            <li className="border-b border-elements last:border-b-0">
              <button
                type="button"
                className="w-full px-3 py-3 text-left text-sm text-text hover:bg-hover tablet-lg:px-4"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setIsOpen(false)}
              >
                {trimmedQuery}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
