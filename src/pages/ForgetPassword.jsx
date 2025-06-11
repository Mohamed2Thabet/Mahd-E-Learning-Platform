import React from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Component
const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordCard data-aos="zoom-in">
        <Logo data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
          <LogoSpan>
            <LogoImage src="image/logo.png" alt="" />
            MAHD
          </LogoSpan>
        </Logo>

        <MainTitle data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400">
          Forgot your password?
        </MainTitle>

        <SubtitleText data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
          Enter your email address, and we'll send you a link to reset your password.
        </SubtitleText>

        <FormGroup data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
          <InputGroup>
            <EmailInput type="email" placeholder="Enter your email" />
          </InputGroup>
        </FormGroup>

        <SendButton
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="700"
          onClick={() => navigate('/password-reset')}
        >
          Send Reset Link
        </SendButton>

        <BackLinkContainer data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">
          <BackIcon />
          <BackLinkText to="/signin">
            Back to Sign In
          </BackLinkText>
        </BackLinkContainer>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;

// Styled Components
const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-dark);
  padding: 20px;
`;

const ForgotPasswordCard = styled.div`
  background-color: var(--card-background);
  padding: 40px 30px;
  text-align: center;
  border: none;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 255, 0, 0.1);
  width: 100%;
  max-width: 450px;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
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
  color: var(--text-light);
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 40px;
  height: auto;
`;

const MainTitle = styled.h4`
  font-weight: bold;
  color: var(--heading-color);
  margin: 30px 0 15px 0;
`;

const SubtitleText = styled.p`
  color: var(--text-secondary);
  font-size: 18px;
  margin-bottom: 25px;
`;

const FormGroup = styled(Form.Group)`
  margin: 20px 0;
`;

const InputGroup = styled.div`
  display: flex;
  position: relative;
`;

const EmailInput = styled(Form.Control)`
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
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SendButton = styled(Button)`
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  font-weight: bold;
  background: linear-gradient(45deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  }
`;

const BackLinkContainer = styled.div`
  margin-top: 20px;
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
