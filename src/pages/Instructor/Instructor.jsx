import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Card, Badge } from 'react-bootstrap';
import {
  FaBookOpen,
  FaUsers,
  FaStar,
  FaDollarSign,
  FaAward,

} from 'react-icons/fa';

import Sidebar from '../../components/Layout/Sidebar';
import DashboardCoursesAnalytics from '../../components/Dasboard/Instructor/DashboardCoursesAnalytics';

// ✅ Enhanced Animations
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
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

const countUp = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// ✅ Enhanced Page Container
const PageContainer = styled.div`
  display: flex;
  background: linear-gradient(135deg, var(--background-dark) 0%, #0a1015 100%);
  min-height: 100vh;
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
      radial-gradient(circle at 20% 50%, rgba(0, 230, 118, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 230, 118, 0.03) 0%, transparent 50%);
    animation: ${float} 20s ease-in-out infinite;
    pointer-events: none;
  }
`;

// ✅ Enhanced Main Content
const MainContent = styled.main`
  flex-grow: 1;
  padding: clamp(1.5rem, 4vw, 3rem);
  color: var(--text-light);
  overflow-y: auto;
  margin-left: 50px;
  position: relative;
  z-index: 1;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--card-background);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 3px;
    
    &:hover {
      background: var(--primary-dark);
    }
  }

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: clamp(1rem, 3vw, 2rem);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// ✅ Enhanced Welcome Section
const WelcomeSection = styled.div`
  margin-bottom: 3rem;
  animation: ${css`${slideInLeft} 0.8s ease-out`};
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const WelcomeTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--heading-color);
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--heading-color) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;

  &::after {
    content: '👋';
    margin-left: 12px;
    animation: ${float} 2s ease-in-out infinite;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
`;

const StatusBadge = styled(Badge)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  color: white !important;
  padding: 8px 16px !important;
  border-radius: 20px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  margin-top: 8px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  animation: ${css`${pulse} 2s ease-in-out infinite`};
`;

// ✅ Enhanced Summary Cards
const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 3rem;
  animation: ${css`${fadeInUp} 0.8s ease-out`};
  animation-delay: 0.3s;
  animation-fill-mode: both;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

// ✅ Enhanced Card
const StyledCard = styled(Card)`
  background: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 20px !important;
  color: var(--text-light) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: ${css`${slideInRight} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.$color || 'var(--primary)'}, transparent);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);

    &::after {
      left: 100%;
    }

    .card-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .card-value {
      animation: ${css`${countUp} 0.3s ease-out`};
    }
  }

  .card-body {
    padding: 28px !important;
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
      padding: 20px !important;
      gap: 16px;
    }

    @media (max-width: 480px) {
      padding: 16px !important;
      gap: 12px;
      flex-direction: column;
      text-align: center;
    }
  }
`;

const CardIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: ${props => props.$bgColor || 'rgba(0, 230, 118, 0.1)'};
  border-radius: 16px;
  color: ${props => props.$iconColor || 'var(--primary)'};
  font-size: 24px;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 4px 15px ${props => props.$shadowColor || 'rgba(0, 230, 118, 0.2)'};

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const CardTitle = styled.h6`
  color: var(--text-secondary) !important;
  font-weight: 500 !important;
  font-size: clamp(0.875rem, 2vw, 1rem) !important;
  margin: 0 !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardValue = styled.div`
  color: var(--heading-color) !important;
  font-weight: 700 !important;
  font-size: clamp(1.5rem, 4vw, 2rem) !important;
  margin: 0 !important;
  line-height: 1.2;
  display: flex;
  align-items: baseline;
  gap: 8px;

  .unit {
    font-size: 0.6em;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .trend {
    font-size: 0.5em;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
  }

  .trend.up {
    background: rgba(0, 230, 118, 0.1);
    color: var(--primary);
  }

  .trend.down {
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
  }

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

// ✅ Analytics Section
const AnalyticsSection = styled.div`
  animation: ${css`${fadeInUp} 0.8s ease-out`};
  animation-delay: 0.6s;
  animation-fill-mode: both;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-color), transparent);
  }
