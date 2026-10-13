import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'rounded-full border border-[var(--icon-border)] bg-transparent text-[var(--text)] font-medium text-sm hover:border-[var(--text)] disabled:border-[var(--elements)] disabled:text-[#b4bdc4] aria-[current=page]:bg-[var(--text)] aria-[current=page]:text-[var(--white)] aria-[current=page]:border-[var(--text)]',
        outline:
          'border-border bg-background shadow-xs hover:bg-muted aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
        primaryAction:
          'w-full rounded-lg border-[var(--button)] bg-[var(--button)] font-bold text-sm text-white hover:shadow-[0_3px_13px_0_rgba(23,32,49,0.4)]',
        paginationArrow:
          'size-4  text-[var(--text)] hover:bg-transparent hover:text-[var(--icon-border)]',
      },
      size: {
        'default':
          'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        'xs': "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        'sm': 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        'lg': 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        'icon': 'size-9',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8 rounded-full',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
/*
//for CheckoutButton
import { Button } from '@/components/ui/button';
 <Button
        variant="primaryAction"
        className="py-[14px]"
        aria-label="Checkout"
        //onClick={}
      >
        Checkout
      </Button>

//for arrowButton
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
<Button
        variant="default"
        size="icon-sm"
        disabled={isDisabled}
        //onClick={}
      >
        <ChevronRight className="size-4" />
      </Button>
      <Button
        variant="default"
        size="icon-sm"
        disabled={isDisabled}
        //onClick={}
      >
        <ChevronLeft className="size-4" />
      </Button>

// for goUp
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
   <Button
        variant="default"
        size="icon-sm"
        //onClick={}
      >
        <ChevronUp className="size-4" />
      </Button>

//for pagination button
import { Button } from '@/components/ui/button';
      <Button
        variant="default"
        size="icon-sm"
        aria-current={isCurrentPage ? 'page' : undefined}
      >
        1
      </Button>

//for arrowBack without border
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
      <Button
        variant="paginationArrow"
        //onClick={}
      >
        <ChevronLeft className="size-4" />
      </Button> 

      //for arrowForward without border
import { ChevronRight } from 'lucide-react';
        <ChevronRight className="size-4 text-[var(--icon-border)]" />
      */
