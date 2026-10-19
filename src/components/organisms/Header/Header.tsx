import { Grid2X2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { SearchBarHeader } from '@/components/atoms/SearchBarHeader';
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
  const { t } = useTranslation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const [isAnimating, setIsAnimating] = useState(false);
  const prevCountRef = useRef(totalCartCount);

  useEffect(() => {
    if (prevCountRef.current !== totalCartCount) {
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);

      prevCountRef.current = totalCartCount;
      return () => clearTimeout(timer);
    }
  }, [totalCartCount]);

  return (
    <header className="sticky top-0 z-50 flex h-12 w-full items-center justify-between tablet-lg:gap-4 bg-background shadow-[0_2px_6px_-2px_var(--elements)] desktop:h-16 desktop:gap-6">
      <div className="flex shrink-0 items-center h-full tablet-lg:gap-4 desktop:gap-6">
        {isSearchFocused && (
          <div className="flex size-12 shrink-0 items-center justify-center tablet-lg:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="h-12 w-12 shrink-0"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                (document.activeElement as HTMLElement | null)?.blur();
                setIsSearchFocused(false);
              }}
              onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <X className="size-5" />
            </Button>
          </div>
        )}

        <NavLink
          to="/"
          aria-label="home"
          className={cn(
            'shrink-0 tablet-lg:block transition-opacity hover:opacity-80 px-2 tablet-lg:px-4',
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

        <nav className="hidden h-full shrink-0 items-center gap-6 text-[14px] font-extrabold tablet-lg:flex desktop:gap-10 desktop:mr-0 desktop:text-[16px]">
          {NAV_LINKS.map(({ to, labelKey, ...linkProps }) => {
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
                {isCatalog && <Grid2X2 className="size-4" />}
                <Typography variant="button">{t(labelKey)}</Typography>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="min-w-0 h-full flex-1 tablet-lg:hidden">
        <SearchBarHeader
          onFocusChange={setIsSearchFocused}
          className="h-full min-w-0 rounded-none border border-t-0 border-b-0 border-r-0 border-elements px-3 text-[14px] has-focus:border tablet-lg:border-r tablet-lg:border-b-elements tablet-lg:border-r-elements tablet-lg:px-4 desktop:max-w-125 desktop:text-[17px]"
          iconClassName="size-4 tablet-lg:size-5 desktop:size-6"
        />
      </div>

      <div className="hidden h-full min-w-0 flex-1 items-center justify-end tablet-lg:flex">
        <SearchBarHeader
          onFocusChange={setIsSearchFocused}
          className="h-full min-w-0 rounded-none border border-t-0 border-b-0 border-r-0 border-elements px-3 text-[14px] has-focus:border tablet-lg:border-r tablet-lg:border-b-elements tablet-lg:border-r-elements tablet-lg:px-4 desktop:max-w-125 desktop:text-[17px]"
          iconClassName="size-4 tablet-lg:size-5 desktop:size-6"
        />
        <LanguageSwitcher
          contentProps={{
            align: 'start',
            sideOffset: 0,
            collisionPadding: 0,
          }}
          contentClassName="shadow-none"
        />

        {ACTION_LINKS.map(({ to, labelKey, icon: Icon }) => {
          const isCart = to === '/cart';

          return (
            <NavLink
              key={to}
              to={to}
              aria-label={t(labelKey)}
              className={({ isActive }) =>
                cn(
                  'relative flex h-12 w-12 shrink-0 items-center justify-center border border-t-0 border-l-0 border-b-0 border-elements hover:ring-0 hover:inset-ring-1 hover:inset-ring-elements transition-colors desktop:h-16 desktop:w-16',
                  isActive &&
                    'after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-black',
                )
              }
            >
              <div className="relative flex items-center justify-center">
                <Icon className="h-3.5 w-4.5 desktop:h-4.5" />

                {isCart && totalCartCount > 0 && (
                  <span
                    className={cn(
                      'absolute -top-2 -right-2.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-button text-[10px] font-bold text-white shadow-sm transition-all',
                      isAnimating && 'animate-pulse scale-110',
                    )}
                  >
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