`;

// ✅ Loading State
const LoadingCard = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 20px;

  .skeleton {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    background-size: 200px 100%;
    animation: ${css`${shimmer} 1.5s infinite`};
    border-radius: 8px;
  }

  .skeleton-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
  }

  .skeleton-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skeleton-title {
    width: 80px;
    height: 14px;
  }

  .skeleton-value {
    width: 120px;
    height: 24px;
  }
`;

// ✅ Data for cards with enhanced information
const summaryData = [
  {
    title: "Courses",
    value: "12",
    icon: FaBookOpen,
    color: "#4F46E5",
    bgColor: "rgba(79, 70, 229, 0.1)",
    shadowColor: "rgba(79, 70, 229, 0.2)",
    trend: { value: "+2", type: "up" },
    unit: "active"
  },
  {
    title: "Students",
    value: "1,247",
    icon: FaUsers,
    color: "#059669",
    bgColor: "rgba(5, 150, 105, 0.1)",
    shadowColor: "rgba(5, 150, 105, 0.2)",
    trend: { value: "+15%", type: "up" },
    unit: "enrolled"
  },
  {
    title: "Rating",
    value: "4.8",
    icon: FaStar,
    color: "#D97706",
    bgColor: "rgba(217, 119, 6, 0.1)",
    shadowColor: "rgba(217, 119, 6, 0.2)",
    trend: { value: "+0.2", type: "up" },
    unit: "avg"
  },
  {
    title: "Revenue",
    value: "$12,450",
    icon: FaDollarSign,
    color: "#DC2626",
    bgColor: "rgba(220, 38, 38, 0.1)",
    shadowColor: "rgba(220, 38, 38, 0.2)",
    trend: { value: "+8%", type: "up" },
    unit: "monthly"
  }
];

// ✅ Main Component
const Instructor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleCardClick = (cardType) => {
    console.log(`Clicked on ${cardType} card`);
    // Add navigation or detailed view logic here
  };

  return (
    <PageContainer className="instructor-page">
      <Sidebar  />
      <MainContent className="main-content">
        <WelcomeSection>
          <WelcomeTitle>
            {getGreeting()}, Jonathan!
          </WelcomeTitle>
          <WelcomeSubtitle>
            Here's what's happening with your courses today
          </WelcomeSubtitle>
          <StatusBadge>
            <FaAward />
            Top Instructor
          </StatusBadge>
        </WelcomeSection>

        <SummaryCards>
          {isLoading ? (
            // Loading state
            Array.from({ length: 4 }, (_, index) => (
              <LoadingCard key={index}>
                <div className="skeleton skeleton-icon"></div>
                <div className="skeleton-content">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-value"></div>
                </div>
              </LoadingCard>
            ))
          ) : (
            // Actual cards
            summaryData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <StyledCard
                  key={index}
                  $delay={`${0.1 + index * 0.1}s`}
                  $color={item.color}
                  onClick={() => handleCardClick(item.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(item.title);
                    }
                  }}
                >
                  <Card.Body>
                    <CardIconContainer
                      className="card-icon"
                      $bgColor={item.bgColor}
                      $iconColor={item.color}
                      $shadowColor={item.shadowColor}
                    >
                      <IconComponent />
                    </CardIconContainer>
                    <CardContent>
                      <CardTitle>{item.title}</CardTitle>
                      <CardValue className="card-value">
                        {item.value}
                        <span className="unit">{item.unit}</span>
                        {item.trend && (
                          <span className={`trend ${item.trend.type}`}>
                            {item.trend.type === 'up' ? '↗' : '↘'} {item.trend.value}
                          </span>
                        )}
                      </CardValue>
                    </CardContent>
                  </Card.Body>
                </StyledCard>
              );
            })
          )}
        </SummaryCards>

        <AnalyticsSection>
          <DashboardCoursesAnalytics />
        </AnalyticsSection>
      </MainContent>
    </PageContainer>
  );
};

export default Instructor;
