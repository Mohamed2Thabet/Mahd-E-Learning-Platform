import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar, FaUsers } from 'react-icons/fa';
import styled from 'styled-components';

const SaveUnsaveCourseCard = ({
  _id,
  imageUrl,
  title,
  description,
  educator,
  price,
  enrollmentCount,
  rating,
  isSaved,
  onToggleSave,
}) => {
  const isFree = price === 0;
  const instructorName = typeof educator === 'string' ? educator : educator?.name || 'Instructor';

  return (
    <StyledCard className="text-white">
      <div className="position-relative">
        <Card.Img
          style={{height:"300px"}}
          variant="top"
          src={imageUrl || '/image/default-avatar.jpg'}
          className="rounded-top"
        />
        <PriceBadge
          free={isFree}
          className="position-absolute top-0 end-0 m-2 badge rounded-pill"
        >
          {isFree ? 'Free' : `$${price}`}
        </PriceBadge>
      </div>

      <Card.Body style={{ padding: '1.25rem' }}>
        <StyledCardTitle>{title}</StyledCardTitle>
        <StyledCardText>{description}</StyledCardText>

        <InstructorContainer>
          <InstructorImage src="/image/person.avif" alt="instructor" />
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

        <ActionButton className="w-100" onClick={() => onToggleSave(_id)}>
          {isSaved ? 'Unsave' : 'Save'}
        </ActionButton>
      </Card.Body>
    </StyledCard>
  );
};

export default SaveUnsaveCourseCard;

// --- Styled Components (كما هو) ---
const StyledCard = styled(Card)`
  background-color: var(--card-background) !important;
  color: var(--text-light) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
`;

const StyledCardText = styled(Card.Text)`
  color: var(--text-secondary) !important;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const InstructorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const InstructorImage = styled.img`
  border-radius: 50%;
  width: 36px;
  height: 36px;
  object-fit: cover;
  border: 2px solid var(--primary);
`;

const InstructorInfo = styled.div`
  .instructor-name {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .instructor-role {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  font-size: 0.85rem;

  .stat-item {
    display: flex;
    align-items: center;
    gap: 5px;

    svg {
      color: var(--primary);
    }
  }
`;

const ActionButton = styled(Button)`
  background-color: transparent !important;
  border: 2px solid var(--primary) !important;
  color: var(--primary) !important;
  font-weight: bold !important;
  padding: 0.7rem !important;
  border-radius: 8px !important;

  &:hover {
    background-color: var(--primary) !important;
    color: var(--background-dark) !important;
  }
`;
