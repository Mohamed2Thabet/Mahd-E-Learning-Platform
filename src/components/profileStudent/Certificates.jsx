import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Card, Col, Row, Modal, Button, Badge } from 'react-bootstrap';
import {
  FaCertificate,
  FaDownload,
  FaEye,
  FaShare,
  FaAward,
  FaCalendarAlt,
  FaCheck,
  FaExternalLinkAlt,
  FaStar,
  FaShieldAlt
} from 'react-icons/fa';

// ✅ Advanced Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(245, 158, 11, 0.6);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
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

// ✅ Styled Components
const CertificatesContainer = styled.div`
  margin-bottom: 40px;
  animation: ${css`${fadeInUp} 0.8s ease-out`};
  animation-delay: 0.8s;
  animation-fill-mode: both;
`;

const SectionTitle = styled.h5`
  margin-top: 2rem;
  margin-bottom: 24px;
  color: var(--heading-color);
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const TitleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border-radius: 8px;
  color: white;
  font-size: 16px;
`;

const CertificatesGrid = styled(Row)`
  gap: 0;

  @media (max-width: 768px) {
    gap: 16px 0;
  }
`;

const CertificateCard = styled(Card)`
  background: var(--card-background) !important;
  color: var(--text-light) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 20px !important;
  margin-bottom: 24px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: ${css`${slideInLeft} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #F59E0B, #D97706, #FBBF24);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(245, 158, 11, 0.5);
    animation: ${css`${glow} 2s ease-in-out infinite`};

    &::after {
      left: 100%;
    }

    .certificate-icon {
      transform: scale(1.2) rotate(10deg);
    }

    .certificate-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-body {
    padding: 28px !important;
    position: relative;

    @media (max-width: 768px) {
      padding: 20px !important;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 16px !important;
  }
`;

const CertificateHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const CertificateIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border-radius: 16px;
  color: white;
  font-size: 24px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
  animation: ${css`${float} 3s ease-in-out infinite`};

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`;

const CertificateInfo = styled.div`
  flex: 1;
  margin-left: 20px;

  @media (max-width: 480px) {
    margin-left: 0;
    text-align: center;
  }
`;

const CertificateTitle = styled.h6`
  color: var(--heading-color) !important;
  font-weight: 700 !important;
  font-size: clamp(1rem, 2.5vw, 1.25rem) !important;
  margin: 0 0 8px 0 !important;
  line-height: 1.4;
  background: linear-gradient(135deg, var(--heading-color) 0%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CertificateDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: clamp(12px, 2vw, 14px);
  font-weight: 500;

  svg {
    color: #F59E0B;
    font-size: 12px;
  }
`;

const CertificateBadge = styled(Badge)`
  background: linear-gradient(135deg, #10B981 0%, #059669 100%) !important;
  color: white !important;
  padding: 6px 12px !important;
  border-radius: 12px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
  animation: ${css`${pulse} 2s ease-in-out infinite`};
  align-self: flex-start;

  @media (max-width: 480px) {
    align-self: center;
  }
`;

const CertificateActions = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    position: static;
    opacity: 1;
    transform: translateY(0);
    margin-top: 16px;
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  &.primary:hover {
    background: #F59E0B;
    color: white;
    border-color: #F59E0B;
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
  }

  &.secondary:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);
  }
`;

const CertificatePreview = styled.div`
  background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
  border: 2px solid #F59E0B;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: #1F2937;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, #F59E0B, #D97706, #FBBF24);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(245, 158, 11, 0.03), transparent);
    animation: ${css`${shimmer} 10s linear infinite`};
    z-index: 0;
  }

  * {
    position: relative;
    z-index: 1;
  }
`;

const PreviewTitle = styled.h3`
  color: #1F2937;
  margin-bottom: 16px;
  font-weight: 700;
`;

const PreviewDescription = styled.p`
  color: #6B7280;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const PreviewBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #F59E0B;
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  margin-bottom: 20px;
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
    padding: 0 !important;
  }

  .modal-footer {
    border-top: 1px solid var(--border-color) !important;
    padding: 24px !important;
  }
