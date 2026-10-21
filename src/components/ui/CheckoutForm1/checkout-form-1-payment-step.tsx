'use client';

import { CreditCard, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { CheckoutForm1Data } from '@/components/data/checkout-form-1-data';
import { CheckboxCheck } from '@/components/motion/checkbox-check';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Typography } from '../../atoms/Typography';

type CheckoutForm1PaymentStepProps = {
  formData: CheckoutForm1Data;
  onChange: (field: keyof CheckoutForm1Data, value: string | boolean) => void;
  onCardNumberChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
};

type PaymentField = 'cardNumber' | 'expiryDate' | 'cvv' | 'cardName';
type FieldErrors = Partial<Record<PaymentField, string>>;

export function CheckoutForm1PaymentStep({
  formData,
  onChange,
  onCardNumberChange,
  onExpiryChange,
}: CheckoutForm1PaymentStepProps) {
  const { t } = useTranslation('', {
    keyPrefix: 'components.organisms.checkoutForm.payment',
  });
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<PaymentField, boolean>>
  >({});

  const validateCardNumber = (value: string) => {
    if (!value.trim()) {
      return t('cardNumberRequired');
    }

    if (!/^\d{4}( \d{4}){3}$/.test(value)) {
      return t('cardNumberInvalid');
    }

    return '';
  };

  const validateExpiryDate = (value: string) => {
    if (!value.trim()) {
      return t('expiryRequired');
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      return t('expiryInvalid');
    }

    return '';
  };

  const validateCvv = (value: string) => {
    if (!value.trim()) {
      return t('cvvRequired');
    }

    if (!/^\d{3,4}$/.test(value)) {
      return t('cvvInvalid');
    }

    return '';
  };

  const validateCardName = (value: string) => {
    if (!value.trim()) {
      return t('cardNameRequired');
    }

    if (value.trim().length < 2) {
      return t('cardNameMinLength');
    }

    return '';
  };

  const validators: Record<PaymentField, (value: string) => string> = {
    cardNumber: validateCardNumber,
    expiryDate: validateExpiryDate,
    cvv: validateCvv,
    cardName: validateCardName,
  };

  const handleFieldChange = (
    field: PaymentField,
    event: React.ChangeEvent<HTMLInputElement>,
    value: string = event.target.value,
    updateValue: (value: string) => void = (nextValue) =>
      onChange(field, nextValue),
  ) => {
    const error = validators[field](value);

    updateValue(value);
    event.currentTarget.setCustomValidity(error);

    if (touchedFields[field]) {
      setErrors((current) => ({ ...current, [field]: error }));
    }
  };

  const handleFieldBlur = (
    field: PaymentField,
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    const error = validators[field](event.currentTarget.value);

    setTouchedFields((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: error }));
    event.currentTarget.setCustomValidity(error);
  };

  const handleFieldInvalid = (
    field: PaymentField,
    event: React.InvalidEvent<HTMLInputElement>,
  ) => {
    const error = validators[field](event.currentTarget.value);

    setTouchedFields((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: error }));
    event.currentTarget.setCustomValidity(error);
  };

  const handleCardNumberInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formatted = event.target.value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();

    handleFieldChange('cardNumber', event, formatted, onCardNumberChange);
  };

  const handleExpiryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = event.target.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2');

    handleFieldChange('expiryDate', event, formatted, onExpiryChange);
  };

  return (
    <div className="flex flex-col gap-6">
      <FieldSet>
        <FieldLegend className="text-sm font-medium">
          <Typography
            variant="body"
            className="font-semibold"
          >
            {t('method')}
            <span className="text-destructive">*</span>
          </Typography>
        </FieldLegend>
        <RadioGroup
          defaultValue="card"
          className="flex flex-col gap-3"
        >
          <FieldLabel htmlFor="card-payment-cN9m74K">
            <Field
              orientation="horizontal"
              className="rounded-lg border p-4"
            >
              <RadioGroupItem
                value="card"
                id="card-payment-cN9m74K"
              />
              <CreditCard
                className="text-muted-foreground size-5"
                aria-hidden="true"
              />
              <span className="flex-1">{t('card')}</span>
            </Field>
          </FieldLabel>
        </RadioGroup>
      </FieldSet>

      <FieldGroup>
        <Field data-invalid={!!errors.cardNumber}>
          <FieldLabel htmlFor="cardNumber-dK5p83L">
            <Typography
              variant="body"
              className="font-semibold"
            >
              {t('cardNumber')} <span className="text-destructive">*</span>
            </Typography>
          </FieldLabel>
          <Input
            id="cardNumber-dK5p83L"
            type="text"
            required
            pattern="\d{4}( \d{4}){3}"
            placeholder={t('cardNumberPlaceholder')}
            value={formData.cardNumber}
            onChange={handleCardNumberInput}
            onBlur={(event) => handleFieldBlur('cardNumber', event)}
            onInvalid={(event) => handleFieldInvalid('cardNumber', event)}
            aria-invalid={!!errors.cardNumber}
            aria-describedby={
              errors.cardNumber ? 'card-number-error-dK5p83L' : undefined
            }
            maxLength={19}
            className="h-9"
          />
          <FieldError id="card-number-error-dK5p83L">
            {errors.cardNumber}
          </FieldError>
        </Field>

        <div className="grid gap-4 md:grid-cols-3">
          <Field data-invalid={!!errors.expiryDate}>
            <FieldLabel htmlFor="expiryDate-fJ6r29M">
              <Typography
                variant="body"
                className="font-semibold"
              >
                {t('expiry')} <span className="text-destructive">*</span>
              </Typography>
            </FieldLabel>
            <Input
              id="expiryDate-fJ6r29M"
              required
              pattern="(0[1-9]|1[0-2])/\d{2}"
              placeholder={t('expiryPlaceholder')}
              value={formData.expiryDate}
              onChange={handleExpiryInput}
              onBlur={(event) => handleFieldBlur('expiryDate', event)}
              onInvalid={(event) => handleFieldInvalid('expiryDate', event)}
              aria-invalid={!!errors.expiryDate}
              aria-describedby={
                errors.expiryDate ? 'expiry-error-fJ6r29M' : undefined
              }
              maxLength={5}
              className="h-9"
            />
            <FieldError id="expiry-error-fJ6r29M">
              {errors.expiryDate}
            </FieldError>
          </Field>
          <Field data-invalid={!!errors.cvv}>
            <FieldLabel htmlFor="cvv-gH8s34N">
              <Typography
                variant="body"
                className="font-semibold"
              >
                {t('cvv')} <span className="text-destructive">*</span>
              </Typography>
            </FieldLabel>
            <InputGroup className="h-9">
              <InputGroupInput
                id="cvv-gH8s34N"
                type={showCvv ? 'text' : 'password'}
                required
                pattern="\d{3,4}"
                placeholder={t('cvvPlaceholder')}
                value={formData.cvv}
                onChange={(event) => handleFieldChange('cvv', event)}
                onBlur={(event) => handleFieldBlur('cvv', event)}
                onInvalid={(event) => handleFieldInvalid('cvv', event)}
                aria-invalid={!!errors.cvv}
                aria-describedby={errors.cvv ? 'cvv-error-gH8s34N' : undefined}
                maxLength={4}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={showCvv ? t('hideCvv') : t('showCvv')}
                  className="cursor-pointer hover:bg-transparent"
                  onClick={() => setShowCvv((current) => !current)}
                >
                  {showCvv ?
                    <EyeOff className="text-muted-foreground" />
                  : <Eye className="text-muted-foreground" />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldError id="cvv-error-gH8s34N">{errors.cvv}</FieldError>
          </Field>
          <Field data-invalid={!!errors.cardName}>
            <FieldLabel htmlFor="cardName-hI9t45O">
              <Typography
                variant="body"
                className="font-semibold"
              >
                {t('cardName')} <span className="text-destructive">*</span>
              </Typography>
            </FieldLabel>
            <Input
              id="cardName-hI9t45O"
              required
              pattern=".{2,}"
              placeholder={t('cardNamePlaceholder')}
              value={formData.cardName}
              onChange={(event) => handleFieldChange('cardName', event)}
              onBlur={(event) => handleFieldBlur('cardName', event)}
              onInvalid={(event) => handleFieldInvalid('cardName', event)}
              aria-invalid={!!errors.cardName}
              aria-describedby={
                errors.cardName ? 'card-name-error-hI9t45O' : undefined
              }
              className="h-9"
            />
            <FieldError id="card-name-error-hI9t45O">
              {errors.cardName}
            </FieldError>
          </Field>
        </div>

        <Field orientation="horizontal">
          <CheckboxCheck
            id="saveInfo-jK0u56P"
            checked={formData.saveInfo}
            onCheckedChange={(checked) =>
              onChange('saveInfo', checked as boolean)
            }
          />
          <FieldLabel
            htmlFor="saveInfo-jK0u56P"
            className="text-sm font-normal"
          >
            {t('saveInfo')}
          </FieldLabel>
        </Field>
      </FieldGroup>
    </div>
  );
}
