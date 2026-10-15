import { HeartIcon, MenuIcon, ShoppingBagIcon } from 'lucide-react';
import { NavLink } from 'react-router';

import { SearchBar } from '@/components/atoms/SearchBar';
import { Typography } from '@/components/atoms/Typography';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import { Button } from '@/components/ui/Button/button';

const logo = `${import.meta.env.BASE_URL}logo/lamay-logo-1920.png`;

export const Header = () => {
  return (
    <header className="h-12 shadow-[0px_1px_0px_0px_var(--elements)] desktop:h-16 mb-6">
      {/* Mobile header */}
      <div className="flex h-12 w-full items-center justify-between tablet:hidden">
        <img
          src={logo}
          alt="Lamay logo"
          className="h-4 w-auto shrink-0 pl-4"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="h-12 w-12 shrink-0"
          onClick={() => {
            // TODO: open mobile menu
          }}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Tablet and desktop header */}
      <div className="hidden h-12 w-full items-center gap-3 tablet:flex desktop:h-16 desktop:gap-6">
        <img
          src={logo}
          alt="Lamay logo"
          className="h-5.5 w-auto shrink-0 pl-6"
        />

        <nav className="flex h-full shrink-0 items-center gap-4.5 pr-4.5 pl-4 text-[14px] font-extrabold desktop:gap-16 desktop:pr-0 desktop:pl-12 desktop:text-[16px]">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `relative flex h-full items-center ${
                isActive ?
                  'text-black after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-black'
                : 'text-text-secondary'
              }`
            }
          >
            <Typography
              variant="button"
              as="span"
            >
              Home
            </Typography>
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `relative flex h-full items-center ${
                isActive ?
                  'text-black after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-black'
                : 'text-text-secondary'
              }`
            }
          >
            <Typography
              variant="button"
              as="span"
            >
              Catalog
            </Typography>
          </NavLink>
        </nav>

        <div className="hidden min-w-0 flex-1 tablet:flex tablet:justify-center">
          <SearchBar
            className="h-12 w-full max-w-125 min-w-0 rounded-none border border-t-0 border-b-0 border-elements px-4 text-[14px] desktop:h-16 desktop:text-[17px]"
            iconClassName="size-5 desktop:size-6"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center pl-4.5">
          <LanguageSwitcher />

          <NavLink
            to="/favourites"
            aria-label="Favourites"
            className="flex h-12 w-12 items-center justify-center border-r border-elements desktop:h-16 desktop:w-16"
          >
            <HeartIcon className="h-3.5 w-4.5 desktop:h-4.5" />
          </NavLink>

          <NavLink
            to="/cart"
            aria-label="Shopping cart"
            className="flex h-12 w-12 items-center justify-center border border-t-0 border-b-0 border-l-0 border-elements desktop:h-16 desktop:w-16"
          >
            <ShoppingBagIcon className="h-3.5 w-4.5 desktop:h-4.5" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
