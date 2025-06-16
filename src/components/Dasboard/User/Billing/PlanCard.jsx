import React from "react";
import { Button, Row, Col, Badge } from "react-bootstrap";
import { FaCheckCircle, FaCrown, FaCalendarAlt } from "react-icons/fa";
import styled from "styled-components";

// ✅ Main Card Container
const CardContainer = styled.div`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

// ✅ Header Section
const HeaderSection = styled.div`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--text-light);
  padding: 28px 32px;
  margin: -1px -1px 0 -1px;
  border-radius: 20px 20px 0 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }

  h4 {
    color: var(--heading-color);
    margin: 0;
    font-weight: bold;
    font-size: 1.25rem;
    letter-spacing: -0.01em;
  }

  @media (max-width: 768px) {
    padding: 20px 24px;
    
    h4 {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

// ✅ Content Section
const ContentSection = styled.div`
  padding: 32px;
  background: var(--card-background);

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

// ✅ Price Display
const PriceContainer = styled.div`
  margin-bottom: 16px;
`;

const PriceText = styled.span`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--heading-color);
  line-height: 1.1;
  background: linear-gradient(135deg, var(--heading-color) 0%, var(--text-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const CycleText = styled.span`
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--text-secondary);
  font-weight: 500;
  margin-left: 8px;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// ✅ Status Badge
const StatusBadge = styled(Badge)`
  background-color: var(--primary) !important;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  color: var(--heading-color) !important;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
`;

// ✅ Renewal Information
const RenewalInfo = styled.div`
  color: var(--text-secondary);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

// ✅ Button Container
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  @media (max-width: 767px) {
    margin-top: 24px;
  }
`;

// ✅ Primary Button
const PrimaryButton = styled(Button)`
  border-radius: 12px !important;
  font-weight: 600 !important;
  padding: 14px 28px !important;
  font-size: 1rem !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: none !important;
  min-width: 140px;
  text-transform: none !important;
  letter-spacing: 0.025em;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  color: var(--heading-color) !important;
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02) !important;
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4) !important;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
    
    &::before {
      left: 100%;
    }
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.3), 0 8px 25px rgba(0, 230, 118, 0.4) !important;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  }

  @media (max-width: 480px) {
    padding: 12px 20px !important;
    font-size: 0.9rem !important;
    min-width: 120px;
  }
`;

// ✅ Secondary Button
const SecondaryButton = styled(Button)`
  border-radius: 12px !important;
  font-weight: 600 !important;
  padding: 14px 28px !important;
  font-size: 1rem !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  min-width: 140px;
  text-transform: none !important;
  letter-spacing: 0.025em;
  background-color: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-secondary) !important;
  backdrop-filter: blur(10px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.08) !important;
    border-color: var(--border-color) !important;
    color: var(--text-light) !important;
    transform: translateY(-1px) !important;
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.08) !important;
    border-color: var(--primary) !important;
    color: var(--text-light) !important;
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.2) !important;
  }

  @media (max-width: 480px) {
    padding: 12px 20px !important;
    font-size: 0.9rem !important;
    min-width: 120px;
  }
`;

// ✅ Crown Icon
const CrownIcon = styled(FaCrown)`
  color: var(--heading-color);
  margin-right: 8px;
`;

// ✅ Calendar Icon
const CalendarIcon = styled(FaCalendarAlt)`
  color: var(--text-secondary);
  flex-shrink: 0;
`;

// ✅ Component
const PlanCard = ({
  planName = "Pro Plan",
  status = "Active",
  renewalDate = "Jan 24, 2025",
  price = 29,
  currency = "$",
  billingCycle = "month",
  onUpgrade,
  onCancel,
  isLoading = false
}) => {
  const handleUpgrade = () => {
    if (onUpgrade && !isLoading) {
      onUpgrade();
    }
  };

  const handleCancel = () => {
    if (onCancel && !isLoading) {
      onCancel();
    }
  };

  return (
    <CardContainer className="plan-card">
      {/* Header Section */}
      <HeaderSection>
        <Row className="align-items-center">
          <Col>
            <div className="d-flex align-items-center">
              <CrownIcon size={20} />
              <h4>{planName}</h4>
            </div>
          </Col>
          <Col xs="auto">
            <StatusBadge>
              <FaCheckCircle size={12} />
              {status}
            </StatusBadge>
          </Col>
        </Row>
      </HeaderSection>

      {/* Content Section */}
      <ContentSection>
        <Row className="align-items-center">
          <Col lg={7}>
            {/* Price Display */}
            <PriceContainer>
              <div className="d-flex align-items-baseline">
                <PriceText>
                  {currency}{price}
                </PriceText>
                <CycleText>
                  /{billingCycle}
                </CycleText>
              </div>
            </PriceContainer>

            {/* Renewal Information */}
            <RenewalInfo>
              <CalendarIcon size={14} />
              <span>Renews on {renewalDate}</span>
            </RenewalInfo>
          </Col>

          <Col xl={5} lg={6} className="text-lg-end mt-4 mt-lg-0">
            <ButtonContainer>
              <PrimaryButton
                onClick={handleUpgrade}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Upgrade Plan'}
              </PrimaryButton>
              <SecondaryButton
                variant="outline-secondary"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </SecondaryButton>
            </ButtonContainer>
          </Col>
        </Row>
      </ContentSection>
    </CardContainer>
  );
};

export default PlanCard;
