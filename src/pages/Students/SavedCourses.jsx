import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar, FaTimes } from 'react-icons/fa';
import Sidebar from '../../components/Layout/Sidebar';
import CourseCard from '../../components/Landing/CourseCard';
import styled from 'styled-components';
import { coursesData } from '../../data/coursesData';

const SavedCourses = () => {
  return (
    <PageContainer>
      <Sidebar />
      <ContentWrapper>
        <HeaderSection>
          <h2>
            Saved Courses <span className="p">(12)</span>
          </h2>
          <FilterControls>
            <select className="form-select">
              <option>Most Recent</option>
            </select>
            <select className="form-select">
              <option>All Categories</option>
            </select>
          </FilterControls>
        </HeaderSection>

        <CourseList>
          {coursesData.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </CourseList>
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
    margin-left:80px;
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;
