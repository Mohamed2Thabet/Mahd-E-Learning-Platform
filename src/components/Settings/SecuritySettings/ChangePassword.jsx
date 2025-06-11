import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 2.5rem;
  background-color: var(--card-background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  color: var(--heading-color);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: -0.025em;
`;

const FormGroup = styled.div`
  margin-bottom: 1.75rem;
`;

const Label = styled.label`
  display: block;
  color: var(--text-light);
  font-weight: 600;
  margin-bottom: 0.625rem;
  font-size: 0.875rem;
  letter-spacing: 0.025em;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  color: var(--text-light);
  padding: 0.875rem 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  &.is-invalid {
    border-color: #ef4444;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.8125rem;
  margin-top: 0.375rem;
  font-weight: 500;
`;

const StyledButton = styled.button`
  width: 100%;
  background-color: var(--primary);
  border: none;
  color: var(--background-dark);
  font-weight: 600;
  padding: 0.9375rem 1rem;
  border-radius: 6px;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.025em;

  &:hover:not(:disabled) {
    background-color: var(--primary-dark);
  }

  &:focus {
    outline: none;
    background-color: var(--primary-dark);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.2);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: var(--text-secondary);
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background-color: rgba(0, 230, 118, 0.08);
  border: 1px solid rgba(0, 230, 118, 0.3);
  color: var(--primary);
  padding: 0.875rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
`;

const StyledForm = styled.div`
  width: 100%;
`;

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required.';
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required.';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long.';
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = 'New password must differ from current password.';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Password confirmation is required.';
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Password confirmation does not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setSuccessMessage('Password has been successfully updated.');
    } catch (error) {
      setErrors({ submit: 'Unable to update password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Container>
      <Title>Change Password</Title>

      {successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}

      <StyledForm>
        <FormGroup>
          <Label htmlFor="currentPassword">Current Password</Label>
          <StyledInput
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter current password"
            className={errors.currentPassword ? 'is-invalid' : ''}
          />
          {errors.currentPassword && (
            <ErrorMessage>{errors.currentPassword}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <StyledInput
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter new password"
            className={errors.newPassword ? 'is-invalid' : ''}
          />
          {errors.newPassword && (
            <ErrorMessage>{errors.newPassword}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <StyledInput
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Confirm new password"
            className={errors.confirmPassword ? 'is-invalid' : ''}
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </FormGroup>

        {errors.submit && (
          <ErrorMessage style={{ marginBottom: '1rem', textAlign: 'center' }}>
            {errors.submit}
          </ErrorMessage>
        )}

        <StyledButton
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Updating Password...' : 'Update Password'}
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

export default ChangePassword;