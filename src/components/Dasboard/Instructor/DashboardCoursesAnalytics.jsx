// components/DashboardCoursesAnalytics.jsx
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Analytics from './Analytics';
import useCourses from '../../hooks/useCourses';
import VeiwCourses from './VeiwCourses';

// ✅ Animations
const fadeInUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

// ✅ Main Container
const Container = styled.div`
    padding: clamp(1rem, 3vw, 2rem);
    background-color: var(--background-dark);
    min-height: 100vh;
    animation: ${css`${fadeInUp} 0.8s ease-out`};

    @media (max-width: 768px) {
      padding: 1rem 0.5rem;
    }
  `;

// ✅ Main Component
const DashboardCoursesAnalytics = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();

  // Analytics data (can be computed from courses or fetched separately)
  const analyticsData = {
    courseViews: { value: 123, progress: 100 },
    newEnrollments: { value: courses.reduce((total, course) => total + course.students, 0), progress: 89 },
    completionRate: { value: 76, progress: 76 }
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <VeiwCourses
            courses={courses}
            onAdd={addCourse}
            onUpdate={updateCourse}
            onDelete={deleteCourse}
          />
        </Col>

        <Col md={4}>
          <Analytics data={analyticsData} />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardCoursesAnalytics;