`;

// ✅ Sample Enhanced Data
const sampleCertificates = [
  {
    id: 1,
    title: 'UI/UX Fundamentals',
    issuer: 'MAHD Academy',
    date: 'Apr 15, 2025',
    credentialId: 'MAHD-2025-001',
    skills: ['User Interface Design', 'User Experience', 'Prototyping'],
    hours: 40,
    type: 'Course Completion',
    verified: true
  },
  {
    id: 2,
    title: 'Design Thinking',
    issuer: 'MAHD Academy',
    date: 'Dec 20, 2024',
    credentialId: 'MAHD-2024-045',
    skills: ['Design Thinking', 'Problem Solving', 'Innovation'],
    hours: 25,
    type: 'Specialization',
    verified: true
  },
  {
    id: 3,
    title: 'Advanced Prototyping',
    issuer: 'MAHD Academy',
    date: 'Nov 10, 2024',
    credentialId: 'MAHD-2024-032',
    skills: ['Figma', 'Prototyping', 'Interaction Design'],
    hours: 30,
    type: 'Professional Certificate',
    verified: true
  },
  {
    id: 4,
    title: 'Frontend Development',
    issuer: 'MAHD Academy',
    date: 'Oct 5, 2024',
    credentialId: 'MAHD-2024-018',
    skills: ['React', 'JavaScript', 'CSS'],
    hours: 60,
    type: 'Course Completion',
    verified: true
  }
];

// ✅ Enhanced Component
const Certificates = ({ certificates = sampleCertificates, onCertificateAction }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
    onCertificateAction?.('view', certificate);
  };

  const handleDownloadCertificate = (certificate) => {
    console.log('Downloading certificate:', certificate.title);
    onCertificateAction?.('download', certificate);
    // Implement download logic here
  };

  const handleShareCertificate = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `My ${certificate.title} Certificate`,
        text: `I just completed ${certificate.title} at ${certificate.issuer}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Check out my ${certificate.title} certificate from ${certificate.issuer}! Credential ID: ${certificate.credentialId}`
      );
      alert('Certificate link copied to clipboard!');
    }
    onCertificateAction?.('share', certificate);
  };

  return (
    <CertificatesContainer>
      <SectionTitle>
        <TitleIcon>
          <FaCertificate />
        </TitleIcon>
        Certificates ({certificates.length})
      </SectionTitle>

      <CertificatesGrid>
        {certificates.map((certificate, index) => (
          <Col lg={6} key={certificate.id}>
            <CertificateCard
              $delay={`${0.1 + index * 0.1}s`}
              onClick={() => handleViewCertificate(certificate)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleViewCertificate(certificate);
                }
              }}
            >
              <Card.Body>
                <CertificateHeader>
                  <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                    <CertificateIconContainer className="certificate-icon">
                      <FaCertificate />
                    </CertificateIconContainer>
                    <CertificateInfo>
                      <CertificateTitle>{certificate.title}</CertificateTitle>
                      <CertificateDetails>
                        <DetailItem>
                          <FaAward />
                          {certificate.issuer}
                        </DetailItem>
                        <DetailItem>
                          <FaCalendarAlt />
                          Completed on {certificate.date}
                        </DetailItem>
                        <DetailItem>
                          <FaStar />
                          {certificate.hours} hours • {certificate.type}
                        </DetailItem>
                      </CertificateDetails>
                    </CertificateInfo>
                  </div>
                  {certificate.verified && (
                    <CertificateBadge>
                      <FaShieldAlt />
                      Verified
                    </CertificateBadge>
                  )}
                </CertificateHeader>

                <CertificateActions className="certificate-actions">
                  <ActionButton
                    className="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCertificate(certificate);
                    }}
                    title="View Certificate"
                  >
                    <FaEye />
                  </ActionButton>
                  <ActionButton
                    className="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadCertificate(certificate);
                    }}
                    title="Download Certificate"
                  >
                    <FaDownload />
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareCertificate(certificate);
                    }}
                    title="Share Certificate"
                  >
                    <FaShare />
                  </ActionButton>
                </CertificateActions>
              </Card.Body>
            </CertificateCard>
          </Col>
        ))}
      </CertificatesGrid>

      {/* Certificate Preview Modal */}
      <StyledModal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Certificate Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCertificate && (
            <CertificatePreview>
              <PreviewBadge>
                <FaCertificate />
                Certificate of Completion
              </PreviewBadge>
              <PreviewTitle>{selectedCertificate.title}</PreviewTitle>
              <PreviewDescription>
                This certifies that the holder has successfully completed the {selectedCertificate.title} course
                at {selectedCertificate.issuer} and demonstrated proficiency in the required skills.
              </PreviewDescription>
              <div style={{ marginBottom: '20px' }}>
                <strong>Skills Covered:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', justifyContent: 'center' }}>
                  {selectedCertificate.skills?.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#F59E0B',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6B7280' }}>
                <span>Credential ID: {selectedCertificate.credentialId}</span>
                <span>Issued: {selectedCertificate.date}</span>
              </div>
            </CertificatePreview>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              handleDownloadCertificate(selectedCertificate);
              setShowModal(false);
            }}
            style={{
              backgroundColor: '#F59E0B',
              borderColor: '#F59E0B',
              color: 'white'
            }}
          >
            <FaDownload style={{ marginRight: '8px' }} />
            Download
          </Button>
          <Button
            onClick={() => {
              window.open(`https://verify.mahd.com/${selectedCertificate.credentialId}`, '_blank');
            }}
            style={{
              backgroundColor: 'var(--primary)',
              borderColor: 'var(--primary)',
              color: 'white'
            }}
          >
            <FaExternalLinkAlt style={{ marginRight: '8px' }} />
            Verify
          </Button>
        </Modal.Footer>
      </StyledModal>
    </CertificatesContainer>
  );
};

export default Certificates;
