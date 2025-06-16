import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaGoogle, FaFacebookF, FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { registerSchema } from "../utils/validationSchema";
import { registerUser, clearError, clearSuccess } from "../store/authSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, isSuccess } = useSelector((state) => state.auth);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getFieldState,
    trigger,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
  });

  // Handle live validation on field blur
  const handleFieldBlur = async (fieldName) => {
    await trigger(fieldName);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Extract only the fields needed for API
      const { firstName, lastName, email, password, role } = data;

      const apiPayload = {
        firstName,
        lastName,
        email,
        password,
        role
      };

      await dispatch(registerUser(apiPayload)).unwrap();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  
  // Handle successful registration
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate, dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [dispatch, error]);

  // Helper function to get field error
  const getFieldError = (fieldName) => {
    const fieldState = getFieldState(fieldName);
    return fieldState.error?.message || errors[fieldName]?.message;
  };

  // Helper function to check if field has error
  const hasFieldError = (fieldName) => {
    const fieldState = getFieldState(fieldName);
    return fieldState.invalid || !!errors[fieldName];
  };

  return (
    <LoginContainer>
      <LoginBox data-aos="zoom-in">
        <Box>
          <div data-aos="fade-right">
            <Logo>
              <LogoSpan>
                <LogoImage
                  src="image/logo.png"
                  alt="MAHD Logo"
                  loading="lazy"
                />
                MAHD
              </LogoSpan>
            </Logo>
            <WelcomeTitle>Create Account</WelcomeTitle>
            <SubtitleText>Sign up to get started with MAHD</SubtitleText>
          </div>

          {/* Success Alert */}
          {isSuccess && (
            <Alert variant="success" className="mb-3">
              Registration successful! Redirecting to login...
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="danger" className="mb-3" dismissible onClose={() => dispatch(clearError())}>
              {error}
            </Alert>
          )}

          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            {/* First Name Field */}
            <FormGroupCustom data-aos="fade-up">
              <FormLabel>First Name</FormLabel>
              <InputWrapper>
                <CustomInput
                  type="text"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                  onBlur={() => handleFieldBlur("firstName")}
                  className={hasFieldError("firstName") ? 'is-invalid' : ''}
                />
                <InputIcon>
                  <FaUser />
                </InputIcon>
              </InputWrapper>
              {getFieldError("firstName") && (
                <ErrorMessage>{getFieldError("firstName")}</ErrorMessage>
              )}
            </FormGroupCustom>

            {/* Last Name Field */}
            <FormGroupCustom data-aos="fade-up">
              <FormLabel>Last Name</FormLabel>
              <InputWrapper>
                <CustomInput
                  type="text"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                  onBlur={() => handleFieldBlur("lastName")}
                  className={hasFieldError("lastName") ? 'is-invalid' : ''}
                />
                <InputIcon>
                  <FaUser />
                </InputIcon>
              </InputWrapper>
              {getFieldError("lastName") && (
                <ErrorMessage>{getFieldError("lastName")}</ErrorMessage>
              )}
            </FormGroupCustom>

            {/* Email Field */}
            <FormGroupCustom data-aos="fade-up">
              <FormLabel>Email</FormLabel>
              <InputWrapper>
                <CustomInput
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  onBlur={() => handleFieldBlur("email")}
                  className={hasFieldError("email") ? 'is-invalid' : ''}
                />
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
              </InputWrapper>
              {getFieldError("email") && (
                <ErrorMessage>{getFieldError("email")}</ErrorMessage>
              )}
            </FormGroupCustom>

            {/* Password Field */}
            <FormGroupCustom data-aos="fade-up">
              <FormLabel>Password</FormLabel>
              <InputWrapper>
                <CustomInput
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  onBlur={() => handleFieldBlur("password")}
                  className={hasFieldError("password") ? 'is-invalid' : ''}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputWrapper>
              {getFieldError("password") && (
                <ErrorMessage>{getFieldError("password")}</ErrorMessage>
              )}
            </FormGroupCustom>

            {/* Role Field */}
            <FormGroupCustom data-aos="fade-up">
              <FormLabel>Role</FormLabel>
              <CustomSelect
                {...register("role")}
                onBlur={() => handleFieldBlur("role")}
                className={hasFieldError("role") ? 'is-invalid' : ''}
                aria-label="Select role"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </CustomSelect>
              {getFieldError("role") && (
                <ErrorMessage>{getFieldError("role")}</ErrorMessage>
              )}
            </FormGroupCustom>

            {/* Agreement Checkbox */}
            <CheckboxWrapper data-aos="fade-up">
              <Form.Check
                type="checkbox"
                id="agreeCheckbox"
                {...register("agreeToUpdates")}
                label="I agree to receive updates and promotional emails from MAHD"
              />
            </CheckboxWrapper>

            {/* Submit Button */}
            <SignInButton
              type="submit"
              disabled={!isValid || isLoading}
              data-aos="fade-up"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </SignInButton>

            {/* <DividerText>or continue with</DividerText> */}

            {/* Social Buttons */}
            {/* <SocialButtons>
              <SocialButton variant="outline-light" data-aos="fade-right" disabled={isLoading}>
                <FaGoogle />
              </SocialButton>
              <SocialButton variant="outline-light" data-aos="fade-left" disabled={isLoading}>
                <FaFacebookF />
              </SocialButton>
            </SocialButtons> */}

            {/* Login Link */}
            <LoginLink>
              Already have an account?{" "}
              <LoginText to="/login">
                Log in
              </LoginText>
            </LoginLink>
          </StyledForm>
        </Box>
      </LoginBox>
    </LoginContainer>
  );
};

