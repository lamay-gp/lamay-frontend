'use client';

import { useState } from 'react';

import type { CheckoutForm1Data } from '@/components/data/checkout-form-1-data';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Typography } from './atoms/Typography';
import { CheckoutForm1CountryField } from './checkout-form-1-country-field';

type CheckoutForm1ShippingStepProps = {
  formData: CheckoutForm1Data;
  onChange: (field: keyof CheckoutForm1Data, value: string) => void;
};

type ContactField = 'address' | 'city' | 'region' | 'zipCode';
type FieldErrors = Partial<Record<ContactField, string>>;

const validateAddress = (value: string, label: string) => {
  if (!value.trim()) {
    return `${label} is required.`;
  }

  if (value.trim().length < 2) {
    return `${label} must contain at least 2 characters.`;
  }

  return '';
};

const validatePostalCode = (value: string) => {
  if (!/^\d{5}$/.test(value)) {
    return 'Postal code must contain exactly 5 digits.';
  }

  return '';
};

const validators: Record<ContactField, (value: string) => string> = {
  address: (value) => validateAddress(value, 'Street address'),
  city: (value) => validateAddress(value, 'City'),
  region: (value) => validateAddress(value, 'Region'),
  zipCode: (value) => validatePostalCode(value),
};

export function CheckoutForm1ShippingStep({
  formData,
  onChange,
}: CheckoutForm1ShippingStepProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<ContactField, boolean>>
  >({});

  const handleFieldChange = (
    field: ContactField,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const error = validators[field](value);

    onChange(field, value);
    event.currentTarget.setCustomValidity(error);

    if (touchedFields[field]) {
      setErrors((current) => ({ ...current, [field]: error }));
    }
  };

  const handleFieldBlur = (
    field: ContactField,
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    const error = validators[field](event.currentTarget.value);

    setTouchedFields((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: error }));
    event.currentTarget.setCustomValidity(error);
  };

  const handleFieldInvalid = (
    field: ContactField,
    event: React.InvalidEvent<HTMLInputElement>,
  ) => {
    const error = validators[field](event.currentTarget.value);

    setTouchedFields((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: error }));
    event.currentTarget.setCustomValidity(error);
  };

  return (
    <FieldGroup>
      <Field data-invalid={!!errors.address}>
        <FieldLabel htmlFor="address-qP4z17X">
          <Typography
            variant="body"
            className="font-semibold"
          >
            Street address <span className="text-destructive">*</span>
          </Typography>
        </FieldLabel>
        <Input
          id="address-qP4z17X"
          type="text"
          inputMode="text"
          required
          placeholder="Khreshchatyk Street"
          value={formData.address}
          onChange={(event) => handleFieldChange('address', event)}
          onBlur={(event) => handleFieldBlur('address', event)}
          onInvalid={(event) => handleFieldInvalid('address', event)}
          aria-invalid={!!errors.address}
          aria-describedby={
            errors.address ? 'address-error-qP4z17X' : undefined
          }
          className="h-9"
        />
        <FieldError id="address-error-qP4z17X">{errors.address}</FieldError>
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field data-invalid={!!errors.city}>
          <FieldLabel htmlFor="city-sT5y91B">
            <Typography
              variant="body"
              className="font-semibold"
            >
              City <span className="text-destructive">*</span>
            </Typography>
          </FieldLabel>
          <Input
            id="city-sT5y91B"
            type="text"
            inputMode="text"
            required
            placeholder="Kyiv"
            value={formData.city}
            onChange={(event) => handleFieldChange('city', event)}
            onBlur={(event) => handleFieldBlur('city', event)}
            onInvalid={(event) => handleFieldInvalid('city', event)}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'city-error-sT5y91B' : undefined}
            className="h-9"
          />
          <FieldError id="city-error-sT5y91B">{errors.city}</FieldError>
        </Field>
        <Field data-invalid={!!errors.region}>
          <FieldLabel htmlFor="region-wX3k85M">
            <Typography
              variant="body"
              className="font-semibold"
            >
              Region <span className="text-destructive">*</span>
            </Typography>
          </FieldLabel>
          <Input
            id="region-wX3k85M"
            type="text"
            inputMode="text"
            required
            placeholder="Kyiv Oblast"
            value={formData.region}
            onChange={(event) => handleFieldChange('region', event)}
            onBlur={(event) => handleFieldBlur('region', event)}
            onInvalid={(event) => handleFieldInvalid('region', event)}
            aria-invalid={!!errors.region}
            aria-describedby={
              errors.region ? 'region-error-wX3k85M' : undefined
            }
            className="h-9"
          />
          <FieldError id="region-error-wX3k85M">{errors.region}</FieldError>
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field data-invalid={!!errors.zipCode}>
          <FieldLabel htmlFor="zipCode-vZ9q46N">
            <Typography
              variant="body"
              className="font-semibold"
            >
              Postal code <span className="text-destructive">*</span>
            </Typography>
          </FieldLabel>
          <Input
            id="zipCode-vZ9q46N"
            type="text"
            inputMode="numeric"
            required
            maxLength={5}
            placeholder="01001"
            value={formData.zipCode}
            onChange={(event) => handleFieldChange('zipCode', event)}
            onBlur={(event) => handleFieldBlur('zipCode', event)}
            onInvalid={(event) => handleFieldInvalid('zipCode', event)}
            aria-invalid={!!errors.zipCode}
            aria-describedby={
              errors.zipCode ? 'zip-code-error-vZ9q46N' : undefined
            }
            className="h-9"
          />
          <FieldError id="zip-code-error-vZ9q46N">{errors.zipCode}</FieldError>
        </Field>
        <CheckoutForm1CountryField
          id="country-bH7l52P"
          value={formData.country}
          onValueChange={(value) => onChange('country', value)}
        />
      </div>
    </FieldGroup>
  );
}
