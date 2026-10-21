'use client';

import emailjs from '@emailjs/browser';
import { ArrowLeft } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
  initialCheckoutForm1Data,
  type CheckoutForm1Data,
} from '@/components/data/checkout-form-1-data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCartStore } from '@/stores/cartStore';
import { useProductsStore } from '@/stores/productsStore';
import { createProductsHtml } from '@/utils/createProductsHtml';

import { CheckoutForm1ContactStep } from './checkout-form-1-contact-step';
import { CheckoutForm1OrderSummary } from './checkout-form-1-order-summary';
import { CheckoutForm1PaymentStep } from './checkout-form-1-payment-step';
import { CheckoutForm1Progress } from './checkout-form-1-progress';
import { CheckoutForm1ShippingStep } from './checkout-form-1-shipping-step';
import { BackButton } from '../../atoms/BackButton';
import { Typography } from '../../atoms/Typography';
import { toast } from '../toast';

export function CheckoutForm1() {
  const { t } = useTranslation('', {
    keyPrefix: 'components.organisms.checkoutForm',
  });
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<CheckoutForm1Data>(() => {
    try {
      const savedData = localStorage.getItem('checkoutForm1Data');

      return savedData ? JSON.parse(savedData) : initialCheckoutForm1Data;
    } catch (error) {
      console.error('localStorage reading error:', error);
      return initialCheckoutForm1Data;
    }
  });

  const products = useProductsStore((state) => state.products);

  const cartItems = useCartStore((state) => state.cartItems);

  const cartProducts = cartItems.flatMap((cartItem) => {
    const product = products.find((item) => item.itemId === cartItem.productId);

    return product ? { ...product, quantity: cartItem.quantity } : [];
  });

  const subtotalPrice = cartProducts.reduce((sum, product) => {
    const cartItem = cartItems.find(
      (cartItem) => cartItem.productId === product.itemId,
    );

    return sum + product.price * (cartItem?.quantity ?? 0);
  }, 0);

  const totalPrice = subtotalPrice;

  const clearCart = useCartStore((state) => state.clearCart);

  const STEP_COPY = [
    {
      title: t('titleContact'),
      description: t('descriptionContact'),
    },
    {
      title: t('titleShipping'),
      description: t('descriptionShipping'),
    },
    {
      title: t('titlePayment'),
      description: t('descriptionPayment'),
    },
  ];

  console.log(formData);
  const sendOrderConfirmation = async () => {
    const templateParams = {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone || 'Not provided',
      address: formData.address,
      city: formData.city,
      region: formData.region,
      zip_code: formData.zipCode,
      country: formData.country,
      order_id: `LM-${Date.now()}`,
      products_html: createProductsHtml(cartProducts),
      total_price: `${totalPrice.toLocaleString('en-US')} USD`,
    };

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      },
    );
  };

  const handleInputChange = (
    field: keyof CheckoutForm1Data,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  /** Card numbers read in four-digit groups, so the value is reformatted as it is typed. */
  const handleCardNumberChange = (value: string) => {
    const formatted = value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryChange = (value: string) => {
    const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    handleInputChange('expiryDate', formatted);
  };

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, STEP_COPY.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleOrderComplete = async () => {
    if (formData.saveInfo) {
      localStorage.setItem('checkoutForm1Data', JSON.stringify(formData));
    } else {
      localStorage.removeItem('checkoutForm1Data');
    }

    try {
      await sendOrderConfirmation();
      clearCart();

      toast.add({
        title: t('toastTitle'),
        description: t('toastDescription'),
        type: 'success',
      });
    } catch (error) {
      console.error(t('toastError'), error);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current?.checkValidity()) {
      formRef.current?.querySelector(':invalid')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    if (step < STEP_COPY.length) {
      nextStep();
      return;
    }

    handleOrderComplete();
  };

  return (
    <>
      <div className="mb-6 tablet:mb-10">
        <BackButton />
      </div>
      <Typography
        variant="h1"
        as="h1"
        className="mb-8"
      >
        {t('title')}
      </Typography>

      <CheckoutForm1Progress step={step} />

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-balance">
                  <Typography
                    variant="h3"
                    as="h3"
                  >
                    {STEP_COPY[step - 1].title}
                  </Typography>
                </CardTitle>
                <CardDescription>
                  <Typography variant="body">
                    {STEP_COPY[step - 1].description}
                  </Typography>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {step === 1 ?
                  <CheckoutForm1ContactStep
                    formData={formData}
                    onChange={handleInputChange}
                  />
                : null}

                {step === 2 ?
                  <CheckoutForm1ShippingStep
                    formData={formData}
                    onChange={handleInputChange}
                  />
                : null}

                {step === 3 ?
                  <CheckoutForm1PaymentStep
                    formData={formData}
                    onChange={handleInputChange}
                    onCardNumberChange={handleCardNumberChange}
                    onExpiryChange={handleExpiryChange}
                  />
                : null}

                <div
                  className={`flex ${step === 1 ? 'justify-end' : 'justify-between'} pt-6`}
                >
                  {step !== 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={step === 1}
                      className="h-9 p-5 pr-4 cursor-pointer"
                    >
                      <ArrowLeft data-icon="inline-start" />
                      <Typography variant="button">{t('backBtn')}</Typography>
                    </Button>
                  )}

                  <Button
                    type="submit"
                    className="h-9 p-5 cursor-pointer bg-button hover:bg-[#195de7]"
                  >
                    <Typography variant="button">
                      {step < STEP_COPY.length ?
                        t('continue')
                      : t('completeOrder')}
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <CheckoutForm1OrderSummary
              promoCode={formData.promoCode}
              onPromoCodeChange={(value) =>
                handleInputChange('promoCode', value)
              }
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default CheckoutForm1;
