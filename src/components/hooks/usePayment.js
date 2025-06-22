// hooks/usePayment.js
import { useState, useCallback } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import paymentService from '../services/paymentService';

export const usePayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  // ✅ Create Payment Intent
  const createPaymentIntent = useCallback(async (paymentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await paymentService.createPaymentIntent(paymentData);
      setClientSecret(response.clientSecret);
      setPaymentIntent(response.paymentIntent);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Confirm Card Payment
  const confirmCardPayment = useCallback(async (billingDetails = {}) => {
    if (!stripe || !elements || !clientSecret) {
      throw new Error('Stripe not ready or no client secret available');
    }

    setIsLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // ✅ Confirm the payment with Stripe
      const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billingDetails.name || 'Customer',
              email: billingDetails.email || '',
              address: billingDetails.address || {}
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (confirmedPaymentIntent.status === 'succeeded') {
        setPaymentIntent(confirmedPaymentIntent);
        return confirmedPaymentIntent;
      } else {
        throw new Error(`Payment failed with status: ${confirmedPaymentIntent.status}`);
      }

    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [stripe, elements, clientSecret]);

  // ✅ Reset payment state
  const resetPayment = useCallback(() => {
    setError(null);
    setPaymentIntent(null);
    setClientSecret(null);
  }, []);

  return {
    isLoading,
    error,
    paymentIntent,
    clientSecret,
    createPaymentIntent,
    confirmCardPayment,
    resetPayment,
    isReady: !!stripe && !!elements
  };
};
