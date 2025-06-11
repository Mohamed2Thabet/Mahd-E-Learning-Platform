// components/profileStudent/EnhancedStatsCards.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Card, Col, Row, Badge, ProgressBar } from 'react-bootstrap';
import {
  FaBookOpen,
  FaCertificate,
  FaClock,
  FaFire,
  FaTrophy,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaInfoCircle
} from 'react-icons/fa';

// ✅ Advanced Animations
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;



const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 230, 118, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 230, 118, 0.6);
  }
`;

// ✅ Enhanced Styled Components
const StatsContainer = styled(Row)`
  margin-bottom: 40px;
  animation: ${css`${slideInUp} 0.8s ease-out`};
  animation-delay: 0.2s;
  animation-fill-mode: both;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const StatBox = styled(Card)`
  background: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 20px !important;
  text-align: center !important;
  color: var(--text-light) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: ${css`${slideInUp} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
  min-height: 180px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
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
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.3);

    &::after {
      left: 100%;
    }

    .stat-icon {
      transform: scale(1.3) rotate(10deg);
      animation: ${css`${glow} 1s ease-in-out`};
    }

    .stat-value {
      animation: ${css`${countUp} 0.4s ease-out`};
    }

    .progress-indicator {
      transform: scaleX(1.05);
    }

    .trend-badge {
      animation: ${css`${pulse} 0.5s ease-in-out`};
    }
  }

  .card-body {
    padding: 32px 24px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    gap: 16px;

    @media (max-width: 768px) {
      padding: 24px 20px !important;
      gap: 12px;
    }
  }

  @media (max-width: 768px) {
    min-height: 160px;
  }
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: ${props => props.$bgColor || 'rgba(0, 230, 118, 0.1)'};
  border-radius: 20px;
  color: ${props => props.$color || 'var(--primary)'};
  font-size: 28px;
  transition: all 0.4s ease;
  margin-bottom: 12px;
  box-shadow: 0 8px 25px ${props => props.$shadowColor || 'rgba(0, 230, 118, 0.3)'};
  position: relative;
  animation: ${css`${float} 4s ease-in-out infinite`};

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 22px;
    background: linear-gradient(45deg, ${props => props.$color || 'var(--primary)'}, transparent);
    opacity: 0.3;
    z-index: -1;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
`;

const StatValue = styled.div`
  font-size: clamp(1.75rem, 5vw, 2.5rem) !important;
  font-weight: 800 !important;
  margin: 0 !important;
  color: var(--heading-color) !important;
  line-height: 1.2;
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-direction: column;
  text-align: center;

  .main-value {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .unit {
    font-size: 0.4em;
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .trend {
    font-size: 0.35em;
    padding: 4px 8px;
    border-radius: 8px;
    font-weight: 700;
    background: rgba(0, 230, 118, 0.1);
    color: var(--primary);
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const StatLabel = styled.p`
  font-size: clamp(0.875rem, 2vw, 1rem) !important;
  color: var(--text-secondary) !important;
  margin: 0 !important;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
`;

const StreakBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${css`${pulse} 2s ease-in-out infinite`};
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 8px;
    top: 12px;
    right: 12px;
  }
`;

const ProgressIndicator = styled.div`
  width: 100%;
  height: 4px;
  background: var(--border-color);
  border-radius: 2px;
  margin-top: 12px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$progress || 0}%;
    background: linear-gradient(90deg, ${props => props.$color || 'var(--primary)'}, ${props => props.$color || 'var(--primary)'}88);
    border-radius: 2px;
    transition: width 0.8s ease;
  }
`;

const TrendBadge = styled(Badge)`
  background: ${props => {
    if (props.$trend === 'up') return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
    if (props.$trend === 'down') return 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)';
    return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
  }} !important;
  color: white !important;
  padding: 4px 8px !important;
  border-radius: 12px !important;
  font-size: 10px !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
  position: absolute;
  top: 16px;
  left: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 9px !important;
    padding: 3px 6px !important;
    top: 12px;
    left: 12px;
  }
`;

const InfoTooltip = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: help;
  transition: all 0.3s ease;
  opacity: 0;

  ${StatBox}:hover & {
    opacity: 1;
  }

  &:hover {
    background: var(--primary);
    color: white;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 10px;
    bottom: 12px;
    right: 12px;
  }
`;

