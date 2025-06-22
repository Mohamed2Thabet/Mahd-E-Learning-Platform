import React from 'react';
import styled from 'styled-components';
import { FiGlobe, FiMapPin } from 'react-icons/fi';

// Styled Components
const AboutContainer = styled.div`
  padding: 2rem 0;
`;

const AboutRow = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const MainContent = styled.div`
  flex: 2;
  min-width: 0;

  @media (max-width: 992px) {
    flex: 1;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 992px) {
    flex: 1;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--heading-color, white);
  margin-bottom: 1.5rem;
  line-height: 1.3;
`;

const AboutText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ExpertiseCard = styled.div`
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 8px;
  padding: 1.5rem;
`;

const CardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--heading-color, white);
  margin-bottom: 1rem;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SkillBadge = styled.span`
  background: var(--primary, #00E676);
  color: var(--background-dark, #101310);
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-light, rgba(255, 255, 255, 0.87));

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: var(--text-secondary, rgba(255, 255, 255, 0.6));
    flex-shrink: 0;
  }
`;

const AboutSection = () => {
  return (
    <AboutContainer>
      <AboutRow>
        <MainContent>
          <SectionTitle>About the Instructor</SectionTitle>
          <AboutText>
            With over a decade of experience in digital product design, I've had the privilege
            of working with some of the world's leading tech companies and startups. My approach
            to design combines user-centered methodologies with business strategy to create
            meaningful and impactful digital experiences.
          </AboutText>
          <AboutText>
            As an instructor, I focus on practical, real-world applications of design principles.
            My teaching philosophy emphasizes hands-on learning and project-based exercises
            that prepare students for actual work scenarios they'll encounter in their careers.
          </AboutText>
        </MainContent>

        <SidebarContent>
          <ExpertiseCard>
            <CardTitle>Expertise</CardTitle>
            <SkillsContainer>
              <SkillBadge>UI Design</SkillBadge>
              <SkillBadge>UX Research</SkillBadge>
              <SkillBadge>Figma</SkillBadge>
              <SkillBadge>Design Systems</SkillBadge>
              <SkillBadge>Prototyping</SkillBadge>
            </SkillsContainer>
            <InfoItem>
              <FiGlobe size={18} />
              <span>English</span>
            </InfoItem>
            <InfoItem>
              <FiMapPin size={18} />
              <span>San Francisco, CA</span>
            </InfoItem>
          </ExpertiseCard>
        </SidebarContent>
      </AboutRow>
    </AboutContainer>
  );
};

export default AboutSection;