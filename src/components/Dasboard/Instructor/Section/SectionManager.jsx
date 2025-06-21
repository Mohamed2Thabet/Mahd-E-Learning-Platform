import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Alert,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaBook,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
} from "react-icons/fa";
import styled from "styled-components";
import {
  addSection,
  deleteSection,
  fetchSectionsByCourse,
  updateSection,
} from "../../../../store/sectionSlice";

const SectionManager = ({ courseId }) => {
  const dispatch = useDispatch();
  const { sections, loading, error } = useSelector((state) => state.section);
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: 1,
  });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (courseId && token) {
      dispatch(fetchSectionsByCourse({ courseId, token }));
    }
  }, [courseId, token, dispatch]);

  const filteredSections = useMemo(() => {
    return Array.isArray(sections)
      ? sections.filter((section) => section.courseId === courseId)
      : [];
  }, [sections, courseId]);

  const handleShowModal = (section = null) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        title: section.title,
        description: section.description,
        order: section.order,
      });
    } else {
      setEditingSection(null);
      setFormData({
        title: "",
        description: "",
        order: filteredSections.length + 1,
      });
    }
    setShowModal(true);
    setSuccess("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSection(null);
    setFormData({ title: "", description: "", order: 1 });
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sectionData = {
        title: formData.title,
        order: parseInt(formData.order, 10),
        courseId,
        sectionId: editingSection?._id,
        videos: editingSection?.videos || [],
        quizId: editingSection?.quizId || null,
      };

      if (editingSection) {
        await dispatch(updateSection({ data: sectionData, token, courseId })).unwrap();
        setSuccess("Section updated successfully!");
      } else {
        await dispatch(addSection({ data: sectionData, token })).unwrap();
        setSuccess("Section created successfully!");
      }

      setShowModal(false);
      await dispatch(fetchSectionsByCourse({ courseId, token }));
    } catch (err) {
      console.error(err);
      alert(err || "Failed to save section.");
    }
  };

  const handleShowDeleteModal = (section) => {
    setSectionToDelete(section);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSectionToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!sectionToDelete) return;

    try {
      await dispatch(deleteSection({
        sectionId: sectionToDelete._id,
        token,
        courseId,
      })).unwrap();
      setSuccess("Section deleted successfully!");
      await dispatch(fetchSectionsByCourse({ courseId, token }));
      handleCloseDeleteModal();
    } catch (err) {
      console.error(err);
      alert(err || "Failed to delete section.");
    }
  };

  const handleMoveSection = async (sectionId, direction) => {
    const currentIndex = filteredSections.findIndex((s) => s._id === sectionId);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= filteredSections.length) return;

    const updatedSections = [...filteredSections];
    [updatedSections[currentIndex], updatedSections[newIndex]] = [
      updatedSections[newIndex],
      updatedSections[currentIndex],
    ];

    updatedSections[currentIndex].order = currentIndex + 1;
    updatedSections[newIndex].order = newIndex + 1;

    try {
      await Promise.all([
        dispatch(updateSection({
          data: updatedSections[currentIndex],
          token,
          courseId,
        })).unwrap(),
        dispatch(updateSection({
          data: updatedSections[newIndex],
          token,
          courseId,
        })).unwrap(),
      ]);
      await dispatch(fetchSectionsByCourse({ courseId, token }));
      setSuccess("Section order updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update section order.");
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
        <StyledAlert variant="danger" dismissible onClose={() => { }}>
          {error}
        </StyledAlert>
      )}

      {success && (
        <StyledAlert
          variant="success"
          dismissible
          onClose={() => setSuccess("")}
        >
          {success}
        </StyledAlert>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : error ? null : filteredSections.length > 0 ? (
        <Row>
          {filteredSections
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <Col key={section._id} lg={6} className="mb-3">
                <StyledCard>
                  <SectionHeader>
                    <div>
                      <h6>
                        {section._idd}
                        Section {section.order}: {section.title}
                      </h6>
                      <small>{section.description}</small>
                    </div>
                    <SectionActions>
                      <StyledButton
                        className="btn-outline-secondary"
                        size="sm"
                        onClick={() => handleMoveSection(section._id, "up")}
                        disabled={index === 0}
                      >
                        <FaArrowUp />
                      </StyledButton>
                      <StyledButton
                        className="btn-outline-secondary"
                        size="sm"
                        onClick={() => handleMoveSection(section._id, "down")}
                        disabled={index === filteredSections.length - 1}
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
                        onClick={() => handleShowDeleteModal(section)}
                      >
                        <FaTrash />
                      </StyledButton>
                    </SectionActions>
                  </SectionHeader>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>Videos</span>
                        <span className="badge bg-primary">
                          {section.videos?.length || 0}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <span>Quiz</span>
                        <span className="badge bg-success">
                          {section.quizId ? "Created" : "Not Created"}
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </StyledCard>
              </Col>
            ))}
        </Row>
      ) : !error && !loading ? (
        <EmptyState>
          <FaBook
            size={64}
            style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}
          />
          <h5>No sections found</h5>
          <p>Start by creating your first section!</p>
          <StyledButton className="btn-primary" onClick={() => handleShowModal()}>
            <FaPlus /> Create First Section
          </StyledButton>
        </EmptyState>
      ) : null}

      {/* Edit/Create Section Modal */}
      <StyledModal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingSection ? "Edit Section" : "Create New Section"}</Modal.Title>
        </Modal.Header>
        <StyledForm onSubmit={handleSubmit}>
          <Modal.Body>
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

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter section description (optional)"
              />
            </Form.Group>

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
          </Modal.Body>

          <Modal.Footer>
            <StyledButton
              className="btn-outline-secondary"
              onClick={handleCloseModal}
            >
              <FaTimes /> Cancel
            </StyledButton>
            <StyledButton type="submit" className="btn-primary" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : <FaSave />}
              {loading
                ? "Saving..."
                : editingSection
                  ? "Update Section"
                  : "Create Section"}
            </StyledButton>
          </Modal.Footer>
        </StyledForm>
      </StyledModal>

      {/* Delete Confirmation Modal */}
      <DeleteModal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <FaExclamationTriangle className="text-danger me-2" />
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <FaExclamationTriangle size={48} className="text-danger mb-3" />
            <h5 className="mb-3">Are you sure you want to delete this section?</h5>
            <div className="alert alert-danger">
              <strong>Warning:</strong> This action will permanently delete:
              <ul className="mb-0 mt-2 text-start">
                <li>Section: <strong>{sectionToDelete?.title}</strong></li>
                <li>All associated videos ({sectionToDelete?.videos?.length || 0} videos)</li>
                <li>All associated quizzes</li>
              </ul>
            </div>
            <p className="text-muted">
              <strong>This action cannot be undone!</strong>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <StyledButton
            className="btn-outline-secondary"
            onClick={handleCloseDeleteModal}
          >
            <FaTimes /> Cancel
          </StyledButton>
          <StyledButton
            className="btn-danger"
            onClick={handleConfirmDelete}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : <FaTrash />}
            {loading ? "Deleting..." : "Delete Section"}
          </StyledButton>
        </Modal.Footer>
      </DeleteModal>
    </>
  );
};

export default SectionManager;

// Styled Components remain unchanged


// Styled Components
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

  &.btn-danger {
    background: linear-gradient(135deg, #dc3545, #c82333) !important;
    border: none !important;
    color: white !important;

    &:hover {
      background: linear-gradient(135deg, #c82333, #dc3545) !important;
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

const DeleteModal = styled(Modal)`
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
    color: var(--text-light) !important;

    .alert-danger {
      background-color: rgba(220, 53, 69, 0.1) !important;
      border-color: #dc3545 !important;
      color: var(--text-light) !important;

      ul {
        color: var(--text-light) !important;
      }
    }

    .text-muted {
      color: var(--text-secondary) !important;
    }
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

const PageTitle = styled.h4`
  color: var(--heading-color);
  margin-bottom: 0;
`;
