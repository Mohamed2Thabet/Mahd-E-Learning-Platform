// components/CoursesList.jsx
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Card, Modal, Form, Button as BSButton, Alert } from 'react-bootstrap';
import { FaEdit, FaPlus, FaEye, FaUsers, FaStar, FaBookOpen } from 'react-icons/fa';
import { MdDelete, MdClose } from 'react-icons/md';



// ✅ CoursesList Component
const VeiwCourses = ({ courses=[], onAdd, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeleteingCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: ''
  });

  // Form handlers
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      category: '',
      description: ''
    });
  };

  // Add course
  const handleAddCourse = () => {
    setEditingCourse(null);
    resetForm();
    setShowModal(true);
  };

  // Edit course
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      price: course.price,
      category: course.category || '',
      description: course.description || ''
    });
    setShowModal(true);
  };

  // Delete course
  const handleDeleteCourse = (course) => {
    setDeleteingCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onDelete(deletingCourse.id);
      setAlertMessage(`Course "${deletingCourse.title}" deleted successfully!`);
      setShowDeleteModal(false);
      setDeleteingCourse(null);
      setTimeout(() => setAlertMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting course:', error);
      setAlertMessage('Error deleting course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save course (add or edit)
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingCourse) {
        onUpdate(editingCourse.id, formData);
        setAlertMessage(`Course "${formData.title}" updated successfully!`);
      } else {
        onAdd(formData);
        setAlertMessage(`Course "${formData.title}" added successfully!`);
      }

      setShowModal(false);
      resetForm();
      setEditingCourse(null);
      setTimeout(() => setAlertMessage(''), 3000);
    } catch (error) {
      console.error('Error saving course:', error);
      setAlertMessage('Error saving course. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CoursesContainer>
      {alertMessage && (
        <Alert
          variant={alertMessage.includes('Error') ? 'danger' : 'success'}
          style={{
            backgroundColor: alertMessage.includes('Error') ? 'rgba(244, 67, 54, 0.1)' : 'rgba(0, 230, 118, 0.1)',
            borderColor: alertMessage.includes('Error') ? '#f44336' : 'var(--primary)',
            color: alertMessage.includes('Error') ? '#f44336' : 'var(--primary)',
            marginBottom: '24px'
          }}
        >
          {alertMessage}
        </Alert>
      )}

      <TitleRow>
        <h5>
          <SectionIcon>
            <FaBookOpen />
          </SectionIcon>
          Recent Courses ({courses.length})
        </h5>
        <ActionButtonsGroup>
          <ViewAll>
            <FaEye />
            View All
          </ViewAll>
          <AddCourseButton onClick={handleAddCourse}>
            <FaPlus />
            Add Course
          </AddCourseButton>
        </ActionButtonsGroup>
      </TitleRow>

      {courses.map((course, index) => (
        <StyledCard
          key={course.id}
          $delay={`${index * 0.1}s`}
          role="group"
          aria-label={`Course: ${course.title}`}
        >
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <CourseImage>
                <FaBookOpen />
              </CourseImage>
              <CourseInfo>
                <h6>{course.title}</h6>
                <CourseStats>
                  <StatItem>
                    <FaUsers />
                    {course.students} Students
                  </StatItem>
                  <StatItem>
                    <FaStar />
                    {course.rating}
                  </StatItem>
                  <CoursePrice>{course.price}</CoursePrice>
                </CourseStats>
              </CourseInfo>
            </div>
            <IconGroup>
              <ActionIcon
                className="edit"
                onClick={() => handleEditCourse(course)}
                title={`Edit ${course.title}`}
              >
                <FaEdit size={16} />
              </ActionIcon>
              <ActionIcon
                className="delete"
                onClick={() => handleDeleteCourse(course)}
                title={`Delete ${course.title}`}
              >
                <MdDelete size={16} />
              </ActionIcon>
            </IconGroup>
          </Card.Body>
        </StyledCard>
      ))}

      {/* Add/Edit Course Modal */}
      <StyledModal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title>
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Form onSubmit={handleSaveCourse}>
          <Modal.Body>
            <FormGroup>
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
                required
              />
            </FormGroup>

            <FormGroup>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., $99.99"
                required
              />
            </FormGroup>

            <FormGroup>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
                <option value="Photography">Photography</option>
              </Form.Control>
            </FormGroup>

            <FormGroup>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                required
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <BSButton
              variant="secondary"
              onClick={() => setShowModal(false)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)'
              }}
            >
              Cancel
            </BSButton>
            <BSButton
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: 'var(--primary)',
                borderColor: 'var(--primary)',
                color: 'white'
              }}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Saving...
                </>
              ) : (
                editingCourse ? 'Update Course' : 'Add Course'
              )}
            </BSButton>
          </Modal.Footer>
        </Form>
      </StyledModal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Body>
          <div className="icon">
            <MdDelete />
          </div>
          <h4>Delete Course?</h4>
          <p>
            Are you sure you want to delete "{deletingCourse?.title}"?
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <BSButton
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            Cancel
          </BSButton>
          <BSButton
            onClick={confirmDelete}
            disabled={isLoading}
            style={{
              backgroundColor: '#f44336',
              borderColor: '#f44336',
              color: 'white'
            }}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Deleting...
              </>
            ) : (
              'Delete Course'
            )}
          </BSButton>
        </Modal.Footer>
      </ConfirmationModal>
    </CoursesContainer>
  );
};

