import React, { useState, useEffect } from "react";
import { Button,  } from "react-bootstrap";
import { FaRocket, FaUser, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

// ✅ Component
const WelcomeScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // Get user info from location state or localStorage
    const userData = location.state?.userData || JSON.parse(localStorage.getItem('userData') || '{}');
    setUserInfo(userData);

    // Auto redirect after 10 seconds if no action
    const timer = setTimeout(() => {
      handleGoToDashboard();
    }, 10000);

    return () => clearTimeout(timer);
  }, [location.state]);

  const handleGoToDashboard = async () => {
    setIsLoading(true);

    try {
      // Simulate navigation preparation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to dashboard
      navigate('/dashboard', {
        state: {
          welcomeComplete: true,
          userInfo: userInfo
        }
      });
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteProfile = () => {
    navigate('/profile', {
      state: {
        fromWelcome: true,
        userInfo: userInfo
      }
    });
  };

  return (
    <WelcomeContainer>
      <WelcomeCard>
        <LogoSection>
          <LogoContainer>
            <LogoImage src="image/logo.png" alt="MAHD Logo" />
            MAHD
          </LogoContainer>
        </LogoSection>

        <SuccessIconsContainer>
          <FloatingIcon
            className="left"
            src="image/star.svg"
            alt="Star decoration"
          />
          <MainSuccessIcon
            src="image/yes.svg"
            alt="Success checkmark"
          />
          <FloatingIcon
            className="right"
            src="image/star.svg"
            alt="Star decoration"
          />
        </SuccessIconsContainer>

        <WelcomeTitle>Welcome to MAHD!</WelcomeTitle>

        <SuccessMessage>
          <FaCheckCircle />
          Your account has been successfully created.
        </SuccessMessage>

        <Description>
          To get started, explore our courses and personalize your learning experience.
          Your journey to mastering new skills begins now!
        </Description>

        <ButtonsContainer>
          <PrimaryButton
            onClick={handleGoToDashboard}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Loading...
              </>
            ) : (
              <>
                <FaRocket />
                Go to Dashboard
              </>
            )}
          </PrimaryButton>

          <SecondaryButton
            onClick={handleCompleteProfile}
            disabled={isLoading}
          >
            <FaUser />
            Complete Your Profile
          </SecondaryButton>
        </ButtonsContainer>

        <ProgressIndicator>
          <ProgressDot $active />
          <ProgressDot $active />
          <ProgressDot $active />
          <ProgressDot />
          <ProgressText>Setup Complete (3/4)</ProgressText>
        </ProgressIndicator>
      </WelcomeCard>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;

// ✅ Advanced Animations
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

const fadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

const fadeLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const flipUp = keyframes`
  from {
    opacity: 0;
    transform: rotateX(-90deg);
  }
  to {
    opacity: 1;
    transform: rotateX(0);
  }
`;

const flipDown = keyframes`
  from {
    opacity: 0;
    transform: rotateX(90deg);
  }
  to {
    opacity: 1;
    transform: rotateX(0);
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
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.8) rotate(180deg);
  }
`;

// ✅ Main Container
const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--background-dark) 0%, #0a1015 100%);
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

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// ✅ Enhanced Welcome Card
const WelcomeCard = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 60px 50px;
  text-align: center;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  max-width: 500px;
  width: 100%;
  position: relative;
  overflow: hidden;
  animation: ${css`${zoomIn} 0.8s ease-out`};
  animation-delay: 0.3s;
  animation-fill-mode: both;

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
    background: conic-gradient(from 0deg, transparent, rgba(0, 230, 118, 0.02), transparent);
    animation: ${float} 30s linear infinite;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 40px 35px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 25px;
    border-radius: 16px;
    margin: 10px;
  }
`;

// ✅ Logo Section
const LogoSection = styled.div`
  margin-bottom: 30px;
  animation: ${css`${fadeDown} 0.8s ease-out`};
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

const LogoContainer = styled.span`
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: var(--text-light);
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const LogoImage = styled.img`
  width: clamp(35px, 8vw, 50px);
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(0, 230, 118, 0.4));
  animation: ${pulse} 3s ease-in-out infinite;
`;

// ✅ Success Icons Section
const SuccessIconsContainer = styled.div`
  margin-bottom: 30px;
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    height: 100px;
    margin-bottom: 25px;
  }
