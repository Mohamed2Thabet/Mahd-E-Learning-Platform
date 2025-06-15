import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button as BSButton, Spinner } from "react-bootstrap";
import paymentService from "../services/paymentService";
import styled from "styled-components";
import { slideInRight } from "../common/Animations";


// ✅ CheckoutForm Component
const CheckoutForm = ({ course }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
    if (elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.on("change", (event) => {
          setCardComplete(event.complete);
        });
      }
    }
  }, [elements]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !cardComplete) {
      setError("Please complete the card information.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement
      });

      if (stripeError) {
        throw new Error(`Stripe Error: ${stripeError.message}`);
      }

      const paymentData = {
        courseId: course.id,
        amount: course.discountPrice,
        currency: "USD",
        source: paymentMethod.id,
        educatorId: course.instructor.id,
        description: `Payment for ${course.title}`
      };

      const apiResponse = await paymentService.createPaymentIntent(paymentData);

      if (apiResponse.success) {
        setSuccess(true);
      } else {
        throw new Error(apiResponse.message || "Payment processing failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <CheckoutFormWrapper>
        <h2>✅ Payment Successful!</h2>
        <p>Thank you for purchasing <strong>{course.title}</strong>.</p>
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

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <PaymentButton
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" />
                <span>Processing...</span>
              </>
            ) : (
              `Pay $${course.discountPrice.toFixed(2)}`
            )}
          </PaymentButton>
        </FormSection>
      </form>
    </CheckoutFormWrapper>
  );
};
export default CheckoutForm;

// --- Payment Components ---
const CheckoutFormWrapper = styled.div`
  animation: ${slideInRight} 0.8s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

const FormSection = styled.div`
  margin-bottom: 24px;
`;


const CardElementContainer = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px 20px 0;
  background-color: var(--background-dark);
  transition: all 0.3s ease;
  margin-bottom: 24px;
  margin-top: 24px;
  position: relative;
  
  pointer-events: auto !important;
  user-select: auto !important;
  z-index: 1;
  
  .StripeElement {
    pointer-events: auto !important;
    user-select: auto !important;
    width: 100% !important;
    height: 40px !important;
    
    iframe {
      pointer-events: auto !important;
      user-select: auto !important;
      width: 100% !important;
    }
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.StripeElement--focus::before {
    opacity: 1;
  }
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 230, 118, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:disabled {
    opacity: 0.7;
    transform: none;
    cursor: not-allowed;
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
