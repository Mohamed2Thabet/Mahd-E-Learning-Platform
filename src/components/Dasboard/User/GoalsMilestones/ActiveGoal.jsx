import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { BsPencilSquare, BsClock, BsCheckCircle } from 'react-icons/bs';

const GoalCard = styled(Card)`
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 16px;
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 230, 118, 0.4);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.3),
      0 0 25px rgba(0, 230, 118, 0.15);
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
      var(--primary-dark, #00C853) 100%
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 230, 118, 0.02) 0%, 
      transparent 40%,
      rgba(0, 200, 83, 0.01) 100%
    );
    pointer-events: none;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const MainContent = styled.div`
  flex: 1;
`;

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  min-width: 120px;
`;

const GoalTitle = styled.h5`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--heading-color, white);
  line-height: 1.3;
  
  &:hover {
    color: var(--primary, #00E676);
    cursor: pointer;
  }
`;

const GoalDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
`;

const ProgressSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ProgressText = styled.span`
  font-weight: 600;
  color: var(--primary, #00E676);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressPercentage = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--heading-color, white);
`;

const StyledProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.percent}%;
  background: linear-gradient(90deg, 
    var(--primary, #00E676) 0%, 
    var(--primary-dark, #00C853) 100%
  );
  border-radius: 10px;
  transition: width 0.8s ease;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 230, 118, 0.4);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      transparent 100%
    );
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StyledBadge = styled(Badge)`
  background: rgba(0, 230, 118, 0.15) !important;
  color: var(--primary, #00E676) !important;
  border: 1px solid rgba(0, 230, 118, 0.3);
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 230, 118, 0.25) !important;
    border-color: rgba(0, 230, 118, 0.5);
    transform: translateY(-1px);
  }
`;

const DaysLeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 0.9rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  margin-bottom: 0.5rem;
`;

const DaysLeftNumber = styled.span`
  font-weight: 700;
  color: ${props => {
    if (props.days <= 5) return '#ff5722';
    if (props.days <= 10) return '#ff9800';
    return 'var(--primary, #00E676)';
  }};
  font-size: 1rem;
`;

const ActionButton = styled.button`
  background: rgba(0, 230, 118, 0.1);
  border: 1px solid rgba(0, 230, 118, 0.3);
  border-radius: 10px;
  padding: 0.75rem;
  color: var(--primary, #00E676);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 230, 118, 0.2);
    border-color: rgba(0, 230, 118, 0.5);
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => {
    if (props.percent >= 75) return 'var(--primary, #00E676)';
    if (props.percent >= 50) return '#ff9800';
    if (props.percent >= 25) return '#2196f3';
    return '#9e9e9e';
  }};
  box-shadow: 0 0 10px ${props => {
    if (props.percent >= 75) return 'rgba(0, 230, 118, 0.5)';
    if (props.percent >= 50) return 'rgba(255, 152, 0, 0.5)';
    if (props.percent >= 25) return 'rgba(33, 150, 243, 0.5)';
    return 'rgba(158, 158, 158, 0.5)';
  }};
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ActiveGoal = ({ title, description, percent, tags, daysLeft }) => (
  <GoalCard>
    <StatusIndicator percent={percent} />
    <CardContent>
      <Header>
        <MainContent>
          <GoalTitle>{title}</GoalTitle>
          <GoalDescription>{description}</GoalDescription>
        </MainContent>

        <SideContent>
          <DaysLeftContainer>
            <BsClock />
            <DaysLeftNumber days={daysLeft}>{daysLeft}</DaysLeftNumber>
            <span>days left</span>
          </DaysLeftContainer>
          <ActionButton title="Edit Goal">
            <BsPencilSquare />
          </ActionButton>
        </SideContent>
      </Header>

      <ProgressSection>
        <ProgressInfo>
          <ProgressText>
            <BsCheckCircle />
            Progress
          </ProgressText>
          <ProgressPercentage>{percent}%</ProgressPercentage>
        </ProgressInfo>
        <StyledProgressBar>
          <ProgressFill percent={percent} />
        </StyledProgressBar>
      </ProgressSection>

      <BadgeContainer>
        {tags.map(tag => (
          <StyledBadge key={tag}>{tag}</StyledBadge>
        ))}
      </BadgeContainer>
    </CardContent>
  </GoalCard>
);

export default ActiveGoal;