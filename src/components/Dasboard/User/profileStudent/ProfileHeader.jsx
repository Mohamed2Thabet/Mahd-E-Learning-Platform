// components/profileStudent/ProfileHeader.jsx
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Button, Card, Col, Row, Modal, Form } from 'react-bootstrap';
import {
  FaUserEdit,
  FaCamera,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaTrophy
} from 'react-icons/fa';

// ✅ Animations
const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// ✅ Styled Components
const HeaderCard = styled(Card)`
  background: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 20px !important;
  padding: 24px !important;
  margin-bottom: 32px !important;
  position: relative;
  overflow: hidden;
  animation: ${css`${fadeInLeft} 0.8s ease-out`};
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px !important;
    margin-bottom: 24px !important;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid var(--primary);
  box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  transition: all 0.3s ease;
  animation: ${css`${float} 3s ease-in-out infinite`};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(0, 230, 118, 0.5);
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const CameraOverlay = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;

  &:hover {
    transform: scale(1.1);
    background: var(--primary-dark);
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    font-size: 10px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  color: var(--text-light);

  h5 {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--heading-color);
    background: linear-gradient(135deg, var(--heading-color) 0%, var(--primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    margin-top: 16px;
    text-align: center;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
  font-size: clamp(0.875rem, 2vw, 1rem);

  @media (max-width: 768px) {
    justify-content: center;
    gap: 12px;
  }
`;

const DetailItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 230, 118, 0.1);
    color: var(--primary);
  }

  svg {
    color: var(--primary);
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 0.8rem;
  }
`;

const EditButton = styled(Button)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;

  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4) !important;
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%) !important;
  }

  &:active {
    transform: translateY(0) !important;
  }

  @media (max-width: 768px) {
    width: 100% !important;
    justify-content: center !important;
    margin-top: 16px !important;
  }
`;

const AchievementBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${css`${pulse} 2s ease-in-out infinite`};
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 16px;
    justify-content: center;
  }
`;

// ✅ Modal Styles
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

// ✅ Component
const ProfileHeader = ({ profile, onUpdateProfile }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: profile.name,
    role: profile.role,
    location: profile.location
  });

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    onUpdateProfile(editFormData);
    setShowEditModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdateProfile({ avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <HeaderCard>
        <AchievementBadge>
          <FaTrophy />
          Top Learner
        </AchievementBadge>

        <Row className="align-items-center">
          <Col md="auto">
            <ProfileImageContainer>
              <ProfileImage
                src={profile.avatar}
                alt="Profile"
                className="rounded-circle"
              />
              <CameraOverlay>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="profile-image-input"
                />
                <label htmlFor="profile-image-input" style={{ cursor: 'pointer', margin: 0 }}>
                  <FaCamera />
                </label>
              </CameraOverlay>
            </ProfileImageContainer>
          </Col>

          <Col>
            <ProfileInfo>
              <h5>{profile.name}</h5>
              <ProfileDetails>
                <DetailItem>
                  <FaBriefcase />
                  {profile.role}
                </DetailItem>
                <DetailItem>
                  <FaMapMarkerAlt />
                  {profile.location}
                </DetailItem>
                <DetailItem>
                  <FaCalendarAlt />
                  Joined {profile.joinDate}
                </DetailItem>
              </ProfileDetails>
            </ProfileInfo>
          </Col>

          <Col xs="auto">
            <EditButton onClick={() => setShowEditModal(true)}>
              <FaUserEdit />
              Edit Profile
            </EditButton>
          </Col>
        </Row>
      </HeaderCard>

      {/* Edit Profile Modal */}
      <StyledModal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>Role/Title</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={editFormData.role}
              onChange={handleInputChange}
              placeholder="Enter your role or title"
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={editFormData.location}
              onChange={handleInputChange}
              placeholder="Enter your location"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveProfile}
            style={{
              backgroundColor: 'var(--primary)',
              borderColor: 'var(--primary)',
              color: 'white'
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

export default ProfileHeader;
