import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaPlus, FaTag, FaDollarSign, FaUser, FaCheckCircle, FaClock, FaBook, FaGraduationCap, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { courseAPI } from '../../../services/api';
import Sidebar from '../../../Layout/Sidebar';

// Professional animations with subtle easing
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
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

// Professional main container with sidebar offset and enhanced background
const ProfessionalContainer = styled(Container)`
  background: var(--background-dark);
  min-height: 100vh;
  padding: 1.5rem 1.5rem 1.5rem calc(60px + 1.5rem);
  position: relative;
  max-width: none;
  
  // &::before {
  //   content: '';
  //   position: fixed;
  //   top: 0;
  //   left: 60px;
  //   right: 0;
  //   height: 120px;
  //   background: linear-gradient(135deg, 
  //     rgba(0, 230, 118, 0.08) 0%,
  //     rgba(0, 200, 83, 0.05) 50%,
  //     rgba(0, 230, 118, 0.03) 100%);
  //   z-index: 0;
  //   border-radius: 0 0 24px 24px;
  // }
  
  &::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 60px;
    right: 0;
    height: 80px;
    background: linear-gradient(45deg, 
      rgba(0, 230, 118, 0.04) 0%,
      rgba(0, 200, 83, 0.06) 100%);
    z-index: 0;
    border-radius: 24px 24px 0 0;
  }
`;

// Refined card with professional subtle effects and enhanced background
const StyledCard = styled(Card)`
  background: var(--card-background);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeInUp} 0.5s ease-out;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      var(--primary) 0%, 
      var(--primary-dark) 50%, 
      var(--primary) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    border-color: var(--primary);
    
    &::before {
      opacity: 1;
    }
  }
`;

// Refined course image with colorful gradient overlay
const CourseImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, 
    var(--primary) 0%, 
    var(--primary-dark) 100%);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    filter: brightness(0.8) contrast(1.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 230, 118, 0.1) 0%,
      transparent 50%,
      rgba(0, 200, 83, 0.1) 100%
    );
    transition: opacity 0.3s ease;
  }
  
  ${StyledCard}:hover & {
    img {
      transform: scale(1.05);
    }
    
    &::after {
      background: linear-gradient(
        135deg,
        rgba(0, 230, 118, 0.15) 0%,
        rgba(0, 200, 83, 0.1) 50%,
        rgba(0, 230, 118, 0.15) 100%
      );
    }
  }
`;

// Professional badges with colorful styling
const StyledBadge = styled(Badge)`
  padding: 0.4rem 0.8rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 20px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  background: var(--border-color) !important;
  color: var(--text-secondary) !important;
  border: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary) !important;
    color: var(--background-dark) !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
  }
`;

// Refined price tag with professional styling
const PriceTag = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--card-background);
  backdrop-filter: blur(10px);
  color: var(--primary);
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
  border: 1px solid var(--border-color);
`;

// Professional approval badge with refined animation
const ApprovalBadge = styled(Badge)`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 0.6rem 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  z-index: 2;
  
  &.approved {
    background: var(--primary) !important;
    color: var(--background-dark) !important;
    box-shadow: 0 2px 8px rgba(0, 230, 118, 0.3);
  }
  
  &.pending {
    background: #ffc107 !important;
    color: var(--background-dark) !important;
    box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
    animation: ${pulse} 3s infinite;
  }
`;

// Professional card body with refined spacing
const CardBody = styled(Card.Body)`
  padding: 1.5rem;
  background: var(--card-background);
  
  .card-title {
    color: var(--heading-color);
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .card-text {
    color: var(--text-secondary);
    line-height: 1.5;
    font-size: 0.9rem;
    margin-bottom: 1.2rem;
  }
`;

