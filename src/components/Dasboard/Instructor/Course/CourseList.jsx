import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Spinner, Alert, Card, Badge, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus, FaEye, FaEdit, FaTrash, FaBook, FaUser, FaGraduationCap, FaExclamationTriangle } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import { deleteCourse, fetchCoursesForEducator } from "../../../../store/courseSlice";

const CourseList = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const educatorData = JSON.parse(localStorage.getItem("user"));
  const educatorId = educatorData?.id;
  const courses = useSelector(state => state.course.educatorCourses);
  const loading = useSelector(state => state.course.loading);
  const error = useSelector(state => state.course.error);

  // Enhanced delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    if (educatorId) {
      dispatch(fetchCoursesForEducator({ educatorId, limit: 0, offset: 0 }));
    }
  }, [dispatch, educatorId, token]);

  // Enhanced delete handler with professional modal
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      dispatch(deleteCourse({ courseId: courseToDelete._id, token }));
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <StyledSpinner animation="border" role="status" />
        <LoadingText>Loading courses...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <ProfessionalContainer fluid>
      <PageHeader>
        <div className="header-content">
          <PageTitle>
            <FaGraduationCap className="title-icon" />
            My Courses
          </PageTitle>
          <StyledButton as={Link} to="/dashboard/instructor/course/create" className="btn-primary">
            <FaPlus /> Add New Course
          </StyledButton>
        </div>
      </PageHeader>

      {/* Enhanced Stats Section */}
      <StatsSection>
        <StatCard>
          <div className="stat-number">{courses.length}</div>
          <div className="stat-label">Total Courses</div>
        </StatCard>
      
      
        <StatCard>
          <div className="stat-number">
            ${courses.reduce((sum, course) => sum + (course.price || 0), 0).toFixed(0)}
          </div>
          <div className="stat-label">Total Value</div>
        </StatCard>
      </StatsSection>

      {error && (
        <Row className="mb-3">
          <Col>
            <ErrorAlert variant="danger">{error}</ErrorAlert>
          </Col>
        </Row>
      )}

      {courses.length === 0 ? (
        <EmptyState>
          <div className="empty-icon">
            <FaBook />
          </div>
          <h4>No Courses Found</h4>
          <p>You haven't created any courses yet. Start by adding your first course to share your knowledge with the world.</p>
          <StyledButton as={Link} to="/dashboard/instructor/course/create" className="btn-primary">
            <FaPlus /> Create Your First Course
          </StyledButton>
        </EmptyState>
      ) : (
        <Row>
          {courses.map(course => (
            <Col key={course.id} md={6} lg={4} className="mb-4">
              <StyledCard>
                <CourseImage>
                  <img
                    src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'}
                    alt={course.title}
                    loading="lazy"
                  />
                  <PriceTag>
                    ${course.price || 0}
                  </PriceTag>
                  
                </CourseImage>

                <CardBody>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>
                    {course.description?.length > 100
                      ? `${course.description.substring(0, 100)}...`
                      : course.description || "No description available"}
                  </Card.Text>

                  <CourseMetadata>
                    <div className="educator-info">
                      <FaUser />
                      {educatorData?.firstName} {educatorData?.lastName}
                    </div>
                    <div className="level-badge">
                      <StyledBadge>{course.level || "Beginner"}</StyledBadge>
                    </div>
                  </CourseMetadata>

                  <CardActions>
                    <StyledButton
                      size="sm"
                      as={Link}
                      to={`/dashboard/instructor/course/${course._id}`}
                      className="btn-outline-primary"
                    >
                      <FaEye /> View
                    </StyledButton>
                    <StyledButton
                      size="sm"
                      as={Link}
                      to={`/dashboard/instructor/course/edit/${course._id}`}
                      className="btn-outline-secondary"
                    >
                      <FaEdit /> Edit
                    </StyledButton>
                    <StyledButton
                      size="sm"
                      className="btn-outline-danger"
                      onClick={() => handleDeleteClick(course)}
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

      {/* Professional Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        onHide={cancelDelete}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FaExclamationTriangle className="text-danger me-2" />
            Confirm Course Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {courseToDelete && (
            <div>
              <p className="mb-3">
                Are you sure you want to delete <strong>"{courseToDelete.title}"</strong>?
              </p>
              <div className="alert alert-warning">
                <strong>Warning:</strong> This action cannot be undone and will permanently remove:
                <ul className="mt-2 mb-0">
                  <li>Course content and materials</li>
                  <li>Student enrollment data</li>
                  <li>All associated progress</li>
                  <li>Course analytics and reviews</li>
                </ul>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <FaTrash className="me-1" />
            Delete Course
          </Button>
        </Modal.Footer>
      </DeleteModal>
    </ProfessionalContainer>
  );
};

export default CourseList;

// Professional animations
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

// Professional main container
const ProfessionalContainer = styled(Container)`
  background: var(--background-dark);
  min-height: 100vh;
  padding: 1.5rem 1.5rem 1.5rem calc(60px + 1.5rem);
  position: relative;
  max-width: none;
  
  &::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 60px;
    right: 0;
    height: 80px;
    background: linear-gradient(45deg, 
      rgba(38, 166, 154, 0.04) 0%,
      rgba(0, 105, 92, 0.06) 100%);
    z-index: 0;
    border-radius: 24px 24px 0 0;
  }
`;

// Enhanced card with professional styling
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
  box-shadow: var(--box-shadow);
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
    box-shadow: var(--box-shadow-hover);
    border-color: var(--primary);
    
    &::before {
      opacity: 1;
    }
  }
`;

// Course image with professional gradient
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
    filter: brightness(0.9) contrast(1.1);
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
      rgba(38, 166, 154, 0.1) 0%,
      transparent 50%,
      rgba(0, 105, 92, 0.1) 100%
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
        rgba(38, 166, 154, 0.15) 0%,
        rgba(0, 105, 92, 0.1) 50%,
        rgba(38, 166, 154, 0.15) 100%
      );
    }
  }
`;

// Professional badges
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
    box-shadow: 0 4px 12px rgba(38, 166, 154, 0.3);
  }
`;

// Price tag styling
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
  box-shadow: var(--box-shadow);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
  border: 1px solid var(--border-color);
`;

// Approval badge
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

  

`;

// Card body styling
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

// Course metadata section
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

// Card actions
const CardActions = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

// Enhanced buttons
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
    box-shadow: var(--box-shadow);
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

// Loading components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  flex-direction: column;
  gap: 1rem;
`;

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

// Empty state
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
    box-shadow: 0 4px 16px rgba(38, 166, 154, 0.3);
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

// Page header
const PageHeader = styled.div`
  background: var(--card-background);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow);
  
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

// Error alert
const ErrorAlert = styled(Alert)`
  background: rgba(220, 53, 69, 0.1) !important;
  border: 1px solid rgba(220, 53, 69, 0.2) !important;
  color: var(--text-light) !important;
  border-radius: 8px !important;
  padding: 1rem !important;
`;

// Stats section
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
  box-shadow: var(--box-shadow);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow-hover);
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

// Professional Delete Modal
const DeleteModal = styled(Modal)`
  .modal-content {
    background: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: var(--box-shadow-hover);
  }
  
  .modal-header {
    border-bottom: 1px solid var(--border-color);
    background: var(--card-background);
    
    .modal-title {
      color: var(--heading-color);
      font-weight: 600;
      display: flex;
      align-items: center;
    }
    
    .btn-close {
      filter: invert(1);
    }
  }
  
  .modal-body {
    color: var(--text-secondary);
    background: var(--card-background);
    
    .alert-warning {
      background: rgba(255, 193, 7, 0.1);
      border: 1px solid rgba(255, 193, 7, 0.3);
      color: var(--text-light);
      border-radius: 8px;
      
      ul {
        padding-left: 1.2rem;
        
        li {
          margin-bottom: 0.3rem;
        }
      }
    }
  }
  
  .modal-footer {
    border-top: 1px solid var(--border-color);
    background: var(--card-background);
    
    .btn {
      border-radius: 8px;
      font-weight: 500;
      padding: 0.6rem 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      
      &:hover {
        transform: translateY(-1px);
      }
    }
  }
`;
