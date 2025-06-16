import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { BsTrophy, BsCalendar3, BsStar } from 'react-icons/bs';

const MilestoneCard = styled(Card)`
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 16px;
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  
  &:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: rgba(0, 230, 118, 0.4);
    box-shadow: 
      0 12px 35px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(0, 230, 118, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      var(--primary, #00E676) 0%, 
      var(--primary-dark, #00C853) 50%,
      #00BFA5 100%
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, 
      rgba(0, 230, 118, 0.03) 0%, 
      transparent 50%
    );
    pointer-events: none;
  }
`;

const CardContent = styled.div`
  padding: 2rem 1.75rem;
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, 
    rgba(0, 230, 118, 0.2) 0%, 
    rgba(0, 200, 83, 0.15) 100%
  );
  border: 2px solid rgba(0, 230, 118, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--primary, #00E676);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.2);
  
  ${MilestoneCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px rgba(0, 230, 118, 0.4);
    background: linear-gradient(135deg, 
      rgba(0, 230, 118, 0.3) 0%, 
      rgba(0, 200, 83, 0.25) 100%
    );
  }
`;

const MilestoneTitle = styled.h6`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--heading-color, white);
  line-height: 1.4;
  flex-grow: 1;
  
  &:hover {
    color: var(--primary, #00E676);
    cursor: pointer;
  }
`;

const DateSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  ${MilestoneCard}:hover & {
    background: rgba(0, 230, 118, 0.05);
    border-color: rgba(0, 230, 118, 0.2);
  }
`;

const DateIcon = styled(BsCalendar3)`
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  font-size: 0.9rem;
`;

const DateText = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  font-weight: 500;
`;

const PointsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, 
    rgba(0, 230, 118, 0.1) 0%, 
    rgba(0, 200, 83, 0.08) 100%
  );
  border: 1px solid rgba(0, 230, 118, 0.2);
  border-radius: 12px;
  margin-top: auto;
  transition: all 0.3s ease;
  
  ${MilestoneCard}:hover & {
    background: linear-gradient(135deg, 
      rgba(0, 230, 118, 0.15) 0%, 
      rgba(0, 200, 83, 0.12) 100%
    );
    border-color: rgba(0, 230, 118, 0.4);
    transform: translateY(-2px);
  }
`;

const PointsText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PointsIcon = styled(BsStar)`
  color: var(--primary, #00E676);
  font-size: 1rem;
`;

const PointsValue = styled.span`
  font-weight: 700;
  color: var(--primary, #00E676);
  font-size: 1.1rem;
`;

const PointsLabel = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary, #00E676);
  box-shadow: 0 0 12px rgba(0, 230, 118, 0.6);
  animation: completePulse 2s infinite;
  
  @keyframes completePulse {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1);
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.2);
    }
  }
`;

const Achievement = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    var(--primary, #00E676) 0%, 
    var(--primary-dark, #00C853) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  font-weight: bold;
  border: 2px solid var(--card-background, #181d19);
  box-shadow: 0 2px 8px rgba(0, 230, 118, 0.4);
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
  
  ${MilestoneCard}:hover & {
    opacity: 1;
    transform: scale(1) rotate(360deg);
  }
`;

const Milestone = ({ title, date, points }) => {
  const isCompleted = !date.includes('/');
  const displayIcon = isCompleted ? <BsTrophy /> : <BsStar />;

  return (
    <MilestoneCard>
      <StatusBadge />
      <Achievement>✓</Achievement>
      <CardContent>
        <IconContainer>
          {displayIcon}
        </IconContainer>

        <MilestoneTitle>{title}</MilestoneTitle>

        <DateSection>
          <DateIcon />
          <DateText>
            {isCompleted ? `Completed ${date}` : `Progress: ${date}`}
          </DateText>
        </DateSection>

        <PointsSection>
          <PointsText>
            <PointsIcon />
            <PointsValue>+{points}</PointsValue>
          </PointsText>
          <PointsLabel>Points</PointsLabel>
        </PointsSection>
      </CardContent>
    </MilestoneCard>
  );
};

export default Milestone;