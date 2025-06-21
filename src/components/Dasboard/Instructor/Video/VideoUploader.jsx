  import React, { useState, useEffect } from 'react';
  import {
    Row, Col, Card, Button, Form, Modal, Alert, Spinner, ListGroup, Badge, ProgressBar,
  } from 'react-bootstrap';
  import {
    FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaVideo, FaUpload,
  } from 'react-icons/fa';
  import styled from 'styled-components';
  import { useDispatch, useSelector } from 'react-redux';
  import {
    fetchVideosBySection,
    addVideo,
    updateVideo,
    deleteVideo,
  } from '../../../../store/videoSlice';

  const VideoUploader = ({ courseId, sections, onUpdate }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
      title: '',
      video: null,
      sectionId: '',
      order: 1,
    });

    const { videos, loading } = useSelector((state) => state.video);

    useEffect(() => {
      if (courseId && sections.length > 0) {
        sections.forEach(section => {
          dispatch(fetchVideosBySection({
            sectionId: section._id,
            token: localStorage.getItem('token'),
          }));
        });
      }
    }, [courseId, JSON.stringify(sections), dispatch]);
    
    useEffect(() => {
      if (success) {
        const timer = setTimeout(() => setSuccess(''), 3000);
        return () => clearTimeout(timer);
      }
    }, [success]);

    const handleShowModal = (video = null) => {
      if (video) {
        setEditingVideo(video);
        setFormData({
          title: video.title,
          video: null,
          sectionId: video.sectionId,
          order: video.order,
        });
      } else {
        setEditingVideo(null);
        setFormData({
          title: '',
          video: null,
          sectionId: sections[0]?._id || '',
          order: 1,
        });
      }
      setUploadProgress(0);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setEditingVideo(null);
      setFormData({ title: '', video: null, sectionId: '', order: 1 });
      setError('');
      setSuccess('');
      setUploadProgress(0);
      setUploading(false);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, video: file }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please login again.');
        return;
      }

      try {
        setUploading(true);
        setUploadProgress(0);

        if (editingVideo) {
          // Update existing video
          const data = {
            videoId: editingVideo._id,
            courseId,
            title: formData.title,
            order: Number(formData.order),
            token,
          };
          await dispatch(updateVideo(data)).unwrap();
          setSuccess('Video updated successfully!');
        } else {
          if (!formData.video) {
            setError('Please select a video file.');
            setUploading(false);
            return;
          }

          const data = new FormData();
          data.append('video', formData.video);
          data.append('title', formData.title);
          data.append('order', formData.order);
          data.append('courseId', courseId);
          data.append('sectionId', formData.sectionId);

          // Upload with progress tracking
          await dispatch(addVideo({ formData: data, token })).unwrap();
          setSuccess('Video uploaded successfully!');
        }

        handleCloseModal();
        onUpdate && onUpdate();
      } catch (err) {
        console.error('Error saving video:', err);
        setError(err?.response?.data?.message || err.message || 'Failed to save video. Please try again.');
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    };

    const handleDeleteVideo = async (videoId) => {
      const token = localStorage.getItem('token');
      if (!token) return setError('Unauthorized');

      if (window.confirm('Are you sure you want to delete this video?')) {
        try {
          await dispatch(deleteVideo({ videoId, courseId, token })).unwrap();
          setSuccess('Video deleted successfully!');
          onUpdate && onUpdate();
        } catch (err) {
          console.error('Error deleting video:', err);
          setError('Failed to delete video. Please try again.');
        }
      }
    };

    const getVideosBySection = (sectionId) =>
      videos.filter((v) => v.sectionId === sectionId);

    if (loading) {
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
            <FaVideo size={64} />
            <h5>No sections available</h5>
            <p>Create sections first before adding videos.</p>
          </EmptyState>
        ) : videos.length === 0 ? (
          <EmptyState>
            <FaVideo size={64} />
            <h5>No videos found</h5>
            <p>Start by adding your first video!</p>
            <StyledButton className="btn-primary" onClick={() => handleShowModal()}>
              <FaPlus /> Add First Video
            </StyledButton>
          </EmptyState>
        ) : (
          sections.map(section => {
            const sectionVideos = getVideosBySection(section._id);
            if (sectionVideos.length === 0) return null;

            return (
              <div key={section._id} className="mb-4">
                <SectionTitle>
                  {section.title}
                  <StyledBadge className="bg-primary ms-2">{sectionVideos.length} videos</StyledBadge>
                </SectionTitle>
                <StyledCard>
                  <ListGroup variant="flush">
                    {sectionVideos
                      .sort((a, b) => a.order - b.order)
                      .map(video => (
                        <VideoItem key={video._id}>
                          <VideoInfo>
                            <VideoThumbnail><FaUpload size={24} /></VideoThumbnail>
                            <div>
                              <h6 className="mb-1">
                                Video {video.order}: {video.title}
                                <StyledBadge className="bg-secondary ms-2">uploaded</StyledBadge>
                              </h6>
                            </div>
                          </VideoInfo>
                          <VideoActions>
                            <StyledButton className="btn-outline-primary" size="sm" onClick={() => handleShowModal(video)}>
                              <FaEdit />
                            </StyledButton>
                            <StyledButton className="btn-outline-danger" size="sm" onClick={() => handleDeleteVideo(video._id)}>
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

        {/* Enhanced Modal with Styled Progress Bar */}
        <StyledModal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{editingVideo ? 'Edit Video' : 'Add New Video'}</Modal.Title>
          </Modal.Header>
          <StyledForm onSubmit={handleSubmit}>
            <Modal.Body>
              {error && <StyledAlert variant="danger">{error}</StyledAlert>}

              {/* Enhanced Upload Progress Section */}
              {uploading && (
                <UploadProgressContainer className="mb-4">
                  <ProgressHeader>
                    <ProgressLabel>Uploading video...</ProgressLabel>
                    <ProgressPercentage>{uploadProgress}%</ProgressPercentage>
                  </ProgressHeader>
                  <StyledProgressBar
                    now={uploadProgress}
                    variant="success"
                    animated={uploadProgress < 100}
                  />
                  <ProgressSubtext>
                    {uploadProgress < 100 ? 'Please wait while your video is being uploaded...' : 'Upload complete! Processing...'}
                  </ProgressSubtext>
                </UploadProgressContainer>
              )}

              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Video Title *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      disabled={uploading}
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
                      disabled={uploading}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {!editingVideo && (
                <Form.Group className="mb-3">
                  <Form.Label>Section *</Form.Label>
                  <Form.Select
                    name="sectionId"
                    value={formData.sectionId}
                    onChange={handleInputChange}
                    required
                    disabled={uploading}
                  >
                    <option value="">Select a section</option>
                    {sections.map(section => (
                      <option key={section._id} value={section._id}>
                        {section.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}

              {editingVideo && (
                <Form.Group className="mb-3">
                  <Form.Label>Section *</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      sections.find(s => s._id === formData.sectionId)?.title || 'Unknown section'
                    }
                    disabled
                  />
                </Form.Group>
              )}

              {!editingVideo && (
                <Form.Group className="mb-3">
                  <Form.Label>Video File *</Form.Label>
                  <Form.Control
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleFileChange}
                    required
                    disabled={uploading}
                  />
                </Form.Group>
              )}
            </Modal.Body>

            <Modal.Footer>
              <StyledButton
                className="btn-outline-secondary"
                onClick={handleCloseModal}
                disabled={uploading}
              >
                <FaTimes /> Cancel
              </StyledButton>
              <StyledButton
                type="submit"
                className="btn-primary"
                disabled={uploading || (!formData.video && !editingVideo)}
              >
                {uploading ? (
                  <>
                    <StyledSpinner animation="border" size="sm" />
                    Uploading... {uploadProgress}%
                  </>
                ) : (
                  <>
                    <FaSave /> {editingVideo ? 'Update Video' : 'Upload Video'}
                  </>
                )}
              </StyledButton>
            </Modal.Footer>
          </StyledForm>
        </StyledModal>
      </>
    );
  };

  export default VideoUploader;

  // Enhanced Styled Components
  const UploadProgressContainer = styled.div`
    background-color: rgba(0, 230, 118, 0.05);
    border: 1px solid rgba(0, 230, 118, 0.2);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
  `;

  const ProgressHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  `;

  const ProgressLabel = styled.span`
    font-weight: 600;
    color: var(--primary);
    font-size: 0.95rem;
  `;

  const ProgressPercentage = styled.span`
    font-weight: 700;
    color: var(--primary);
    font-size: 1.1rem;
    margin-left: auto;
  `;

  const StyledProgressBar = styled(ProgressBar)`
    height: 10px !important;
    border-radius: 6px !important;
    background-color: rgba(0, 230, 118, 0.1) !important;
    overflow: hidden;
    
    .progress-bar {
      background: linear-gradient(90deg, #00e676, #00c853) !important;
      border-radius: 6px !important;
      transition: width 0.3s ease !important;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: shimmer 1.5s infinite;
      }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;

  const ProgressSubtext = styled.p`
    margin: 0.75rem 0 0 0;
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-align: center;
  `;

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
      
      &:disabled {
        background: var(--border-color) !important;
        color: var(--text-secondary) !important;
        cursor: not-allowed;
        transform: none;
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
    color: var(--text-secondary);
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
      
      &:disabled {
        background-color: rgba(var(--background-dark), 0.5) !important;
        opacity: 0.6;
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
      
      &:disabled {
        background-color: rgba(var(--background-dark), 0.5) !important;
        opacity: 0.6;
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

  const PageTitle = styled.h3`
    color: var(--heading-color);
    margin-bottom: 1rem;
  `;

  const SectionTitle = styled.h5`
    color: var(--heading-color);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  `;
