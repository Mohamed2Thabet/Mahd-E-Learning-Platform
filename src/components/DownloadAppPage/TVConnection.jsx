import React from 'react';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FaAndroid, FaApple } from "react-icons/fa";
import { MdOutlineCastConnected } from "react-icons/md";
import styled from 'styled-components';

// Styled Components
const StyledMainCard = styled(Card)`
  background-color: var(--card-background, #181d19) !important;
  color: var(--text-light, rgba(255, 255, 255, 0.87)) !important;
  border: 1px solid var(--border-color, #333) !important;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  h5 {
    color: var(--heading-color, white);
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const StyledPlatformButton = styled(Button)`
  background-color: var(--primary, #00E676) !important;
  border-color: var(--primary, #00E676) !important;
  color: var(--background-dark, #101310) !important;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-dark, #00C853) !important;
    border-color: var(--primary-dark, #00C853) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
  }
  
  &:focus {
    background-color: var(--primary-dark, #00C853) !important;
    border-color: var(--primary-dark, #00C853) !important;
    box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25) !important;
  }
`;

const StyledInstructionCard = styled(Card)`
  background-color: var(--background-dark, #101310) !important;
  border: 1px solid var(--border-color, #333) !important;
  border-radius: 10px;
  
  h6 {
    color: var(--heading-color, white);
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  ol {
    color: var(--text-secondary, rgba(255, 255, 255, 0.6));
    padding-left: 1.2rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
`;

const StyledFormControl = styled(Form.Control)`
  background-color: var(--card-background, #181d19) !important;
  border: 1px solid var(--border-color, #333) !important;
  color: var(--text-light, rgba(255, 255, 255, 0.87)) !important;
  border-radius: 6px;
  
  &:focus {
    background-color: var(--card-background, #181d19) !important;
    border-color: var(--primary, #00E676) !important;
    color: var(--text-light, rgba(255, 255, 255, 0.87)) !important;
    box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25) !important;
  }
  
  &::placeholder {
    color: var(--text-secondary, rgba(255, 255, 255, 0.6)) !important;
  }
`;

const StyledConnectButton = styled(Button)`
  background-color: var(--primary, #00E676) !important;
  border-color: var(--primary, #00E676) !important;
  color: var(--background-dark, #101310) !important;
  font-weight: 500;
  border-radius: 6px;
  white-space: nowrap;
  
  &:hover {
    background-color: var(--primary-dark, #00C853) !important;
    border-color: var(--primary-dark, #00C853) !important;
    transform: translateY(-1px);
  }
  
  &:focus {
    background-color: var(--primary-dark, #00C853) !important;
    border-color: var(--primary-dark, #00C853) !important;
    box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25) !important;
  }
`;

const StyledTVImage = styled.img`
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

export default function TVConnection() {
  return (
    <StyledMainCard className="p-4 mb-5">
      <h5>Learn on the big screen</h5>
      <ButtonContainer>
        <StyledPlatformButton>
          <FaApple className="me-2" /> Apple TV
        </StyledPlatformButton>
        <StyledPlatformButton>
          <FaAndroid className="me-2" /> Android TV
        </StyledPlatformButton>
        <StyledPlatformButton>
          <MdOutlineCastConnected className="me-2" /> Chromecast
        </StyledPlatformButton>
      </ButtonContainer>
      <Row className="align-items-center">
        <Col md={6}>
          <StyledInstructionCard className="p-3">
            <h6>How to connect your TV</h6>
            <ol className="mt-3">
              <li>Open the MAHD app on your smart TV</li>
              <li>Go to "Device Sync"</li>
              <li>Enter the sync code shown below</li>
            </ol>
            <Form className="d-flex mt-3 gap-2">
              <StyledFormControl placeholder="Enter sync code" />
              <StyledConnectButton>Connect Device</StyledConnectButton>
            </Form>
          </StyledInstructionCard>
        </Col>
        <Col md={6}>
          <StyledTVImage
            src="image/tv-screen.png"
            alt="TV Sync Screen"
            className="img-fluid"
          />
        </Col>
      </Row>
    </StyledMainCard>
  );
}