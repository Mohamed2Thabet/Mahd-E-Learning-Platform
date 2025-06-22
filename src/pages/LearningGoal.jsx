import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaRocket, FaChartLine, FaTrophy, FaRegCompass, FaArrowLeft, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components"; // ✅ إضافة css


// ✅ Component
const LearningGoal = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    {
      id: "new-field",
      title: "Entering a new field",
      description: "Start your journey in a completely new career direction",
      icon: <FaRegCompass />,
    },
    {
      id: "advancing",
      title: "Advancing in my current career",
      description: "Enhance your skills and expertise in your current field",
      icon: <FaChartLine />,
    },
    {
      id: "promotion",
      title: "Getting a promotion",
      description: "Prepare yourself for the next level in your career",
      icon: <FaTrophy />,
    },
    {
      id: "personal-project",
      title: "Starting a personal project",
      description: "Learn the skills needed to bring your ideas to life",
      icon: <FaRocket />,
    },
  ];

  const handleOptionSelect = (optionId) => {
    console.log('Selected option:', optionId);
    setSelectedOption(optionId);
    localStorage.setItem('learningGoal', optionId);

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleNext = async () => {
    if (!selectedOption) {
      alert('يرجى اختيار هدف التعلم قبل المتابعة');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      navigate('/profession', {
        state: { learningGoal: selectedOption }
      });
    } catch (error) {
      console.error('Navigation error:', error);
      alert('حدث خطأ، يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('learningGoal', 'skipped');
    navigate('/');
  };

  const isOptionSelected = (optionId) => selectedOption === optionId;

  return (
    <MainContainer>
      <Container fluid className="h-100 d-flex align-items-center justify-content-center">
        <ContentWrapper>
          <ProgressIndicator>Step 1 of 3</ProgressIndicator>

          <Header>
            <Title>What is your learning goal?</Title>
            <Subtitle>
              Select the option that best describes your career aspirations
            </Subtitle>
          </Header>

          <OptionsGrid className="g-3">
            {options.map((option, index) => (
              <Col xs={12} lg={6} key={option.id}>
                <OptionCard
                  $isSelected={isOptionSelected(option.id)}
                  $delay={`${index * 0.1}s`}
                  onClick={() => handleOptionSelect(option.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isOptionSelected(option.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOptionSelect(option.id);
                    }
                  }}
                >
                  <CardContent>
                    <IconWrapper $isSelected={isOptionSelected(option.id)}>
                      <IconElement $isSelected={isOptionSelected(option.id)}>
                        {option.icon}
                      </IconElement>
                      {isOptionSelected(option.id) && (
                        <SelectedCheckmark>
                          <FaCheck />
                        </SelectedCheckmark>
                      )}
                    </IconWrapper>
                    <TextContent>
                      <OptionTitle $isSelected={isOptionSelected(option.id)}>
                        {option.title}
                      </OptionTitle>
                      <OptionDescription $isSelected={isOptionSelected(option.id)}>
                        {option.description}
                      </OptionDescription>
                    </TextContent>
                  </CardContent>
                </OptionCard>
              </Col>
            ))}
          </OptionsGrid>

          <NavigationSection>
            <SkipLink to="/" onClick={handleSkip}>
              <FaArrowLeft size={14} />
              Skip for now
            </SkipLink>

            <NextButton
              onClick={handleNext}
              disabled={!selectedOption || isLoading}
              aria-label="Continue to next step"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Processing...
                </>
              ) : (
                'Next'
              )}
            </NextButton>
          </NavigationSection>
        </ContentWrapper>
      </Container>
    </MainContainer>
  );
};

export default LearningGoal;

// نفس الـ keyframes
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

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

const checkmarkAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// ✅ إصلاح OptionCard
const OptionCard = styled.div`
  background: ${props => props.$isSelected ?
    `linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)` :
    `var(--card-background)`
  };
  border: 3px solid ${props => props.$isSelected ?
    `var(--primary)` :
    `var(--border-color)`
  };
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
  animation: ${css`${fadeInUp} 0.6s ease-out`}; // ✅ استخدام css
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
  min-height: 140px;
  display: flex;
  align-items: center;
  transform: ${props => props.$isSelected ? 'translateY(-8px) scale(1.02)' : 'translateY(0)'};
  box-shadow: ${props => props.$isSelected ?
    '0 20px 40px rgba(0, 230, 118, 0.3)' :
    '0 4px 15px rgba(0, 0, 0, 0.1)'
  };

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
    transform: ${props => props.$isSelected ?
    'translateY(-8px) scale(1.02)' :
    'translateY(-4px) scale(1.01)'
  };
    border-color: ${props => props.$isSelected ?
    'var(--primary)' :
    'rgba(255, 255, 255, 0.3)'
  };
    box-shadow: ${props => props.$isSelected ?
    '0 25px 50px rgba(0, 230, 118, 0.4)' :
    '0 8px 25px rgba(0, 0, 0, 0.2)'
  };

    &::before {
      left: 100%;
    }
  }

  // ✅ الحل الصحيح - استخدام css helper
  ${props => props.$isSelected && css`
    animation: ${pulse} 2s ease-in-out infinite;
  `}

  @media (max-width: 768px) {
    padding: 20px;
    min-height: 120px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    min-height: 100px;
  }
`;

