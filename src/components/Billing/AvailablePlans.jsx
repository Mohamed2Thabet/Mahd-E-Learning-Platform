// components/Billing/AvailablePlans.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck, FaCrown, FaUsers, FaArrowUp, FaStar } from "react-icons/fa";


const AvailablePlans = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: 'basic',
      title: 'Basic',
      icon: <FaStar />,
      monthlyPrice: 9,
      yearlyPrice: 7,
      features: [
        '10 Courses Access',
        'Basic Email Support',
        'Mobile App Access',
        'Progress Tracking',
        'Basic Certificates'
      ],
      isCurrent: false,
      isUpgrade: false
    },
    {
      id: 'pro',
      title: 'Pro',
      icon: <FaCrown />,
      monthlyPrice: 29,
      yearlyPrice: 24,
      features: [
        'Unlimited Courses',
        'Priority Support',
        'Advanced Certificates',
        'Live Workshops',
        'Download for Offline',
        'Advanced Analytics',
        'Custom Learning Paths'
      ],
      isCurrent: true,
      isUpgrade: false
    },
    {
      id: 'team',
      title: 'Team',
      icon: <FaUsers />,
      monthlyPrice: 99,
      yearlyPrice: 79,
      features: [
        'Everything in Pro',
        'Team Management Dashboard',
        'API Access',
        '24/7 Phone Support',
        'Custom Integrations',
        'Advanced Reporting',
        'Dedicated Account Manager',
        'Custom Branding'
      ],
      isCurrent: false,
      isUpgrade: true
    }
  ];

  const getButtonText = (plan) => {
    if (plan.isCurrent) return 'Current Plan';
    if (plan.isUpgrade) return 'Upgrade Now';
    return 'Choose Plan';
  };

  const getIcon = (planId) => {
    const plan = plans.find(p => p.id === planId);
    return plan ? plan.icon : <FaStar />;
  };

  return (
    <Container>
      <Header>
        <Title>Choose Your Plan</Title>
        <Subtitle>
          Select the perfect plan for your learning journey
        </Subtitle>

        <BillingToggle>
          <ToggleOption
            active={!isYearly}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </ToggleOption>
          <ToggleOption
            active={isYearly}
            onClick={() => setIsYearly(true)}
          >
            Yearly
            <SavingsBadge>Save 20%</SavingsBadge>
          </ToggleOption>
        </BillingToggle>
      </Header>

      <PlansGrid>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            isCurrent={plan.isCurrent}
            isUpgrade={plan.isUpgrade}
          >
            {plan.isCurrent && (
              <PlanBadge type="current">Current</PlanBadge>
            )}
            {plan.isUpgrade && (
              <PlanBadge type="upgrade">Most Popular</PlanBadge>
            )}

            <PlanIcon type={plan.id}>
              {getIcon(plan.id)}
            </PlanIcon>

            <PlanTitle>{plan.title}</PlanTitle>

            <PlanPrice>
              <Currency>$</Currency>
              <Price>
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </Price>
              <Period>/month</Period>
              {isYearly && (
                <OriginalPrice>
                  ${plan.monthlyPrice}
                </OriginalPrice>
              )}
            </PlanPrice>

            <FeaturesList>
              {plan.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon>
                    <FaCheck size={10} color="white" />
                  </FeatureIcon>
                  {feature}
                </FeatureItem>
              ))}
            </FeaturesList>

            <ActionButton
              isCurrent={plan.isCurrent}
              isUpgrade={plan.isUpgrade}
              onClick={() => console.log(`Selected plan: ${plan.title}`)}
            >
              {getButtonText(plan)}
              {plan.isUpgrade && <FaArrowUp style={{ marginLeft: '8px' }} />}
            </ActionButton>
          </PlanCard>
        ))}
      </PlansGrid>
    </Container>
  );
};

export default AvailablePlans;

// ✅ Main container
const Container = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 40px;
  color: #ffffff;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }
`;

// ✅ Header section
const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #a0a0a0;
  margin: 0;
  line-height: 1.5;
`;

// ✅ Billing toggle
const BillingToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 32px 0;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ToggleOption = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#a0a0a0'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    background: ${props => props.active ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const SavingsBadge = styled.span`
  background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
`;

// ✅ Plans grid
const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// ✅ Plan card
const PlanCard = styled.div`
  position: relative;
  background: ${props => props.isCurrent ?
    'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(69, 160, 73, 0.05) 100%)' :
    'rgba(255, 255, 255, 0.03)'
  };
  border: 2px solid ${props => {
    if (props.isCurrent) return '#4CAF50';
    if (props.isUpgrade) return 'rgba(255, 107, 53, 0.5)';
    return 'rgba(255, 255, 255, 0.08)';
  }};
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${props => {
    if (props.isCurrent) return '#4CAF50';
    if (props.isUpgrade) return '#FF6B35';
    return 'rgba(255, 255, 255, 0.2)';
  }};
  }

  ${props => props.isUpgrade && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%);
    }
  `}
`;

const PlanBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${props => {
    if (props.type === 'current') return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    if (props.type === 'upgrade') return 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
    return 'transparent';
  }};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const PlanIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: ${props => {
    if (props.type === 'basic') return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
    if (props.type === 'pro') return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    if (props.type === 'team') return 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
    return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)';
  }};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const PlanTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #ffffff;
`;

const PlanPrice = styled.div`
  margin: 20px 0 32px 0;
`;

const Currency = styled.span`
  font-size: 20px;
  color: #a0a0a0;
  vertical-align: top;
`;

const Price = styled.span`
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
`;

const Period = styled.span`
  font-size: 16px;
  color: #a0a0a0;
  margin-left: 4px;
`;

const OriginalPrice = styled.span`
  font-size: 16px;
  color: #666;
  text-decoration: line-through;
  margin-left: 8px;
`;

// ✅ Features list
const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 32px 0;
  text-align: left;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  color: #e0e0e0;
  font-size: 15px;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureIcon = styled.div`
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

// ✅ Action button
const ActionButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  ${props => {
    if (props.isCurrent) {
      return `
        background: rgba(76, 175, 80, 0.2);
        color: #4CAF50;
        border: 2px solid #4CAF50;
        
        &:hover {
          background: rgba(76, 175, 80, 0.3);
        }
      `;
    } else if (props.isUpgrade) {
      return `
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        color: white;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 107, 53, 0.4);
        }
      `;
    } else {
      return `
        background: transparent;
        color: #ffffff;
        border: 2px solid rgba(255, 255, 255, 0.2);
        
        &:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
        }
      `;
    }
  }}
`;