import styled from "styled-components";
import { fadeInUp, glow, pulse } from "../common/Animations";
import { FaPlus, FaShoppingCart } from "react-icons/fa";
import { Button as BSButton } from "react-bootstrap";

const EmptyState = () => (
  <EmptyStateWrapper>
    <EmptyIcon>
      <FaShoppingCart />
    </EmptyIcon>
    <EmptyTitle>Your cart is empty</EmptyTitle>
    <EmptyDescription>
      Looks like you haven't selected any course yet. Browse our amazing courses and start your learning journey!
    </EmptyDescription>
    <BrowseCoursesButton onClick={() => window.location.href = '/courses'}>
      <FaPlus />
      Browse Courses
    </BrowseCoursesButton>
  </EmptyStateWrapper>
);
export default EmptyState;

// --- Empty State Components ---
const EmptyStateWrapper = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: var(--card-background);
  border: 2px dashed var(--border-color);
  border-radius: 20px;
  animation: ${fadeInUp} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;

  @media (max-width: 576px) {
    padding: 40px 20px;
  }
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const EmptyTitle = styled.h3`
  color: var(--heading-color);
  font-weight: 700;
  margin-bottom: 16px;
  font-size: clamp(1.5rem, 4vw, 2rem);
`;

const EmptyDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 32px;
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.6;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const BrowseCoursesButton = styled(BSButton)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-weight: 600;
  color: var(--heading-color);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 230, 118, 0.4);
    animation: ${glow} 1s ease-in-out;
  }
`;
