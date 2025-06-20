import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaDownload, FaTrash, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../store/profileSlice";
import styled, { keyframes } from "styled-components";

const DataManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      const result = await dispatch(deleteAccount());
      if (deleteAccount.fulfilled.match(result)) {
        // Clear any local storage data, then redirect
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(result.payload || "Failed to delete account.");
      }
    } catch (error) {
      alert(error.message || "Something went wrong.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDownloadData = () => {
    // Implement download functionality
    console.log("Downloading user data...");
  };

  return (
    <>
      <DataCard>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardSubtitle>Manage your personal data and account settings</CardSubtitle>
        </CardHeader>

        <CardBody>
          <ActionSection>
            <ActionItem>
              <ActionInfo>
                <ActionTitle>Download My Data</ActionTitle>
                <ActionDescription>
                  Get a copy of all your personal data in a downloadable format
                </ActionDescription>
              </ActionInfo>
              <StyledButton variant="outline" onClick={handleDownloadData}>
                <FaDownload />
                Download
              </StyledButton>
            </ActionItem>

            <ActionItem>
              <ActionInfo>
                <ActionTitle>Delete My Account</ActionTitle>
                <ActionDescription>
                  Permanently delete your account and all associated data
                </ActionDescription>
              </ActionInfo>
              <StyledButton variant="danger" onClick={handleDeleteClick}>
                <FaTrash />
                Delete Account
              </StyledButton>
            </ActionItem>
          </ActionSection>
        </CardBody>
      </DataCard>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ModalOverlay onClick={handleCancelDelete}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <WarningIcon>
                <FaExclamationTriangle />
              </WarningIcon>
              <CloseButton onClick={handleCancelDelete}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <ModalTitle>Are you sure you want to delete your account?</ModalTitle>
              <ModalText>
                This action cannot be undone. All your data, including your profile,
                courses, and progress will be permanently deleted.
              </ModalText>

              <WarningList>
                <WarningItem>• Your profile and personal information will be removed</WarningItem>
                <WarningItem>• All course progress and certificates will be lost</WarningItem>
                <WarningItem>• You won't be able to recover your account</WarningItem>
              </WarningList>
            </ModalBody>

            <ModalFooter>
              <CancelButton onClick={handleCancelDelete} disabled={isDeleting}>
                Cancel
              </CancelButton>
              <DeleteButton onClick={handleConfirmDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <>
                    <LoadingSpinner />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Yes, Delete My Account
                  </>
                )}
              </DeleteButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default DataManagement;

// Styled Components
const DataCard = styled.div`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(135deg, var(--card-background) 0%, rgba(0, 230, 118, 0.05) 100%);
`;

const CardTitle = styled.h5`
  color: var(--heading-color);
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
`;

const CardSubtitle = styled.p`
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.875rem;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ActionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary);
    background-color: rgba(0, 230, 118, 0.02);
  }
`;

const ActionInfo = styled.div`
  flex: 1;
`;

const ActionTitle = styled.h6`
  color: var(--text-light);
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
`;

const ActionDescription = styled.p`
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  white-space: nowrap;

  ${props => props.variant === 'outline' && `
    background-color: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);

    &:hover {
      background-color: var(--primary);
      color: var(--background-dark);
    }
  `}

  ${props => props.variant === 'danger' && `
    background-color: #ef4444;
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  `}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.2);
  }
`;

// Modal Styles
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--card-background);
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 2rem 2rem 1rem 2rem;
  text-align: center;
`;

const WarningIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  color: #ef4444;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: var(--text-light);
    background-color: var(--border-color);
  }
`;

const ModalBody = styled.div`
  padding: 0 2rem 1rem 2rem;
  text-align: center;
`;

const ModalTitle = styled.h4`
  color: var(--heading-color);
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ModalText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const WarningList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  background-color: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 1rem;
`;

const WarningItem = styled.li`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem 2rem 2rem;
  justify-content: center;
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-light);
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: var(--border-color);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #ef4444;
  border: none;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
