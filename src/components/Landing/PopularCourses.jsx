import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import CourseCard from './CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalTop5 } from '../../store/recommendationSlice';
import { useNavigate } from 'react-router-dom';

const PopularCourses = () => {
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const { top5: courses, loading, error } = useSelector((state) => state.recommendation);
  useEffect(() => {
    dispatch(fetchGlobalTop5()); // أو fetchUserTop5()
  }, [dispatch]);
  console.log(courses)
  return (
    <Section>
      <Container>
        <Title>Popular Courses</Title>
        <Subtitle>Start your learning journey with our most in-demand courses</Subtitle>

        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {courses.map((course) => (
            <SwiperSlide key={course._id}>
              <CourseCard {...course} />
            </SwiperSlide>
          ))}
        </Swiper>

        <ButtonWrapper>
          <StyledButton variant="success" size="lg" onClick={() => navigate('/courses')}>
            View All Courses
          </StyledButton>
        </ButtonWrapper>
      </Container>
    </Section>
  );
};

export default PopularCourses;
const Section = styled.section`
  background-color: var(--background-dark);
  color: var(--text-light);
  padding: 5rem 0;
`;

const Title = styled.h2`
  color: var(--heading-color);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const StyledButton = styled(Button)`
  background-color: var(--primary);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: var(--primary-dark);
  }
`;
