import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal, Alert, Spinner, Badge, Accordion } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaQuestionCircle, FaCheck, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';
import { quizAPI } from '../../../services/api';

const StyledCard = styled(Card)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.1);
  }
  
  .card-header {
    background-color: var(--card-background) !important;
    border-bottom: 1px solid var(--border-color) !important;
    
    h6 {
      color: var(--heading-color);
      margin-bottom: 0.25rem;
    }
    
    .text-muted {
      color: var(--text-secondary) !important;
    }
  }
  
  .card-body {
    background-color: var(--card-background);
    
    .text-muted {
      color: var(--text-secondary) !important;
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
  
  &.btn-success {
    background: var(--primary) !important;
    border-color: var(--primary) !important;
    color: var(--background-dark) !important;
    
    &:hover {
      background: var(--primary-dark) !important;
      border-color: var(--primary-dark) !important;
    }
  }
`;

const QuestionCard = styled(Card)`
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  
  .card-header {
    background-color: var(--background-dark) !important;
    border-bottom: 1px solid var(--border-color) !important;
    
    h6 {
      color: var(--heading-color);
    }
  }
  
  .card-body {
    background-color: var(--background-dark);
  }
`;

const OptionButton = styled(Button)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  position: relative;
  
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
  
  .form-select {
    background-color: var(--background-dark) !important;
    border: 1px solid var(--border-color) !important;
    color: var(--text-light) !important;
    
    &:focus {
      background-color: var(--background-dark) !important;
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25) !important;
      color: var(--text-light) !important;
    }
    
    option {
      background-color: var(--background-dark) !important;
      color: var(--text-light) !important;
    }
  }
  
  .form-text {
    color: var(--text-secondary) !important;
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

const StyledBadge = styled(Badge)`
  &.bg-primary {
    background-color: var(--primary) !important;
    color: var(--background-dark) !important;
  }
`;

const StyledAccordion = styled(Accordion)`
  .accordion-item {
    background-color: var(--background-dark) !important;
    border: 1px solid var(--border-color) !important;
  }
  
  .accordion-header {
    .accordion-button {
      background-color: var(--background-dark) !important;
      color: var(--text-light) !important;
      border: none !important;
      
      &:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25) !important;
      }
      
      &:not(.collapsed) {
        background-color: var(--card-background) !important;
        color: var(--primary) !important;
      }
      
      &::after {
        filter: invert(1);
      }
    }
  }
  
  .accordion-body {
    background-color: var(--background-dark) !important;
    color: var(--text-light) !important;
    border-top: 1px solid var(--border-color) !important;
    
    .text-success {
      color: var(--primary) !important;
    }
    
    .fw-bold {
      font-weight: bold !important;
    }
  }
`;

const PageTitle = styled.h4`
  color: var(--heading-color);
  margin-bottom: 0;
