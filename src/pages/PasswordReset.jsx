import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { passwordResetSchema } from "../utils/validationSchema";
import { resetPassword } from "../store/authSlice";
import { useDispatch } from "react-redux";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid, touchedFields }
  } = useForm({
    resolver: zodResolver(passwordResetSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      otp: "",
      newPassword: ""
    }
  });

  // Watch form values for real-time validation
  const watchedEmail = watch("email");
  const watchedOtp = watch("otp");
  const watchedPassword = watch("newPassword");

  // Validate password strength
  const getPasswordStrength = (password) => {
    if (!password) return "";

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*]/.test(password);
    const lengthValid = password.length >= 8 && password.length <= 64;

    if (!lengthValid) return "weak";
    if (hasLetters && hasNumbers && hasSpecialChars) return "strong";
    if ((hasLetters && hasNumbers) || (hasLetters && hasSpecialChars) || (hasNumbers && hasSpecialChars)) return "medium";
    return "weak";
  };

  const passwordStrength = getPasswordStrength(watchedPassword);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const isFormValid = await trigger();
      if (!isFormValid) return;

      const result = await dispatch(resetPassword(data));

      if (resetPassword.fulfilled.match(result)) {
        navigate('/password-reset-success');
      } else {
        alert(result.payload || "Password reset failed");
      }
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }; // ✅ this closing brace was missing
  

  // Handle field blur events for validation
  const handleFieldBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  // Handle OTP input formatting
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = value;
  };

  return (
    <ResetContainer>
      <ResetCard data-aos="zoom-in">
        <Logo data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
          <LogoSpan>
            <LogoImage src="image/logo.png" alt="Logo" />
            MAHD
          </LogoSpan>
        </Logo>

        <MainTitle data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400">
          Reset Your Password
        </MainTitle>

        <SubtitleText data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
          Enter your email, OTP code, and create a new secure password.
        </SubtitleText>

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <FormGroup data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
            <FormLabel>Email Address</FormLabel>
            <StyledInput
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              onBlur={() => handleFieldBlur("email")}
              $hasError={!!errors.email}
              $isValid={!errors.email && touchedFields.email && watchedEmail}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            {!errors.email && touchedFields.email && watchedEmail && (
              <SuccessMessage>Valid email address</SuccessMessage>
            )}
          </FormGroup>

          {/* OTP Field */}
          <FormGroup data-aos="fade-up" data-aos-duration="1500" data-aos-delay="700">
            <FormLabel>OTP Code</FormLabel>
            <StyledInput
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              {...register("otp")}
              onBlur={() => handleFieldBlur("otp")}
              onChange={(e) => {
                handleOtpChange(e);
                register("otp").onChange(e);
              }}
              $hasError={!!errors.otp}
              $isValid={!errors.otp && touchedFields.otp && watchedOtp}
            />
            {errors.otp && <ErrorMessage>{errors.otp.message}</ErrorMessage>}
            {!errors.otp && touchedFields.otp && watchedOtp && (
              <SuccessMessage>Valid OTP format</SuccessMessage>
            )}
          </FormGroup>

          {/* Password Field */}
          <FormGroup data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <PasswordInput
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your new password"
                {...register("newPassword")}
                onBlur={() => handleFieldBlur("newPassword")}
                $hasError={!!errors.newPassword}
                $isValid={!errors.newPassword && touchedFields.newPassword && watchedPassword}
              />
              <EyeButton
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </EyeButton>
            </InputGroup>

            {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}

            {watchedPassword && !errors.newPassword && (
              <StrengthIndicator strength={passwordStrength}>
                {passwordStrength === "strong" && "Strong password ✓"}
                {passwordStrength === "medium" && "Medium strength password"}
                {passwordStrength === "weak" && "Weak password"}
              </StrengthIndicator>
            )}

            {/* Password Requirements */}
            {watchedPassword && (
              <PasswordRequirements>
                <RequirementItem $met={watchedPassword.length >= 8 && watchedPassword.length <= 64}>
                  8-64 characters
                </RequirementItem>
                <RequirementItem $met={/[a-zA-Z]/.test(watchedPassword)}>
                  Contains letters
                </RequirementItem>
                <RequirementItem $met={/\d/.test(watchedPassword)}>
                  Contains numbers
                </RequirementItem>
                <RequirementItem $met={/[!@#$%^&*]/.test(watchedPassword)}>
                  Contains special characters
                </RequirementItem>
              </PasswordRequirements>
            )}
          </FormGroup>

          <ResetButton
            type="submit"
            disabled={!isValid || isSubmitting}
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="900"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </ResetButton>

          <BackLinkContainer data-aos="fade-up" data-aos-duration="1500" data-aos-delay="1000">
            <BackIcon />
            <BackLinkText to="/signin">
              Back to Sign In
            </BackLinkText>
          </BackLinkContainer>
        </StyledForm>
      </ResetCard>
    </ResetContainer>
  );
};

export default PasswordReset;

// Enhanced Styled Components
const ResetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-dark);
  padding: 20px;
