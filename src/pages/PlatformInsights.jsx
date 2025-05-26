// pages/PlatformInsights.js

import { FaUsers, FaUserCheck, FaGraduationCap } from 'react-icons/fa';
import StatCard from '../components/PlatformInsight/StatCard';
import UserActivityChart from '../components/PlatformInsight/UserActivityChart';
import TopCoursesTable from '../components/PlatformInsight/TopCoursesTable';
import SideBarAdmin from '../components/PlatformInsight/SideBarAdmin';
import styled from 'styled-components';

export default function PlatformInsights() {
  return (
    <div className="background-dark min-vh-100" >
      <div className="d-flex flex-column flex-md-row">
        {/* Sidebar */}
        <SideBarAdmin />

        {/* Main Content */}
        <MainContent>

          <h3 >Platform Insights</h3>
          <p >Monitor platform performance and user engagement</p>

          {/* Stat Cards */}
          <div className="row ">
            <div className="col-12 col-sm-6 col-lg-4 mb-4">
              <StatCard title="Total Users" value="24,892" growth="12.5" icon={<FaUsers />} />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-4">
              <StatCard title="Active Users" value="8,451" growth="8.2" icon={<FaUserCheck />} />
            </div>
            <div className="col-12 col-sm-6 col-lg-4 mb-4">
              <StatCard title="Course Completion" value="76.4%" growth="5.3" icon={<FaGraduationCap />} />
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="mb-4">
            <UserActivityChart />
          </div>
          <div>
            <TopCoursesTable />
          </div>
        </MainContent>
      </div>
    </div>
  );
}

const MainContent = styled.div`
  margin-left: 0;
  margin-top: 70px;
  padding: 1rem;
  flex-grow: 1;
  @media (min-width: 768px) {
    margin-left: 250px;
  }
`;
