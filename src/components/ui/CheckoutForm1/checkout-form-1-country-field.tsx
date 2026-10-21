'use client';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { countryOptions } from '@/components/data/checkout-form-1-data';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Typography } from '../../atoms/Typography';

type CheckoutForm1CountryFieldProps = {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
};

export function CheckoutForm1CountryField({
  id,
  value,
  onValueChange,
}: CheckoutForm1CountryFieldProps) {
  const { t } = useTranslation('', {
    keyPrefix: 'components.organisms.checkoutForm.country',
  });

  const [error, setError] = useState('');
  const validationInputRef = useRef<HTMLInputElement>(null);

  const validateCountry = (country: string) => (country ? '' : t('required'));

  const handleValueChange = (next: string) => {
    const validationError = validateCountry(next);

    setError(validationError);
    validationInputRef.current?.setCustomValidity(validationError);
    onValueChange(next);
  };

  const handleBlur = () => {
    const validationError = validateCountry(value);

    setError(validationError);
    validationInputRef.current?.setCustomValidity(validationError);
  };

  const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    const validationError = validateCountry(event.currentTarget.value);

    setError(validationError);
    event.currentTarget.setCustomValidity(validationError);
  };

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        <Typography
          variant="body"
          className="font-semibold"
        >
          {t('label')} <span className="text-destructive">*</span>
        </Typography>
      </FieldLabel>
      <Select
        value={value}
        onValueChange={(next) => next && handleValueChange(next)}
      >
        <SelectTrigger
          id={id}
          className="h-9! w-full"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onBlur={handleBlur}
        >
          <SelectValue>
            {(selected: string) => t('countryOption') ?? selected}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {countryOptions.map((country) => (
              <SelectItem
                key={country.value}
                value={country.value}
              >
                {t('countryOption')}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input
        ref={validationInputRef}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        value={value}
        required
        onChange={() => undefined}
        onInvalid={handleInvalid}
      />
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  );
}
