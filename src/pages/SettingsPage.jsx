import React from 'react';
import styled from 'styled-components';
import ActiveSessions from "../components/Settings/ActiveSessions";
import DataManagement from "../components/Settings/DataManagement";
import PrivacyControls from "../components/Settings/PrivacyControls";
import ChangePassword from "../components/Settings/SecuritySettings/ChangePassword";
import TwoFactorAuth from "../components/Settings/SecuritySettings/TwoFactorAuth";
import SideBarSettings from "../components/Settings/SideBarSettings";
import { useSelector } from "react-redux";

// Styled Components
const Container = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  color: var(--text-light);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ContentRow = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContentWrapper = styled.div`
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: center;
  margin: 0;
  
  @media (min-width: 768px) {
    margin-left: 250px;
    padding: 2.5rem 2rem;
  }
  
  @media (max-width: 767px) {
    padding: 1.5rem 1rem;
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 900px;
`;

const Section = styled.div`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 767px) {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const PageTitle = styled.h1`
  color: var(--heading-color);
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  letter-spacing: -0.025em;
  
  @media (max-width: 767px) {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }
`;


const SettingsPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Container>
      <ContentRow>
        <SideBarSettings />

        <MainContentWrapper>
          <MainContent>
            <PageTitle>Privacy & Security Settings</PageTitle>

            <Section>
              <PrivacyControls />
            </Section>

            {isAuthenticated && (
        <>
                <Section>
                  <DataManagement />
                </Section>
                <Section>
                  <ChangePassword />
                </Section>
          
          
              <Section>
                <TwoFactorAuth />
              </Section>
          
              <Section>
                <ActiveSessions />
              </Section>
        </>
          )}
          </MainContent>
        </MainContentWrapper>
      </ContentRow>
    </Container>
  );
};

export default SettingsPage;