`;

const ResetCard = styled.div`
  background-color: var(--card-background);
  width: 100%;
  max-width: 450px;
  padding: 35px;
  color: var(--text-light);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 255, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 30px 25px;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    padding: 25px 20px;
    max-width: 95%;
  }
`;

const Logo = styled.div`
  margin-bottom: 25px;
`;

const LogoSpan = styled.span`
  font-size: 1.5rem;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  color: var(--text-light);
  font-weight: bold;
`;

const LogoImage = styled.img`
  width: 40px;
  height: auto;
`;

const MainTitle = styled.h4`
  text-align: center;
  color: var(--heading-color);
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.5rem;
`;

const SubtitleText = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 25px;
`;

const FormLabel = styled(Form.Label)`
  color: var(--text-light);
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
`;

const StyledInput = styled(Form.Control)`
  background-color: rgba(255, 255, 255, 0.05);
  border: 2px solid ${props =>
    props.$hasError ? 'var(--error-color)' :
      props.$isValid ? 'var(--success-color)' :
        'var(--border-color)'
  };
  color: var(--text-light);
  padding: 12px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:focus {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: ${props =>
    props.$hasError ? 'var(--error-color)' :
      'var(--primary)'
  };
    box-shadow: 0 0 0 3px ${props =>
    props.$hasError ? 'rgba(255, 0, 0, 0.1)' :
      'rgba(0, 230, 118, 0.1)'
  };
    color: var(--text-light);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordInput = styled(StyledInput)`
  padding-right: 45px;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 15px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  font-size: 16px;
  
  &:hover {
    color: var(--primary);
  }
`;

const ErrorMessage = styled.small`
  display: block;
  margin-top: 6px;
  color: var(--error-color);
  font-size: 12px;
  font-weight: 500;
`;

const SuccessMessage = styled.small`
  display: block;
  margin-top: 6px;
  color: var(--success-color);
  font-size: 12px;
  font-weight: 500;
`;

const StrengthIndicator = styled.small`
  display: block;
  margin-top: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${props =>
    props.strength === "strong" ? "var(--success-color)" :
      props.strength === "medium" ? "#ffa726" :
        "var(--error-color)"
  };
`;

const PasswordRequirements = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  border-left: 3px solid var(--primary);
`;

const RequirementItem = styled.div`
  font-size: 11px;
  margin-bottom: 4px;
  color: ${props => props.$met ? 'var(--success-color)' : 'var(--text-secondary)'};
  
  &:before {
    content: ${props => props.$met ? '"✓ "' : '"○ "'};
    margin-right: 6px;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ResetButton = styled(Button)`
  width: 100%;
  margin-top: 30px;
  padding: 14px;
  background: linear-gradient(45deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackLinkContainer = styled.div`
  margin-top: 25px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const BackIcon = styled(FaArrowLeft)`
  color: var(--primary);
  font-size: 14px;
`;

const BackLinkText = styled(Link)`
  color: var(--primary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;
