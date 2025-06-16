import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal, Alert, Spinner, ListGroup } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaBook, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styled from 'styled-components';
import { sectionAPI } from '../../../services/api';

const StyledCard = styled(Card)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.1);
  }
  
  .card-body {
    background-color: var(--card-background);
  }
  
  .list-group-item {
    background-color: var(--card-background) !important;
    border-color: var(--border-color) !important;
    color: var(--text-light) !important;
    
    .badge {
      &.bg-primary {
        background-color: var(--primary) !important;
        color: var(--background-dark) !important;
      }
      
      &.bg-success {
        background-color: var(--primary) !important;
        color: var(--background-dark) !important;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &.btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark)) !important;
    border: none !important;
    color: var(--background-dark) !important;
    
    &:hover {
      background: linear-gradient(135deg, var(--primary-dark), var(--primary)) !important;
    }
  }
  
  &.btn-outline-primary {
    color: var(--primary) !important;
    border-color: var(--primary) !important;
    background: transparent !important;
    
    &:hover {
      background: var(--primary) !important;
      color: var(--background-dark) !important;
      border-color: var(--primary) !important;
    }
  }
  
  &.btn-outline-secondary {
    color: var(--text-secondary) !important;
    border-color: var(--border-color) !important;
    background: transparent !important;
    
    &:hover {
      background: var(--text-secondary) !important;
      color: var(--background-dark) !important;
      border-color: var(--text-secondary) !important;
    }
  }
  
  &.btn-outline-danger {
    color: #dc3545 !important;
    border-color: #dc3545 !important;
    background: transparent !important;
    
    &:hover {
      background: #dc3545 !important;
      color: var(--text-light) !important;
      border-color: #dc3545 !important;
    }
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  h6 {
    color: var(--heading-color);
    margin-bottom: 0.25rem;
  }
  
  small {
    color: var(--text-secondary) !important;
  }
`;

const SectionActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  
  h5 {
    color: var(--heading-color);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: var(--card-background) !important;
    border: 1px solid var(--border-color) !important;
  }
  
  .modal-header {
    background-color: var(--card-background) !important;
    border-bottom: 1px solid var(--border-color) !important;
    
    .modal-title {
      color: var(--heading-color) !important;
    }
    
    .btn-close {
      filter: invert(1);
    }
  }
  
  .modal-body {
    background-color: var(--card-background) !important;
  }
  
  .modal-footer {
    background-color: var(--card-background) !important;
    border-top: 1px solid var(--border-color) !important;
  }
`;

const StyledForm = styled(Form)`
  .form-label {
    color: var(--text-light);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .form-control {
    background-color: var(--background-dark) !important;
    border: 1px solid var(--border-color) !important;
    color: var(--text-light) !important;
    
    &:focus {
      background-color: var(--background-dark) !important;
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25) !important;
      color: var(--text-light) !important;
    }
    
    &::placeholder {
      color: var(--text-secondary) !important;
    }
  }
`;

const StyledAlert = styled(Alert)`
  background-color: var(--card-background) !important;
  border-color: var(--border-color) !important;
  color: var(--text-light) !important;
  
  &.alert-danger {
    border-color: #dc3545 !important;
    background-color: rgba(220, 53, 69, 0.1) !important;
  }
  
  &.alert-success {
    border-color: var(--primary) !important;
    background-color: rgba(0, 230, 118, 0.1) !important;
  }
`;

const StyledSpinner = styled(Spinner)`
  color: var(--primary) !important;
`;

const PageTitle = styled.h4`
  color: var(--heading-color);
  margin-bottom: 0;
`;

const SectionManager = ({ courseId, sections: initialSections, onUpdate }) => {
  const [sections, setSections] = useState(initialSections || []);
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 1
  });

  useEffect(() => {
    setSections(initialSections || []);
  }, [initialSections]);

  const handleShowModal = (section = null) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        title: section.title,
        description: section.description,
        order: section.order
      });
    } else {
      setEditingSection(null);
      setFormData({
        title: '',
        description: '',
        order: sections.length + 1
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSection(null);
    setFormData({ title: '', description: '', order: 1 });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const sectionData = {
        ...formData,
        courseId,
        order: parseInt(formData.order),
        videos: editingSection?.videos || [],
        quizId: editingSection?.quizId || null
      };

      if (editingSection) {
        await sectionAPI.update(editingSection.id, sectionData);
        setSuccess('Section updated successfully!');
      } else {
        await sectionAPI.create(sectionData);
        setSuccess('Section created successfully!');
      }

      handleCloseModal();
      onUpdate();
    } catch (err) {
      setError('Failed to save section. Please try again.');
      console.error('Error saving section:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (window.confirm('Are you sure you want to delete this section? This will also delete all associated videos and quizzes.')) {
      try {
        await sectionAPI.delete(sectionId);
        setSuccess('Section deleted successfully!');
        onUpdate();
      } catch (err) {
        setError('Failed to delete section. Please try again.');
        console.error('Error deleting section:', err);
      }
    }
  };

  const handleMoveSection = async (sectionId, direction) => {
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= sections.length) return;

    const updatedSections = [...sections];
    [updatedSections[currentIndex], updatedSections[newIndex]] =
      [updatedSections[newIndex], updatedSections[currentIndex]];

    // Update order values
    updatedSections[currentIndex].order = currentIndex + 1;
    updatedSections[newIndex].order = newIndex + 1;

    try {
      await Promise.all([
        sectionAPI.update(updatedSections[currentIndex].id, updatedSections[currentIndex]),
        sectionAPI.update(updatedSections[newIndex].id, updatedSections[newIndex])
      ]);

      setSections(updatedSections);
      setSuccess('Section order updated!');
    } catch (err) {
      setError('Failed to update section order.');
      console.error('Error updating section order:', err);
    }
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <PageTitle>Course Sections</PageTitle>
            <StyledButton className="btn-primary" onClick={() => handleShowModal()}>
              <FaPlus /> Add Section
            </StyledButton>
          </div>
        </Col>
      </Row>

      {error && (
        <StyledAlert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </StyledAlert>
      )}

      {success && (
        <StyledAlert variant="success" dismissible onClose={() => setSuccess('')}>
          {success}
        </StyledAlert>
      )}

      {sections.length === 0 ? (
        <EmptyState>
          <FaBook size={64} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h5>No sections found</h5>
          <p>Start by creating your first section!</p>
          <StyledButton className="btn-primary" onClick={() => handleShowModal()}>
            <FaPlus /> Create First Section
          </StyledButton>
        </EmptyState>
      ) : (
        <Row>
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <Col key={section.id} lg={6} className="mb-3">
                <StyledCard>
                  <SectionHeader>
                    <div>
                      <h6>Section {section.order}: {section.title}</h6>
                      <small>{section.description}</small>
                    </div>
                    <SectionActions>
                      <StyledButton
                        className="btn-outline-secondary"
                        size="sm"
                        onClick={() => handleMoveSection(section.id, 'up')}
                        disabled={index === 0}
                      >
                        <FaArrowUp />
                      </StyledButton>
                      <StyledButton
                        className="btn-outline-secondary"
                        size="sm"
                        onClick={() => handleMoveSection(section.id, 'down')}
                        disabled={index === sections.length - 1}
                      >
                        <FaArrowDown />
                      </StyledButton>
                      <StyledButton
                        className="btn-outline-primary"
                        size="sm"
                        onClick={() => handleShowModal(section)}
                      >
                        <FaEdit />
                      </StyledButton>
                      <StyledButton
                        className="btn-outline-danger"
                        size="sm"
                        onClick={() => handleDeleteSection(section.id)}
                      >
                        <FaTrash />
                      </StyledButton>
                    </SectionActions>
                  </SectionHeader>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>Videos</span>
                        <span className="badge bg-primary">{section.videos?.length || 0}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>Quiz</span>
                        <span className="badge bg-success">{section.quizId ? 'Created' : 'Not Created'}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </StyledCard>
              </Col>
            ))}
        </Row>
      )}

      <StyledModal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSection ? 'Edit Section' : 'Create New Section'}
          </Modal.Title>
        </Modal.Header>
        <StyledForm onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <StyledAlert variant="danger">{error}</StyledAlert>}

            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Section Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter section title"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Order *</Form.Label>
                  <Form.Control
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this section covers..."
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <StyledButton className="btn-outline-secondary" onClick={handleCloseModal}>
              <FaTimes /> Cancel
            </StyledButton>
            <StyledButton type="submit" className="btn-primary" disabled={loading}>
              {loading ? <StyledSpinner animation="border" size="sm" /> : <FaSave />}
              {loading ? 'Saving...' : editingSection ? 'Update Section' : 'Create Section'}
            </StyledButton>
          </Modal.Footer>
        </StyledForm>
      </StyledModal>
    </>
  );
};

export default SectionManager;
