import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { Typography } from '@/components/atoms/Typography';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import { Button } from '@/components/ui/Button/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet/sheet';
import { ACTION_LINKS, NAV_LINKS } from '@/config/navigation';

export const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const tabletMediaQuery = window.matchMedia('(min-width: 48rem)');
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    tabletMediaQuery.addEventListener('change', handleBreakpointChange);
    return () =>
      tabletMediaQuery.removeEventListener('change', handleBreakpointChange);
  }, []);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            aria-label="Open menu"
            className="h-12 w-12 rounded-none  border-elements p-0"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="top"
        showCloseButton={false}
        className="gap-0 border-0 p-0 data-[side=top]:h-dvh tablet-lg:hidden"
      >
        <div className="flex h-12 shrink-0 items-center justify-between shadow-[0px_1px_0px_0px_var(--elements)]">
          <NavLink
            to="/"
            aria-label="home"
            onClick={close}
            className="pl-4"
          >
            <img
              src="/logo/lamay-logo-header-420.png"
              alt="Lamay"
              className="h-4 w-auto tablet-lg:h-5.5"
            />
          </NavLink>

          <Button
            variant="ghost"
            aria-label="Close menu"
            onClick={close}
            className="h-12 w-12 rounded-none border-l-2 border-elements p-0"
          >
            <XIcon className="size-5" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-6">
          {NAV_LINKS.map(({ to, label, ...rest }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) =>
                isActive ?
                  'text-black underline underline-offset-8'
                : 'text-text-secondary'
              }
              {...rest}
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

        <div className="flex h-16 shrink-0 border-t-2 border-elements">
          <div className="flex flex-1">
            <LanguageSwitcher
              className="h-full w-full border-0"
              contentClassName="w-(--anchor-width) translate-x-[2px] min-w-0 rounded-none border-2 border-l-0 ring-0 shadow-none"
              contentProps={{
                side: 'top',
                align: 'start',
                sideOffset: 0,
                collisionPadding: 0,
              }}
            />
          </div>

          {ACTION_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              aria-label={label}
              onClick={close}
              className={({ isActive }) =>
                `relative flex flex-1 items-center justify-center border-l-2 border-elements ${
                  isActive ?
                    'after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:bg-black'
                  : ''
                }`
              }
            >
              <Icon className="size-5" />
            </NavLink>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
