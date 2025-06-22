import styled from "styled-components";
import { slideInLeft } from "../common/Animations";
import { FaArrowLeft } from "react-icons/fa";

const CheckoutHeader = ({ courseTitle, hasSelectedCourse }) => (
  <HeaderWrapper>
    <BackButton onClick={() => window.history.back()} aria-label="Go back to course">
      <FaArrowLeft />
    </BackButton>
    <div>
      <HeaderTitle>Secure Checkout</HeaderTitle>
      <HeaderSubtitle>
        {hasSelectedCourse
          ? `Complete your purchase for "${courseTitle}"`
          : 'No course selected for checkout'
        }
      </HeaderSubtitle>
    </div>
  </HeaderWrapper>
);


export default CheckoutHeader;

// --- Header Components ---
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  animation: ${slideInLeft} 0.8s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

const BackButton = styled.button`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-light);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: var(--primary);
    color: var(--heading-color);
    transform: scale(1.1) rotate(-5deg);
    border-color: var(--primary);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

const HeaderTitle = styled.h1`
  color: var(--heading-color);
  font-weight: 800;
  margin: 0;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  background: linear-gradient(135deg, var(--heading-color) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderSubtitle = styled.p`
  color: var(--text-secondary);
  margin: 8px 0 0 0;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  line-height: 1.5;
`;