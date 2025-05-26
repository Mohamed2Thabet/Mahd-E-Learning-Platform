// File: pages/SettingsPage.js
import styled from "styled-components";
import ActiveSessions from "../components/Settings/ActiveSessions";
import DataManagement from "../components/Settings/DataManagement";
import PrivacyControls from "../components/Settings/PrivacyControls";
import ChangePassword from "../components/Settings/SecuritySettings/ChangePassword";
import TwoFactorAuth from "../components/Settings/SecuritySettings/TwoFactorAuth";
import SideBarSettings from "../components/Settings/SideBarSettings";



const SettingsPage = () => {
  return (
    <Container>
      <ContentRow>
        <SideBarSettings />

        <MainContentWrapper >
          <MainContent>
            <PageTitle>Privacy & Security Settings</PageTitle>

            <Section>
              <PrivacyControls />
            </Section>

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
          </MainContent>
        </MainContentWrapper>
      </ContentRow>
    </Container>
  );
};

export default SettingsPage;
// Styled Components
const Container = styled.div`
  background-color: #0f0f0f;
  min-height: 100vh;
  color: white;
`;

const ContentRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MainContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  margin: 0;

  @media (min-width: 768px) {
    margin-left: 250px;
  }
`;


const MainContent = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Section = styled.div`
  background-color: #1a1a1a;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

const PageTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 1.75rem;
  margin-bottom: 2rem;
`;