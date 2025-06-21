import styled from "styled-components";
import { slideInRight } from "../common/Animations";
import CheckoutForm from "./CheckoutForm";

const PaymentSection = ({ course }) => (
  <PaymentSectionCard>
    <h3 style={{ color: 'var(--heading-color)', marginBottom: '28px', fontWeight: '700' }}>
      Payment Summary
    </h3>
    <PriceRow>
      <span>Original Price:</span>
      <span>${course?.price?.toFixed(2)}</span>
    </PriceRow>
    <PriceRow>
      <span>Discount:</span>
      <DiscountAmount>-${(course?.price * .10)?.toFixed(2)}</DiscountAmount>
    </PriceRow>
    <TotalRow>
      <span>Total Amount:</span>
      <span>${(course?.price * 0.90).toFixed(2)}</span>
    </TotalRow>
    <CheckoutForm course={course} />
  </PaymentSectionCard>
);

export default PaymentSection;



// --- Payment Section Component ---
const PaymentSectionCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 32px;
  background: var(--background-dark);
  animation: ${slideInRight} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), transparent);
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
`;

const TotalRow = styled(PriceRow)`
  color: var(--heading-color);
  font-weight: 700;
  font-size: 1.3rem;
  border-top: 2px solid var(--border-color);
  padding-top: 20px;
  margin-top: 16px;
  margin-bottom: 0;
`;

const DiscountAmount = styled.span`
  color: var(--primary);
  font-weight: 600;
`;
