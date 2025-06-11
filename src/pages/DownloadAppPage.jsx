import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import ConnectedDevices from "../components/DownloadAppPage/ConnectedDevices";
import MobileFeatures from "../components/DownloadAppPage/MobileFeatures";
import TVConnection from "../components/DownloadAppPage/TVConnection";
import styled from 'styled-components';

// Styled Components
const StyledPageContainer = styled.div`
  background-color: var(--background-dark, #101310);
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
  position: relative;
  
  /* Add subtle background pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 25% 25%, rgba(0, 230, 118, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, rgba(0, 230, 118, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

const PageTitle = styled.h2`
  color: var(--heading-color, white) !important;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--heading-color, white), var(--primary, #00E676));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.75rem;
  }
`;

const PageSubtitle = styled.p`
  color: var(--text-secondary, rgba(255, 255, 255, 0.6)) !important;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ContentRow = styled(Row)`
  align-items: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const MobileFeaturesColumn = styled(Col)`
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const AppPreviewColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledAppImage = styled.img`
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 100%;
  height: auto;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 50px rgba(0, 230, 118, 0.2);
  }
  
  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const ComponentSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 230, 118, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: floating 6s ease-in-out infinite;
  
  &:nth-child(1) {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    top: 60%;
    right: 10%;
    animation-delay: 2s;
  }
  
  &:nth-child(3) {
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
  
  @keyframes floating {
    0%, 100% {
      transform: translateY(0px);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px);
      opacity: 0.1;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SectionDivider = styled.div`
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--primary, #00E676),
    transparent
  );
  margin: 3rem 0;
  border-radius: 1px;
  opacity: 0.3;
`;

export default function DownloadAppPage() {
  return (
    <StyledPageContainer>
      {/* Floating background elements */}
      <FloatingElement />
      <FloatingElement />
      <FloatingElement />

      <StyledContainer>
        <PageTitle>Download the MAHD App</PageTitle>
        <PageSubtitle>
          Access your courses anywhere. Learn on mobile, tablet, or TV with the MAHD app.
        </PageSubtitle>

        <ContentRow>
          <MobileFeaturesColumn md={6}>
            <MobileFeatures />
          </MobileFeaturesColumn>
          <AppPreviewColumn md={6}>
            <StyledAppImage
              src="image/mahd-mobile-app.png"
              alt="MAHD App Preview"
            />
          </AppPreviewColumn>
        </ContentRow>

        <SectionDivider />

        <ComponentSection>
          <TVConnection />
        </ComponentSection>

        <ComponentSection>
          <ConnectedDevices />
        </ComponentSection>
      </StyledContainer>
    </StyledPageContainer>
  );
}