// Refined metadata section
const CourseMetadata = styled.div`
  margin-bottom: 1.2rem;
  
  .educator-info {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    font-size: 0.85rem;
    padding: 0.4rem 0;
    border-bottom: 1px solid var(--border-color);
    
    svg {
      margin-right: 0.6rem;
      color: var(--primary);
      font-size: 1rem;
    }
  }
  
  .level-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

// Professional tags container
const TagsContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

// Refined action buttons
const CardActions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s ease;
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
  border: 1px solid transparent;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &.btn-outline-primary {
    color: var(--primary) !important;
    border-color: var(--primary) !important;
    background: transparent !important;
    
    &:hover {
      background: var(--primary) !important;
      color: var(--background-dark) !important;
    }
  }
  
  &.btn-outline-secondary {
    color: var(--text-secondary) !important;
    border-color: var(--border-color) !important;
    background: transparent !important;
    
    &:hover {
      background: var(--text-secondary) !important;
      color: var(--background-dark) !important;
    }
  }
  
  &.btn-outline-danger {
    color: #dc3545 !important;
    border-color: #dc3545 !important;
    background: transparent !important;
    
    &:hover {
      background: #dc3545 !important;
      color: var(--text-light) !important;
    }
  }
  
  &.btn-primary {
    background: var(--primary) !important;
    border-color: var(--primary) !important;
    color: var(--background-dark) !important;
    
    &:hover {
      background: var(--primary-dark) !important;
      border-color: var(--primary-dark) !important;
    }
  }
`;

// Professional loading container
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  flex-direction: column;
  gap: 1rem;
`;

// Professional empty state
const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: var(--text-secondary);
  animation: ${fadeInUp} 0.6s ease-out;
  
  .empty-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--background-dark);
    font-size: 2rem;
    box-shadow: 0 4px 16px rgba(0, 230, 118, 0.3);
  }
  
  h4 {
    color: var(--heading-color);
    margin-bottom: 0.8rem;
    font-weight: 600;
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    color: var(--text-secondary);
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

// Professional header section
const PageHeader = styled.div`
  background: var(--card-background);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const PageTitle = styled.h1`
  color: var(--heading-color);
  margin: 0;
  font-weight: 700;
  font-size: 2rem;
  display: flex;
  align-items: center;
  
  .title-icon {
    margin-right: 0.8rem;
    color: var(--primary);
  }
`;

// Professional spinner
const StyledSpinner = styled(Spinner)`
  color: var(--primary) !important;
  width: 2.5rem;
  height: 2.5rem;
`;

const LoadingText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

// Professional alert
const ErrorAlert = styled(Alert)`
  background: rgba(220, 53, 69, 0.1) !important;
  border: 1px solid rgba(220, 53, 69, 0.2) !important;
  color: var(--text-light) !important;
  border-radius: 8px !important;
  padding: 1rem !important;
`;

// Stats section with professional grid
const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 1.2rem;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: var(--primary);
  }
  
  .stat-number {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.4rem;
  }
  
  .stat-label {
    color: var(--text-secondary);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
  }
