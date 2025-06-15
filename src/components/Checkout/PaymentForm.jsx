import { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CreditCardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import paymentService from '../services/paymentService';
import Alert from '../common/Alert';
import LoadingSpinner from '../common/LoadingSpinner';



const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#FFFFFF',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    },
    invalid: {
      color: '#f44336',
      iconColor: '#f44336',
    },
    complete: {
      color: '#00E676',
      iconColor: '#00E676',
    },
  },
  hidePostalCode: true,
};

const PaymentForm = ({ course, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      postal_code: '',
      country: 'US'
    }
  });

  useEffect(() => {
    if (elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.on('change', (event) => {
          setCardComplete(event.complete);
          if (event.error) {
            setError(event.error.message);
          } else {
            setError(null);
          }
        });
      }
    }
  }, [elements]);

  const handleBillingChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBillingDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !cardComplete) {
      setError("Please complete all required fields.");
      return;
    }

    if (!billingDetails.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!billingDetails.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create Payment Method
      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      if (stripeError) {
        throw new Error(`Stripe Error: ${stripeError.message}`);
      }

      // Process Payment with API
      const paymentData = {
        courseId: course.id,
        amount: course.discountPrice,
        currency: 'USD',
        source: paymentMethod.id,
        educatorId: course.instructor.id,
        description: `Payment for ${course.title}`
      };

      const apiResponse = await paymentService.createPaymentIntent(paymentData);

      if (apiResponse.success || apiResponse.transaction) {
        onSuccess?.(apiResponse.transaction || apiResponse);
      } else {
        throw new Error(apiResponse.message || 'Payment processing failed');
      }

    } catch (err) {
      console.error('❌ Payment failed:', err);
      setError(err.message);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <CreditCardIcon className="w-5 h-5 text-primary" />
          Billing Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={billingDetails.name}
              onChange={(e) => handleBillingChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-border-color rounded-lg text-white placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={billingDetails.email}
              onChange={(e) => handleBillingChange('email', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-border-color rounded-lg text-white placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Address (Optional)
          </label>
          <input
            type="text"
            placeholder="123 Main Street"
            value={billingDetails.address.line1}
            onChange={(e) => handleBillingChange('address.line1', e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-border-color rounded-lg text-white placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              City (Optional)
            </label>
            <input
              type="text"
              placeholder="New York"
              value={billingDetails.address.city}
              onChange={(e) => handleBillingChange('address.city', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-border-color rounded-lg text-white placeholder-text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Country
            </label>
            <select
              value={billingDetails.address.country}
              onChange={(e) => handleBillingChange('address.country', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-border-color rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Payment Details</h3>

        <div className="p-4 bg-gray-800 border border-border-color rounded-lg">
          <p className="text-text-secondary text-sm mb-3">
            Test card: <strong className="text-white">4242 4242 4242 4242</strong> | Any future date | Any 3 digits
          </p>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      {/* Payment Summary */}
      <div className="border-t border-border-color pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-text-secondary">Total Amount:</span>
          <span className="text-xl font-bold text-primary">
            ${course.discountPrice.toFixed(2)}
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading || !stripe || !elements || !cardComplete || !billingDetails.name.trim() || !billingDetails.email.trim()}
          className="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <ShieldCheckIcon className="w-5 h-5" />
              Pay ${course.discountPrice.toFixed(2)}
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 mt-4 text-text-secondary text-sm">
          <ShieldCheckIcon className="w-4 h-4 text-primary" />
          <span>Secure payment powered by Stripe</span>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
