// pages/StudentProfilePage.jsx
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import ProfileHeader from '../components/profileStudent/ProfileHeader';
import StatsCards from '../components/profileStudent/StatsCards';
import LearningPath from '../components/profileStudent/LearningPath';
import RecentActivity from '../components/profileStudent/RecentActivity';
import Certificates from '../components/profileStudent/Certificates';
import Sidebar from '../components/Layout/Sidebar';
import useProfile from '../components/hooks/useProfile';


// ✅ Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// ✅ Styled Components
const PageWrapper = styled.div`
  display: flex;
  background: linear-gradient(135deg, var(--background-dark) 0%, #0a1015 100%);
  min-height: 100vh;
  position: relative;
  animation: ${css`${fadeIn} 0.6s ease-out`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 230, 118, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 230, 118, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ProfileContainer = styled.div`
  padding: clamp(2rem, 5vw, 4rem);
  color: var(--text-light);
  background-color: transparent;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  /* Custom scrollbar */
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--card-background);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 3px;
    
    &:hover {
      background: var(--primary-dark);
    }
  }

  @media (min-width: 772px) {
    margin-left: 80px;
    width: calc(100% - 80px);
  }

  @media (max-width: 771px) {
    margin-left: 0;
    width: 100%;
    padding: clamp(1rem, 3vw, 2rem);
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

// ✅ Component
const StudentProfilePage = () => {
  const { profileData, updateProfile, updateLearningPath } = useProfile();

  const handleStatClick = (statType) => {
    console.log(`Clicked on ${statType} stat`);
    // Add navigation or detailed view logic here
  };

  const handlePathClick = (path) => {
    console.log(`Clicked on learning path: ${path.title}`);
    // Navigate to path details or continue learning
  };

  const handleActivityAction = (activity) => {
    console.log(`Action for activity: ${activity.text}`);
    // Handle activity-specific actions
  };

  const handleCertificateView = (certificate) => {
    console.log(`Viewing certificate: ${certificate.title}`);
    // Open certificate viewer or download
  };

  return (
    <PageWrapper>
      <Sidebar />
      <ProfileContainer>
        <ProfileHeader
          profile={profileData}
          onUpdateProfile={updateProfile}
        />

        <StatsCards
          profile={profileData}
          onStatClick={handleStatClick}
        />

        <LearningPath
          paths={profileData.learningPaths}
          onPathClick={handlePathClick}
          onUpdateProgress={updateLearningPath}
        />

        <RecentActivity
          activities={profileData.recentActivities}
          onActivityAction={handleActivityAction}
        />

        <Certificates
          certificates={profileData.certificates}
          onCertificateView={handleCertificateView}
        />
      </ProfileContainer>
    </PageWrapper>
  );
};

export default StudentProfilePage;