export default VeiwCourses;
// ✅ Animations
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

// ✅ Styled Components
const CoursesContainer = styled.div`
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
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

const ActionButtonsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ViewAll = styled.button`
  color: var(--primary);
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(0, 230, 118, 0.1);
    transform: translateX(3px);
  }
`;

const AddCourseButton = styled.button`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
  }
`;

const StyledCard = styled(Card)`
  background-color: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-light) !important;
  margin-bottom: 1rem;
  border-radius: 16px !important;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${css`${slideInLeft} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
  position: relative;

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
    transform: translateY(-4px) translateX(4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }

  h6 {
    color: var(--text-light);
    margin: 0 0 8px 0;
    font-weight: 600;
    font-size: clamp(14px, 2.5vw, 16px);
  }

  .card-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px !important;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }
  }
`;

const CourseImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 12px;
  margin-right: 1rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 8px;
  }
`;

const CourseInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CourseStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: clamp(12px, 2vw, 14px);
  color: var(--text-secondary);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CoursePrice = styled.span`
  font-weight: 600;
  color: var(--primary);
  font-size: clamp(14px, 2.5vw, 16px);
`;

const IconGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const ActionIcon = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  &.edit:hover {
    color: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.2);
  }

  &.delete:hover {
    color: #f44336;
    border-color: #f44336;
    box-shadow: 0 4px 15px rgba(244, 67, 54, 0.2);
  }
`;

// ✅ Modal Components
const StyledModal = styled(Modal)`
  .modal-content {
    background-color: var(--card-background) !important;
    border: 1px solid var(--border-color) !important;
    border-radius: 16px !important;
    color: var(--text-light) !important;
  }

  .modal-header {
    border-bottom: 1px solid var(--border-color) !important;
    padding: 24px !important;

    .modal-title {
      color: var(--heading-color) !important;
      font-weight: 600 !important;
    }

    .btn-close {
      background: none !important;
      border: none !important;
      color: var(--text-secondary) !important;
      font-size: 20px !important;
      opacity: 1 !important;

      &:hover {
        color: var(--text-light) !important;
      }
    }
  }

  .modal-body {
    padding: 24px !important;
  }

  .modal-footer {
    border-top: 1px solid var(--border-color) !important;
    padding: 24px !important;
  }
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 20px;

  label {
    color: var(--text-light) !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
  }

  .form-control {
    background-color: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid var(--border-color) !important;
    color: var(--text-light) !important;
    border-radius: 8px !important;
    padding: 12px 16px !important;

    &:focus {
      background-color: rgba(255, 255, 255, 0.08) !important;
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1) !important;
      color: var(--text-light) !important;
    }

    &::placeholder {
      color: var(--text-secondary) !important;
    }
  }
`;

const ConfirmationModal = styled(StyledModal)`
  .modal-body {
    text-align: center;
    padding: 32px 24px !important;

    .icon {
      width: 80px;
      height: 80px;
      background: #f44336;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      color: white;
      font-size: 32px;
      animation: ${css`${bounce} 1s ease-in-out`};
    }

    h4 {
      color: var(--heading-color);
      margin-bottom: 16px;
    }

    p {
      color: var(--text-secondary);
      margin-bottom: 0;
    }
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;