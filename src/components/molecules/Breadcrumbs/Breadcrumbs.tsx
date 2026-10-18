import { House } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { NavLink } from 'react-router';

import { Typography } from '@/components/atoms/Typography';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { BreadcrumbData } from '@/types/Products';

type Props = {
  items: BreadcrumbData[];
  className?: string;
};

export const Breadcrumbs = ({ items, className }: Props) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;
          const href = isLast ? undefined : item.to;

          return (
            <Fragment key={item.to ?? item.label}>
              {index > 0 && (
                <BreadcrumbSeparator className="size-4 text-(--color-text-secondary)" />
              )}

              <BreadcrumbItem>
                {href ?
                  <BreadcrumbLink
                    render={<NavLink to={href} />}
                    className="flex items-center gap-2 text-text transition-colors hover:text-(--color-text-secondary)"
                  >
                    {isFirst ?
                      <House className="size-4 text-text hover:text-(--color-text-secondary)" />
                    : <Typography
                        variant="body"
                        as="span"
                        className="font-bold text-text"
                      >
                        {item.label}
                      </Typography>
                    }
                  </BreadcrumbLink>
                : <BreadcrumbPage className="flex items-center gap-2 text-(--color-text-secondary)">
                    {isFirst ?
                      <House className="size-4" />
                    : <Typography
                        variant="body"
                        as="span"
                        className="text-text-secondary font-normal"
                      >
                        {item.label}
                      </Typography>
                    }
                  </BreadcrumbPage>
                }
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
