import { X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';

import { SearchBar } from '@/components/atoms/SearchBar';
import { Typography } from '@/components/atoms/Typography';
import { BurgerMenu } from '@/components/molecules/BurgerMenu';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import { Button } from '@/components/ui/Button/button';
import { ACTION_LINKS, NAV_LINKS } from '@/config/navigation';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative flex h-full items-center ${
    isActive ?
      'text-black after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-black'
    : 'text-text-secondary'
  }`;

export const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <header className="sticky top-0 flex h-12 w-full items-center bg-background shadow-[0px_1px_0px_0px_var(--elements)] desktop:h-16 desktop:gap-6">
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
        className={`shrink-0 pl-4 tablet-lg:block tablet-lg:pl-6 ${
          isSearchFocused ? 'hidden' : ''
        }`}
      >
        <img
          src="/favicon/favicon-48.png"
          alt="Lamay"
          className="size-8 tablet-lg:hidden"
        />

        <img
          src="/logo/lamay-logo-header-420.png"
          alt="Lamay logo"
          className="hidden h-5.5 w-auto tablet-lg:block"
        />
      </NavLink>

      <nav className="hidden h-full shrink-0 items-center gap-4.5 pr-4.5 pl-4 text-[14px] font-extrabold tablet-lg:flex desktop:gap-16 desktop:pr-0 desktop:pl-12 desktop:text-[16px]">
        {NAV_LINKS.map(({ to, label, ...linkProps }) => (
          <NavLink
            key={to}
            to={to}
            className={navLinkClass}
            {...linkProps}
          >
            <Typography
              variant="button"
              as="span"
            >
              {label}
            </Typography>
          </NavLink>
        ))}
      </nav>

      <div
        className={`flex h-full min-w-0 flex-1 tablet-lg:justify-center ${
          isSearchFocused ? 'pl-0 pr-0' : 'pr-3 pl-3'
        }`}
      >
        <SearchBar
          variant="header"
          onFocusChange={setIsSearchFocused}
          className="h-full w-full min-w-0 rounded-none border-2 border-t-0 border-b-0 border-r-0 border-elements px-3 text-[14px] has-focus:border tablet-lg:border-r-2 tablet-lg:border-b-elements tablet-lg:border-r-elements tablet-lg:max-w-125 tablet-lg:px-4 desktop:text-[17px]"
          iconClassName="size-4 tablet-lg:size-5 desktop:size-6"
        />
      </div>

      <div className=" hidden h-full shrink-0 items-center tablet-lg:flex">
        <LanguageSwitcher
          contentProps={{
            align: 'start',
            sideOffset: 0,
            collisionPadding: 0,
          }}
        />

        {ACTION_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            className={({ isActive }) =>
              `relative flex h-12 w-12 items-center justify-center border-2 border-t-0 border-l-0 border-b-0 border-elements hover:border-b-2 hover:border-l-2 hover:border-text-secondary desktop:h-16 desktop:w-16 ${
                isActive ?
                  'after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-black'
                : ''
              }`
            }
          >
            <Icon className="h-3.5 w-4.5 desktop:h-4.5" />
          </NavLink>
        ))}
      </div>

      <div
        className={`shrink-0 tablet-lg:hidden ${
          isSearchFocused ? 'hidden' : ''
        }`}
      >
        <BurgerMenu />
      </div>
    </header>
  );
};
