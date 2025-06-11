// ThemeToggle.js
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// Styled Components
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const ToggleButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: ${props => props.theme === 'dark'
    ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
    : 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)'
  };
  color: ${props => props.theme === 'dark' ? '#000' : '#fff'};
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.theme === 'dark'
    ? '0 8px 32px rgba(0, 230, 118, 0.25)'
    : '0 8px 32px rgba(0, 123, 255, 0.25)'
  };
  overflow: hidden;
  min-width: 160px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme === 'dark'
    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)'
  };
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme === 'dark'
    ? '0 12px 40px rgba(0, 230, 118, 0.35)'
    : '0 12px 40px rgba(0, 123, 255, 0.35)'
  };
    
    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-1px);
    transition: transform 0.1s ease;
  }

  &:focus {
    outline: none;
    box-shadow: ${props => props.theme === 'dark'
    ? '0 0 0 3px rgba(0, 230, 118, 0.3), 0 12px 40px rgba(0, 230, 118, 0.35)'
    : '0 0 0 3px rgba(0, 123, 255, 0.3), 0 12px 40px rgba(0, 123, 255, 0.35)'
  };
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 16px;
  transition: transform 0.3s ease;
  
  ${ToggleButton}:hover & {
    transform: scale(1.1) rotate(10deg);
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
  font-weight: 600;
  text-shadow: ${props => props.theme === 'dark' ? 'none' : '0 1px 2px rgba(0,0,0,0.1)'};
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  background: ${props => props.theme === 'dark' ? '#00E676' : '#007BFF'};
  border: 2px solid ${props => props.theme === 'dark' ? '#000' : '#fff'};
  border-radius: 50%;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 ${props => props.theme === 'dark'
    ? 'rgba(0, 230, 118, 0.7)'
    : 'rgba(0, 123, 255, 0.7)'
  };
    }
    70% {
      box-shadow: 0 0 0 10px transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleContainer>
      <ToggleButton onClick={toggleTheme} theme={theme}>
        <StatusIndicator theme={theme} />
        <IconWrapper>
          {theme === 'dark' ? '☀️' : '🌙'}
        </IconWrapper>
        <ButtonText theme={theme}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </ButtonText>
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;