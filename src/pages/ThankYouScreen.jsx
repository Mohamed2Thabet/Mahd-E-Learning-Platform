import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaRocket, FaStar, FaHeart, FaArrowRight, FaHome } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

// ✅ Component
const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userSelections, setUserSelections] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get user selections from localStorage and state
    const learningGoal = localStorage.getItem('learningGoal') || location.state?.learningGoal;
    const profession = localStorage.getItem('selectedProfession') || location.state?.profession;

    setUserSelections({
      learningGoal: learningGoal === 'skipped' ? 'Not specified' : learningGoal,
      profession: profession === 'skipped' ? 'Not specified' : profession
    });

    // Clear localStorage after successful completion
    setTimeout(() => {
      localStorage.removeItem('learningGoal');
      localStorage.removeItem('selectedProfession');
    }, 5000);
  }, [location.state]);

  const handleStartLearning = async () => {
    setIsLoading(true);

    try {
      // Simulate API call to create user profile
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to dashboard or courses
      navigate('/courses', {
        state: {
          newUser: true,
          selections: userSelections
        }
      });
    } catch (error) {
      console.error('Error starting learning journey:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedValue = (value) => {
    if (!value || value === 'Not specified') return 'Not specified';

    // Format kebab-case to readable format
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <ThankYouContainer>
      {/* Floating Decorations */}
      <FloatingDecoration
        $top="15%"
        $left="10%"
        $size="24px"
        $duration="4s"
        $mobileSize="20px"
      >
        <FaRocket />
      </FloatingDecoration>

      <FloatingDecoration
        $top="25%"
        $left="85%"
        $size="20px"
        $duration="3.5s"
        $delay="1s"
        $mobileSize="16px"
      >
        <FaHeart />
      </FloatingDecoration>

      <SparkleDecoration
        $top="10%"
        $right="20%"
        $size="18px"
        $duration="2.5s"
        $mobileSize="14px"
      >
        <FaStar />
      </SparkleDecoration>

      <SparkleDecoration
        $top="70%"
        $right="10%"
        $size="16px"
        $duration="3s"
        $delay="0.5s"
        $mobileSize="12px"
      >
        <FaStar />
      </SparkleDecoration>

      <ContentBox>
        <ProgressComplete>Setup Complete ✨</ProgressComplete>

        <SuccessIcon>
          <FaCheckCircle />
        </SuccessIcon>

        <Header>
          <MainTitle>Welcome to MAHD! 🎉</MainTitle>
          <Subtitle>
            Your learning journey is about to begin
          </Subtitle>
          <Description>
            Thank you for taking the time to set up your profile. We've personalized your experience based on your goals and profession.
          </Description>
        </Header>

        <SummarySection>
          <SummaryTitle>
            <FaStar />
            Your Learning Profile
          </SummaryTitle>

          <SummaryItem>
            <SummaryLabel>Learning Goal:</SummaryLabel>
            <SummaryValue>
              {getFormattedValue(userSelections.learningGoal)}
            </SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Profession:</SummaryLabel>
            <SummaryValue>
              {getFormattedValue(userSelections.profession)}
            </SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Account Status:</SummaryLabel>
            <SummaryValue>Active</SummaryValue>
          </SummaryItem>
        </SummarySection>

        <ActionsSection>
          <PrimaryButton
            onClick={handleStartLearning}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Setting up...
              </>
            ) : (
              <>
                <FaRocket />
                Start Learning
              </>
            )}
          </PrimaryButton>

          <SecondaryButton to="/">
            <FaHome />
            Back to Home
          </SecondaryButton>
        </ActionsSection>
      </ContentBox>
    </ThankYouContainer>
  );
};

export default ThankYou;
// ✅ Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const sparkle = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.8);
  }
`;

// ✅ Main Container
const ThankYouContainer = styled.div`
  background: linear-gradient(135deg, var(--background-dark) 0%, #0a1015 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${css`${fadeIn} 0.8s ease-out`};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 230, 118, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 230, 118, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(0, 230, 118, 0.08) 0%, transparent 50%);
    animation: ${float} 20s ease-in-out infinite;
  }
