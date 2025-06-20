import { Badge, Button, Card } from "react-bootstrap";
import { FaClock, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" style={{ opacity: 0.5 }} />);
    }

    return stars;
  };

  return (
    <StyledCard>
      <div className="position-relative">
        <CourseImage $bgImage={course.imageUrl} />
        {course.isPopular && <PopularBadge>Popular</PopularBadge>}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <InstructorAvatar
            src={course.instructorAvatar || "/image/default-avatar.jpg"}
            alt={course.educator}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/image/default-avatar.jpg";
            }}
          />

          <div className="ms-3">
            <div className="fw-semibold" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              {course.educator}
            </div>
          </div>
        </div>

        <Card.Title className="mb-3 fw-bold" style={{ color: 'var(--heading-color)', fontSize: '1.1rem' }}>
          {course.title}
        </Card.Title>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <RatingStars className="d-flex align-items-center">
            {renderStars(course.rating?.average || 0)}
            <span className="ms-2 fw-semibold">{course.rating?.average || 0}</span>
            <span className="ms-1" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              ({course.enrollmentCount?.toLocaleString() || 0})
            </span>
          </RatingStars>
          <DifficultyBadge $level={course.level?.toLowerCase()}>
            {course.level || "N/A"}
          </DifficultyBadge>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center" style={{ color: 'var(--text-secondary)' }}>
            <FaClock className="me-1" />
            <span>{course.duration || 1}h</span>
          </div>
          <PriceTag>${course.price}</PriceTag>
        </div>

        <div className="mt-auto">
          <PrimaryButton className="w-100" onClick={() => navigate(`/course-details/${course._id}`)}>
            Enroll Now
          </PrimaryButton>
        </div>
      </Card.Body>
    </StyledCard>
  );
};

export default CourseCard;



const PopularBadge = styled(Badge)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--heading-color);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const DifficultyBadge = styled(Badge)`
 background-color: ${props => {
    switch (props.$level) { // ✅ transient prop
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return 'var(--text-secondary)';
    }
  }};
 color: white;
 border-radius: 20px;
 padding: 4px 12px;
 font-size: 0.75rem;
`;

const PriceTag = styled.div`
 font-size: 1.25rem;
 font-weight: 700;
 color: var(--primary);
`;

const StyledCard = styled(Card)`
 background-color: var(--card-background);
 border: 1px solid var(--border-color);
 border-radius: 16px;
 transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
 overflow: hidden;
 height: 100%;

 &:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 230, 118, 0.15);
  border-color: var(--primary);
 }
`;

const CourseImage = styled.div`
 height: 200px;
 background-image: url(${props => props.$bgImage}); // ✅ transient prop
 background-size: cover;
 background-position: center;
 position: relative;
 overflow: hidden;

 &::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 200, 83, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
 }

 ${StyledCard}:hover &::after {
  opacity: 1;
 }
`;

const InstructorAvatar = styled.img`
 width: 40px;
 height: 40px;
 border-radius: 50%;
 border: 2px solid var(--primary);
 object-fit: cover;
`;

const RatingStars = styled.div`
 color: var(--primary);
`;

const PrimaryButton = styled(Button)`
 background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
 border: none;
 border-radius: 50px;
 padding: 12px 24px;
 font-weight: 600;
 color: var(--heading-color);
 transition: all 0.3s ease;

 &:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
  color: var(--heading-color);
 }

 &:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25);
  color: var(--heading-color);
 }
`;
