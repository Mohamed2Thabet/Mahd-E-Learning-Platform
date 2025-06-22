import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CourseCard = ({
  _id,
  imageUrl,
  title,
  description,
  educator,
  price,
  enrollmentCount,
  rating
}) => {
  const navigate = useNavigate();
console.log
  const isFree = price === 0;
  const instructorName = typeof educator === 'string' ? educator : educator?.name || 'Instructor';

  return (
    <StyledCard className="text-white">
      <div className="position-relative">
        <Card.Img variant="top" src={imageUrl || "/image/default-avatar.jpg"} className="rounded-top" />
      <PriceBadge
          free={isFree}
          className="position-absolute top-0 end-0 m-2 badge rounded-pill"
        >
          {isFree ? 'Free' : `$${price}`}
        </PriceBadge>
      </div>

      <Card.Body style={{ padding: '1.5rem' }}>
        <StyledCardTitle>{title}</StyledCardTitle>
        <StyledCardText>{description}</StyledCardText>

        <InstructorContainer onClick={() => navigate('/profile')}>
          <InstructorImage src="/images/default-avatar.png" alt="instructor" />
          <InstructorInfo>
            <div className="instructor-name">{instructorName}</div>
            <div className="instructor-role">Educator</div>
          </InstructorInfo>
        </InstructorContainer>

        <StatsContainer>
          <div className="stat-item">
            <FaStar /> {rating?.average || 0} ({rating?.count || 0})
          </div>
          <div className="stat-item">
            <FaUsers /> {enrollmentCount || 0} students
          </div>
        </StatsContainer>

        <Button className="w-100" onClick={() => navigate(`/course-player/${_id}`)}>
          Enroll Now
        </Button>
      </Card.Body>
    </StyledCard>
  );
};

export default CourseCard;

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

const PriceBadge = styled.span`
  background-color: ${props => props.free ? 'var(--primary)' : 'var(--primary-dark)'} !important;
  color: var(--background-dark) !important;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
`;

const StyledCardTitle = styled(Card.Title)`
  color: var(--heading-color) !important;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const StyledCardText = styled(Card.Text)`
  color: var(--text-secondary) !important;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

const InstructorContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
`;

const InstructorImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 2px solid var(--primary);
`;

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