// ✅ إصلاح SelectedCheckmark
const SelectedCheckmark = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  animation: ${css`${checkmarkAnimation} 0.5s ease-out`}; // ✅ استخدام css
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.4);

  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }
`;

// ✅ إصلاح ContentWrapper
const ContentWrapper = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 50px 40px;
  width: 100%;
  max-width: 900px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  animation: ${css`${scaleIn} 0.6s ease-out`}; // ✅ استخدام css
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  }

  @media (max-width: 768px) {
    padding: 35px 25px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 25px 20px;
    border-radius: 16px;
  }
`;

// ✅ إصلاح Header
const Header = styled.div`
  margin-bottom: 40px;
  animation: ${css`${fadeInUp} 0.8s ease-out`}; // ✅ استخدام css
`;

// ✅ إصلاح NavigationSection
const NavigationSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${css`${fadeInUp} 0.8s ease-out`}; // ✅ استخدام css
  animation-delay: 0.4s;
  animation-fill-mode: both;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

// باقي الـ components تبقى كما هي...
const MainContainer = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  color: var(--heading-color);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: clamp(14px, 2.5vw, 18px);
  color: var(--text-secondary);
  margin: 0 auto;
  line-height: 1.6;
  max-width: 500px;
`;

const OptionsGrid = styled(Row)`
  margin-bottom: 40px;
  justify-content: center;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  position: relative;

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background: ${props => props.$isSelected ?
    'rgba(255, 255, 255, 0.2)' :
    'rgba(0, 230, 118, 0.1)'
  };
  border-radius: 16px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid ${props => props.$isSelected ?
    'rgba(255, 255, 255, 0.3)' :
    'transparent'
  };

  ${OptionCard}:hover & {
    transform: ${props => props.$isSelected ? 'scale(1.05)' : 'rotate(5deg) scale(1.1)'};
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

const IconElement = styled.div`
  color: ${props => props.$isSelected ?
    'var(--heading-color)' :
    'var(--primary)'
  };
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const TextContent = styled.div`
  text-align: left;
  flex: 1;
  min-width: 0;
`;

const OptionTitle = styled.h5`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: ${props => props.$isSelected ? '700' : '600'};
  color: ${props => props.$isSelected ?
    'var(--heading-color)' :
    'var(--text-light)'
  };
  margin-bottom: 8px;
  transition: all 0.3s ease;
  line-height: 1.3;
`;

const OptionDescription = styled.p`
  font-size: clamp(13px, 2vw, 15px);
  color: ${props => props.$isSelected ?
    'rgba(255, 255, 255, 0.95)' :
    'var(--text-secondary)'
  };
  margin: 0;
  line-height: 1.5;
  transition: all 0.3s ease;
  font-weight: ${props => props.$isSelected ? '500' : '400'};
`;

const SkipLink = styled(Link)`
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  font-size: clamp(14px, 2vw, 16px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;

  &:hover {
    color: var(--primary-dark);
    background: rgba(0, 230, 118, 0.1);
    transform: translateX(-3px);
  }

  @media (max-width: 600px) {
    order: 2;
  }
`;

const NextButton = styled.button`
  background: ${props => props.disabled ?
    'rgba(255, 255, 255, 0.05)' :
    'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
  };
  color: ${props => props.disabled ?
    'var(--text-secondary)' :
    'var(--heading-color)'
  };
  border: 2px solid ${props => props.disabled ?
    'var(--border-color)' :
    'var(--primary)'
  };
  border-radius: 12px;
  padding: 16px 40px;
  font-size: clamp(14px, 2vw, 18px);
  font-weight: 700;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  min-width: 140px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: ${props => props.disabled ? '0.5' : '1'};

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

  &:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 30px rgba(0, 230, 118, 0.5);
    
    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-1px) scale(1.02);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 600px) {
    order: 1;
    width: 100%;
    padding: 14px 24px;
  }
`;

const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ProgressIndicator = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: clamp(12px, 1.5vw, 14px);
  color: var(--text-secondary);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 20px;
    display: inline-block;
  }
`;