`;

const MainSuccessIcon = styled.img`
  width: clamp(60px, 15vw, 80px);
  height: auto;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 0.8s;
  animation-fill-mode: both;
  filter: drop-shadow(0 4px 15px rgba(0, 230, 118, 0.3));
`;

const FloatingIcon = styled.img`
  position: absolute;
  width: clamp(20px, 5vw, 30px);
  height: auto;
  animation: ${css`${sparkle} 3s ease-in-out infinite`};
  
  &.left {
    bottom: 20px;
    left: 20px;
    animation: ${css`${fadeLeft} 0.8s ease-out, ${sparkle} 3s ease-in-out infinite 1s`};
    animation-delay: 1s;
    animation-fill-mode: both;
  }
  
  &.right {
    top: 20px;
    right: 20px;
    animation: ${css`${fadeRight} 0.8s ease-out, ${sparkle} 3s ease-in-out infinite 1.5s`};
    animation-delay: 1.2s;
    animation-fill-mode: both;
  }

  @media (max-width: 480px) {
    &.left {
      bottom: 15px;
      left: 15px;
    }
    
    &.right {
      top: 15px;
      right: 15px;
    }
  }
`;

// ✅ Text Content
const WelcomeTitle = styled.h2`
  color: var(--heading-color);
  margin-bottom: 16px;
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  animation: ${css`${fadeRight} 0.8s ease-out`};
  animation-delay: 1.4s;
  animation-fill-mode: both;
  background: linear-gradient(135deg, var(--heading-color) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SuccessMessage = styled.p`
  color: var(--primary);
  margin-bottom: 16px;
  font-size: clamp(14px, 3vw, 18px);
  font-weight: 600;
  animation: ${css`${fadeLeft} 0.8s ease-out`};
  animation-delay: 1.6s;
  animation-fill-mode: both;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Description = styled.p`
  color: var(--text-secondary);
  margin-bottom: 30px;
  font-size: clamp(14px, 2.5vw, 16px);
  line-height: 1.6;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 1.8s;
  animation-fill-mode: both;

  @media (max-width: 480px) {
    margin-bottom: 25px;
  }
`;

// ✅ Action Buttons
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PrimaryButton = styled(Button)`
  width: 100% !important;
  padding: 16px 24px !important;
  font-weight: 600 !important;
  font-size: clamp(14px, 2.5vw, 16px) !important;
  border-radius: 16px !important;
  border: none !important;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  color: var(--heading-color) !important;
  transition: all 0.4s ease !important;
  position: relative;
  overflow: hidden;
  text-transform: none !important;
  letter-spacing: 0.5px;
  animation: ${css`${flipUp} 0.8s ease-out`};
  animation-delay: 2s;
  animation-fill-mode: both;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px;

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
    transform: translateY(-3px) scale(1.02) !important;
    box-shadow: 0 15px 40px rgba(0, 230, 118, 0.5) !important;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.01) !important;
  }

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 230, 118, 0.3), 0 15px 40px rgba(0, 230, 118, 0.5) !important;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  @media (max-width: 480px) {
    padding: 14px 20px !important;
    gap: 8px;
  }
`;

const SecondaryButton = styled(Button)`
  width: 100% !important;
  padding: 16px 24px !important;
  font-weight: 600 !important;
  font-size: clamp(14px, 2.5vw, 16px) !important;
  border-radius: 16px !important;
  background: transparent !important;
  color: var(--text-light) !important;
  border: 2px solid var(--border-color) !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
  animation: ${css`${flipDown} 0.8s ease-out`};
  animation-delay: 2.2s;
  animation-fill-mode: both;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: var(--primary) !important;
    color: var(--primary) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: var(--primary) !important;
    color: var(--primary) !important;
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.3) !important;
  }

  @media (max-width: 480px) {
    padding: 14px 20px !important;
    gap: 8px;
  }
`;

// ✅ Loading Spinner
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
`;

// ✅ Progress Indicator
const ProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  animation: ${css`${fadeUp} 0.8s ease-out`};
  animation-delay: 2.4s;
  animation-fill-mode: both;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$active ? 'var(--primary)' : 'var(--border-color)'};
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;

const ProgressText = styled.span`
  color: var(--text-secondary);
  font-size: clamp(12px, 2vw, 14px);
  margin-left: 12px;
  font-weight: 500;
`;
