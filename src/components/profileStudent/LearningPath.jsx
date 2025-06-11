// components/profileStudent/LearningPath.jsx
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Card, Col, ProgressBar, Row, Badge } from 'react-bootstrap';
import {
  FaGraduationCap,
  FaClock,
  FaBookOpen,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

// ✅ Animations
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

const progressFill = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
`;

// ✅ Styled Components
const SectionContainer = styled.div`
  margin-bottom: 40px;
  animation: ${css`${fadeInUp} 0.8s ease-out`};
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

const SectionTitle = styled.h5`
  color: var(--heading-color);
  margin-bottom: 24px;
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

  @media (max-width: 768px) {
    margin-bottom: 20px;
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

const PathsGrid = styled(Row)`
  gap: 0;

  @media (max-width: 768px) {
    gap: 16px 0;
  }
`;

const LearningCard = styled(Card)`
  background: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 16px !important;
  color: var(--text-light) !important;
  margin-bottom: 20px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: ${css`${fadeInUp} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  }

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);

    .path-arrow {
      transform: translateX(4px);
    }
  }

  .card-body {
    padding: 24px !important;

    @media (max-width: 768px) {
      padding: 20px !important;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 16px !important;
  }
`;

const PathHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const PathTitle = styled.h6`
  color: var(--heading-color) !important;
  font-weight: 600 !important;
  font-size: clamp(1rem, 2.5vw, 1.125rem) !important;
  margin: 0 !important;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PathIcon = styled.div`
  color: var(--primary);
  font-size: 18px;
`;

const PathBadge = styled(Badge)`
  background: ${props => {
    if (props.$progress >= 75) return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
    if (props.$progress >= 50) return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
    return 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)';
  }} !important;
  color: white !important;
  padding: 6px 12px !important;
  border-radius: 12px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
`;

const PathStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
  color: var(--text-secondary);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: var(--primary);
    font-size: 12px;
  }
`;

const ProgressContainer = styled.div`
  margin-bottom: 16px;
`;

const ProgressWrapper = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 8px !important;
  background-color: var(--border-color) !important;
  border-radius: 4px !important;
  overflow: hidden;

  .progress-bar {
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
    border-radius: 4px !important;
    transition: width 0.6s ease !important;
    position: relative;
    animation: ${css`${progressFill} 1s ease-out`};
    animation-delay: ${props => props.$delay || '0s'};

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
`;

const ContinueButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--primary-dark);
  }

  .path-arrow {
    transition: all 0.3s ease;
  }
`;

// ✅ Component
const LearningPath = ({ paths, onPathClick }) => {
  const getProgressStatus = (progress) => {
    if (progress >= 75) return 'Almost Done';
    if (progress >= 50) return 'In Progress';
    if (progress >= 25) return 'Getting Started';
    return 'Just Started';
  };

  const handlePathClick = (path) => {
    onPathClick?.(path);
  };

  return (
    <SectionContainer>
      <SectionTitle>
        <TitleIcon>
          <FaGraduationCap />
        </TitleIcon>
        Current Learning Paths
      </SectionTitle>

      <PathsGrid>
        {paths.map((path, index) => (
          <Col lg={4} md={6} key={path.id}>
            <LearningCard
              $delay={`${0.1 + index * 0.1}s`}
              onClick={() => handlePathClick(path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePathClick(path);
                }
              }}
            >
              <Card.Body>
                <PathHeader>
                  <PathTitle>
                    <PathIcon>
                      <FaGraduationCap />
                    </PathIcon>
                    {path.title}
                  </PathTitle>
                  <PathBadge $progress={path.progress}>
                    {getProgressStatus(path.progress)}
                  </PathBadge>
                </PathHeader>

                <PathStats>
                  <StatItem>
                    <FaBookOpen />
                    {path.completedCourses}/{path.totalCourses} Courses
                  </StatItem>
                  <StatItem>
                    <FaClock />
                    {path.estimatedCompletion}
                  </StatItem>
                </PathStats>

                <ProgressContainer>
                  <ProgressWrapper>
                    <StyledProgressBar
                      now={path.progress}
                      $delay={`${0.5 + index * 0.1}s`}
                    />
                  </ProgressWrapper>
                  <ProgressLabel>
                    <span>{path.progress}% Complete</span>
                    <span>
                      {path.progress === 100 ? (
                        <FaCheckCircle style={{ color: 'var(--primary)' }} />
                      ) : (
                        `${100 - path.progress}% Remaining`
                      )}
                    </span>
                  </ProgressLabel>
                </ProgressContainer>

                <ContinueButton>
                  <span>
                    {path.progress === 100 ? 'View Certificate' : 'Continue Learning'}
                  </span>
                  <FaArrowRight className="path-arrow" />
                </ContinueButton>
              </Card.Body>
            </LearningCard>
          </Col>
        ))}
      </PathsGrid>
    </SectionContainer>
  );
};

export default LearningPath;