export default SignIn;

// All styled components remain the same as in your original code
// ... (include all your existing styled components here)

// All your existing styled components remain unchanged
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--background-dark);
  padding: 20px;
`;

const LoginBox = styled.div`
  background-color: var(--card-background);
  padding: 50px 30px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 255, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    max-width: 95%;
  }
`;

const Box = styled.div`
  width: 100%;
`;

const Logo = styled.div`
  margin-bottom: 8px;
`;

const LogoSpan = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  color: var(--text-light);
`;

const LogoImage = styled.img`
  width: 40px;
  height: auto;
`;

const WelcomeTitle = styled.h3`
  font-weight: bold;
  color: var(--heading-color);
  margin-bottom: 8px;
`;

const SubtitleText = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  margin-bottom: 30px;
`;

const StyledForm = styled(Form)`
  color: var(--text-light);
`;

const FormGroupCustom = styled(Form.Group)`
  margin-bottom: 20px;
  text-align: start;
`;

const FormLabel = styled(Form.Label)`
  display: block;
  text-align: start;
  margin-bottom: 8px;
  color: var(--text-light);
  font-weight: 500;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CustomInput = styled(Form.Control)`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-light);
  padding: 12px 45px 12px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:focus {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
    color: var(--text-light);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &.is-invalid {
    border-color: var(--error-color);
  }
`;

const CustomSelect = styled(Form.Select)`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-light);
  padding: 12px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:focus {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
    color: var(--text-light);
  }
  
  option {
    background-color: var(--card-background);
    color: var(--text-light);
  }
`;

const InputIcon = styled.span`
  position: absolute;
  right: 15px;
  color: var(--text-secondary);
  pointer-events: none;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--primary);
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: 14px;
  margin-top: 5px;
  text-align: start;
`;

const CheckboxWrapper = styled.div`
  padding: 15px 0;
  text-align: start;
  
  .form-check {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  
  .form-check-input {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    
    &:checked {
      background-color: var(--primary);
      border-color: var(--primary);
    }
    
    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 0.25rem rgba(0, 230, 118, 0.25);
    }
  }
  
  .form-check-label {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.4;
  }
`;

const SignInButton = styled(Button)`
  width: 100%;
  padding: 12px;
  font-weight: bold;
  background: linear-gradient(45deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DividerText = styled.div`
  color: var(--text-secondary);
  margin: 20px 0;
  font-size: 14px;
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const SocialButton = styled(Button)`
  min-width: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 480px) {
    min-width: 45px;
    height: 35px;
    font-size: 1rem;
  }
`;

const LoginLink = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
`;

const LoginText = styled(NavLink)`
  color: var(--primary);
  font-weight: bold;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;
