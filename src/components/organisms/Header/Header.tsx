import { Grid, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';

import { SearchBar } from '@/components/atoms/SearchBar';
import { Typography } from '@/components/atoms/Typography';
import { BurgerMenu } from '@/components/molecules/BurgerMenu';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import { Button } from '@/components/ui/Button/button';
import { ACTION_LINKS, NAV_LINKS } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative flex h-full items-center transition-colors',
    isActive ?
      'text-black after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-black font-semibold'
    : 'text-text-secondary hover:text-black',
  );

export const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <header className="sticky top-0 z-50 flex h-12 w-full items-center bg-background shadow-[0px_1px_0px_0px_var(--elements)] desktop:h-16 desktop:gap-6 mb-6 tablet:mb-8">
      {isSearchFocused && (
        <div className="flex size-12 shrink-0 items-center justify-center tablet-lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="h-12 w-12 shrink-0"
            onClick={() => {
              (document.activeElement as HTMLElement | null)?.blur();
              setIsSearchFocused(false);
            }}
            onMouseDown={(event) => event.preventDefault()}
          >
            <X className="size-5" />
          </Button>
        </div>
      )}

      <NavLink
        to="/"
        aria-label="home"
        className={cn(
          'shrink-0 pl-4 tablet-lg:block tablet-lg:pl-6 transition-opacity hover:opacity-80',
          isSearchFocused ? 'hidden' : '',
        )}
      >
        <img
          src={`${import.meta.env.BASE_URL}favicon/favicon-48.png`}
          alt="Lamay"
          className="size-8 tablet-lg:hidden"
        />

        <img
          src={`${import.meta.env.BASE_URL}logo/lamay-logo-header-420.png`}
          alt="Lamay logo"
          className="hidden h-5.5 w-auto tablet-lg:block"
        />
      </NavLink>

      <nav className="hidden h-full shrink-0 items-center gap-4.5 pr-4.5 pl-4 text-[14px] font-extrabold tablet-lg:flex desktop:gap-12 desktop:pr-0 desktop:pl-12 desktop:text-[16px]">
        {NAV_LINKS.map(({ to, label, ...linkProps }) => {
          const isCatalog = to === '/catalog';

          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isCatalog ?
                  cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl bg-button text-white shadow-sm transition-opacity hover:opacity-90',
                    isActive ? 'ring-2 ring-black/20' : '',
                  )
                : navLinkClass({ isActive })
              }
              {...linkProps}
            >
              {isCatalog && <Grid className="size-4" />}
              <Typography
                variant="button"
                as="span"
              >
                {label}
              </Typography>
            </NavLink>
          );
        })}
      </nav>

      <div
        className={cn(
          'flex h-full min-w-0 flex-1 desktop:justify-center',
          isSearchFocused ? 'px-0' : 'px-0 desktop:px-3',
        )}
      >
        <SearchBar
          variant="header"
          onFocusChange={setIsSearchFocused}
          className="h-full w-full min-w-0 rounded-none border border-t-0 border-b-0 border-r-0 border-elements px-3 text-[14px] has-focus:border tablet-lg:border-r tablet-lg:border-b-elements tablet-lg:border-r-elements tablet-lg:px-4 desktop:max-w-125 desktop:text-[17px]"
          iconClassName="size-4 tablet-lg:size-5 desktop:size-6"
        />
      </div>

      <div className="hidden h-full shrink-0 items-center tablet-lg:flex">
        <LanguageSwitcher
          contentProps={{
            align: 'start',
            sideOffset: 0,
            collisionPadding: 0,
          }}
          contentClassName="shadow-none"
        />

        {ACTION_LINKS.map(({ to, label, icon: Icon }) => {
          const isCart = to === '/cart';

          return (
            <NavLink
              key={to}
              to={to}
              aria-label={label}
              className={({ isActive }) =>
                cn(
                  'relative flex h-12 w-12 items-center justify-center border border-t-0 border-l-0 border-b-0 border-elements hover:border-text-secondary transition-colors desktop:h-16 desktop:w-16',
                  isActive &&
                    'after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-black',
                )
              }
            >
              <div className="relative flex items-center justify-center">
                <Icon className="h-3.5 w-4.5 desktop:h-4.5" />

                {isCart && totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-button text-[10px] font-bold text-white animate-pulse shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </div>
            </NavLink>
          );
        })}
      </div>

      <div
        className={cn(
          'shrink-0 tablet-lg:hidden',
          isSearchFocused ? 'hidden' : '',
        )}
      >
        <BurgerMenu />
      </div>
    </header>
  );
};
