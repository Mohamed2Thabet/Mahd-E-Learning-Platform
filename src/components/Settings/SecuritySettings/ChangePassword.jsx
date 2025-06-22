import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { passwordSchema } from '../../../utils/validationSchema';
import { useDispatch } from "react-redux";
import { changePassword } from "../../../store/profileSlice"; // تأكد من المسار



const ChangePassword = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  // Watch all form values for real-time validation
  const watchedValues = watch();

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const onSubmit = async ({ currentPassword, newPassword }) => {
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const resultAction = await dispatch(changePassword({
        oldPassword: currentPassword,
        newPassword,
      }));

      console.log("Action Result:", resultAction);

      if (changePassword.fulfilled.match(resultAction)) {
        reset();
        setSuccessMessage('Password has been successfully updated.');
        setShowPasswords({
          currentPassword: false,
          newPassword: false,
          confirmPassword: false
        });
      } else {
        const errorMsg =
          resultAction.payload ||
          resultAction.error?.message ||
          'Failed to update password';
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Password update failed:', error.message);
      setSuccessMessage(error.message || 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handleInputChange = (field, value) => {
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }

    // Trigger validation for dependent fields
    if (field === 'newPassword') {
      trigger('confirmPassword');
    }
    if (field === 'currentPassword') {
      trigger('newPassword');
    }
  };

  return (
    <Container>
      <Title>Change Password</Title>

      {successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="currentPassword">Current Password</Label>
          <InputContainer>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type={showPasswords.currentPassword ? 'text' : 'password'}
                  id="currentPassword"
                  placeholder="Enter current password"
                  className={errors.currentPassword ? 'is-invalid' : ''}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange('currentPassword', e.target.value);
                  }}
                />
              )}
            />
            <EyeButton
              type="button"
              onClick={() => togglePasswordVisibility('currentPassword')}
            >
              {showPasswords.currentPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeButton>
          </InputContainer>
          {errors.currentPassword && (
            <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <InputContainer>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type={showPasswords.newPassword ? 'text' : 'password'}
                  id="newPassword"
                  placeholder="Enter new password"
                  className={errors.newPassword ? 'is-invalid' : ''}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange('newPassword', e.target.value);
                  }}
                />
              )}
            />
            <EyeButton
              type="button"
              onClick={() => togglePasswordVisibility('newPassword')}
            >
              {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeButton>
          </InputContainer>
          {errors.newPassword && (
            <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
          )}
          <PasswordStrength password={watchedValues.newPassword} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <InputContainer>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type={showPasswords.confirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  className={errors.confirmPassword ? 'is-invalid' : ''}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange('confirmPassword', e.target.value);
                  }}
                />
              )}
            />
            <EyeButton
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeButton>
          </InputContainer>
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </FormGroup>

        <StyledButton
          type="submit"
          disabled={isLoading || !isValid}
        >
          {isLoading ? 'Updating Password...' : 'Update Password'}
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

// Password Strength Indicator Component
const PasswordStrength = ({ password }) => {
  const getStrength = (pwd) => {
    if (!pwd) return { level: 0, text: '', color: '' };

    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z\d]/.test(pwd)) score++;

    if (score < 3) return { level: 1, text: 'Weak', color: '#ef4444' };
    if (score < 5) return { level: 2, text: 'Medium', color: '#f59e0b' };
    return { level: 3, text: 'Strong', color: '#10b981' };
  };

  const strength = getStrength(password);

  if (!password) return null;

  return (
    <StrengthContainer>
      <StrengthBar>
        <StrengthFill $level={strength.level} color={strength.color} />      </StrengthBar>
      <StrengthText color={strength.color}>
        Password strength: {strength.text}
      </StrengthText>
    </StrengthContainer>
  );
};

export default ChangePassword;

// Updated Styled Components
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

const StyledForm = styled.form`
  width: 100%;
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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: var(--background-dark);
  border: 1px solid var(--border-color);
  color: var(--text-light);
  padding: 0.875rem 3rem 0.875rem 1rem;
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

const EyeButton = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-light);
  }

  &:focus {
    outline: none;
    color: var(--primary);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.8125rem;
  margin-top: 0.375rem;
  font-weight: 500;
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

const StrengthContainer = styled.div`
  margin-top: 0.5rem;
`;

const StrengthBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
`;

// ✅ Fix the styled component
const StrengthFill = styled.div`
  height: 100%;
  width: ${props => props.$level * 33.33}%;
  background-color: ${props => props.color};
  transition: all 0.3s ease;
  border-radius: 2px;
`;

const StrengthText = styled.div`
  font-size: 0.75rem;
  color: ${props => props.color};
  font-weight: 500;
`;
