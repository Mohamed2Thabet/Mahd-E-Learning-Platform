// components/Billing/BillingPage.jsx
import React from "react";
import styled from "styled-components";
import PlanCard from "../components/Billing/PlanCard";
import PaymentMethodCard from "../components/Billing/PaymentMethodCard";
import BillingHistoryTable from "../components/Billing/BillingHistoryTable";
import AvailablePlans from "../components/Billing/AvailablePlans";
import SideBarSettings from "../components/Settings/SideBarSettings";

// ✅ Page wrapper with responsive design using CSS variables
const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--background-dark);
  padding-left: 0;
  transition: padding-left 0.3s ease;

  @media (min-width: 768px) {
    padding-left: 250px;
  }

  @media (min-width: 1400px) {
    padding-left: 280px;
  }
`;

// ✅ Main content container with professional spacing
const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--text-light);

  @media (min-width: 768px) {
    padding: 50px 40px;
  }

  @media (min-width: 1200px) {
    padding: 60px 50px;
  }
`;

// ✅ Professional header section
const HeaderSection = styled.div`
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--heading-color);
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  font-weight: 400;
`;

// ✅ Content grid layout
const ContentGrid = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    gap: 40px;
  }
`;

// ✅ Section containers with consistent styling using CSS variables
const Section = styled.section`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 0;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary);
    background: var(--card-background);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 230, 118, 0.1);
  }
`;

// ✅ Two-column layout for related sections
const TwoColumnGrid = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

// ✅ Full-width sections
const FullWidthSection = styled(Section)`
  grid-column: 1 / -1;
`;

// ✅ Loading state wrapper (optional enhancement)
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--text-secondary);
`;

const BillingPage = () => {
  return (
    <>
      <SideBarSettings />
      <PageWrapper>
        <MainContent>
          {/* Header Section */}
          <HeaderSection>
            <PageTitle>Billing & Subscription</PageTitle>
            <PageSubtitle>
              Manage your subscription, payment methods, and billing history
            </PageSubtitle>
          </HeaderSection>

          {/* Main Content Grid */}
          <ContentGrid>
            {/* Current Plan Section */}
            <Section>
              <PlanCard />
            </Section>

            {/* Two Column Layout for Payment and History */}
            <TwoColumnGrid>
              <Section>
                <PaymentMethodCard />
              </Section>

              <Section>
                <BillingHistoryTable />
              </Section>
            </TwoColumnGrid>

            {/* Available Plans Section */}
            <FullWidthSection>
              <AvailablePlans />
            </FullWidthSection>
          </ContentGrid>
        </MainContent>
      </PageWrapper>
    </>
  );
};

export default BillingPage;