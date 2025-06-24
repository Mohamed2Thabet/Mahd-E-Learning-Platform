import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Alert, Button } from 'react-bootstrap';
import Sidebar from '../../components/Layout/Sidebar';
import styled from 'styled-components';
import SaveUnsaveCourseCard from '../../components/SavedCourses/SaveUnsaveCourseCard';
import { fetchSavedCourses, unsaveCourse } from '../../store/studentSllice';

const SavedCourses = () => {
  const dispatch = useDispatch();
  const { savedCourses: courses, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchSavedCourses());
  }, [dispatch]);

  const handleUnsave = (courseId) => {
    dispatch(unsaveCourse(courseId)).catch(() => { });
    dispatch(fetchSavedCourses());
  };

  const renderLoading = () => (
    <CenteredContainer>
      <Spinner animation="border" variant="primary" />
      <p>Loading your saved courses...</p>
    </CenteredContainer>
  );

  const renderError = () => (
    <CenteredContainer>
      <Alert variant="danger">
        <Alert.Heading>Oops! Something went wrong</Alert.Heading>
        <p>{error}</p>
        <Button
          variant="outline-danger"
          onClick={() => dispatch(fetchSavedCourses())}
        >
          Try Again
        </Button>
      </Alert>
    </CenteredContainer>
  );

  const renderCourses = () => {
    if (!courses?.length) {
      return (
        <EmptyState>
          <h4>No saved courses yet</h4>
          <p>Start exploring courses and save the ones you're interested in!</p>
        </EmptyState>
      );
    }

    return (
      <CourseList>
        {courses.map((course) => (
          <SaveUnsaveCourseCard
            key={course._id}
            {...course}
            isSaved
            onToggleSave={handleUnsave}
          />
        ))}
      </CourseList>
    );
  };

  return (
    <PageContainer>
      <Sidebar />
      <ContentWrapper>
        <HeaderSection>
          <h2>
            Saved Courses <span className="p">({courses?.length || 0})</span>
          </h2>
        
        </HeaderSection>

        {loading
          ? renderLoading()
          : error
            ? renderError()
            : renderCourses()}
      </ContentWrapper>
    </PageContainer>
  );
};

export default SavedCourses;
const PageContainer = styled.div`
  display: flex;
  background-color: var(--background-dark);
  min-height: 100vh;
  color: white;
  padding-top: 2rem;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row;
  }

  @media (min-width: 772px) {
    margin-left: 80px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
  }
`;

const FilterControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (min-width: 576px) {
    flex-direction: row;
    margin-top: 0;
  }

  select {
    min-width: 150px;
  }
`;

const CourseList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;

  h4 {
    color: var(--heading-color);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
  }
`;
