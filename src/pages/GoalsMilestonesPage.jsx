import React from 'react';
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import SummaryStats from '../components/GoalsMilestones/SummaryStats';
import ActiveGoal from '../components/GoalsMilestones/ActiveGoal';
import Milestone from '../components/GoalsMilestones/Milestone';
import SideBarSettings from '../components/Settings/SideBarSettings';

const PageWrapper = styled.div`
  background-color: var(--background-dark, #101310);
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 230, 118, 0.03) 0%, 
      rgba(0, 200, 83, 0.02) 50%,
      transparent 100%
    );
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem 0;
  color: var(--text-light, rgba(255, 255, 255, 0.87));
`;

const StyledContainer = styled(BootstrapContainer)`
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-left: 270px;
    max-width: calc(100% - 270px);
  }
  
  @media (min-width: 992px) {
    margin-left: 270px;
    max-width: calc(100% - 270px);
  }
`;

const Header = styled.div`
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(0, 230, 118, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      var(--primary, #00E676) 0%, 
      var(--primary-dark, #00C853) 100%
    );
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--heading-color, white);
  letter-spacing: -0.02em;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--primary, #00E676);
    border-radius: 2px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  margin: 1rem 0 0 0;
  font-weight: 400;
  line-height: 1.5;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border-color, #333);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 80px;
    height: 2px;
    background: var(--primary, #00E676);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  color: var(--heading-color, white);
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    width: 4px;
    height: 28px;
    background: linear-gradient(135deg, 
      var(--primary, #00E676) 0%, 
      var(--primary-dark, #00C853) 100%
    );
    border-radius: 2px;
    margin-right: 1rem;
    box-shadow: 0 0 10px rgba(0, 230, 118, 0.3);
  }
`;

const SectionBadge = styled.span`
  background: rgba(0, 230, 118, 0.15);
  color: var(--primary, #00E676);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(0, 230, 118, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 230, 118, 0.1);
`;

const GoalsGrid = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MilestonesGrid = styled(Row)`
  gap: 2rem 0;
  margin: 0;
`;

const StyledCol = styled(Col)`
  display: flex;
  padding: 0 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: var(--card-background, #181d19);
  border: 2px dashed var(--border-color, #333);
  border-radius: 16px;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    border-color: rgba(0, 230, 118, 0.3);
    background: rgba(0, 230, 118, 0.02);
  }
  
  h5 {
    color: var(--text-light, rgba(255, 255, 255, 0.87));
    margin-bottom: 0.75rem;
    font-weight: 600;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    line-height: 1.5;
  }
`;

const StatsSection = styled.div`
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 16px;
  padding: 0;
  margin-bottom: 2.5rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ProgressIndicator = styled.div`
  position: fixed;
  top: 0;
  left: 270px;
  right: 0;
  height: 3px;
  background: rgba(0, 230, 118, 0.1);
  z-index: 1000;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 60%;
    background: linear-gradient(90deg, 
      var(--primary, #00E676) 0%, 
      var(--primary-dark, #00C853) 100%
    );
    box-shadow: 0 0 10px rgba(0, 230, 118, 0.5);
  }
  
  @media (max-width: 767px) {
    left: 0;
  }
`;

const GoalsMilestonesPage = () => {
  return (
    <PageWrapper>
      <ProgressIndicator />
      <ContentWrapper>
        <SideBarSettings />
        <StyledContainer>
          <Header>
            <PageTitle>Learning Goals & Milestones</PageTitle>
            <PageSubtitle>
              Track your learning progress, set ambitious goals, and celebrate every achievement along your journey to mastery.
            </PageSubtitle>
          </Header>

          <Section>
            <StatsSection>
              <SummaryStats />
            </StatsSection>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Active Goals</SectionTitle>
              <SectionBadge>2 Active</SectionBadge>
            </SectionHeader>

            <GoalsGrid>
              <ActiveGoal
                title="Complete UI/UX Fundamentals Course"
                description="Master the basics of user interface design and user experience principles with hands-on projects"
                percent={75}
                tags={["UI Design", "UX Basics", "Design Systems"]}
                daysLeft={12}
              />

              <ActiveGoal
                title="Complete 3 Frontend Projects"
                description="Build real-world applications using React and modern development practices to showcase your skills"
                percent={33}
                tags={["React", "Frontend", "JavaScript"]}
                daysLeft={20}
              />
            </GoalsGrid>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Milestone Tracker</SectionTitle>
              <SectionBadge>Recent Achievements</SectionBadge>
            </SectionHeader>

            <MilestonesGrid>
              <StyledCol md={6} lg={4}>
                <Milestone
                  title="First Course Completed"
                  date="March 15, 2025"
                  points={100}
                />
              </StyledCol>
              <StyledCol md={6} lg={4}>
                <Milestone
                  title="7-Day Study Streak"
                  date="6/7 days"
                  points={50}
                />
              </StyledCol>
              <StyledCol md={6} lg={4}>
                <EmptyState>
                  <h5>Next Milestone Awaits</h5>
                  <p>Complete your current goals to unlock new achievements and earn more points</p>
                </EmptyState>
              </StyledCol>
            </MilestonesGrid>
          </Section>
        </StyledContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default GoalsMilestonesPage;