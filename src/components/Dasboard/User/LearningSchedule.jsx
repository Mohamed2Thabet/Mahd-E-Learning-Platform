import React, { useState, useEffect } from 'react';
import { Card, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import {
  BsCalendar3,
  BsClock,
  BsCheckCircleFill,
  BsTrophy,
  BsFire,
  BsAward,
  BsChevronRight,
  BsPlus
} from 'react-icons/bs';
import { FaCalendarAlt, FaMedal, FaStar, FaChartLine } from 'react-icons/fa';
import styled, { keyframes, css } from 'styled-components';

// ✅ Advanced Animations
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
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
    transform: scale(1.05);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 230, 118, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 230, 118, 0.6);
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

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-8px,0);
  }
  70% {
    transform: translate3d(0,-4px,0);
  }
  90% {
    transform: translate3d(0,-2px,0);
  }
`;

// ✅ Main Container
const Container = styled.div`
  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 1.5rem);
  animation: ${css`${fadeInUp} 0.8s ease-out`};
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

// ✅ Enhanced Section Title
const SectionTitle = styled.h5`
  color: var(--text-light);
  margin-bottom: 1.5rem;
  position: relative;
  font-weight: 600;
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${css`${slideInLeft} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 8px;
  color: white;
  font-size: 16px;
  animation: ${css`${pulse} 2s ease-in-out infinite`};

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
`;

// ✅ Enhanced View Calendar Button
const ViewCalendar = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 16px;
  color: var(--primary);
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--primary);
    transform: translateY(-50%) translateX(-2px);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-left: auto;
    padding: 6px 12px;
    font-size: 13px;
  }
`;

// ✅ Enhanced Card
const StyledCard = styled(Card)`
  background-color: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 16px !important;
  color: var(--text-light) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${css`${slideInRight} 0.8s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    border-radius: 12px !important;
  }
`;

// ✅ Enhanced List Item
const ListItem = styled(ListGroup.Item)`
  background-color: var(--card-background) !important;
  color: var(--text-light) !important;
  display: flex;
  align-items: center;
  padding: 20px;
  font-weight: 500;
  border: none !important;
  transition: all 0.3s ease;
  cursor: pointer;
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
    transition: left 0.5s;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05) !important;
    transform: translateX(4px);

    &::before {
      left: 100%;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  }

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const ItemTitle = styled.strong`
  font-size: clamp(14px, 2vw, 16px);
  color: var(--text-light);
  line-height: 1.4;
`;

const ItemSubtitle = styled.span`
  font-size: clamp(12px, 1.8vw, 14px);
  color: var(--text-secondary);
  font-weight: 400;
`;

const ItemTime = styled.span`
  font-size: clamp(12px, 1.8vw, 14px);
  color: var(--primary);
  font-weight: 600;
  background: rgba(0, 230, 118, 0.1);
  padding: 4px 12px;
  border-radius: 8px;
  white-space: nowrap;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

const ItemArrow = styled(BsChevronRight)`
  color: var(--text-secondary);
  transition: all 0.3s ease;
  margin-left: 8px;

  ${ListItem}:hover & {
    color: var(--primary);
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// ✅ Enhanced Icons
const IconSuccess = styled(BsCheckCircleFill)`
  color: var(--primary);
  font-size: 18px;
  flex-shrink: 0;
  animation: ${css`${glow} 2s ease-in-out infinite`};
`;

const IconCalendar = styled(BsCalendar3)`
  color: #2196F3;
  font-size: 18px;
  flex-shrink: 0;
`;

const IconClock = styled(BsClock)`
  color: #FF9800;
  font-size: 18px;
  flex-shrink: 0;
`;

// ✅ Enhanced Badge
const StyledBadge = styled(Badge)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  color: var(--heading-color) !important;
  font-weight: 600 !important;
  padding: 8px 16px !important;
  border-radius: 20px !important;
  font-size: clamp(0.8rem, 1.5vw, 0.95rem) !important;
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);
  animation: ${css`${bounce} 2s ease-in-out infinite`};
  margin-bottom: 20px;

  @media (max-width: 480px) {
    padding: 6px 12px !important;
  }
