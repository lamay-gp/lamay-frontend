import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Typography } from '../Typography';

type Props = {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
};

export const ErrorMessage = ({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-6 text-center rounded-lg border border-destructive/20 bg-destructive/5 gap-3',
        className,
      )}
    >
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="w-5 h-5" />
        <Typography
          variant="h4"
          as="h4"
          className="font-semibold"
        >
          {title}
        </Typography>
      </div>

      <Typography
        variant="body"
        as="p"
        className="text-muted-foreground max-w-md"
      >
        {message}
      </Typography>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-2"
        >
          Try again
        </Button>
      )}
    </div>
  );
};
