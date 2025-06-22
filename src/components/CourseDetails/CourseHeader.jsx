import { Col, Container, Row } from "react-bootstrap";
import { FaArrowLeft, FaClosedCaptioning, FaLanguage, FaRegStar, FaStar, FaStarHalfAlt, FaSyncAlt } from "react-icons/fa";
import styled from "styled-components";

// Component Definitions
const CourseHeader = ({  rating, reviewsCount,lastUpdated, language, subtitles ,course}) => {

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} />);
    if (hasHalfStar) stars.push(<FaStarHalfAlt key="half" />);
    for (let i = 0; i < 5 - Math.ceil(rating); i++) stars.push(<FaRegStar key={`empty-${i}`} />);

    return stars;
  };
  
  return (
    <HeaderWrapper>
      
      <Container>
        <BackButton onClick={() => window.history.back()} aria-label="Go back to course">
          <FaArrowLeft />
        </BackButton>
        <Row>
          <Col lg={8}>
            
            <CourseTitle>
              {course?.title}</CourseTitle>
            <CourseSubtitle>{course?.description}</CourseSubtitle>
            <RatingWrapper>
              <RatingText>{rating}</RatingText>
              <RatingStars>{renderStars()}</RatingStars>
              <ReviewsText>({reviewsCount?.toLocaleString()} ratings)</ReviewsText>
            </RatingWrapper>
            <InstructorText>Created by <span>{course?.educator}</span></InstructorText>
            <InfoBar>
              <InfoItem><FaSyncAlt /> Last updated {lastUpdated}</InfoItem>
              <InfoItem><FaLanguage /> {language}</InfoItem>
              <InfoItem><FaClosedCaptioning /> {subtitles?.join(', ')}</InfoItem>
            </InfoBar>
          </Col>
        </Row>
      </Container>
    </HeaderWrapper>
  );
};
export default CourseHeader;

const BackButton = styled.button`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-light);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

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
    background: var(--primary);
    color: var(--heading-color);
    transform: scale(1.1) rotate(-5deg);
    border-color: var(--primary);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);

    &::before {
      left: 100%;
    }
  }
`;

// Header Components
const HeaderWrapper = styled.header`
  background: linear-gradient(135deg, var(--card-background) 0%, rgba(24, 29, 25, 0.95) 100%);
  color: var(--text-light);
  padding: 80px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 20%, rgba(0, 230, 118, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const CourseTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: var(--heading-color);
  margin-bottom: 20px;
  line-height: 1.2;
  position: relative;
  z-index: 2;
  
  background: linear-gradient(135deg, var(--heading-color) 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CourseSubtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--text-secondary);
  margin-bottom: 24px;
  max-width: 900px;
  line-height: 1.6;
  font-weight: 400;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const RatingText = styled.span`
  color: #f59e0b;
  font-weight: 700;
  font-size: 1.2rem;
`;

const RatingStars = styled.div`
  color: #f59e0b;
  display: flex;
  gap: 2px;
  font-size: 1.1rem;
`;

const ReviewsText = styled.span`
  color: var(--text-secondary);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 1rem;

  &:hover {
    color: var(--primary);
  }
`;

const InstructorText = styled.p`
  color: var(--text-light);
  margin-bottom: 20px;
  font-size: 1.1rem;
  
  span {
    color: var(--primary);
    font-weight: 600;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-dark);
    }
  }
`;

const InfoBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  
  svg {
    color: var(--primary);
  }
`;