`;

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAll();
      setCourses(response.data);
      console.log(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch courses. Please try again.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await courseAPI.delete(courseId);
        setCourses(courses.filter(course => course.id !== courseId));
        setError('');
      } catch (err) {
        setError('Failed to delete course. Please try again.');
        console.error('Error deleting course:', err);
      }
    }
  };

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'Beginner': return 'var(--primary)';
      case 'Intermediate': return '#ffc107';
      case 'Advanced': return '#dc3545';
      default: return 'var(--border-color)';
    }
  };

  const getStats = () => {
    const approved = courses.filter(c => c.approved).length;
    const pending = courses.filter(c => !c.approved).length;
    const totalRevenue = courses.reduce((sum, c) => sum + (c.price || 0), 0);

    return { approved, pending, total: courses.length, totalRevenue };
  };

  if (loading) {
    return (
      <ProfessionalContainer fluid>
        <LoadingContainer>
          <StyledSpinner animation="border" />
          <LoadingText>Loading your courses...</LoadingText>
        </LoadingContainer>
      </ProfessionalContainer>
    );
  }

  const stats = getStats();

  return (
    <ProfessionalContainer fluid>
      {/* <Sidebar /> */}
      {/* <PageHeader>
        <div className="header-content">
          <PageTitle>
            <FaGraduationCap className="title-icon" />
            My Courses
          </PageTitle>
          <StyledButton
            as={Link}
            to="/instructor/courses/create"
            className="btn-primary"
            size="lg"
          >
            <FaPlus /> Create New Course
          </StyledButton>

        </div>
      </PageHeader> */}

      {error && (
        <Row className="mb-4">
          <Col>
            <ErrorAlert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </ErrorAlert>
          </Col>
        </Row>
      )}

      {courses.length > 0 && (
        <StatsSection>
          <StatCard>
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Courses</div>
          </StatCard>
          <StatCard>
            <div className="stat-number">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </StatCard>
          <StatCard>
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </StatCard>
          <StatCard>
            <div className="stat-number">${stats.totalRevenue}</div>
            <div className="stat-label">Total Value</div>
          </StatCard>
        </StatsSection>
      )}

      {courses.length === 0 ? (
        <EmptyState>
          <div className="empty-icon">
            <FaBook />
          </div>
          <h4>No courses found</h4>
          <p>Start by creating your first course and share your knowledge with the world!</p>
          <StyledButton as={Link} to="/create-course" className="btn-primary" size="lg">
            <FaPlus /> Create Your First Course
          </StyledButton>
        </EmptyState>
      ) : (
        <Row>
          {courses.map((course, index) => (
            <Col key={course.id} lg={4} md={6} className="mb-4">
              <StyledCard style={{ animationDelay: `${index * 0.1}s` }}>
                <CourseImage>
                  <img
                    src={course.imageUrl || 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={course.title}
                  />
                  <PriceTag>
                    <FaDollarSign size={12} />
                    {course.price}
                  </PriceTag>
                  <ApprovalBadge className={course.approved ? 'approved' : 'pending'}>
                    {course.approved ? <FaCheckCircle /> : <FaClock />}
                    {course.approved ? 'Approved' : 'Pending'}
                  </ApprovalBadge>
                </CourseImage>

                <CardBody>
                  <Card.Title className="card-title">{course.title}</Card.Title>
                  <Card.Text className="card-text">
                    {course.description.length > 100
                      ? `${course.description.substring(0, 100)}...`
                      : course.description}
                  </Card.Text>

                  <CourseMetadata>
                    <div className="educator-info">
                      <FaUser />
                      {course.educator}
                    </div>
                    <div className="level-badge">
                      <StyledBadge style={{ backgroundColor: getLevelBadgeColor(course.level) }}>
                        <FaStar size={8} className="me-1" />
                        {course.level}
                      </StyledBadge>
                    </div>
                  </CourseMetadata>

                  <TagsContainer>
                    {course.tags && course.tags.map((tag, index) => (
                      <StyledBadge key={index}>
                        <FaTag size={8} className="me-1" />
                        {tag}
                      </StyledBadge>
                    ))}
                  </TagsContainer>

                  <CardActions>
                    <StyledButton
                      as={Link}
                      to={`/instructor/course/${course.id}`}
                      className="btn-outline-primary"
                      size="sm"
                    
                    >
                      <FaEye /> View
                    </StyledButton>
                    <StyledButton
                      as={Link}
                      to={`/instructor/edit-course/${course.id}`}
                      className="btn-outline-secondary"
                      size="sm"
                    >
                      <FaEdit /> Edit
                    </StyledButton>
                    <StyledButton
                      className="btn-outline-danger"
                      size="sm"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <FaTrash /> Delete
                    </StyledButton>
                  </CardActions>
                </CardBody>
              </StyledCard>
            </Col>
          ))}
        </Row>
      )}
    </ProfessionalContainer>
  );
};

export default CourseList;