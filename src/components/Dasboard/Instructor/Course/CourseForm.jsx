import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { FaSave, FaTimes, FaImage, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, updateCourse, fetchCourseById } from '../../../../store/courseSlice';

const CourseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: '',
    tags: [],
    price: 0,
    level: 'Beginner',
    // approved: false
  });

  const course = useSelector(state => state.course.current);
  useEffect(() => {
    if (isEditing) {
      const token = localStorage.getItem('token');
      dispatch(fetchCourseById({ courseId: id, token }));
    }
  }, [id, isEditing, dispatch]);

  useEffect(() => {
    if (course && isEditing) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        price: course.price || 0,
        level: course.level || 'Beginner',
        approved: course.approved || false,
        tags: course.tags || [],
        image: null,
        imagePreview: course.imageUrl || '',
      });
    }
  }, [course, isEditing]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const token = localStorage.getItem('token');
      let payload;
  
      const hasImage = formData.image instanceof File;
  
      if (hasImage) {
        const formPayload = new FormData();
        formPayload.append('title', formData.title);
        formPayload.append('description', formData.description);
        formPayload.append('price', formData.price);
        formPayload.append('level', formData.level);
        formData.tags.forEach(tag => {
          formPayload.append('tags[]', tag);
        });
        formPayload.append('image', formData.image);
        payload = formPayload;
      } else {
        payload = {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          level: formData.level,
          tags: formData.tags,
        };
      }
  
      if (isEditing) {
        await dispatch(updateCourse({ courseId: id, formData: payload, token }));
        setSuccess('Course updated successfully!');
      } else {
        await dispatch(createCourse({ formData: payload, token }));
        setSuccess('Course created successfully!');
      }
  
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Failed to save course. Please try again.');
      console.error('Error saving course:', err);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading && isEditing) {
    return (
      <LoadingContainer>
        <StyledSpinner animation="border" size="lg" />
        <div className="loading-text">Loading course data...</div>
      </LoadingContainer>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--background-dark)', minHeight: '100vh', padding: '0' }}>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8} xl={7}>
            <StyledCard>
              <Card.Header>
                <h3>{isEditing ? 'Edit Course' : 'Create New Course'}</h3>
              </Card.Header>
              <Card.Body>
                {error && <StyledAlert variant="danger" dismissible onClose={() => setError('')}>{error}</StyledAlert>}
                {success && <StyledAlert variant="success" dismissible onClose={() => setSuccess('')}>{success}</StyledAlert>}

                <StyledForm onSubmit={handleSubmit}>
                  <FormSection>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Course Title *</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter course title"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Price ($) *</Form.Label>
                          <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Description *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your course..."
                        required
                      />
                    </Form.Group>
                  </FormSection>

                  <FormSection>
                    <Form.Group className="mb-3">
                      <Form.Label>Upload Course Image *</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            image: e.target.files[0],
                            imagePreview: URL.createObjectURL(e.target.files[0])
                          }))
                        }
                        required={!isEditing}
                      />
                      {formData.imagePreview ? (
                        <ImagePreview>
                          <img src={formData.imagePreview} alt="Course preview" />
                        </ImagePreview>
                      ) : (
                        <ImagePreview>
                          <div className="text-center">
                            <FaImage size={48} />
                            <p>No image selected</p>
                          </div>
                        </ImagePreview>
                      )}
                    </Form.Group>
                  </FormSection>

                  <FormSection>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Level *</Form.Label>
                          <Form.Select
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                    </Row>
                  </FormSection>

                  <FormSection>
                    <Form.Group className="mb-4">
                      <Form.Label>Tags</Form.Label>
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          placeholder="Add a tag..."
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                        />
                        <StyledButton type="button" className="btn-outline-primary" onClick={handleAddTag}>
                          <FaPlus />
                        </StyledButton>
                      </div>
                      <TagInput>
                        {formData.tags.map((tag, index) => (
                          <Tag key={index}>
                            {tag}
                            <RemoveTagButton type="button" onClick={() => handleRemoveTag(tag)}>
                              <FaMinus />
                            </RemoveTagButton>
                          </Tag>
                        ))}
                      </TagInput>
                    </Form.Group>
                  </FormSection>

                  <ActionButtons>
                    <StyledButton
                      type="button"
                      className="btn-outline-secondary"
                      onClick={() => navigate('/')}
                    >
                      <FaTimes /> Cancel
                    </StyledButton>
                    <StyledButton
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? <StyledSpinner animation="border" size="sm" /> : <FaSave />}
                      {loading ? 'Saving...' : isEditing ? 'Update Course' : 'Create Course'}
                    </StyledButton>
                  </ActionButtons>
                </StyledForm>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseForm;


