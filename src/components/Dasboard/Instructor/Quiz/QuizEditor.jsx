import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal, Alert, Spinner, Badge, Accordion, Tabs, Tab } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaQuestionCircle, FaCheck, FaMinus, FaBookOpen, FaExclamationTriangle, FaClock, FaUser, FaVideo, FaClipboardList } from 'react-icons/fa';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  createExam,
  updateExam,
  deleteExam,
  getAllSectionExams,
  clearMessages,
  clearSectionExams
} from '../../../../store/examSlice';

// Styled Components
const StyledCard = styled(Card)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  border-radius: 16px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.15);
    border-color: var(--primary);
  }
  
  .card-header {
    background-color: var(--card-background) !important;
    border-bottom: 1px solid var(--border-color) !important;
    border-radius: 16px 16px 0 0 !important;
    
    h6 {
      color: var(--heading-color);
      margin-bottom: 0.25rem;
      font-weight: 600;
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

const SectionCard = styled(Card)`
  background: linear-gradient(135deg, var(--card-background) 0%, rgba(24, 29, 25, 0.95) 100%);
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 230, 118, 0.1);
  }
  
  .card-header {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
    border: none !important;
    padding: 24px 28px;
    
    h5 {
      color: white;
      margin: 0;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.3rem;
    }
  }
  
  .card-body {
    padding: 28px;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &.btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark)) !important;
    border: none !important;
    color: var(--background-dark) !important;
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, var(--primary-dark), var(--primary)) !important;
      box-shadow: 0 6px 20px rgba(0, 230, 118, 0.4);
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
      box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);
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
      box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
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
  
  &.btn-danger {
    background: linear-gradient(135deg, #dc3545, #c82333) !important;
    border: none !important;
    color: white !important;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #c82333, #dc3545) !important;
      box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
    }
  }
`;

const QuestionCard = styled(Card)`
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  border-radius: 12px;
  
  .card-header {
    background-color: var(--background-dark) !important;
    border-bottom: 1px solid var(--border-color) !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    
    h6 {
      color: var(--heading-color);
      margin: 0;
      font-weight: 600;
    }
  }
  
  .card-body {
    background-color: var(--background-dark);
    padding: 20px;
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
  padding: 4rem 2rem;
  color: var(--text-secondary);
  
  h5 {
    color: var(--heading-color);
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.5rem;
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  
  h5 {
    color: var(--heading-color);
    margin-top: 1.5rem;
    font-weight: 600;
  }
  
  p {
    color: var(--text-secondary);
    margin-top: 0.5rem;
  }
`;

const SectionLoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  
  .spinner-border {
    margin-right: 12px;
  }
  
  span {
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const NoExamsMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: var(--text-secondary);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  border: 2px dashed var(--border-color);
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.7;
    color: var(--primary);
  }
  
  h6 {
    color: var(--heading-color);
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-style: italic;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: var(--card-background) !important;
    border: 1px solid var(--border-color) !important;
    border-radius: 16px !important;
  }
  
  .modal-header {
    background-color: var(--card-background) !important;
    border-bottom: 1px solid var(--border-color) !important;
    border-radius: 16px 16px 0 0 !important;
    
    .modal-title {
      color: var(--heading-color) !important;
      font-weight: 700;
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
    border-radius: 0 0 16px 16px !important;
  }
`;

const ConfirmationModal = styled(Modal)`
  .modal-content {
    background-color: var(--card-background) !important;
    border: 2px solid #dc3545 !important;
    border-radius: 16px !important;
  }
  
  .modal-header {
    background: linear-gradient(135deg, #dc3545, #c82333) !important;
    border: none !important;
    border-radius: 16px 16px 0 0 !important;
    
    .modal-title {
      color: white !important;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .btn-close {
      filter: invert(1);
    }
  }
  
  .modal-body {
    background-color: var(--card-background) !important;
    padding: 2rem;
  }
  
  .modal-footer {
    background-color: var(--card-background) !important;
    border-top: 1px solid var(--border-color) !important;
    border-radius: 0 0 16px 16px !important;
    padding: 1.5rem 2rem;
  }
`;

const WarningBox = styled.div`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  
  h6 {
    color: #dc3545;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  ul {
    margin: 0;
    padding-left: 1.5rem;
    
    li {
      color: var(--text-light);
      margin-bottom: 0.5rem;
      
      strong {
        color: var(--heading-color);
      }
    }
  }
`;

const ConfirmationText = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: center;
  
  p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  strong {
    color: var(--heading-color);
    font-size: 1.1rem;
  }
`;

const StyledForm = styled(Form)`
  .form-label {
    color: var(--text-light);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .form-control {
    background-color: var(--background-dark) !important;
    border: 1px solid var(--border-color) !important;
    color: var(--text-light) !important;
    border-radius: 8px !important;
    
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
    border-radius: 8px !important;
    
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
  border-radius: 12px !important;
  
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
    font-weight: 600;
  }
`;

const StyledAccordion = styled(Accordion)`
  .accordion-item {
    background-color: var(--background-dark) !important;
    border: 1px solid var(--border-color) !important;
    margin-bottom: 0.5rem;
    border-radius: 8px !important;
  }
  
  .accordion-header {
    .accordion-button {
      background-color: var(--background-dark) !important;
      color: var(--text-light) !important;
      border: none !important;
      border-radius: 8px !important;
      
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
  font-weight: 700;
  font-size: 1.8rem;
`;

const AddQuestionButton = styled(StyledButton)`
  width: 100%;
  margin-bottom: 1rem;
  border: 2px dashed var(--border-color);
  background: transparent !important;
  color: var(--primary) !important;
  
  &:hover {
    border-color: var(--primary);
    background: rgba(0, 230, 118, 0.05) !important;
  }
`;

const StyledTabs = styled(Tabs)`
  .nav-tabs {
    border-bottom: 2px solid var(--border-color);
    margin-bottom: 2rem;
    
    .nav-link {
      color: var(--text-secondary);
      border: none;
      border-bottom: 3px solid transparent;
      background: transparent;
      padding: 16px 28px;
      font-weight: 600;
      transition: all 0.3s ease;
      border-radius: 8px 8px 0 0;
      
      &:hover {
        color: var(--primary);
        border-bottom-color: rgba(0, 230, 118, 0.3);
        background: rgba(0, 230, 118, 0.05);
      }
      
      &.active {
        color: var(--primary);
        background: rgba(0, 230, 118, 0.1);
        border-bottom-color: var(--primary);
      }
    }
  }
`;

const SectionStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
`;

const StatItem = styled.div`
  text-align: center;
  
  .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary);
    display: block;
  }
  
  .stat-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
`;

const ExamCard = styled(Card)`
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.1);
    border-color: var(--primary);
  }
  
  .card-body {
    padding: 20px;
  }
`;

const ExamTitle = styled.h6`
  color: var(--heading-color);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ExamMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Main Component
const ExamEditor = ({ courseId, sections, onUpdate }) => {
  // Redux hooks
  const dispatch = useDispatch();
  const { exam, exams, sectionExams, loading, sectionLoading, error, successMessage } = useSelector((state) => state.exam);

  // Local state
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const [editingExam, setEditingExam] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const token = localStorage.getItem('token');

  // Initialize with 2 questions
  const createEmptyQuestion = (id) => ({
    id: `q${id}`,
    question: '',
    choices: ['', '', '', ''],
    answerIndex: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    courseId: courseId,
    sectionId: '',
    mcq: [createEmptyQuestion(1), createEmptyQuestion(2)]
  });

  // Fetch all section exams
  const fetchAllSectionExams = async () => {
    if (sections && sections.length > 0) {
      setDataLoaded(false);
      dispatch(clearSectionExams());
      try {
        await dispatch(getAllSectionExams({ sections, token }));
        setDataLoaded(true);
      } catch (error) {
        setDataLoaded(true);
        console.error('Error fetching exams:', error);
      }
    } else {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchAllSectionExams();
  }, [courseId, sections]);

  // Clear messages after success
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        dispatch(clearMessages());
        setShowModal(false);
        setEditingExam(null);
        fetchAllSectionExams();
        if (onUpdate) onUpdate();
      }, 2000);
    }
  }, [successMessage, dispatch, onUpdate]);

  const handleShowModal = (exam = null) => {
    dispatch(clearMessages());

    if (exam) {
      setEditingExam(exam);
      const questions = exam.mcq && exam.mcq.length >= 2
        ? exam.mcq.map(q => ({
          ...q,
          answerIndex: q.answerIndex !== undefined ? q.answerIndex : q.correctAnswerIndex || 0
        }))
        : [...(exam.mcq || []), ...Array(2 - (exam.mcq?.length || 0)).fill().map((_, index) =>
          createEmptyQuestion((exam.mcq?.length || 0) + index + 1)
        )];

      setFormData({
        title: exam.title,
        courseId: exam.courseId,
        sectionId: exam.sectionId,
        mcq: questions
      });
    } else {
      setEditingExam(null);
      setFormData({
        title: '',
        courseId: courseId,
        sectionId: sections[0]?.id || sections[0]?._id || '',
        mcq: [createEmptyQuestion(1), createEmptyQuestion(2)]
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExam(null);
    dispatch(clearMessages());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (questionIndex, field, value, choiceIndex = null) => {
    setFormData(prev => ({
      ...prev,
      mcq: prev.mcq.map((question, index) => {
        if (index === questionIndex) {
          if (field === 'choices' && choiceIndex !== null) {
            const newChoices = [...question.choices];
            newChoices[choiceIndex] = value;
            return { ...question, choices: newChoices };
          }
          return { ...question, [field]: value };
        }
        return question;
      })
    }));
  };

  const addQuestion = () => {
    const newQuestionId = formData.mcq.length + 1;
    setFormData(prev => ({
      ...prev,
      mcq: [...prev.mcq, createEmptyQuestion(newQuestionId)]
    }));
  };

  const removeQuestion = (questionIndex) => {
    if (formData.mcq.length > 2) {
      setFormData(prev => ({
        ...prev,
        mcq: prev.mcq.filter((_, index) => index !== questionIndex)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty questions
    const validQuestions = formData.mcq.filter(q => q.question.trim());

    if (validQuestions.length === 0) {
      alert('Please add at least one question.');
      return;
    }

    // Validate each question
    const invalidQuestions = validQuestions.filter((q) => {
      const validChoices = q.choices.filter(choice => choice.trim()).length;
      if (validChoices < 2) return true;
      if (q.answerIndex < 0 || q.answerIndex >= validChoices) return true;
      return false;
    });

    if (invalidQuestions.length > 0) {
      alert('Please ensure all questions have at least 2 choices and a valid correct answer.');
      return;
    }

    const examData = {
      title: formData.title,
      courseId: formData.courseId,
      sectionId: formData.sectionId,
      mcq: validQuestions.map(q => ({
        question: q.question,
        choices: q.choices.filter(choice => choice.trim()),
        answerIndex: q.answerIndex
      }))
    };

    if (editingExam) {
      dispatch(updateExam({
        data: { ...examData, examId: editingExam._id || editingExam.id },
        token
      }));
    } else {
      dispatch(createExam({
        data: examData,
        token
      }));
    }
  };

  // Show confirmation modal for deletion
  const handleShowDeleteConfirmation = (exam) => {
    setExamToDelete(exam);
    setConfirmationText('');
    setShowConfirmModal(true);
  };

  // Handle confirmed deletion
  const handleConfirmedDelete = () => {
    if (confirmationText.toLowerCase() === 'delete' && examToDelete) {
      dispatch(deleteExam({
        examId: examToDelete._id || examToDelete.id,
        courseId: examToDelete.courseId,
        token
      }));
      setShowConfirmModal(false);
      setExamToDelete(null);
      setConfirmationText('');
      setTimeout(() => {
        fetchAllSectionExams();
      }, 1000);
    }
  };

  const getSectionName = (sectionId) => {
    const section = sections.find(s => s.id === sectionId || s._id === sectionId);
    return section ? section.title : 'Unknown Section';
  };

  // Calculate total exams across all sections
  const totalExams = Object.values(sectionExams).reduce((total, exams) => total + exams.length, 0);

  // Get all exams flattened
  const allExams = Object.values(sectionExams).flat();

  const isInitialLoading = sectionLoading && !dataLoaded && Object.keys(sectionExams).length === 0;

  // Loading State
  if (isInitialLoading) {
    return (
      <LoadingState>
        <StyledSpinner animation="border" variant="primary" size="lg" />
        <h5>⏳ Loading Course Exams</h5>
        <p>Fetching exams from all sections...</p>
      </LoadingState>
    );
  }

  return (
    <>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <PageTitle>Course Exams Management</PageTitle>
            <StyledButton
              className="btn-primary"
              onClick={() => handleShowModal()}
              disabled={sections.length === 0}
            >
              <FaPlus /> Create New Exam
            </StyledButton>
          </div>
        </Col>
      </Row>

      {error && (
        <StyledAlert variant="danger" dismissible onClose={() => dispatch(clearMessages())}>
          ⚠️ {error}
        </StyledAlert>
      )}

      {successMessage && (
        <StyledAlert variant="success" dismissible onClose={() => dispatch(clearMessages())}>
          ✅ {successMessage}
        </StyledAlert>
      )}

      {sections.length === 0 ? (
        <EmptyState>
          <FaQuestionCircle size={80} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h5>No Sections Available</h5>
          <p>Create sections first before adding exams to organize your course content.</p>
        </EmptyState>
      ) : (
        <>
          <StyledTabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="all" title={`All Exams (${totalExams})`}>
              {!dataLoaded ? (
                <LoadingState>
                  <StyledSpinner animation="border" variant="primary" size="lg" />
                  <h5>⏳ Loading Exams</h5>
                  <p>Please wait while we fetch the exams...</p>
                </LoadingState>
              ) : totalExams === 0 ? (
                <EmptyState>
                  <FaQuestionCircle size={80} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                  <h5>No Exams Found</h5>
                  <p>📭 No exams found for this course. Start creating your first exam!</p>
                  <StyledButton className="btn-primary" onClick={() => handleShowModal()}>
                    <FaPlus /> Create First Exam
                  </StyledButton>
                </EmptyState>
              ) : (
                <Row>
                  {allExams.map((exam) => (
                    <Col key={exam._id || exam.id} lg={6} xl={4} className="mb-4">
                      <StyledCard>
                        <Card.Header>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">{exam.title}</h6>
                              <small className="text-muted">
                                Section: {getSectionName(exam.sectionId)}
                              </small>
                            </div>
                            <div>
                              <StyledBadge className="bg-primary me-2">
                                {exam.mcq?.length || 0} Q
                              </StyledBadge>
                              <StyledButton
                                className="btn-outline-primary"
                                size="sm"
                                onClick={() => handleShowModal(exam)}
                                style={{ marginRight: '0.5rem' }}
                              >
                                <FaEdit />
                              </StyledButton>
                              <StyledButton
                                className="btn-outline-danger"
                                size="sm"
                                onClick={() => handleShowDeleteConfirmation(exam)}
                              >
                                <FaTrash />
                              </StyledButton>
                            </div>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          {exam.mcq && exam.mcq.length > 0 ? (
                            <StyledAccordion>
                              {exam.mcq.slice(0, 2).map((question, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()}>
                                  <Accordion.Header>
                                    Q{index + 1}: {question.question.substring(0, 40)}...
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <p><strong>Question:</strong> {question.question}</p>
                                    <p><strong>Choices:</strong></p>
                                    <ul>
                                      {question.choices.map((choice, choiceIndex) => (
                                        <li
                                          key={choiceIndex}
                                          className={choiceIndex === question.answerIndex ? 'text-success fw-bold' : ''}
                                        >
                                          {choice}
                                          {choiceIndex === question.answerIndex && (
                                            <FaCheck className="text-success ms-1" />
                                          )}
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
                          {exam.mcq && exam.mcq.length > 2 && (
                            <small className="text-muted">
                              ... and {exam.mcq.length - 2} more questions
                            </small>
                          )}
                        </Card.Body>
                      </StyledCard>
                    </Col>
                  ))}
                </Row>
              )}
            </Tab>

            <Tab eventKey="sections" title="By Sections">
              {sections.map((section) => {
                const sectionId = section.id || section._id;
                const sectionExamsList = sectionExams[sectionId] || [];

                return (
                  <SectionCard key={sectionId}>
                    <Card.Header>
                      <h5>
                        <FaBookOpen />
                        {section.title}
                      </h5>
                    </Card.Header>
                    <Card.Body>
                      <SectionStats>
                        <StatItem>
                          <span className="stat-number">{sectionExamsList.length}</span>
                          <span className="stat-label">Exams</span>
                        </StatItem>
                        <StatItem>
                          <span className="stat-number">
                            {sectionExamsList.reduce((total, exam) => total + (exam.mcq?.length || 0), 0)}
                          </span>
                          <span className="stat-label">Questions</span>
                        </StatItem>
                        <StyledButton
                          className="btn-outline-primary"
                          size="sm"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, sectionId }));
                            handleShowModal();
                          }}
                        >
                          <FaPlus /> Add Exam
                        </StyledButton>
                      </SectionStats>

                      {!dataLoaded ? (
                        <SectionLoadingState>
                          <StyledSpinner animation="border" size="sm" />
                          <span>Loading exams for this section...</span>
                        </SectionLoadingState>
                      ) : sectionExamsList.length === 0 ? (
                        <NoExamsMessage>
                          <FaExclamationTriangle />
                          <h6>No exams found in this section</h6>
                          <p>It looks like there are currently no exams assigned to this section.</p>
                        </NoExamsMessage>
                      ) : (
                        <Row>
                          {sectionExamsList.map((exam) => (
                            <Col key={exam._id || exam.id} lg={6} className="mb-3">
                              <ExamCard>
                                <Card.Body>
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <ExamTitle>{exam.title}</ExamTitle>
                                    <div>
                                      <StyledBadge className="bg-primary me-2">
                                        {exam.mcq?.length || 0} Q
                                      </StyledBadge>
                                      <StyledButton
                                        className="btn-outline-primary"
                                        size="sm"
                                        onClick={() => handleShowModal(exam)}
                                        style={{ marginRight: '0.5rem' }}
                                      >
                                        <FaEdit />
                                      </StyledButton>
                                      <StyledButton
                                        className="btn-outline-danger"
                                        size="sm"
                                        onClick={() => handleShowDeleteConfirmation(exam)}
                                      >
                                        <FaTrash />
                                      </StyledButton>
                                    </div>
                                  </div>

                                  <ExamMeta>
                                    <MetaItem>
                                      <FaQuestionCircle />
                                      <span>{exam.mcq?.length || 0} questions</span>
                                    </MetaItem>
                                    <MetaItem>
                                      <FaClock />
                                      <span>~{(exam.mcq?.length || 0) * 2} min</span>
                                    </MetaItem>
                                  </ExamMeta>

                                  {exam.mcq && exam.mcq.length > 0 && (
                                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0, 230, 118, 0.05)', borderRadius: '8px', border: '1px solid rgba(0, 230, 118, 0.1)' }}>
                                      <small style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                                        Preview: {exam.mcq[0].question.substring(0, 80)}...
                                      </small>
                                    </div>
                                  )}
                                </Card.Body>
                              </ExamCard>
                            </Col>
                          ))}
                        </Row>
                      )}
                    </Card.Body>
                  </SectionCard>
                );
              })}
            </Tab>
          </StyledTabs>
        </>
      )}

      {/* Exam Form Modal */}
      <StyledModal show={showModal} onHide={handleCloseModal} size="xl" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingExam ? 'Edit Exam' : 'Create New Exam'}
          </Modal.Title>
        </Modal.Header>
        <StyledForm onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {error && <StyledAlert variant="danger">⚠️ {error}</StyledAlert>}

            <Row className="mb-4">
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Exam Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter exam title"
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
                      <option key={section.id || section._id} value={section.id || section._id}>
                        {section.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ color: 'var(--heading-color)' }}>
                Questions ({formData.mcq.length})
              </h5>
              <AddQuestionButton
                type="button"
                onClick={addQuestion}
                style={{ width: 'auto' }}
              >
                <FaPlus /> Add Question
              </AddQuestionButton>
            </div>

            {formData.mcq.map((question, questionIndex) => (
              <QuestionCard key={questionIndex} className="mb-4">
                <Card.Header>
                  <h6>Question {questionIndex + 1}</h6>
                  {formData.mcq.length > 2 && (
                    <StyledButton
                      className="btn-outline-danger"
                      size="sm"
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                    >
                      <FaMinus /> Remove
                    </StyledButton>
                  )}
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Question Text *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={question.question}
                      onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                      placeholder="Enter your question here..."
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Label>Choices *</Form.Label>
                      {question.choices.map((choice, choiceIndex) => (
                        <Form.Group key={choiceIndex} className="mb-2">
                          <Form.Control
                            type="text"
                            value={choice}
                            onChange={(e) => handleQuestionChange(questionIndex, 'choices', e.target.value, choiceIndex)}
                            placeholder={`Choice ${choiceIndex + 1}`}
                          />
                        </Form.Group>
                      ))}
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Correct Answer *</Form.Label>
                        <div>
                          {question.choices.map((choice, choiceIndex) => (
                            choice.trim() && (
                              <OptionButton
                                key={choiceIndex}
                                className={question.answerIndex === choiceIndex ? 'btn-success' : 'btn-outline-secondary'}
                                size="sm"
                                onClick={() => handleQuestionChange(questionIndex, 'answerIndex', choiceIndex)}
                                type="button"
                              >
                                {question.answerIndex === choiceIndex && <FaCheck className="me-1" />}
                                {choice}
                              </OptionButton>
                            )
                          ))}
                        </div>
                        <Form.Text className="text-muted">
                          Click on a choice to mark it as the correct answer
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
              {loading ? 'Saving...' : editingExam ? 'Update Exam' : 'Create Exam'}
            </StyledButton>
          </Modal.Footer>
        </StyledForm>
      </StyledModal>

      {/* Confirmation Delete Modal */}
      <ConfirmationModal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaExclamationTriangle /> Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Are you absolutely sure you want to delete this exam?
          </p>

          <WarningBox>
            <h6>
              🔴 This will permanently remove:
            </h6>
            <ul>
              <li><strong>Exam:</strong> {examToDelete?.title}</li>
              <li><strong>Section:</strong> {examToDelete ? getSectionName(examToDelete.sectionId) : ''}</li>
              <li><strong>All questions:</strong> {examToDelete?.mcq?.length || 0} questions</li>
            </ul>
          </WarningBox>

          <ConfirmationText>
            <p>This action is <strong>irreversible</strong> and cannot be undone.</p>
          </ConfirmationText>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: 'var(--text-light)', fontWeight: '600' }}>
              Type <strong style={{ color: '#dc3545' }}>delete</strong> to confirm:
            </Form.Label>
            <Form.Control
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type 'delete' to confirm"
              style={{
                backgroundColor: 'var(--background-dark)',
                border: '2px solid #dc3545',
                color: 'var(--text-light)'
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton
            className="btn-outline-secondary"
            onClick={() => {
              setShowConfirmModal(false);
              setConfirmationText('');
              setExamToDelete(null);
            }}
          >
            <FaTimes /> Cancel
          </StyledButton>
          <StyledButton
            className="btn-danger"
            onClick={handleConfirmedDelete}
            disabled={confirmationText.toLowerCase() !== 'delete'}
          >
            <FaTrash /> Delete Permanently
          </StyledButton>
        </Modal.Footer>
      </ConfirmationModal>
    </>
  );
};

export default ExamEditor;
