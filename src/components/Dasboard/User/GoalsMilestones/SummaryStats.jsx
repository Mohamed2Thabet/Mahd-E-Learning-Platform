import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import GoalSummary from './GoalSummary';
import { BsBullseye, BsCheckCircle, BsCalendarEvent } from 'react-icons/bs';

const StatsContainer = styled.div`
  padding: 2rem;
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  
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
      var(--primary, #00E676) 100%
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
      transparent 50%,
      rgba(0, 200, 83, 0.01) 100%
    );
    pointer-events: none;
  }
`;

const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--heading-color, white);
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    width: 3px;
    height: 20px;
    background: var(--primary, #00E676);
    border-radius: 2px;
    margin-right: 0.75rem;
    box-shadow: 0 0 8px rgba(0, 230, 118, 0.4);
  }
`;

const LastUpdated = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  font-weight: 400;
`;

const StyledRow = styled(Row)`
  margin: 0;
  gap: 1.5rem 0;
  position: relative;
  z-index: 1;
`;

const StyledCol = styled(Col)`
  padding: 0 1rem;
  display: flex;
  
  @media (max-width: 767px) {
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }
`;

const EnhancedGoalSummary = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.75rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(0, 230, 118, 0.3);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.2),
      0 0 20px rgba(0, 230, 118, 0.1);
    background: rgba(0, 230, 118, 0.03);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.accentColor || 'var(--primary, #00E676)'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.bgColor || 'rgba(0, 230, 118, 0.15)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  font-size: 1.5rem;
  color: ${props => props.iconColor || 'var(--primary, #00E676)'};
  border: 2px solid ${props => props.borderColor || 'rgba(0, 230, 118, 0.3)'};
  transition: all 0.3s ease;
  
  ${EnhancedGoalSummary}:hover & {
    transform: scale(1.1);
    box-shadow: 0 4px 15px ${props => props.shadowColor || 'rgba(0, 230, 118, 0.3)'};
  }
`;

const StatValue = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--heading-color, white);
  margin-bottom: 0.5rem;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.2;
`;

const StatChange = styled.div`
  font-size: 0.75rem;
  color: var(--primary, #00E676);
  margin-top: 0.5rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  
  ${EnhancedGoalSummary}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CustomGoalSummary = ({ icon, label, value, change, accentColor, bgColor, iconColor, borderColor, shadowColor }) => (
  <EnhancedGoalSummary accentColor={accentColor}>
    <IconWrapper
      bgColor={bgColor}
      iconColor={iconColor}
      borderColor={borderColor}
      shadowColor={shadowColor}
    >
      {icon}
    </IconWrapper>
    <StatValue>{value}</StatValue>
    <StatLabel>{label}</StatLabel>
    {change && <StatChange>{change}</StatChange>}
  </EnhancedGoalSummary>
);

const SummaryStats = () => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <StatsContainer>
      <StatsHeader>
        <StatsTitle>Overview Statistics</StatsTitle>
        <LastUpdated>Last updated: {getCurrentDate()}</LastUpdated>
      </StatsHeader>

      <StyledRow>
        <StyledCol md={4}>
          <CustomGoalSummary
            icon={<BsBullseye />}
            label="Active Goals"
            value="4"
            change="+1 this week"
            accentColor="var(--primary, #00E676)"
            bgColor="rgba(0, 230, 118, 0.15)"
            iconColor="var(--primary, #00E676)"
            borderColor="rgba(0, 230, 118, 0.3)"
            shadowColor="rgba(0, 230, 118, 0.3)"
          />
        </StyledCol>

        <StyledCol md={4}>
          <CustomGoalSummary
            icon={<BsCheckCircle />}
            label="Completed Goals"
            value="12"
            change="+3 this month"
            accentColor="var(--primary-dark, #00C853)"
            bgColor="rgba(0, 200, 83, 0.15)"
            iconColor="var(--primary-dark, #00C853)"
            borderColor="rgba(0, 200, 83, 0.3)"
            shadowColor="rgba(0, 200, 83, 0.3)"
          />
        </StyledCol>

        <StyledCol md={4}>
          <CustomGoalSummary
            icon={<BsCalendarEvent />}
            label="Upcoming Milestones"
            value="3"
            change="2 due this week"
            accentColor="#00BFA5"
            bgColor="rgba(0, 191, 165, 0.15)"
            iconColor="#00BFA5"
            borderColor="rgba(0, 191, 165, 0.3)"
            shadowColor="rgba(0, 191, 165, 0.3)"
          />
        </StyledCol>
      </StyledRow>
    </StatsContainer>
  );
};

export default SummaryStats;