// ✅ Enhanced Data Function
const getEnhancedStatsData = (profile) => [
  {
    icon: FaBookOpen,
    value: profile.coursesEnrolled,
    label: 'Courses Enrolled',
    color: '#4F46E5',
    bgColor: 'rgba(79, 70, 229, 0.1)',
    shadowColor: 'rgba(79, 70, 229, 0.2)',
    trend: '+3 this month',
    trendType: 'up',
    progress: 75,
    info: 'Total number of courses you are currently enrolled in'
  },
  {
    icon: FaClock,
    value: profile.hoursLearned,
    label: 'Hours Learned',
    color: '#059669',
    bgColor: 'rgba(5, 150, 105, 0.1)',
    shadowColor: 'rgba(5, 150, 105, 0.2)',
    unit: 'hrs',
    trend: '+12 this week',
    trendType: 'up',
    progress: 85,
    info: 'Total hours spent learning across all courses'
  },
  {
    icon: FaCertificate,
    value: profile.certifications,
    label: 'Certifications',
    color: '#D97706',
    bgColor: 'rgba(217, 119, 6, 0.1)',
    shadowColor: 'rgba(217, 119, 6, 0.2)',
    trend: '+1 this month',
    trendType: 'up',
    progress: 60,
    info: 'Certificates earned from completed courses'
  },
  {
    icon: FaChartLine,
    value: `${profile.completionRate}%`,
    label: 'Completion Rate',
    color: '#DC2626',
    bgColor: 'rgba(220, 38, 38, 0.1)',
    shadowColor: 'rgba(220, 38, 38, 0.2)',
    trend: '+5% this month',
    trendType: 'up',
    progress: profile.completionRate,
    info: 'Percentage of courses successfully completed'
  },
  {
    icon: FaTrophy,
    value: profile.totalPoints,
    label: 'Total Points',
    color: '#7C3AED',
    bgColor: 'rgba(124, 58, 237, 0.1)',
    shadowColor: 'rgba(124, 58, 237, 0.2)',
    unit: 'pts',
    trend: '+150 this week',
    trendType: 'up',
    progress: 90,
    info: 'Points earned from completing courses and activities'
  },
  {
    icon: FaFire,
    value: profile.currentStreak,
    label: 'Current Streak',
    color: '#EA580C',
    bgColor: 'rgba(234, 88, 12, 0.1)',
    shadowColor: 'rgba(234, 88, 12, 0.2)',
    unit: 'days',
    showBadge: true,
    progress: Math.min((profile.currentStreak / 30) * 100, 100),
    info: 'Consecutive days of learning activity'
  }
];

// ✅ Enhanced Component
const StatsCards = ({ profile, onStatClick, showProgress = true, showTrends = true }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const statsData = getEnhancedStatsData(profile);

  useEffect(() => {
    // Animate values on mount
    const timers = statsData.map((stat, index) => {
      return setTimeout(() => {
        setAnimatedValues(prev => ({
          ...prev,
          [index]: stat.value
        }));
      }, 200 + index * 100);
    });

    return () => timers.forEach(clearTimeout);
  }, [statsData]);

  const handleStatClick = (stat) => {
    if (onStatClick) {
      onStatClick(stat.label, stat);
    } else {
      console.log(`Clicked on ${stat.label}:`, stat);
    }
  };

  const getTrendIcon = (trendType) => {
    switch (trendType) {
      case 'up':
        return <FaArrowUp />;
      case 'down':
        return <FaArrowDown />;
      default:
        return null;
    }
  };

  return (
    <StatsContainer>
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        const displayValue = animatedValues[index] || 0;

        return (
          <Col xl={2} lg={3} md={4} sm={6} key={index}>
            <StatBox
              $delay={`${0.1 + index * 0.05}s`}
              $color={stat.color}
              onClick={() => handleStatClick(stat, index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStatClick(stat, index);
                }
              }}
              title={stat.info}
            >
              {/* Trend Badge */}
              {showTrends && stat.trendType && (
                <TrendBadge $trend={stat.trendType} className="trend-badge">
                  {getTrendIcon(stat.trendType)}
                  {stat.trendType}
                </TrendBadge>
              )}

              {/* Streak Badge */}
              {stat.showBadge && (
                <StreakBadge>
                  🔥 Hot Streak!
                </StreakBadge>
              )}

              <Card.Body>
                {/* Icon */}
                <StatIcon
                  className="stat-icon"
                  $color={stat.color}
                  $bgColor={stat.bgColor}
                  $shadowColor={stat.shadowColor}
                >
                  <IconComponent />
                </StatIcon>

                {/* Value */}
                <StatValue className="stat-value">
                  <div className="main-value">
                    {displayValue}
                    {stat.unit && <span className="unit">{stat.unit}</span>}
                  </div>
                  {showTrends && stat.trend && (
                    <div className="trend">
                      {getTrendIcon(stat.trendType)}
                      {stat.trend}
                    </div>
                  )}
                </StatValue>

                {/* Label */}
                <StatLabel>{stat.label}</StatLabel>

                {/* Progress Indicator */}
                {showProgress && stat.progress !== undefined && (
                  <ProgressIndicator
                    className="progress-indicator"
                    $progress={stat.progress}
                    $color={stat.color}
                  />
                )}

                {/* Info Tooltip */}
                <InfoTooltip title={stat.info}>
                  <FaInfoCircle />
                </InfoTooltip>
              </Card.Body>
            </StatBox>
          </Col>
        );
      })}
    </StatsContainer>
  );
};

export default StatsCards;