const StyledCard = styled(Card)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);
  }
  
  .card-header {
    background: linear-gradient(135deg, var(--card-background) 0%, rgba(24, 29, 25, 0.8) 100%);
    border-bottom: 1px solid var(--border-color);
    padding: 1.5rem;
    
    h3 {
      color: var(--heading-color);
      margin-bottom: 0;
      font-weight: 600;
      font-size: 1.5rem;
      letter-spacing: -0.025em;
    }
  }
  
  .card-body {
    background-color: var(--card-background);
    padding: 2rem;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  font-size: 0.9rem;
  letter-spacing: 0.025em;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.btn-primary {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
    color: var(--background-dark) !important;
    box-shadow: 0 4px 16px rgba(0, 230, 118, 0.3) !important;
    
    &:hover {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%) !important;
      box-shadow: 0 8px 32px rgba(0, 230, 118, 0.4) !important;
    }
    
    &:disabled {
      background: rgba(0, 230, 118, 0.5) !important;
      transform: none !important;
      box-shadow: none !important;
    }
  }
  
  &.btn-outline-primary {
    color: var(--primary) !important;
    border: 2px solid var(--primary) !important;
    background: transparent !important;
    
    &:hover {
      background: var(--primary) !important;
      color: var(--background-dark) !important;
      border-color: var(--primary) !important;
      box-shadow: 0 8px 24px rgba(0, 230, 118, 0.3) !important;
    }
  }
  
  &.btn-outline-secondary {
    color: var(--text-secondary) !important;
    border: 2px solid var(--border-color) !important;
    background: transparent !important;
    
    &:hover {
      background: var(--text-secondary) !important;
      color: var(--background-dark) !important;
      border-color: var(--text-secondary) !important;
      box-shadow: 0 8px 24px rgba(255, 255, 255, 0.1) !important;
    }
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 220px;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--background-dark) 0%, rgba(16, 19, 16, 0.8) 100%);
  margin-top: 0.75rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary);
    background: linear-gradient(135deg, var(--background-dark) 0%, rgba(16, 19, 16, 0.9) 100%);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  .text-center {
    color: var(--text-secondary);
    text-align: center;
    
    p {
      color: var(--text-secondary);
      margin-top: 0.75rem;
      font-size: 0.9rem;
    }
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.75rem;
  padding: 0.5rem 0;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--background-dark);
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 230, 118, 0.2);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 230, 118, 0.3);
  }
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: var(--background-dark);
  cursor: pointer;
  padding: 2px;
  font-size: 0.75rem;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
`;

const StyledForm = styled(Form)`
  .form-label {
    color: var(--text-light);
    font-weight: 600;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    letter-spacing: 0.025em;
  }
  
  .form-control {
    background-color: var(--background-dark) !important;
    border: 2px solid var(--border-color) !important;
    color: var(--text-light) !important;
    border-radius: 10px !important;
    padding: 0.75rem 1rem !important;
    font-size: 0.9rem !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    
    &:focus {
      background-color: var(--background-dark) !important;
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.15) !important;
      color: var(--text-light) !important;
      transform: translateY(-1px) !important;
    }
    
    &::placeholder {
      color: var(--text-secondary) !important;
      opacity: 0.8 !important;
    }
    
    &:hover:not(:focus) {
      border-color: rgba(0, 230, 118, 0.5) !important;
    }
  }
  
  .form-select {
    background-color: var(--background-dark) !important;
    border: 2px solid var(--border-color) !important;
    color: var(--text-light) !important;
    border-radius: 10px !important;
    padding: 0.75rem 1rem !important;
    font-size: 0.9rem !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    
    &:focus {
      background-color: var(--background-dark) !important;
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.15) !important;
      color: var(--text-light) !important;
      transform: translateY(-1px) !important;
    }
    
    &:hover:not(:focus) {
      border-color: rgba(0, 230, 118, 0.5) !important;
    }
    
    option {
      background-color: var(--background-dark) !important;
      color: var(--text-light) !important;
      padding: 0.5rem !important;
    }
  }
  
  .form-check-label {
    color: var(--text-light);
    font-weight: 500;
    cursor: pointer;
    user-select: none;
  }
  
  .form-check-input {
    background-color: var(--background-dark) !important;
    border: 2px solid var(--border-color) !important;
    border-radius: 6px !important;
    width: 1.2em !important;
    height: 1.2em !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    
    &:checked {
      background-color: var(--primary) !important;
      border-color: var(--primary) !important;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23101310' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e") !important;
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.15) !important;
      border-color: var(--primary) !important;
    }
    
    &:hover:not(:checked) {
      border-color: rgba(0, 230, 118, 0.5) !important;
    }
  }
`;

const StyledAlert = styled(Alert)`
  background-color: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-light) !important;
  border-radius: 10px !important;
  padding: 1rem 1.25rem !important;
  margin-bottom: 1.5rem !important;
  font-weight: 500 !important;
  
  &.alert-danger {
    border-color: #dc3545 !important;
    background: linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(220, 53, 69, 0.05) 100%) !important;
    color: #ff6b7a !important;
  }
  
  &.alert-success {
    border-color: var(--primary) !important;
    background: linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 230, 118, 0.05) 100%) !important;
    color: var(--primary) !important;
  }
  
  .btn-close {
    opacity: 0.6;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
`;

const StyledSpinner = styled(Spinner)`
  color: var(--primary) !important;
  
  &.spinner-border-sm {
    width: 1rem !important;
    height: 1rem !important;
  }
`;

const LoadingContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  flex-direction: column;
  gap: 1rem;
  
  .loading-text {
    color: var(--text-secondary);
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
  
  @media (max-width: 576px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
    
    button {
      width: 100%;
    }
  }
`;
