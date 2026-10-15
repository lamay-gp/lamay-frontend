import { ChevronUp } from 'lucide-react';
import { NavLink } from 'react-router';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';

const logo = `${import.meta.env.BASE_URL}logo/lamay-logo.svg`;

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="shadow-[0px_-1px_0px_0px_var(--color-elements)]">
      <div className="flex flex-col items-center gap-8 px-4 py-6 tablet:grid tablet:grid-cols-3 tablet:items-center tablet:gap-4 tablet:px-6 desktop:h-24 desktop:px-8">
        <NavLink
          to="/"
          className="shrink-0 tablet:justify-self-start"
        >
          <img
            src={logo}
            alt="LAMAY logo"
            className="h-7 w-auto"
          />
        </NavLink>

        <nav className="flex justify-center gap-10 tablet:justify-self-center tablet:gap-14">
          <a
            href="https://github.com/lamay-gp"
            target="_blank"
            rel="noreferrer"
            className="text-(--color-text-secondary) transition-colors hover:text-black"
          >
            <Typography
              variant="uppercase"
              as="span"
            >
              Github
            </Typography>
          </a>

          <NavLink
            to="#"
            onClick={(e) => e.preventDefault()}
            className="text-(--color-text-secondary) transition-colors hover:text-black"
          >
            <Typography
              variant="uppercase"
              as="span"
            >
              Contacts
            </Typography>
          </NavLink>

          <NavLink
            to="#"
            onClick={(e) => e.preventDefault()}
            className="text-(--color-text-secondary) transition-colors hover:text-black"
          >
            <Typography
              variant="uppercase"
              as="span"
            >
              Rights
            </Typography>
          </NavLink>
        </nav>

        <div className="flex items-center gap-4 tablet:justify-self-end">
          <Typography
            variant="uppercase"
            as="span"
            className="text-(--color-text-secondary)"
          >
            Back to top
          </Typography>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Back to top"
            className="rounded-full"
            onClick={scrollToTop}
          >
            <ChevronUp />
          </Button>
        </div>
      </div>
    </footer>
  );
};
