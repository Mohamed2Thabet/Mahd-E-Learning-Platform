import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaGoogle, FaFacebookF, FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Component
const SignIn = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    accountType: "",
    agreeToUpdates: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.accountType) {
      newErrors.accountType = "Please select an account type";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      console.log("Sign up data:", formData);
      navigate('/login');
    } else {
      setErrors(formErrors);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.password && formData.accountType;

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

          <StyledForm onSubmit={handleSubmit}>
            <FormGroupCustom data-aos="fade-up">
              <FormLabel>Full Name</FormLabel>
              <InputWrapper>
                <CustomInput
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={errors.fullName ? 'is-invalid' : ''}
                  required
                />
                <InputIcon>
                  <FaUser />
                </InputIcon>
              </InputWrapper>
              {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
            </FormGroupCustom>

            <FormGroupCustom data-aos="fade-up">
              <FormLabel>Email</FormLabel>
              <InputWrapper>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'is-invalid' : ''}
                  required
                />
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
              </InputWrapper>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroupCustom>

            <FormGroupCustom data-aos="fade-up">
              <FormLabel>Password</FormLabel>
              <InputWrapper>
                <CustomInput
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'is-invalid' : ''}
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputWrapper>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroupCustom>

            <FormGroupCustom data-aos="fade-up">
              <FormLabel>Account Type</FormLabel>
              <CustomSelect
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                className={errors.accountType ? 'is-invalid' : ''}
                aria-label="Select account type"
              >
                <option value="">Select account type</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </CustomSelect>
              {errors.accountType && <ErrorMessage>{errors.accountType}</ErrorMessage>}
            </FormGroupCustom>

            <CheckboxWrapper data-aos="fade-up">
              <Form.Check
                type="checkbox"
                id="agreeCheckbox"
                name="agreeToUpdates"
                checked={formData.agreeToUpdates}
                onChange={handleInputChange}
                label="I agree to receive updates and promotional emails from MAHD"
              />
            </CheckboxWrapper>

            <SignInButton
              type="submit"
              disabled={!isFormValid}
              data-aos="fade-up"
            >
              Sign Up
            </SignInButton>

            <DividerText>or continue with</DividerText>

            <SocialButtons>
              <SocialButton variant="outline-light" data-aos="fade-right">
                <FaGoogle />
              </SocialButton>
              <SocialButton variant="outline-light" data-aos="fade-left">
                <FaFacebookF />
              </SocialButton>
            </SocialButtons>

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

// Styled Components
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
