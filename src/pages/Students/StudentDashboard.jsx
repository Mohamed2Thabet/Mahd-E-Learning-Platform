// 📁 src/pages/Student.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card, ProgressBar, Spinner } from 'react-bootstrap';
import { FaBook, FaClock, FaCertificate, FaTrophy } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Layout/Sidebar';
import CourseCard from '../../components/Landing/CourseCard';
import LearningSchedule from '../../components/Dasboard/User/LearningSchedule';
import { fetchEnrollments } from '../../store/studentSllice';

const summaryData = [
  { title: "Courses", icon: <FaBook /> },
  { title: "Hours", icon: <FaClock /> },
  { title: "Certificates", icon: <FaCertificate /> },
  { title: "Achievements", icon: <FaTrophy /> },
];

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { enrollments, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]);

  const courses = enrollments?.data?.courses || [];
  return (
    <PageWrapper>
      <Sidebar />
      <MainContent>
        <h2>Welcome back, Jonathan!</h2>

        <SummaryCards>
          {summaryData.map((item, i) => (
            <SummaryCard key={i}>
              <Card.Body>
                <IconTitleWrapper>
                  <Icon>{item.icon}</Icon>
                  <Card.Title className="mb-0">{item.title}</Card.Title>
                </IconTitleWrapper>
                <Card.Text>{i * 24 + 1}</Card.Text>
                <ProgressBar
                  now={40 + i * 10}
                  label={`${40 + i * 10}%`}
                  className="custom-progress"
                />
              </Card.Body>
            </SummaryCard>
          ))}
        </SummaryCards>

        <h3>Current Courses</h3>

        {loading && <Spinner animation="border" />}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <CourseList>
          {courses.length > 0 ? (
            courses.map((course, index) => (
          <div>
                
                <CourseCard key={index} {...course} />
          </div>
            ))
          ) : (
            !loading && <p>No enrolled courses found.</p>
          )}
        </CourseList>

        <LearningSchedule />
      </MainContent>
    </PageWrapper>
  );
};

export default StudentDashboard;

const PageWrapper = styled.div`
  display: flex;
  background-color: var(--background-dark);
  color: var(--text-light);
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem;
  background-color: var(--background-dark);
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SummaryCard = styled(Card)`
  background-color: var(--card-background);
  color: var(--text-light);
  border: none;
  padding: 1rem;

  .card-title {
    color: var(--heading-color);
  }

  .card-text {
    color: var(--text-secondary);
  }

  .progress {
    height: 0.75rem;
    background-color: var(--border-color);
  }

  .progress-bar {
    background-color: var(--primary);
  }
`;

const IconTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Icon = styled.div`
  font-size: 1.5rem;
  color: var(--primary);
`;

const CourseList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;
