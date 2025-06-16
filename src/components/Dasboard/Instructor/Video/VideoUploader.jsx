import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal, Alert, Spinner, ListGroup, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaVideo, FaYoutube, FaUpload, FaPlay } from 'react-icons/fa';
import styled from 'styled-components';
import { videoAPI } from '../../../services/api';

const StyledCard = styled(Card)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.1);
  }
  
  .list-group-item {
    background-color: var(--card-background) !important;
    border-color: var(--border-color) !important;
    color: var(--text-light) !important;
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

const VideoThumbnail = styled.div`
  width: 120px;
  height: 80px;
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoItem = styled(ListGroup.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--card-background) !important;
  border-color: var(--border-color) !important;
  color: var(--text-light) !important;
  
  h6 {
    color: var(--heading-color) !important;
  }
  
  .text-muted {
    color: var(--text-secondary) !important;
  }
  
  .text-primary {
    color: var(--primary) !important;
  }
`;

const VideoInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const VideoActions = styled.div`
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
  
  &.bg-secondary {
    background-color: var(--border-color) !important;
    color: var(--text-light) !important;
  }
`;

const PageTitle = styled.h4`
  color: var(--heading-color);
  margin-bottom: 0;
`;

const SectionTitle = styled.h5`
  color: var(--heading-color);
  margin-bottom: 1rem;
`;

const VideoUploader = ({ courseId, sections, onUpdate }) => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingVideos, setFetchingVideos] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    type: 'youtube',
    sectionId: '',
    order: 1
  });

  useEffect(() => {
    fetchAllVideos();
  }, [courseId]);

  const fetchAllVideos = async () => {
    try {
      setFetchingVideos(true);
      const response = await videoAPI.getAll();
      const courseVideos = response.data.filter(video => video.courseId === courseId);
      setVideos(courseVideos);
    } catch (err) {
      setError('Failed to fetch videos.');
      console.error('Error fetching videos:', err);
    } finally {
      setFetchingVideos(false);
    }
  };

  const getYoutubeThumbnail = (url) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg` : null;
  };

  const handleShowModal = (video = null) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title,
        description: video.description,
        url: video.url,
        type: video.type,
        sectionId: video.sectionId,
        order: video.order
      });
    } else {
      setEditingVideo(null);
      setFormData({
        title: '',
        description: '',
        url: '',
        type: 'youtube',
        sectionId: sections[0]?.id || '',
        order: 1
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      url: '',
      type: 'youtube',
      sectionId: '',
      order: 1
    });
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
      const videoData = {
        ...formData,
        courseId,
        order: parseInt(formData.order)
      };

      if (editingVideo) {
        await videoAPI.update(editingVideo.id, videoData);
        setSuccess('Video updated successfully!');
      } else {
        await videoAPI.create(videoData);
        setSuccess('Video added successfully!');
      }

      handleCloseModal();
      fetchAllVideos();
      onUpdate();
    } catch (err) {
      setError('Failed to save video. Please try again.');
      console.error('Error saving video:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await videoAPI.delete(videoId);
        setSuccess('Video deleted successfully!');
        fetchAllVideos();
        onUpdate();
      } catch (err) {
        setError('Failed to delete video. Please try again.');
        console.error('Error deleting video:', err);
      }
    }
  };



  const getVideosBySection = (sectionId) => {
    return videos.filter(video => video.sectionId === sectionId);
  };

  if (fetchingVideos) {
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
            <PageTitle>Course Videos</PageTitle>
            <StyledButton
              className="btn-primary"
              onClick={() => handleShowModal()}
              disabled={sections.length === 0}
            >
              <FaPlus /> Add Video
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
          <FaVideo size={64} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h5>No sections available</h5>
          <p>Create sections first before adding videos.</p>
        </EmptyState>
      ) : videos.length === 0 ? (
        <EmptyState>
          <FaVideo size={64} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h5>No videos found</h5>
          <p>Start by adding your first video!</p>
          <StyledButton className="btn-primary" onClick={() => handleShowModal()}>
            <FaPlus /> Add First Video
          </StyledButton>
        </EmptyState>
      ) : (
        sections.map(section => {
          const sectionVideos = getVideosBySection(section.id);
          if (sectionVideos.length === 0) return null;

          return (
            <div key={section.id} className="mb-4">
              <SectionTitle>
                {section.title}
                <StyledBadge className="bg-primary ms-2">{sectionVideos.length} videos</StyledBadge>
              </SectionTitle>
              <StyledCard>
                <ListGroup variant="flush">
                  {sectionVideos
                    .sort((a, b) => a.order - b.order)
                    .map((video) => (
                      <VideoItem key={video.id}>
                        <VideoInfo>
                          <VideoThumbnail>
                            {video.type === 'youtube' && video.url ? (
                              <img
                                src={getYoutubeThumbnail(video.url)}
                                alt={video.title}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div style={{ display: video.type === 'youtube' ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                              {video.type === 'youtube' ? <FaYoutube size={24} /> : <FaUpload size={24} />}
                            </div>
                          </VideoThumbnail>
                          <div>
                            <h6 className="mb-1">
                              Video {video.order}: {video.title}
                              <StyledBadge className="bg-secondary ms-2">{video.type}</StyledBadge>
                            </h6>
                            <p className="text-muted mb-0 small">{video.description}</p>
                            {video.url && (
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary small"
                              >
                                <FaPlay size={12} className="me-1" />
                                View Video
                              </a>
                            )}
                          </div>
                        </VideoInfo>
                        <VideoActions>
                          <StyledButton
                            className="btn-outline-primary"
                            size="sm"
                            onClick={() => handleShowModal(video)}
                          >
                            <FaEdit />
                          </StyledButton>
                          <StyledButton
                            className="btn-outline-danger"
                            size="sm"
                            onClick={() => handleDeleteVideo(video.id)}
                          >
                            <FaTrash />
                          </StyledButton>
                        </VideoActions>
                      </VideoItem>
                    ))}
                </ListGroup>
              </StyledCard>
            </div>
          );
        })
      )}

      <StyledModal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingVideo ? 'Edit Video' : 'Add New Video'}
          </Modal.Title>
        </Modal.Header>
        <StyledForm onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <StyledAlert variant="danger">{error}</StyledAlert>}

            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Video Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter video title"
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

            <Row>
              <Col md={6}>
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
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Video Type *</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="youtube">YouTube</option>
                    <option value="upload">File Upload</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                {formData.type === 'youtube' ? 'YouTube URL *' : 'Video File URL *'}
              </Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder={
                  formData.type === 'youtube'
                    ? "https://www.youtube.com/watch?v=..."
                    : "https://example.com/video.mp4"
                }
                required
              />
              <Form.Text className="text-muted">
                {formData.type === 'youtube'
                  ? 'Enter a YouTube video URL'
                  : 'Enter a direct link to your video file'
                }
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this video covers..."
                required
              />
            </Form.Group>

            {formData.url && formData.type === 'youtube' && (
              <div className="mb-3">
                <Form.Label>Preview</Form.Label>
                <VideoThumbnail style={{ width: '200px', height: '120px' }}>
                  <img
                    src={getYoutubeThumbnail(formData.url)}
                    alt="Video preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                    <FaYoutube size={24} />
                  </div>
                </VideoThumbnail>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <StyledButton className="btn-outline-secondary" onClick={handleCloseModal}>
              <FaTimes /> Cancel
            </StyledButton>
            <StyledButton type="submit" className="btn-primary" disabled={loading}>
              {loading ? <StyledSpinner animation="border" size="sm" /> : <FaSave />}
              {loading ? 'Saving...' : editingVideo ? 'Update Video' : 'Add Video'}
            </StyledButton>
          </Modal.Footer>
        </StyledForm>
      </StyledModal>
    </>
  );
};

export default VideoUploader;
