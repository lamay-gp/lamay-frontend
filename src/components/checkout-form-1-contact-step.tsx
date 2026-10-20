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

type CheckoutForm1ContactStepProps = {
  formData: CheckoutForm1Data;
  onChange: (field: keyof CheckoutForm1Data, value: string) => void;
};

type ContactField = 'email' | 'firstName' | 'lastName' | 'phone';
type FieldErrors = Partial<Record<ContactField, string>>;

const validateEmail = (value: string) => {
  if (!value.trim()) {
    return 'Email is required.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address.';
  }

  return '';
};

const validateName = (value: string, label: string) => {
  if (!value.trim()) {
    return `${label} is required.`;
  }

  if (value.trim().length < 2) {
    return `${label} must contain at least 2 characters.`;
  }

  return '';
};

const validatePhone = (value: string) => {
  if (!value.trim()) {
    return '';
  }

  if (!/^\+?[\d\s()-]{7,}$/.test(value)) {
    return 'Enter a valid phone number.';
  }

  return '';
};

const validators: Record<ContactField, (value: string) => string> = {
  email: validateEmail,
  firstName: (value) => validateName(value, 'First name'),
  lastName: (value) => validateName(value, 'Last name'),
  phone: validatePhone,
};

export function CheckoutForm1ContactStep({
  formData,
  onChange,
}: CheckoutForm1ContactStepProps) {
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
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email-kL9x23P">
          <Typography
            variant="body"
            className="font-semibold"
          >
            Email address <span className="text-destructive">*</span>
          </Typography>
        </FieldLabel>
        <Input
          id="email-kL9x23P"
          type="text"
          inputMode="email"
          required
          placeholder="john@example.com"
          value={formData.email}
          onChange={(event) => handleFieldChange('email', event)}
          onBlur={(event) => handleFieldBlur('email', event)}
          onInvalid={(event) => handleFieldInvalid('email', event)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error-kL9x23P' : undefined}
          className="h-9"
        />
        <FieldError id="email-error-kL9x23P">{errors.email}</FieldError>
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field data-invalid={!!errors.firstName}>
          <FieldLabel htmlFor="firstName-mN7z84Q">
            <Typography
              variant="body"
              className="font-semibold"
            >
              First name <span className="text-destructive">*</span>
            </Typography>
          </FieldLabel>
          <Input
            id="firstName-mN7z84Q"
            required
            placeholder="John"
            value={formData.firstName}
            onChange={(event) => handleFieldChange('firstName', event)}
            onBlur={(event) => handleFieldBlur('firstName', event)}
            onInvalid={(event) => handleFieldInvalid('firstName', event)}
            aria-invalid={!!errors.firstName}
            aria-describedby={
              errors.firstName ? 'first-name-error-mN7z84Q' : undefined
            }
            className="h-9"
          />
          <FieldError id="first-name-error-mN7z84Q">
            {errors.firstName}
          </FieldError>
        </Field>
        <Field data-invalid={!!errors.lastName}>
          <FieldLabel htmlFor="lastName-pL8w45T">
            <Typography
              variant="body"
              className="font-semibold"
            >
              Last name <span className="text-destructive">*</span>
            </Typography>
          </FieldLabel>
          <Input
            id="lastName-pL8w45T"
            required
            placeholder="Doe"
            value={formData.lastName}
            onChange={(event) => handleFieldChange('lastName', event)}
            onBlur={(event) => handleFieldBlur('lastName', event)}
            onInvalid={(event) => handleFieldInvalid('lastName', event)}
            aria-invalid={!!errors.lastName}
            aria-describedby={
              errors.lastName ? 'last-name-error-pL8w45T' : undefined
            }
            className="h-9"
          />
          <FieldError id="last-name-error-pL8w45T">
            {errors.lastName}
          </FieldError>
        </Field>
      </div>

      <Field data-invalid={!!errors.phone}>
        <FieldLabel htmlFor="phone-rM6n82S">
          <Typography
            variant="body"
            className="font-semibold"
          >
            Phone number
          </Typography>
        </FieldLabel>
        <Input
          id="phone-rM6n82S"
          type="tel"
          placeholder="+380 (50) 123-4567"
          value={formData.phone}
          onChange={(event) => handleFieldChange('phone', event)}
          onBlur={(event) => handleFieldBlur('phone', event)}
          onInvalid={(event) => handleFieldInvalid('phone', event)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error-rM6n82S' : undefined}
          className="h-9"
        />
        <FieldError id="phone-error-rM6n82S">{errors.phone}</FieldError>
      </Field>
    </FieldGroup>
  );
}