`;

// ✅ Enhanced Achievements Section
const AchievementsCardContent = styled.div`
  padding: 24px;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const StatsRow = styled(Row)`
  margin-top: 24px;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const StatCol = styled(Col)`
  text-align: center;
  padding: 16px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 20%;
    right: 0;
    width: 1px;
    height: 60%;
    background: var(--border-color);
  }

  h4 {
    margin-bottom: 8px;
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 700;
    color: var(--heading-color);
    background: linear-gradient(135deg, var(--heading-color) 0%, var(--primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    padding: 12px;

    &:not(:last-child)::after {
      display: none;
    }
  }
`;

const TextSecondary = styled.small`
  color: var(--text-secondary);
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// ✅ Add Session Button
const AddSessionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

// ✅ Achievement Icons
const AchievementIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 50%;
  color: white;
  font-size: 12px;
  margin-right: 8px;
  animation: ${css`${shimmer} 3s ease-in-out infinite`};
`;

// ✅ Loading State
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--text-secondary);
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 12px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// ✅ Component
const LearningSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [achievementsData, setAchievementsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        setScheduleData([
          {
            id: 1,
            title: "UI/UX Design Workshop",
            subtitle: "Advanced Prototyping Techniques",
            time: "Today - 7:00 PM",
            status: "completed",
            type: "workshop"
          },
          {
            id: 2,
            title: "Logo Design Session",
            subtitle: "Brand Identity Creation",
            time: "Tomorrow - 9:00 AM",
            status: "upcoming",
            type: "session"
          },
          {
            id: 3,
            title: "Motion Graphics Class",
            subtitle: "After Effects Masterclass",
            time: "June 15, 2025 - 3:00 PM",
            status: "scheduled",
            type: "class"
          }
        ]);

        setAchievementsData({
          streak: 5,
          points: 250,
          badges: 3,
          completedCourses: 12
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <IconSuccess />;
      case 'upcoming':
        return <IconCalendar />;
      case 'scheduled':
        return <IconClock />;
      default:
        return <IconCalendar />;
    }
  };

  const handleViewCalendar = () => {
    console.log('Opening calendar view...');
    // Add calendar integration here
  };

  const handleAddSession = () => {
    console.log('Adding new session...');
    // Add session creation logic here
  };

  const handleItemClick = (item) => {
    console.log('Opening item:', item);
    // Add item details navigation here
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
          Loading your schedule...
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {/* Learning Schedule */}
        <Col md={8}>
          <SectionTitle $delay="0.2s">
            <SectionIcon>
              <FaCalendarAlt />
            </SectionIcon>
            Learning Schedule
            <ViewCalendar
              onClick={handleViewCalendar}
              tabIndex={0}
              role="button"
              aria-label="View Calendar"
            >
              <BsCalendar3 />
              View Calendar
            </ViewCalendar>
          </SectionTitle>

          <StyledCard $delay="0.4s">
            <ListGroup variant="flush">
              {scheduleData.map((item, index) => (
                <ListItem
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  style={{
                    animationDelay: `${0.6 + index * 0.1}s`
                  }}
                >
                  <ItemContent>
                    {getStatusIcon(item.status)}
                    <ItemText>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemSubtitle>{item.subtitle}</ItemSubtitle>
                    </ItemText>
                  </ItemContent>
                  <ItemTime>{item.time}</ItemTime>
                  <ItemArrow />
                </ListItem>
              ))}
            </ListGroup>

            <AddSessionButton onClick={handleAddSession}>
              <BsPlus size={20} />
              Add New Session
            </AddSessionButton>
          </StyledCard>
        </Col>

        {/* Achievements */}
        <Col md={4}>
          <SectionTitle $delay="0.3s">
            <SectionIcon>
              <BsTrophy />
            </SectionIcon>
            Achievements
          </SectionTitle>

          <StyledCard $delay="0.5s">
            <AchievementsCardContent>
              <StyledBadge>
                <AchievementIcon>
                  <BsFire />
                </AchievementIcon>
                {achievementsData.streak} Day Streak
              </StyledBadge>

              <StatsRow>
                <StatCol xs={6}>
                  <h4>{achievementsData.points}</h4>
                  <TextSecondary>Points</TextSecondary>
                </StatCol>
                <StatCol xs={6}>
                  <h4>{achievementsData.badges}</h4>
                  <TextSecondary>Badges</TextSecondary>
                </StatCol>
              </StatsRow>

              <StatsRow className="mt-3">
                <StatCol xs={12}>
                  <h4>{achievementsData.completedCourses}</h4>
                  <TextSecondary>Completed Courses</TextSecondary>
                </StatCol>
              </StatsRow>
            </AchievementsCardContent>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default LearningSchedule;