`;

const ContentBox = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 60px 50px;
  max-width: 600px;
  width: 100%;
  color: var(--text-light);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  animation: ${css`${zoomIn} 0.8s ease-out`};
  animation-delay: 0.3s;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;
  text-align: center;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark), #FFD700);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(0, 230, 118, 0.03), transparent);
    animation: ${css`${float} 30s linear infinite`};
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 25px;
    border-radius: 16px;
    margin: 10px;
  }
`;

// ✅ Success Icon
const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 48px;
  color: white;
  animation: ${css`${bounceIn} 1s ease-out`};
  animation-delay: 0.6s;
  animation-fill-mode: both;
  position: relative;
  box-shadow: 
    0 0 40px rgba(0, 230, 118, 0.4),
    inset 0 0 40px rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    opacity: 0.3;
    animation: ${css`${pulse} 2s ease-in-out infinite`};
    z-index: -1;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: 40px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    font-size: 32px;
  }
`;

// ✅ Floating Decorations
const FloatingDecoration = styled.div`
  position: absolute;
  color: var(--primary);
  font-size: ${props => props.$size || '20px'};
  opacity: 0.6;
  animation: ${css`${float} ${props => props.$duration || '3s'} ease-in-out infinite`};
  animation-delay: ${props => props.$delay || '0s'};
  top: ${props => props.$top || '20%'};
  left: ${props => props.$left || '20%'};

  @media (max-width: 768px) {
    font-size: ${props => props.$mobileSize || '16px'};
  }
`;

const SparkleDecoration = styled.div`
  position: absolute;
  color: #FFD700;
  font-size: ${props => props.$size || '16px'};
  animation: ${css`${sparkle} ${props => props.$duration || '2s'} ease-in-out infinite`};
  animation-delay: ${props => props.$delay || '0s'};
  top: ${props => props.$top || '15%'};
  right: ${props => props.$right || '15%'};

  @media (max-width: 768px) {
    font-size: ${props => props.$mobileSize || '12px'};
  }
`;

// ✅ Header Section
const Header = styled.div`
  margin-bottom: 40px;
`;

const MainTitle = styled.h1`
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--heading-color);
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 0.9s;
  animation-fill-mode: both;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--heading-color) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: clamp(16px, 3vw, 20px);
  color: var(--text-secondary);
  margin-bottom: 20px;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 1.1s;
  animation-fill-mode: both;
  line-height: 1.6;
`;

const Description = styled.p`
  font-size: clamp(14px, 2.5vw, 18px);
  color: var(--text-light);
  margin-bottom: 40px;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 1.3s;
  animation-fill-mode: both;
  line-height: 1.7;
  opacity: 0.9;
`;

// ✅ Summary Section
const SummarySection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  margin: 30px 0;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 1.5s;
  animation-fill-mode: both;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const SummaryTitle = styled.h3`
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--primary);
  margin-bottom: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: clamp(14px, 2vw, 16px);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const SummaryLabel = styled.span`
  color: var(--text-secondary);
  font-weight: 500;
`;

const SummaryValue = styled.span`
  color: var(--text-light);
  font-weight: 600;
  text-transform: capitalize;
`;

// ✅ Action Buttons
const ActionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 1.7s;
  animation-fill-mode: both;

  @media (max-width: 480px) {
    margin-top: 30px;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--heading-color);
  border: none;
  border-radius: 16px;
  padding: 18px 32px;
  font-size: clamp(14px, 2.5vw, 18px);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

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
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 230, 118, 0.5);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @media (max-width: 480px) {
    padding: 16px 24px;
    font-size: 16px;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: var(--text-light);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  padding: 16px 32px;
  font-size: clamp(14px, 2.5vw, 16px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    color: var(--primary);
    border-color: var(--primary);
    background: rgba(0, 230, 118, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 14px 24px;
  }
`;

// ✅ Progress Complete Indicator
const ProgressComplete = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: clamp(12px, 1.5vw, 14px);
  color: white;
  font-weight: 600;
  backdrop-filter: blur(10px);
  animation: ${css`${pulse} 2s ease-in-out infinite`};

  @media (max-width: 480px) {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 20px;
    display: inline-block;
  }
`;