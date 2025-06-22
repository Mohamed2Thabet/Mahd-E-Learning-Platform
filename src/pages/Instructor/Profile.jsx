import React from 'react';
import ProfileHeader from '../../components/Dasboard/Instructor/Profile/ProfileHeader';
import AboutSection from '../../components/Dasboard/Instructor/Profile/AboutSection';
import StatsSection from '../../components/Dasboard/Instructor/Profile/StatsSection';
import CoursesSection from '../../components/Dasboard/Instructor/Profile/CoursesSection';
import ReviewsSection from '../../components/Dasboard/Instructor/Profile/ReviewsSection';
import { Container } from 'react-bootstrap';
import '../../styles/profile.css'
import { useParams } from 'react-router-dom';
const Profile = () => {
  const { userId } =useParams()
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
