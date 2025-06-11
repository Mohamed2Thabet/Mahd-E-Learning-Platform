import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


// Component
const PasswordReset = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [strength, setStrength] = useState("");
  const [matchError, setMatchError] = useState("");

  const validatePasswordStrength = (password) => {
    if (password.length === 0) return "";

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*]/.test(password);
    const lengthValid = password.length >= 8 && password.length <= 64;

    if (!lengthValid) {
      return "Password must be between 8 and 64 characters";
    }

    if ((hasLetters && !hasNumbers && !hasSpecialChars) || (!hasLetters && hasNumbers && !hasSpecialChars)) {
      return "Weak password";
    }

    if (hasLetters && hasNumbers && !hasSpecialChars) {
      return "Medium strength";
    }

    if (hasLetters && hasNumbers && hasSpecialChars) {
      return "Strong password";
    }

    return "Weak password";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(validatePasswordStrength(newPassword));
    setMatchError("");
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setMatchError("");
  };

  const validateMatch = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  };

  const isFormValid = () => {
    return (
      strength !== "Weak password" &&
      strength !== "Password must be between 8 and 64 characters" &&
      password.length >= 8 &&
      password.length <= 64 &&
      password === confirmPassword &&
      password !== "" &&
      confirmPassword !== ""
    );
  };

  return (
    <ResetContainer>
      <ResetCard data-aos="zoom-in">
        <Logo data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
          <LogoSpan>
            <LogoImage src="image/logo.png" alt="" />
            MAHD
          </LogoSpan>
        </Logo>

        <MainTitle data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400">
          Create a New Password
        </MainTitle>

        <SubtitleText data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
          Your new password must be 8-64 characters long and include a number and a special character for high security.
        </SubtitleText>

        <StyledForm>
          <FormGroup data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <PasswordInput
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <EyeButton
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash /> }
              </EyeButton>
            </InputGroup>
            {strength && (
              <StrengthIndicator strength={strength}>
                {strength}
              </StrengthIndicator>
            )}
          </FormGroup>

          <FormGroup data-aos="fade-up" data-aos-duration="1500" data-aos-delay="700">
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <PasswordInput
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={validateMatch}
              />
              <EyeButton
                type="button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </EyeButton>
            </InputGroup>
            {matchError && <ErrorMessage>{matchError}</ErrorMessage>}
          </FormGroup>

          <ResetButton
            disabled={!isFormValid()}
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="800"
            onClick={() => navigate('/password-reset-success')}
          >
            Reset Password
          </ResetButton>

          <BackLinkContainer data-aos="fade-up" data-aos-duration="1500" data-aos-delay="900">
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

// Styled Components
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
  max-width: 400px;
  padding: 30px;
  color: var(--text-light);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 255, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 25px 20px;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    max-width: 95%;
  }
`;

const Logo = styled.div`
  margin-bottom: 20px;
`;

const LogoSpan = styled.span`
  font-size: 1.5rem;
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

const MainTitle = styled.h4`
  text-align: center;
  color: var(--heading-color);
  margin-bottom: 15px;
  font-weight: bold;
`;

const SubtitleText = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 25px;
  line-height: 1.5;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 20px;
`;

const FormLabel = styled(Form.Label)`
  color: var(--text-light);
  margin-bottom: 8px;
  font-weight: 500;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordInput = styled(Form.Control)`
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
  
  &:hover {
    color: var(--primary);
  }
`;

const StrengthIndicator = styled.small`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: ${props =>
    props.strength === "Strong password" ? "var(--success-color)" :
      props.strength === "Medium strength" ? "#ffa726" :
        "var(--error-color)"
  };
`;

const ErrorMessage = styled.small`
  display: block;
  margin-top: 5px;
  color: var(--error-color);
  font-size: 12px;
`;

const ResetButton = styled(Button)`
  width: 100%;
  margin-top: 25px;
  padding: 12px;
  background: linear-gradient(45deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 8px;
  font-weight: bold;
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
  margin-top: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const BackIcon = styled(FaArrowLeft)`
  color: var(--primary);
`;

const BackLinkText = styled(Link)`
  color: var(--primary);
  text-decoration: none;
  
  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;