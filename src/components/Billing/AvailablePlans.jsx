import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaCheck, FaCrown, FaUsers, FaArrowUp, FaStar, FaBolt, FaFire } from "react-icons/fa";

// Animations مع css helper
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// ✅ Styled Components مع CSS Variables
const Container = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 50px 40px;
  color: var(--text-light);
  backdrop-filter: blur(15px);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
    animation: ${css`${shimmer} 3s infinite`};
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.04);
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${css`${fadeInUp} 0.8s ease-out`};
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, var(--heading-color) 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const BillingToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  padding: 12px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  position: relative;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

// ✅ استخدام CSS Variables في ToggleOption
const ToggleOption = styled.button`
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  background: ${props => props.$active ?
    'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' :
    'transparent'
  };
  color: ${props => props.$active ? 'var(--heading-color)' : 'var(--text-secondary)'};
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    color: var(--heading-color);
    background: ${props => props.$active ?
    'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' :
    'rgba(255, 255, 255, 0.08)'
  };
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 14px 24px;
    font-size: 14px;
  }
`;

const SavingsBadge = styled.span`
  background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  margin-left: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  animation: ${css`${pulse} 2s infinite`};
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);

  @media (max-width: 480px) {
    margin-left: 0;
    margin-top: 8px;
    display: block;
    font-size: 11px;
    padding: 4px 8px;
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 40px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    gap: 24px;
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

// ✅ استخدام CSS Variables في PlanCard
const PlanCard = styled.div`
  position: relative;
  background: ${props => {
    if (props.$isCurrent) return 'linear-gradient(135deg, rgba(0, 230, 118, 0.15) 0%, rgba(0, 200, 83, 0.08) 100%)';
    if (props.$isUpgrade) return 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(247, 147, 30, 0.08) 100%)';
    return 'rgba(255, 255, 255, 0.04)';
  }};
  border: 2px solid ${props => {
    if (props.$isCurrent) return 'var(--primary)';
    if (props.$isUpgrade) return '#FF6B35';
    return 'var(--border-color)';
  }};
  border-radius: 20px;
  padding: 40px 28px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  animation: ${css`${fadeInUp} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    border-color: ${props => {
    if (props.$isCurrent) return 'var(--primary)';
    if (props.$isUpgrade) return '#FF6B35';
    return 'rgba(255, 255, 255, 0.3)';
  }};
  }

  ${props => props.$isUpgrade && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%);
    }

    &::after {
      content: '🔥';
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 30px;
      animation: ${css`${float} 3s ease-in-out infinite`};
    }
  `}

  ${props => props.$isCurrent && css`
    &::after {
      content: '✨';
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 25px;
      animation: ${css`${float} 2s ease-in-out infinite`};
    }
  `}

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 25px 15px;
  }
`;

// ✅ استخدام CSS Variables في PlanBadge
const PlanBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${props => {
    if (props.$type === 'current') return 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)';
    if (props.$type === 'upgrade') return 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
    return 'transparent';
  }};
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px ${props => {
    if (props.$type === 'current') return 'rgba(0, 230, 118, 0.3)';
    if (props.$type === 'upgrade') return 'rgba(255, 107, 53, 0.3)';
    return 'transparent';
  }};

  @media (max-width: 480px) {
    top: 15px;
    right: 15px;
    padding: 6px 12px;
    font-size: 10px;
  }
`;

// ✅ استخدام CSS Variables في PlanIcon
const PlanIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: ${props => {
    if (props.$type === 'basic') return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
    if (props.$type === 'pro') return 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)';
    if (props.$type === 'team') return 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)';
    return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)';
  }};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  box-shadow: 0 10px 30px ${props => {
    if (props.$type === 'basic') return 'rgba(33, 150, 243, 0.3)';
    if (props.$type === 'pro') return 'rgba(0, 230, 118, 0.3)';
    if (props.$type === 'team') return 'rgba(255, 107, 53, 0.3)';
    return 'rgba(156, 39, 176, 0.3)';
  }};
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(10deg) scale(1.1);
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    font-size: 24px;
    margin: 0 auto 20px;
  }
`;

// ✅ استخدام CSS Variables في النصوص
const PlanTitle = styled.h3`
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 12px 0;
  color: var(--heading-color);
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const PlanPrice = styled.div`
  margin: 24px 0 40px 0;
  position: relative;

  @media (max-width: 480px) {
    margin: 20px 0 30px 0;
  }
`;

const Currency = styled.span`
  font-size: 24px;
  color: var(--text-secondary);
  vertical-align: top;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Price = styled.span`
  font-size: 56px;
  font-weight: 900;
  color: var(--heading-color);
  line-height: 1;
  margin: 0 4px;

  @media (max-width: 480px) {
    font-size: 42px;
  }
