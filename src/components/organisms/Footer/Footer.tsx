import { ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/Button/button';
import { cn } from '@/lib/utils';

const logo = `${import.meta.env.BASE_URL}logo/lamay-logo-header-420.png`;

export const Footer = () => {
  const { t } = useTranslation('', {
    keyPrefix: 'components.organisms.footer',
  });

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
            className="h-5.5 w-auto"
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
              {t('github')}
            </Typography>
          </a>

          <NavLink
            to="contacts"
            className="text-(--color-text-secondary) transition-colors hover:text-black"
          >
            <Typography
              variant="uppercase"
              as="span"
            >
              {t('contacts')}
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
              {t('rights')}
            </Typography>
          </NavLink>
        </nav>

        <div className="flex items-center tablet:justify-self-end">
          <Button
            type="button"
            variant="ghost"
            onClick={scrollToTop}
            className={cn(
              'group cursor-pointer h-auto gap-3 rounded-none p-2',
              'text-(--color-text-secondary)',
              'hover:bg-transparent hover:text-black',
              'active:scale-95 active:text-black',
              'focus-visible:ring-1 focus-visible:ring-black',
            )}
          >
            <Typography
              variant="uppercase"
              as="span"
            >
              {t('backToTopBtn')}
            </Typography>
            <span
              className={cn(
                'flex size-8 items-center justify-center rounded-full border border-elements transition-colors',
                'group-hover:border-black group-active:border-black group-active:bg-black group-active:text-white',
              )}
            >
              <ChevronUp className="size-4" />
            </span>
          </Button>
        </div>
      </div>
    </footer>
  );
};
