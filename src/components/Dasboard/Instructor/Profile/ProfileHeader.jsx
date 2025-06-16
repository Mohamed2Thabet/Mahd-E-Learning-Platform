import React from 'react';
import styled from 'styled-components';
import { 
  FiCheck, 
  FiLinkedin, 
  FiTwitter, 
  FiGlobe,
  FiMessageCircle 
} from 'react-icons/fi';

// Styled Components
const ProfileContainer = styled.div`
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 16px;
  padding: 2rem;
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0.5rem;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const AvatarSection = styled.div`
  flex-shrink: 0;
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const InstructorAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary, #00E676);
  box-shadow: 0 4px 16px rgba(0, 230, 118, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 24px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: var(--primary, #00E676);
  border: 3px solid var(--card-background, #181d19);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 230, 118, 0.4);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 2px 8px rgba(0, 230, 118, 0.4);
    }
    50% {
      box-shadow: 0 2px 8px rgba(0, 230, 118, 0.8);
    }
    100% {
      box-shadow: 0 2px 8px rgba(0, 230, 118, 0.4);
    }
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const InstructorName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--heading-color, white);
  margin: 0;
  line-height: 1.2;
  background: linear-gradient(135deg, var(--heading-color, white), var(--primary, #00E676));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--primary, #00E676);
  border-radius: 50%;
  color: var(--background-dark, #101310);
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 230, 118, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(360deg);
  }
`;

const InstructorTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--primary, #00E676);
  margin: 0 0 1rem 0;
  line-height: 1.3;
`;

const InstructorBio = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  margin: 0 0 1.5rem 0;
  max-width: 500px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--background-dark, #101310);
  border: 1px solid var(--border-color, #333);
  border-radius: 12px;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 230, 118, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    color: var(--primary, #00E676);
    border-color: var(--primary, #00E676);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.2);

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const MessageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary, #00E676);
  color: var(--background-dark, #101310);
  border: none;
  border-radius: 12px;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 230, 118, 0.2);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: var(--primary-dark, #00C853);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 230, 118, 0.3);

    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ProfileHeader = () => {
  return (
    <ProfileContainer>
      <ProfileContent>
        <AvatarSection>
          <AvatarWrapper>
            <InstructorAvatar
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              alt="David Anderson"
            />
            <OnlineIndicator />
          </AvatarWrapper>
        </AvatarSection>
        
        <ProfileInfo>
          <NameSection>
            <InstructorName>David Anderson</InstructorName>
            <VerifiedBadge>
              <FiCheck size={18} />
            </VerifiedBadge>
          </NameSection>
          
          <InstructorTitle>UI/UX Designer & Instructor</InstructorTitle>
          
          <InstructorBio>
            Award-winning designer with 10+ years of experience in digital product
            design. Passionate about teaching and helping others master the craft of
            UI/UX design.
          </InstructorBio>
          
          <SocialLinks>
            <SocialLink href="#" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <FiTwitter size={20} />
            </SocialLink>
            <SocialLink href="#" aria-label="Website">
              <FiGlobe size={20} />
            </SocialLink>
          </SocialLinks>
          
          <MessageButton>
            <FiMessageCircle size={18} />
            Message Instructor
          </MessageButton>
        </ProfileInfo>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfileHeader;