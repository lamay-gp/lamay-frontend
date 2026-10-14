import { Button } from '@base-ui/react';

import type { ReactElement } from 'react';

type Props = {
  action: () => void;
  children: ReactElement;
};

export const QuantitySelectorButton = ({ action, children }: Props) => {
  return (
    <Button
      onClick={action}
      className="p-2 border-icon-border border rounded-full cursor-pointer"
    >
      {children}
    </Button>
  );
};
