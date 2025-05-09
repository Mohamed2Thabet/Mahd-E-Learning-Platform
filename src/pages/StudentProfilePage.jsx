import styled from "styled-components";
import ProfileHeader from '../components/profileStudent/ProfileHeader'
import StatsCards from '../components/profileStudent/StatsCards'
import LearningPath from '../components/profileStudent/LearningPath'
import RecentActivity from '../components/profileStudent/RecentActivity'
import Certificates from '../components/profileStudent/Certificates'
import { Container } from "react-bootstrap";
import Sidebar from "../components/Layout/Sidebar";
const StudentProfilePage = () => {
  return (
  <div >
      <Sidebar />
      <div className="w-100 text-red">
        <ProfileContainer >
          <ProfileHeader />
          <StatsCards />
          <LearningPath />
          <RecentActivity />
          <Certificates />
        </ProfileContainer>
    </div>
  </div>
  );
};

export default StudentProfilePage;
const ProfileContainer = styled.div`
  padding: 4rem;
  color: white;
  background-color: var(--background-dark);
  transition: all 0.3s ease;

  @media (min-width: 772px) {
    margin-left: 80px;
    width: calc(100% - 80px);
  }

  @media (max-width: 771px) {
    margin-left: 0;
    width: 100%;
  }
`;
