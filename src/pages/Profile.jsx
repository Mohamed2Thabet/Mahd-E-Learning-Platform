import React from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AboutSection from '../components/Profile/AboutSection';
import StatsSection from '../components/Profile/StatsSection';
import CoursesSection from '../components/Profile/CoursesSection';
import ReviewsSection from '../components/Profile/ReviewsSection';
import { Container } from 'react-bootstrap';
import '../styles/profile.css'
const Profile = () => {
  return (
    <div className='background-dark'>
      <Container>
        <ProfileHeader />
        <AboutSection />
        <StatsSection />
        <CoursesSection />
        <ReviewsSection />
      </Container>
  </div>
  );
}

export default Profile;
