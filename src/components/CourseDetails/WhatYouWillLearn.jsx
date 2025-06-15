import styled from "styled-components";
import { fadeInUp } from "../common/Animations";
import { FaCheck } from "react-icons/fa";

const WhatYouWillLearn = ({ outcomes }) => (
  <SectionContainer>
    <SectionTitle>What you'll learn</SectionTitle>
    <LearningOutcomesGrid>
      {outcomes.map((outcome, index) => (
        <OutcomeItem key={index}>
          <FaCheck />
          <span>{outcome}</span>
        </OutcomeItem>
      ))}
    </LearningOutcomesGrid>
  </SectionContainer>
);
export default WhatYouWillLearn;

// Learning Outcomes Components
const SectionTitle = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 24px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 2px;
  }
`;
const SectionContainer = styled.div`
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 230, 118, 0.3);
  }
`;
const LearningOutcomesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`;

const OutcomeItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border-radius: 12px;
  background: rgba(0, 230, 118, 0.05);
  border: 1px solid rgba(0, 230, 118, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 230, 118, 0.1);
    border-color: rgba(0, 230, 118, 0.3);
    transform: translateY(-2px);
  }
  
  svg {
    color: var(--primary);
    margin-top: 4px;
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  span {
    font-weight: 500;
    line-height: 1.5;
  }
`;