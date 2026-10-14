import { Search } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/Input-group/input-group';

type SearchBarProps = {
  className?: string;
  iconClassName?: string;
};

export const SearchBar = ({ className, iconClassName }: SearchBarProps) => {
  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <Search className={iconClassName} />
      </InputGroupAddon>

      <InputGroupInput placeholder="Search products..." />
    </InputGroup>
  );
};
