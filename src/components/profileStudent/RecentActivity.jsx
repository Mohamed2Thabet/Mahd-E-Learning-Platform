import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Card, Badge } from 'react-bootstrap';
import {
  FaBookOpen,
  FaCertificate,
  FaCheckCircle,
  FaPlayCircle,
  FaAward,
  FaClock,
  FaCalendarAlt,
  FaTrophy,      // ✅ إضافة هذا
  FaArrowRight   // ✅ إضافة هذا
} from 'react-icons/fa';

// ✅ نفس الـ animations (بدون تغيير)
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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

// ✅ Styled Components مع transient props
const ActivityContainer = styled.div`
  margin-bottom: 40px;
  animation: ${css`${fadeInUp} 0.8s ease-out`};
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

const SectionTitle = styled.h5`
  margin-top: 2rem;
  margin-bottom: 24px;
  color: var(--heading-color);
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 1px;
  }
`;

const TitleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 8px;
  color: white;
  font-size: 16px;
`;

const ActivityCard = styled(Card)`
  background: var(--card-background) !important;
  color: var(--text-light) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 16px !important;
  margin-bottom: 16px !important;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${css`${fadeInUp} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'}; // ✅ transient prop
  animation-fill-mode: both;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.$borderColor || 'var(--primary)'}, transparent); // ✅ transient prop
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ActivityContent = styled.div`
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 14px;
  flex-shrink: 0;
  background: ${props => props.$bgColor || 'rgba(0, 230, 118, 0.1)'}; // ✅ transient prop
  color: ${props => props.$iconColor || 'var(--primary)'}; // ✅ transient prop
  font-size: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${props => props.$shadowColor || 'rgba(0, 230, 118, 0.2)'}; // ✅ transient prop

  ${ActivityCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const ActivityDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ActivityText = styled.div`
  font-weight: 500;
  font-size: clamp(14px, 2vw, 16px);
  line-height: 1.4;
`;

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-secondary);
  font-size: clamp(12px, 1.5vw, 13px);
  font-weight: 500;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 12px;
    color: var(--primary);
  }
`;

const PointsBadge = styled(Badge)`
  background: linear-gradient(135deg, ${props => props.$bgGradient || 'var(--primary) 0%, var(--primary-dark) 100%'}) !important; // ✅ transient prop
  color: white !important;
  padding: 6px 12px !important;
  border-radius: 20px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
  animation: ${css`${pulse} 2s ease-in-out infinite`};
  box-shadow: 0 4px 15px ${props => props.$shadowColor || 'rgba(0, 230, 118, 0.3)'}; // ✅ transient prop
  align-self: flex-start;
`;

const ViewAllLink = styled.div`
  color: var(--primary);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  justify-content: center;

  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;

// ✅ Helper Function
const getActivityConfig = (type) => {
  switch (type) {
    case 'completed':
      return {
        icon: FaCheckCircle,
        bgColor: 'rgba(16, 185, 129, 0.1)',
        iconColor: '#10B981',
        shadowColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10B981',
        pointsBgGradient: '#10B981 0%, #059669 100%',
        pointsShadowColor: 'rgba(16, 185, 129, 0.3)'
      };
    case 'certificate':
      return {
        icon: FaCertificate,
        bgColor: 'rgba(245, 158, 11, 0.1)',
        iconColor: '#F59E0B',
        shadowColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: '#F59E0B',
        pointsBgGradient: '#F59E0B 0%, #D97706 100%',
        pointsShadowColor: 'rgba(245, 158, 11, 0.3)'
      };
    case 'started':
      return {
        icon: FaPlayCircle,
        bgColor: 'rgba(99, 102, 241, 0.1)',
        iconColor: '#6366F1',
        shadowColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366F1',
        pointsBgGradient: '#6366F1 0%, #4F46E5 100%',
        pointsShadowColor: 'rgba(99, 102, 241, 0.3)'
      };
    case 'award':
      return {
        icon: FaAward,
        bgColor: 'rgba(236, 72, 153, 0.1)',
        iconColor: '#EC4899',
        shadowColor: 'rgba(236, 72, 153, 0.2)',
        borderColor: '#EC4899',
        pointsBgGradient: '#EC4899 0%, #DB2777 100%',
        pointsShadowColor: 'rgba(236, 72, 153, 0.3)'
      };
    default:
      return {
        icon: FaBookOpen,
        bgColor: 'rgba(0, 230, 118, 0.1)',
        iconColor: 'var(--primary)',
        shadowColor: 'rgba(0, 230, 118, 0.2)',
        borderColor: 'var(--primary)',
        pointsBgGradient: 'var(--primary) 0%, var(--primary-dark) 100%',
        pointsShadowColor: 'rgba(0, 230, 118, 0.3)'
      };
  }
};

// ✅ Sample Data
const sampleActivities = [
  {
    id: 1,
    type: 'completed',
    text: 'Completed "Introduction to Design Thinking"',
    course: 'Introduction to Design Thinking',
    date: '2 hours ago',
    points: 50
  },
  {
    id: 2,
    type: 'certificate',
    text: 'Earned "UI Design Expert" Certificate',
    course: 'UI Design Masterclass',
    date: '1 day ago',
    points: 100
  },
  {
    id: 3,
    type: 'started',
    text: 'Started "Advanced Prototyping with Figma"',
    course: 'Advanced Prototyping with Figma',
    date: '3 days ago',
    points: 0
  },
];

// ✅ Component مُصحح
const RecentActivity = ({ activities = sampleActivities, onActivityClick }) => {
  const handleActivityClick = (activity) => {
    if (onActivityClick) {
      onActivityClick(activity);
    } else {
      console.log('Activity clicked:', activity);
    }
  };

  const handleViewAll = () => {
    console.log('View all activities');
  };

  return (
    <ActivityContainer>
      <SectionTitle>
        <TitleIcon>
          <FaClock />
        </TitleIcon>
        Recent Activity
      </SectionTitle>

      {activities.map((activity, index) => {
        const config = getActivityConfig(activity.type);
        const ActivityIcon = config.icon;

        return (
          <ActivityCard
            key={activity.id}
            $delay={`${0.1 + index * 0.05}s`} // ✅ transient prop
            $borderColor={config.borderColor} // ✅ transient prop
            onClick={() => handleActivityClick(activity)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleActivityClick(activity);
              }
            }}
          >
            <ActivityContent>
              <IconContainer
                $bgColor={config.bgColor} // ✅ transient prop
                $iconColor={config.iconColor} // ✅ transient prop
                $shadowColor={config.shadowColor} // ✅ transient prop
              >
                <ActivityIcon />
              </IconContainer>

              <ActivityDetails>
                <ActivityText>{activity.text}</ActivityText>
                <ActivityMeta>
                  <MetaItem>
                    <FaCalendarAlt />
                    {activity.date}
                  </MetaItem>
                  <MetaItem>
                    <FaBookOpen />
                    {activity.course}
                  </MetaItem>
                </ActivityMeta>
              </ActivityDetails>

              {activity.points > 0 && (
                <PointsBadge
                  $bgGradient={config.pointsBgGradient} // ✅ transient prop
                  $shadowColor={config.pointsShadowColor} // ✅ transient prop
                >
                  <FaTrophy /> {/* ✅ الآن متوفر */}
                  +{activity.points} points
                </PointsBadge>
              )}
            </ActivityContent>
          </ActivityCard>
        );
      })}

      <ViewAllLink onClick={handleViewAll}>
        View All Activities <FaArrowRight /> {/* ✅ الآن متوفر */}
      </ViewAllLink>
    </ActivityContainer>
  );
};

export default RecentActivity;
