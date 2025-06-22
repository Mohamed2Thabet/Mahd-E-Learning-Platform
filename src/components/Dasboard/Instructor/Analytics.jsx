// components/Analytics.jsx
import styled, { keyframes, css } from 'styled-components';
import { Card, ProgressBar as BSProgressBar, Button as BSButton } from 'react-bootstrap';
import { FaChartLine } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';




// ✅ Analytics Component
const Analytics = ({ data }) => {
  const analyticsData = {
    courseViews: { value: 123, progress: 100 },
    newEnrollments: { value: 89, progress: 89 },
    completionRate: { value: 76, progress: 76 },
    ...data
  };

  const handleViewReport = () => {
    console.log('Opening detailed analytics report...');
    // Add navigation to detailed report here
  };

  return (
    <AnalyticsContainer>
      <TitleRow>
        <h5>
          <SectionIcon>
            <FaChartLine />
          </SectionIcon>
          Analytics
        </h5>
        <span>This Week</span>
      </TitleRow>

      <AnalyticsCard>
        <Card.Body>
          <AnalyticsRow>
            <div className="d-flex">
              <span>Course Views</span>
              <span>{analyticsData.courseViews.value}</span>
            </div>
            <ProgressBar now={analyticsData.courseViews.progress} />
          </AnalyticsRow>

          <AnalyticsRow>
            <div className="d-flex">
              <span>New Enrollments</span>
              <span>{analyticsData.newEnrollments.value}</span>
            </div>
            <ProgressBar now={analyticsData.newEnrollments.progress} />
          </AnalyticsRow>

          <AnalyticsRow>
            <div className="d-flex">
              <span>Completion Rate</span>
              <span>{analyticsData.completionRate.value}%</span>
            </div>
            <ProgressBar now={analyticsData.completionRate.progress} />
          </AnalyticsRow>

          <DetailedReportButton
            className="w-100"
            onClick={handleViewReport}
          >
            <MdTrendingUp style={{ marginRight: '8px' }} />
            View Detailed Report
          </DetailedReportButton>
        </Card.Body>
      </AnalyticsCard>
    </AnalyticsContainer>
  );
};

export default Analytics;
// ✅ Animations
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

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// ✅ Styled Components
const AnalyticsContainer = styled.div`
  padding: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 1px;
  }

  h5 {
    color: var(--text-light);
    margin: 0;
    font-weight: 600;
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    display: flex;
    align-items: center;
    gap: 12px;
  }

  span {
    color: var(--primary);
    font-weight: 500;
    font-size: 14px;
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
`;

const AnalyticsCard = styled(Card)`
  background-color: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-light) !important;
  border-radius: 16px !important;
  animation: ${css`${slideInRight} 0.8s ease-out`};
  animation-delay: 0.3s;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary), transparent);
  }

  .card-body {
    padding: 24px !important;

    @media (max-width: 480px) {
      padding: 20px !important;
    }
  }
`;

const AnalyticsRow = styled.div`
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 24px;
  }

  .d-flex {
    justify-content: space-between;
    margin-bottom: 8px;
    align-items: center;

    span:first-child {
      color: var(--text-light);
      font-weight: 500;
      font-size: clamp(13px, 2vw, 14px);
    }

    span:last-child {
      color: var(--primary);
      font-weight: 600;
      font-size: clamp(14px, 2.5vw, 16px);
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const ProgressBar = styled(BSProgressBar)`
  .progress-bar {
    background: linear-gradient(90deg, var(--primary), var(--primary-dark)) !important;
    transition: width 0.6s ease;
  }

  background-color: var(--border-color);
  border-radius: 6px;
  height: 8px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: ${css`${shimmer} 2s infinite`};
  }
`;

const DetailedReportButton = styled(BSButton)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  border: none !important;
  color: white !important;
  border-radius: 12px !important;
  padding: 12px 20px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
  font-size: clamp(13px, 2vw, 14px) !important;
  position: relative;
  overflow: hidden;

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
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4) !important;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) !important;
  }
`;