`;

const Period = styled.span`
  font-size: 18px;
  color: var(--text-secondary);
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const OriginalPrice = styled.span`
  font-size: 18px;
  color: #666;
  text-decoration: line-through;
  margin-left: 12px;
  position: relative;

  &::after {
    content: '💸';
    position: absolute;
    right: -25px;
    top: -5px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    
    &::after {
      right: -20px;
      font-size: 14px;
    }
  }
`;

const SavingsText = styled.div`
  font-size: 14px;
  color: var(--primary);
  font-weight: 600;
  margin-top: 8px;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 40px 0;
  text-align: left;

  @media (max-width: 480px) {
    margin: 30px 0;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
  color: var(--text-light);
  font-size: 16px;
  line-height: 1.6;
  transition: all 0.3s ease;

  &:hover {
    color: var(--heading-color);
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    gap: 12px;
    margin-bottom: 15px;
  }
`;

const FeatureIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  box-shadow: 0 4px 10px rgba(0, 230, 118, 0.3);

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

// ✅ استخدام CSS Variables في ActionButton
const ActionButton = styled.button`
  width: 100%;
  padding: 18px 28px;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

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

  ${props => {
    if (props.$isCurrent) {
      return css`
        background: rgba(0, 230, 118, 0.2);
        color: var(--primary);
        border: 2px solid var(--primary);
        
        &:hover {
          background: rgba(0, 230, 118, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 230, 118, 0.3);
        }
      `;
    } else if (props.$isUpgrade) {
      return css`
        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
        color: white;
        
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(255, 107, 53, 0.5);
          
          &::before {
            left: 100%;
          }
        }
      `;
    } else {
      return css`
        background: transparent;
        color: var(--heading-color);
        border: 2px solid var(--border-color);
        
        &:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
          
          &::before {
            left: 100%;
          }
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    padding: 15px 20px;
    font-size: 14px;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

// Component مع تحديث الـ props
const AvailablePlans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);

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
        'Basic Certificates',
        '1 GB Storage'
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
        'Custom Learning Paths',
        '50 GB Storage'
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
        'Custom Branding',
        'Unlimited Storage'
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

  const calculateSavings = (monthly, yearly) => {
    const monthlyCost = monthly * 12;
    const yearlyCost = yearly * 12;
    const savings = monthlyCost - yearlyCost;
    return savings;
  };

  const handlePlanSelect = async (plan) => {
    if (plan.isCurrent) return;

    setLoadingPlan(plan.id);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log(`Selected plan: ${plan.title}`, {
        plan: plan.id,
        billingCycle: isYearly ? 'yearly' : 'monthly',
        price: isYearly ? plan.yearlyPrice : plan.monthlyPrice
      });

      alert(`Successfully selected ${plan.title} plan!`);

    } catch (error) {
      console.error('Plan selection error:', error);
      alert('Failed to select plan. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Choose Your Perfect Plan</Title>
        <Subtitle>
          Unlock your learning potential with our comprehensive plans designed for every learner
        </Subtitle>

        <BillingToggle>
          <ToggleOption
            $active={!isYearly}
            onClick={() => setIsYearly(false)}
          >
            <FaBolt style={{ marginRight: '8px' }} />
            Monthly
          </ToggleOption>
          <ToggleOption
            $active={isYearly}
            onClick={() => setIsYearly(true)}
          >
            <FaFire style={{ marginRight: '8px' }} />
            Yearly
            <SavingsBadge>Save 20%</SavingsBadge>
          </ToggleOption>
        </BillingToggle>
      </Header>

      <PlansGrid>
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.id}
            $isCurrent={plan.isCurrent}
            $isUpgrade={plan.isUpgrade}
            $delay={`${index * 0.2}s`}
          >
            {plan.isCurrent && (
              <PlanBadge $type="current">Current</PlanBadge>
            )}
            {plan.isUpgrade && (
              <PlanBadge $type="upgrade">Most Popular</PlanBadge>
            )}

            <PlanIcon $type={plan.id}>
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
                <>
                  <OriginalPrice>
                    ${plan.monthlyPrice}
                  </OriginalPrice>
                  <SavingsText>
                    Save ${calculateSavings(plan.monthlyPrice, plan.yearlyPrice)} per year
                  </SavingsText>
                </>
              )}
            </PlanPrice>

            <FeaturesList>
              {plan.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon>
                    <FaCheck size={12} color="white" />
                  </FeatureIcon>
                  {feature}
                </FeatureItem>
              ))}
            </FeaturesList>

            <ActionButton
              $isCurrent={plan.isCurrent}
              $isUpgrade={plan.isUpgrade}
              onClick={() => handlePlanSelect(plan)}
              disabled={loadingPlan === plan.id || plan.isCurrent}
            >
              {loadingPlan === plan.id ? (
                <LoadingSpinner />
              ) : (
                <>
                  {getButtonText(plan)}
                  {plan.isUpgrade && <FaArrowUp />}
                </>
              )}
            </ActionButton>
          </PlanCard>
        ))}
      </PlansGrid>
    </Container>
  );
};

export default AvailablePlans;
