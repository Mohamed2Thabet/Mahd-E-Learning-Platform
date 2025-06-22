import React from 'react';
import { Button } from "react-bootstrap";
import {
  FaBell,
  FaDownload,
  FaMobileAlt,
  FaQuestionCircle,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import styled from 'styled-components';

// Styled Components
const StyledMobileContainer = styled.div`
  background-color: var(--card-background, #181d19) !important;
  color: var(--text-light, rgba(255, 255, 255, 0.87)) !important;
  border: 1px solid var(--border-color, #333);
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
  padding: 1.5rem;
  
  h4 {
    color: var(--heading-color, white);
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureIcon = styled.div`
  color: var(--primary, #00E676) !important;
  margin-right: 0.75rem;
  font-size: 1.1rem;
  min-width: 20px;
  display: flex;
  align-items: center;
`;

const FeatureText = styled.span`
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  font-size: 0.95rem;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const StyledDownloadButton = styled(Button)`
  background: transparent !important;
  border: 2px solid var(--primary, #00E676) !important;
  color: var(--primary, #00E676) !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 50px !important;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
  
  &:hover {
    background-color: var(--primary, #00E676) !important;
    border-color: var(--primary, #00E676) !important;
    color: var(--background-dark, #101310) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 230, 118, 0.3);
  }
  
  &:focus {
    background-color: var(--primary, #00E676) !important;
    border-color: var(--primary, #00E676) !important;
    color: var(--background-dark, #101310) !important;
    box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25) !important;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  svg {
    font-size: 18px;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--border-color, #333),
    transparent
  );
  margin: 1.5rem 0;
`;

export default function MobileFeatures() {
  const features = [
    {
      icon: <FaMobileAlt />,
      text: "Resume learning on-the-go",
    },
    {
      icon: <FaDownload />,
      text: "Download lessons for offline viewing",
    },
    {
      icon: <FaQuestionCircle />,
      text: "Take quizzes directly from your phone",
    },
    {
      icon: <FaBell />,
      text: "Get notifications and reminders",
    },
  ];

  const handleDownload = (platform) => {
    // Add your download logic here
    console.log(`Opening ${platform} store`);
  };

  return (
    <StyledMobileContainer>
      <h4>Mobile & Tablet Apps</h4>

      <FeaturesList>
        {features.map((item, idx) => (
          <FeatureItem key={idx}>
            <FeatureIcon>
              {item.icon}
            </FeatureIcon>
            <FeatureText>{item.text}</FeatureText>
          </FeatureItem>
        ))}
      </FeaturesList>

      <Divider />

      <ButtonContainer>
        <StyledDownloadButton onClick={() => handleDownload('App Store')}>
          <FaApple />
          <span>App Store</span>
        </StyledDownloadButton>
        <StyledDownloadButton onClick={() => handleDownload('Google Play')}>
          <FaGooglePlay />
          <span>Google Play</span>
        </StyledDownloadButton>
      </ButtonContainer>
    </StyledMobileContainer>
  );
}