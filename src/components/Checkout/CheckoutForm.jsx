import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button as BSButton, Spinner } from "react-bootstrap";
import paymentService from "../services/paymentService";
import styled from "styled-components";
import { slideInRight } from "../common/Animations";

const CheckoutForm = ({ course }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [countdown, setCountdown] = useState(20);

  const discount = (course?.price || 0) * 0.10;
  const finalPrice = (course?.price || 0) - discount;

  // Card element change listener
  useEffect(() => {
    if (elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.on("change", (event) => {
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

  // Countdown timer for redirect
  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = '/';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [success]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      return;
    }

    if (!cardComplete) {
      setError("Please complete the card information.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: course?.title || 'Course Purchase',
        }
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // ✅ إرسال البيانات بشكل صحيح ككائن
      const apiResponse = await paymentService.createPaymentIntent({
        course,
        finalPrice,
        currency: "USD",
        paymentMethod
      });

      if (apiResponse?.success && apiResponse?.client_secret) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          apiResponse.client_secret,
          {
            payment_method: paymentMethod.id
          }
        );

        if (confirmError) {
          throw new Error(confirmError.message);
        }

        setSuccess(true);
      } else {
        throw new Error(apiResponse?.message || "Payment processing failed");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  

  if (success) {
    return (
      <CheckoutFormWrapper>
        <SuccessContainer>
          <SuccessIcon>✅</SuccessIcon>
          <h2>Payment Successful!</h2>
          <p>Thank you for purchasing <strong>{course?.title}</strong>.</p>
          <RedirectMessage>
            You will be redirected to the homepage in <CountdownSpan>{countdown}</CountdownSpan> seconds.
          </RedirectMessage>
          <p>Enjoy your learning journey!</p>
          <AccessButton onClick={() => window.location.href = '/my-courses'}>
            Access Your Course Now
          </AccessButton>
        </SuccessContainer>
      </CheckoutFormWrapper>
    );
  }

  return (
    <CheckoutFormWrapper>
      <form onSubmit={handleSubmit}>
        <FormSection>
          
          <CardElementContainer>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </CardElementContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <PaymentButton
            type="submit"
            disabled={isLoading || !stripe || !cardComplete}
          >
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" />
                <span style={{ marginLeft: '8px' }}>Processing...</span>
              </>
            ) : (
              `Pay $${finalPrice.toFixed(2)}`
            )}
          </PaymentButton>
        </FormSection>
      </form>
    </CheckoutFormWrapper>
  );
};

export default CheckoutForm;


const CheckoutFormWrapper = styled.div`
  animation: ${slideInRight} 0.8s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 24px;
`;



const CardElementContainer = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  background-color: var(--background-dark);
  transition: all 0.3s ease;
  margin-bottom: 24px;
  position: relative;
  
  .StripeElement {
    width: 100%;
    height: 40px;
    padding: 10px 0;
  }

  &.StripeElement--focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }

  &.StripeElement--complete {
    border-color: var(--primary);
  }

  &.StripeElement--invalid {
    border-color: #f44336;
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  margin: 10px 0;
  font-size: 0.9rem;
  text-align: center;
`;

const PaymentButton = styled(BSButton)`
  width: 100%;
  padding: 18px;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  color: var(--heading-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 230, 118, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    transform: none;
    cursor: not-allowed;
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 16px;
  border: 2px solid var(--primary);
  animation: ${slideInRight} 0.8s ease-out;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: bounce 1s ease-in-out;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const RedirectMessage = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 15px 0;
`;

const CountdownSpan = styled.span`
  font-weight: bold;
  color: var(--primary);
`;

const AccessButton = styled(BSButton)`
  margin-top: 20px;
  padding: 12px 30px;
  background: var(--primary);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }
`;



// ✅ Card Element Options
const getCSSVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: getCSSVar('--text-light'),
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
      fontSmoothing: 'antialiased',
      backgroundColor: getCSSVar('--card-background'),
      '::placeholder': {
        color: getCSSVar('--text-secondary'),
      },
      iconColor: getCSSVar('--primary'),
    },
    invalid: {
      color: '#f44336',
      iconColor: '#f44336',
    },
    complete: {
      color: getCSSVar('--primary'),
      iconColor: getCSSVar('--primary'),
    },
  },
  hidePostalCode: true,
}
