import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Loader } from '@/components/atoms/Loader';
import CheckoutForm1 from '@/components/ui/CheckoutForm1/checkout-form-1';
import { useCartStore } from '@/stores/cartStore';

export const CheckoutPage = () => {
  const cartItem = useCartStore((state) => state.cartItems);

  const navigate = useNavigate();

  useEffect(() => {
    if (cartItem.length === 0) {
      navigate('/');
    }
  }, [cartItem.length, navigate]);

  return (
    <section className="mb-14 tablet:mb-16 tablet-lg:mb-20">
      <div className="container pb-1">
        {cartItem.length === 0 ?
          <Loader className="mt-60" />
        : <CheckoutForm1 />}
      </div>
    </section>
  );
};
