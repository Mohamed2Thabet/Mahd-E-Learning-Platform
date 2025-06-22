import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import {  FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { loginUser, googleLogin, clearError } from "../store/authSlice";
import { loginSchema } from "../utils/validationSchema";
import { fetchProfile } from "../store/profileSlice";

// Validation schema

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, isSuccess, isAuthenticated } = useSelector(state => state.auth);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    getFieldState
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched"
  });

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated or login successful
  const profile = useSelector(state => state.profile.data);

  useEffect(() => {
    if ((isAuthenticated || isSuccess)) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, isSuccess, dispatch]);
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (profile?.role && token) {
      localStorage.setItem("user", JSON.stringify(profile));
      if (profile.role === "Educator") {
        navigate("/dashboard/instructor");
      } else {
        navigate("/dashboard/student");
      }
    }
  }, [profile, navigate]);
  
  
  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  const handleGoogleSuccess = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse.credential));
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  const getInputClassName = (fieldName) => {
    const fieldState = getFieldState(fieldName);
    if (errors[fieldName]) {
      return 'is-invalid';
    }
    return '';
  };

  return (
    <LoginContainer className="d-flex justify-content-center align-items-center">
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
            <WelcomeTitle>Welcome Back</WelcomeTitle>
            <SubtitleText>Sign in to continue your learning journey</SubtitleText>
          </div>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <InputGroupCustom>
              <FormLabel>Email</FormLabel>
              <InputWrapper>
                <CustomInput
                  type="email"
                  placeholder="Enter your email"
                  className={getInputClassName('email')}
                  {...register('email')}
                  onBlur={() => trigger('email')}
                />
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
              </InputWrapper>
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </InputGroupCustom>

            <InputGroupCustom>
              <FormLabel>Password</FormLabel>
              <InputWrapper>
                <CustomInput
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className={getInputClassName('password')}
                  {...register('password')}
                  onBlur={() => trigger('password')}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputWrapper>
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </InputGroupCustom>

            <div className="text-end mb-3">
              <ForgotLink to="/forgot-password">
                Forgot Password?
              </ForgotLink>
            </div>

            <LoginButton
              type="submit"
              disabled={isLoading || !isValid}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </LoginButton>

            <DividerText>or continue with</DividerText>

            <SocialButtons>
              <GoogleLoginWrapper>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                  theme="filled_black"
                  shape="rectangular"
                  size="large"
                  text="signin_with"
                  disabled={isLoading}
                />
              </GoogleLoginWrapper>

              {/* <SocialButton variant="outline-light" disabled>
                <FaFacebookF />
              </SocialButton> */}
            </SocialButtons>

            <SignupLink>
              Don't have an account?{" "}
              <SignupText to="/signup">Sign Up</SignupText>

            </SignupLink>
          </StyledForm>
        </Box>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

// Styled Components (keeping existing styles and adding new ones)
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
  max-width: 450px;
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

const InputGroupCustom = styled.div`
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
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
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

const ForgotLink = styled(Link)`
  color: var(--primary);
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;

const LoginButton = styled(Button)`
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
    transform: none;
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
  align-items: center;
`;

const GoogleLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  
  /* Override Google button styles to match theme */
  .google-login-button {
    border-radius: 8px !important;
  }
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
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    min-width: 45px;
    height: 35px;
    font-size: 1rem;
  }
`;

const SignupLink = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
`;

const SignupText = styled(NavLink)`
  color: var(--primary);
  font-weight: bold;
  text-decoration: none;
  
  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;