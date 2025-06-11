import React, { useState } from 'react';
import styled from 'styled-components';

// Mock icons (since we can't import react-icons)
const LaptopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z" />
  </svg>
);

const MobileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
  </svg>
);

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: var(--heading-color);
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
`;

const SessionCard = styled.div`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 1rem 1.25rem;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const DeviceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-light);
  font-size: 0.9375rem;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  color: var(--text-secondary);
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  font-weight: 500;
  padding: 0.4375rem 0.875rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: #ef4444;
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LogoutAllButton = styled.button`
  background-color: #ef4444;
  border: 1px solid #ef4444;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  margin-top: 1rem;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.025em;

  &:hover:not(:disabled) {
    background-color: #dc2626;
    border-color: #dc2626;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background-color: rgba(0, 230, 118, 0.08);
  border: 1px solid rgba(0, 230, 118, 0.3);
  color: var(--primary);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ActiveSessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      lastActive: 'Now',
      icon: 'laptop',
      isCurrent: true
    },
    {
      id: 2,
      device: 'iPhone 13',
      lastActive: '2 hours ago',
      icon: 'mobile',
      isCurrent: false
    }
  ]);

  const [isLoading, setIsLoading] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogoutSession = async (sessionId) => {
    setIsLoading(prev => ({ ...prev, [sessionId]: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSessions(prev => prev.filter(session => session.id !== sessionId));
      setSuccessMessage('Session logged out successfully.');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to logout session');
    } finally {
      setIsLoading(prev => ({ ...prev, [sessionId]: false }));
    }
  };

  const handleLogoutAllSessions = async () => {
    setIsLoading(prev => ({ ...prev, all: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSessions(prev => prev.filter(session => session.isCurrent));
      setSuccessMessage('All other sessions have been logged out.');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to logout all sessions');
    } finally {
      setIsLoading(prev => ({ ...prev, all: false }));
    }
  };

  const otherSessions = sessions.filter(session => !session.isCurrent);

  return (
    <Container>
      <Title>Active Sessions & Devices</Title>

      {successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}

      {sessions.map(session => (
        <SessionCard key={session.id}>
          <DeviceInfo>
            <IconWrapper>
              {session.icon === 'laptop' ? <LaptopIcon /> : <MobileIcon />}
            </IconWrapper>
            <span>{session.device} — {session.lastActive}</span>
          </DeviceInfo>

          {!session.isCurrent && (
            <LogoutButton
              onClick={() => handleLogoutSession(session.id)}
              disabled={isLoading[session.id]}
            >
              {isLoading[session.id] ? 'Logging out...' : 'Log out'}
            </LogoutButton>
          )}
        </SessionCard>
      ))}

      {otherSessions.length > 0 && (
        <LogoutAllButton
          onClick={handleLogoutAllSessions}
          disabled={isLoading.all}
        >
          {isLoading.all ? 'Logging out all sessions...' : 'Log out all other sessions'}
        </LogoutAllButton>
      )}
    </Container>
  );
};

export default ActiveSessions;