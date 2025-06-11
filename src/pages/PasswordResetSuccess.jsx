import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



// Component
const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <SuccessContainer data-aos="zoom-in">
      <SuccessCard data-aos="fade-up" data-aos-duration="1500">
        <Logo data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
          <LogoSpan>
            <LogoImage src="image/logo.png" alt="" />
            MAHD
          </LogoSpan>
        </Logo>

        <SuccessIconContainer data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400">
          <SuccessIcon src="image/yes.svg" alt="Success" />
        </SuccessIconContainer>

        <SuccessTitle data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
          Your password has been reset successfully!
        </SuccessTitle>

        <SuccessMessage data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
          You can now use your new password to log in to your account.
        </SuccessMessage>

        <LoginButton
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="700"
          onClick={() => navigate('/login')}
        >
          Log In
        </LoginButton>

        <SupportText data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">
          <SupportLink href="#" onClick={(e) => e.preventDefault()}>
            Need help? Contact Support
          </SupportLink>
        </SupportText>
      </SuccessCard>
    </SuccessContainer>
  );
};

export default PasswordResetSuccess;
// Styled Components
const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-dark);
  padding: 20px;
`;

const SuccessCard = styled.div`
  text-align: center;
  background-color: var(--card-background);
  padding: 30px;
  width: 100%;
  max-width: 350px;
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
  font-weight: 500;
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

const SuccessIconContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(1, 254, 132, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(1, 254, 132, 0.15);
    transform: scale(1.05);
  }
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: auto;
`;

const SuccessTitle = styled.h5`
  color: var(--heading-color);
  margin-bottom: 15px;
  font-weight: bold;
`;

const SuccessMessage = styled.p`
  color: var(--text-secondary);
  margin-bottom: 25px;
  line-height: 1.5;
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
  }
`;

const SupportText = styled.p`
  margin-top: 20px;
  margin-bottom: 0;
`;

const SupportLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;