`;

const QuizEditor = ({ courseId, sections, onUpdate }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingQuizzes, setFetchingQuizzes] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    sectionId: '',
    questions: Array(10).fill().map((_, index) => ({
      id: `q${index + 1}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }))
  });

  useEffect(() => {
    fetchAllQuizzes();
  }, [courseId]);

  const fetchAllQuizzes = async () => {
    try {
      setFetchingQuizzes(true);
      const response = await quizAPI.getAll();
      const courseQuizzes = response.data.filter(quiz => quiz.courseId === courseId);
      setQuizzes(courseQuizzes);
    } catch (err) {
      setError('Failed to fetch quizzes.');
      console.error('Error fetching quizzes:', err);
    } finally {
      setFetchingQuizzes(false);
    }
  };

  const handleShowModal = (quiz = null) => {
    if (quiz) {
      setEditingQuiz(quiz);
      setFormData({
        title: quiz.title,
        sectionId: quiz.sectionId,
        questions: quiz.questions.length === 10 ? quiz.questions : [
          ...quiz.questions,
          ...Array(10 - quiz.questions.length).fill().map((_, index) => ({
            id: `q${quiz.questions.length + index + 1}`,
            question: '',
            options: ['', '', '', ''],
            correctAnswer: ''
          }))
        ]
      });
    } else {
      setEditingQuiz(null);
      setFormData({
        title: '',
        sectionId: sections[0]?.id || '',
        questions: Array(10).fill().map((_, index) => ({
          id: `q${index + 1}`,
          question: '',
          options: ['', '', '', ''],
          correctAnswer: ''
        }))
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingQuiz(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (questionIndex, field, value, optionIndex = null) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) => {
        if (index === questionIndex) {
          if (field === 'options' && optionIndex !== null) {
            const newOptions = [...question.options];
            newOptions[optionIndex] = value;
            return { ...question, options: newOptions };
          }
          return { ...question, [field]: value };
        }
        return question;
      })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate that all questions have at least 2 options and a correct answer
    const invalidQuestions = formData.questions.filter((q) => {
      if (!q.question.trim()) return true;
      const validOptions = q.options.filter(opt => opt.trim()).length;
      if (validOptions < 2) return true;
      if (!q.correctAnswer.trim() || !q.options.includes(q.correctAnswer)) return true;
      return false;
    });

    if (invalidQuestions.length > 0) {
      setError('Please ensure all questions have a question text, at least 2 options, and a valid correct answer.');
      setLoading(false);
      return;
    }

    try {
      const quizData = {
        title: formData.title,
        sectionId: formData.sectionId,
        courseId,
        questions: formData.questions.filter(q => q.question.trim()) // Only save questions with content
      };

      if (editingQuiz) {
        await quizAPI.update(editingQuiz.id, quizData);
        setSuccess('Quiz updated successfully!');
      } else {
        await quizAPI.create(quizData);
        setSuccess('Quiz created successfully!');
      }

      handleCloseModal();
      fetchAllQuizzes();
      onUpdate();
    } catch (err) {
      setError('Failed to save quiz. Please try again.');
      console.error('Error saving quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await quizAPI.delete(quizId);
        setSuccess('Quiz deleted successfully!');
        fetchAllQuizzes();
        onUpdate();
      } catch (err) {
        setError('Failed to delete quiz. Please try again.');
        console.error('Error deleting quiz:', err);
      }
    }
  };

  const getSectionName = (sectionId) => {
    const section = sections.find(s => s.id === sectionId);
    return section ? section.title : 'Unknown Section';
  };

  if (fetchingQuizzes) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <StyledSpinner animation="border" size="lg" />
      </div>
    );
  }

  return (
    <>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <PageTitle>Course Quizzes</PageTitle>
            <StyledButton
              className="btn-primary"
              onClick={() => handleShowModal()}
              disabled={sections.length === 0}
            >
              <FaPlus /> Create Quiz
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
          <FaQuestionCircle size={64} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h5>No sections available</h5>
          <p>Create sections first before adding quizzes.</p>
        </EmptyState>
      ) : quizzes.length === 0 ? (
        <EmptyState>
          <FaQuestionCircle size={64} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h5>No quizzes found</h5>
          <p>Start by creating your first quiz!</p>
          <StyledButton className="btn-primary" onClick={() => handleShowModal()}>
            <FaPlus /> Create First Quiz
          </StyledButton>
        </EmptyState>
      ) : (
        <Row>
          {quizzes.map((quiz) => (
            <Col key={quiz.id} lg={6} className="mb-4">
              <StyledCard>
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{quiz.title}</h6>
                      <small className="text-muted">
                        Section: {getSectionName(quiz.sectionId)}
                      </small>
                    </div>
                    <div>
                      <StyledBadge className="bg-primary me-2">
                        {quiz.questions?.length || 0} questions
                      </StyledBadge>
                      <StyledButton
                        className="btn-outline-primary"
                        size="sm"
                        onClick={() => handleShowModal(quiz)}
                        style={{ marginRight: '0.5rem' }}
                      >
                        <FaEdit />
                      </StyledButton>
                      <StyledButton
                        className="btn-outline-danger"
                        size="sm"
                        onClick={() => handleDeleteQuiz(quiz.id)}
                      >
                        <FaTrash />
                      </StyledButton>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  {quiz.questions && quiz.questions.length > 0 ? (
                    <StyledAccordion>
                      {quiz.questions.slice(0, 3).map((question, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                          <Accordion.Header>
                            Question {index + 1}: {question.question.substring(0, 50)}...
                          </Accordion.Header>
                          <Accordion.Body>
                            <p><strong>Question:</strong> {question.question}</p>
                            <p><strong>Options:</strong></p>
                            <ul>
                              {question.options.map((option, optIndex) => (
                                <li key={optIndex} className={option === question.correctAnswer ? 'text-success fw-bold' : ''}>
                                  {option} {option === question.correctAnswer && <FaCheck className="text-success" />}
                                </li>
                              ))}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </StyledAccordion>
                  ) : (
                    <p className="text-muted">No questions added yet.</p>
                  )}
                  {quiz.questions && quiz.questions.length > 3 && (
                    <small className="text-muted">
                      ... and {quiz.questions.length - 3} more questions
                    </small>
                  )}
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      )}

      <StyledModal show={showModal} onHide={handleCloseModal} size="xl" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
          </Modal.Title>
        </Modal.Header>
        <StyledForm onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {error && <StyledAlert variant="danger">{error}</StyledAlert>}

            <Row className="mb-4">
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Quiz Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter quiz title"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Section *</Form.Label>
                  <Form.Select
                    name="sectionId"
                    value={formData.sectionId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a section</option>
                    {sections.map(section => (
                      <option key={section.id} value={section.id}>
                        {section.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mb-3" style={{ color: 'var(--heading-color)' }}>Questions (10 Required)</h5>

            {formData.questions.map((question, questionIndex) => (
              <QuestionCard key={questionIndex} className="mb-4">
                <Card.Header>
                  <h6>Question {questionIndex + 1}</h6>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Question Text *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={question.question}
                      onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                      placeholder="Enter your question here..."
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Label>Options *</Form.Label>
                      {question.options.map((option, optionIndex) => (
                        <Form.Group key={optionIndex} className="mb-2">
                          <Form.Control
                            type="text"
                            value={option}
                            onChange={(e) => handleQuestionChange(questionIndex, 'options', e.target.value, optionIndex)}
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        </Form.Group>
                      ))}
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Correct Answer *</Form.Label>
                        <div>
                          {question.options.map((option, optionIndex) => (
                            option.trim() && (
                              <OptionButton
                                key={optionIndex}
                                className={question.correctAnswer === option ? 'btn-success' : 'btn-outline-secondary'}
                                size="sm"
                                onClick={() => handleQuestionChange(questionIndex, 'correctAnswer', option)}
                                type="button"
                              >
                                {question.correctAnswer === option && <FaCheck className="me-1" />}
                                {option}
                              </OptionButton>
                            )
                          ))}
                        </div>
                        <Form.Text className="text-muted">
                          Click on an option to mark it as the correct answer
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </QuestionCard>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <StyledButton className="btn-outline-secondary" onClick={handleCloseModal}>
              <FaTimes /> Cancel
            </StyledButton>
            <StyledButton type="submit" className="btn-primary" disabled={loading}>
              {loading ? <StyledSpinner animation="border" size="sm" /> : <FaSave />}
              {loading ? 'Saving...' : editingQuiz ? 'Update Quiz' : 'Create Quiz'}
            </StyledButton>
          </Modal.Footer>
        </StyledForm>
      </StyledModal>
    </>
  );
};

export default QuizEditor;
