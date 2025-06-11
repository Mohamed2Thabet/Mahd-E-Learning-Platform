import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const PrivacyControlsWrapper = styled.div`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h5`
  color: var(--heading-color);
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    border-radius: 2px;
  }
`;

const CustomSwitch = styled.div`
  position: relative;
  width: 48px;
  height: 24px;
  background-color: ${props => props.checked ? 'var(--primary)' : 'var(--border-color)'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid ${props => props.checked ? 'var(--primary)' : 'var(--border-color)'};
  box-shadow: ${props => props.checked ? '0 4px 12px rgba(0, 230, 118, 0.3)' : 'none'};

  &:hover {
    background-color: ${props => props.checked ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.checked ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: ${props => props.checked ? '#000' : 'white'};
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.checked ? 'translateX(24px)' : 'translateX(0)'};
  }
`;

const ControlItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(4px);
  }
`;

const ControlDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 16px;
`;

const ControlLabel = styled.span`
  color: var(--text-light);
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 4px;
`;

const ControlSubtext = styled.span`
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.4;
`;

const PrivacyControls = () => {
  const [controls, setControls] = useState({
    showProfile: true,
    allowLeaderboards: false,
    allowMessages: true,
    receiveEmails: false
  });

  const handleToggle = (controlName) => {
    setControls(prev => ({
      ...prev,
      [controlName]: !prev[controlName]
    }));
  };

  const privacyOptions = [
    {
      key: 'showProfile',
      label: 'Show profile to other users',
      description: 'Allow other students to view your public profile information',
      checked: controls.showProfile
    },
    {
      key: 'allowLeaderboards',
      label: 'Allow course activity on leaderboards',
      description: 'Display your progress and achievements on public leaderboards',
      checked: controls.allowLeaderboards
    },
    {
      key: 'allowMessages',
      label: 'Allow messages from other students',
      description: 'Enable direct messages from fellow learners in your courses',
      checked: controls.allowMessages
    },
    {
      key: 'receiveEmails',
      label: 'Receive promotional emails',
      description: 'Get updates about new courses, offers, and platform announcements',
      checked: controls.receiveEmails
    }
  ];

  return (
    <PrivacyControlsWrapper>
      <SectionTitle>Privacy Controls</SectionTitle>
      
      <div>
        {privacyOptions.map((option) => (
          <ControlItem key={option.key}>
            <ControlDescription>
              <ControlLabel>{option.label}</ControlLabel>
              <ControlSubtext>{option.description}</ControlSubtext>
            </ControlDescription>
            
            <CustomSwitch 
              checked={option.checked}
              onClick={() => handleToggle(option.key)}
            />
          </ControlItem>
        ))}
      </div>
    </PrivacyControlsWrapper>
  );
};

export default PrivacyControls;