import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/Button/button';

import { Typography } from '../Typography';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="xs"
      onClick={() => navigate(-1)}
      className="flex items-center gap-1 p-0 pr-3 cursor-pointer font-bold text-xs text-text-secondary"
    >
      <ChevronLeft className="size-4 text-text" />
      <Typography variant="button">Back</Typography>
    </Button>
  );
};
