import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar, FaUsers } from 'react-icons/fa';
import styled from 'styled-components';

// Define CSS custom properties at the root level
const StyledWrapper = styled.div`
  --primary: #00E676;
  --primary-dark: #00C853;
  --background-dark: #101310;
  --card-background: #181d19;
  --text-light: rgba(255, 255, 255, 0.87);
  --text-secondary: rgba(255, 255, 255, 0.6);
  --border-color: #333;
  --heading-color: white;
  --mode-text: white;
`;

// Styled Card component
const StyledCard = styled(Card)`
  background-color: var(--card-background) !important;
  color: var(--text-light) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
`;

// Styled Badge
const PriceBadge = styled.span`
  background-color: ${props => props.free ? 'var(--primary)' : 'var(--primary-dark)'} !important;
  color: var(--background-dark) !important;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
`;

// Styled Card Title
const StyledCardTitle = styled(Card.Title)`
  color: var(--heading-color) !important;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

// Styled Card Text
const StyledCardText = styled(Card.Text)`
  color: var(--text-secondary) !important;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

// Instructor container
const InstructorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
`;

// Instructor image
const InstructorImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 2px solid var(--primary);
`;

// Instructor info
const InstructorInfo = styled.div`
  .instructor-name {
    color: var(--text-light);
    font-weight: 600;
    font-size: 0.95rem;
    margin: 0;
  }
  
  .instructor-role {
    color: var(--text-secondary);
    font-size: 0.85rem;
    margin: 0;
  }
`;

// Stats container
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.25rem 0 1.5rem 0;
  font-size: 0.9rem;
  color: var(--text-light);
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    
    svg {
      color: var(--primary);
    }
  }
`;

// Styled Button
const EnrollButton = styled(Button)`
  background-color: transparent !important;
  border: 2px solid var(--primary) !important;
  color: var(--primary) !important;
  font-weight: bold !important;
  padding: 0.75rem !important;
  border-radius: 8px !important;
  font-size: 1rem !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background-color: var(--primary) !important;
    color: var(--background-dark) !important;
    border-color: var(--primary) !important;
  }
  
  &:focus {
    background-color: var(--primary) !important;
    color: var(--background-dark) !important;
    border-color: var(--primary) !important;
    box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25) !important;
  }
  
  &:active {
    background-color: var(--primary-dark) !important;
    border-color: var(--primary-dark) !important;
  }
`;

const CourseCard = ({
  image,
  title,
  description,
  instructor,
  instructorName,
  role,
  rating,
  reviews,
  students,
  price,
  free
}) => {
  return (
    <StyledWrapper>
      <StyledCard className="text-white">
        <div className="position-relative">
          <Card.Img variant="top" src={image} className="rounded-top" />
          <PriceBadge
            free={free}
            className="position-absolute top-0 end-0 m-2 badge rounded-pill"
          >
            {free ? 'Free' : `$${price}`}
          </PriceBadge>
        </div>

        <Card.Body style={{ padding: '1.5rem' }}>
          <StyledCardTitle>{title}</StyledCardTitle>
          <StyledCardText>{description}</StyledCardText>

          <InstructorContainer>
            <InstructorImage src={instructor} alt="instructor" />
            <InstructorInfo>
              <div className="instructor-name">{instructorName}</div>
              <div className="instructor-role">{role}</div>
            </InstructorInfo>
          </InstructorContainer>

          <StatsContainer>
            <div className="stat-item">
              <FaStar /> {rating} ({reviews?.toLocaleString()})
            </div>
            <div className="stat-item">
              <FaUsers /> {students?.toLocaleString()} students
            </div>
          </StatsContainer>

          <EnrollButton className="w-100">
            Enroll Now
          </EnrollButton>
        </Card.Body>
      </StyledCard>
    </StyledWrapper>
  );
};

export default CourseCard;