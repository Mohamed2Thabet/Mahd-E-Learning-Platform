// components/profileStudent/EnhancedStatsCards.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Card, Badge } from 'react-bootstrap';
import {
  FaBookOpen,
  FaCertificate,
  FaClock,
  FaFire,
  FaTrophy,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
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
    box-shadow: 0 0 20px var(--primary);
  }
  50% {
    box-shadow: 0 0 30px var(--primary);
  }
`;

// ✅ Enhanced Styled Components with CSS Grid for Equal Heights
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1rem, 2.5vw, 2rem);
  margin-bottom: 40px;
  animation: ${css`${slideInUp} 0.8s ease-out`};
  animation-delay: 0.2s;
  animation-fill-mode: both;
  max-width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
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
  
  /* Key for equal height */
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 280px;

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
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--box-shadow-hover);
    border-color: rgba(255, 255, 255, 0.2);

    &::after {
      left: 100%;
    }

    .stat-icon {
      transform: scale(1.2) rotate(8deg);
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
    padding: clamp(1.25rem, 3vw, 2rem) clamp(1rem, 2.5vw, 1.5rem) !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1; /* Allow body to grow and fill available space */
    gap: clamp(0.75rem, 2vw, 1rem);
    height: 100%;
  }

  @media (max-width: 768px) {
    min-height: 240px;
    border-radius: 16px !important;
  }

  @media (max-width: 480px) {
    min-height: 220px;
    border-radius: 12px !important;
  }
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(60px, 8vw, 70px);
  height: clamp(60px, 8vw, 70px);
  background: ${props => props.$bgColor || 'rgba(0, 230, 118, 0.1)'};
  border-radius: clamp(16px, 3vw, 20px);
  color: ${props => props.$color || 'var(--primary)'};
  font-size: clamp(20px, 4vw, 28px);
  transition: all 0.4s ease;
  margin-bottom: clamp(8px, 2vw, 12px);
  box-shadow: 0 8px 25px ${props => props.$shadowColor || 'rgba(0, 230, 118, 0.3)'};
  position: relative;
  animation: ${css`${float} 4s ease-in-out infinite`};
  flex-shrink: 0; /* Prevent icon from shrinking */

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: clamp(18px, 3.5vw, 22px);
    background: linear-gradient(45deg, ${props => props.$color || 'var(--primary)'}, transparent);
    opacity: 0.3;
    z-index: -1;
  }
`;

const StatValue = styled.div`
  font-size: clamp(1.5rem, 5vw, 2.25rem) !important;
  font-weight: 800 !important;
  margin: 0 !important;
  color: var(--heading-color) !important;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-direction: column;
  text-align: center;
  flex: 1; /* Allow value to take available space */
  min-height: 80px; /* Ensure minimum height for consistency */

  .main-value {
    display: flex;
    align-items: baseline;
    gap: 4px;
    justify-content: center;
  }

  .unit {
    font-size: 0.4em;
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .trend {
    font-size: clamp(0.7rem, 2vw, 0.8rem);
    padding: 4px 8px;
    border-radius: 8px;
    font-weight: 700;
    background: rgba(0, 230, 118, 0.1);
    color: var(--primary);
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
  }
`;

const StatLabel = styled.p`
  font-size: clamp(0.75rem, 2vw, 0.9rem) !important;
  color: var(--text-secondary) !important;
  margin: 0 !important;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  flex-shrink: 0; /* Prevent label from shrinking */
  line-height: 1.3;
`;

const StreakBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, var(--warning-color) 0%, #F7931E 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${css`${pulse} 2s ease-in-out infinite`};
  box-shadow: 0 4px 15px rgba(255, 165, 2, 0.4);
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
  margin-top: auto; /* Push to bottom */
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$progress || 0}%;
    background: linear-gradient(90deg, ${props => props.$color || 'var(--primary)'}, ${props => props.$color || 'var(--primary)'}88);
    border-radius: 2px;
    transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const TrendBadge = styled(Badge)`
  background: ${props => {
    if (props.$trend === 'up') return 'var(--success-color)';
    if (props.$trend === 'down') return 'var(--error-color)';
    return 'var(--text-secondary)';
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
    color: 'var(--info-color)',
    bgColor: 'rgba(55, 66, 250, 0.1)',
    shadowColor: 'rgba(55, 66, 250, 0.2)',
    trend: '+3 this month',
    trendType: 'up',
    progress: 75,
    info: 'Total number of courses you are currently enrolled in'
  },
  {
    icon: FaClock,
    value: profile.hoursLearned,
    label: 'Hours Learned',
    color: 'var(--success-color)',
    bgColor: 'rgba(46, 213, 115, 0.1)',
    shadowColor: 'rgba(46, 213, 115, 0.2)',
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
    color: 'var(--warning-color)',
    bgColor: 'rgba(255, 165, 2, 0.1)',
    shadowColor: 'rgba(255, 165, 2, 0.2)',
    trend: '+1 this month',
    trendType: 'up',
    progress: 60,
    info: 'Certificates earned from completed courses'
  },
  {
    icon: FaChartLine,
    value: `${profile.completionRate}%`,
    label: 'Completion Rate',
    color: 'var(--error-color)',
    bgColor: 'rgba(255, 71, 87, 0.1)',
    shadowColor: 'rgba(255, 71, 87, 0.2)',
    trend: '+5% this month',
    trendType: 'up',
    progress: profile.completionRate,
    info: 'Percentage of courses successfully completed'
  },
  {
    icon: FaTrophy,
    value: profile.totalPoints,
    label: 'Total Points',
    color: 'var(--primary)',
    bgColor: 'rgba(0, 230, 118, 0.1)',
    shadowColor: 'rgba(0, 230, 118, 0.2)',
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
    color: 'var(--warning-color)',
    bgColor: 'rgba(255, 165, 2, 0.1)',
    shadowColor: 'rgba(255, 165, 2, 0.2)',
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

  const handleStatClick = (stat, index) => {
    if (onStatClick) {
      onStatClick(stat.label, stat);
    }
  };

  const getTrendIcon = (trendType) => {
    switch (trendType) {
      case 'up': return <FaArrowUp />;
      case 'down': return <FaArrowDown />;
      default: return null;
    }
  };

  return (
    <StatsContainer>
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        const displayValue = animatedValues[index] || 0;

        return (
          <StatBox
            key={index}
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
        );
      })}
    </StatsContainer>
  );
};

export default StatsCards;
