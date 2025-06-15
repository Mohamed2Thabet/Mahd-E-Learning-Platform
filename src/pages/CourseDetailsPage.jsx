import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import {
FaPlayCircle, FaFileAlt, FaInfinity, FaMobileAlt, FaTrophy,

} from 'react-icons/fa';
import CourseContent from '../components/CourseDetails/CourseContent';
import CourseHeader from '../components/CourseDetails/CourseHeader';
import WhatYouWillLearn from '../components/CourseDetails/WhatYouWillLearn';
import CoursePurchaseBox from '../components/CourseDetails/CoursePurchaseBox';

// Sample Data
const courseData = {
  title: 'The Complete 2025 Web Development Bootcamp',
  subtitle: 'Become a Full-Stack Web Developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps',
  rating: 4.7,
  reviewsCount: 342180,
  studentsCount: 1250000,
  instructor: { name: 'Dr. Angela Yu', title: 'Developer and Lead Instructor' },
  lastUpdated: 'May 2025',
  language: 'English',
  subtitles: ['English', 'Spanish', 'French'],
  price: 89.99,
  discountPrice: 14.99,
  videoPreviewUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=300&fit=crop',
  learningOutcomes: [
    'Build 16 web development projects for your portfolio.',
    'Master frontend development with React.',
    'Master backend development with Node.js and Express.',
    'Learn professional developer best practices.',
  ],
  includes: [
    { icon: FaPlayCircle, text: '65.5 hours on-demand video' },
    { icon: FaFileAlt, text: '80 articles' },
    { icon: FaInfinity, text: 'Full lifetime access' },
    { icon: FaMobileAlt, text: 'Access on mobile and TV' },
    { icon: FaTrophy, text: 'Certificate of completion' },
  ],
  curriculum: [
    {
      title: 'Module 1: Frontend Development',
      duration: '8 hours',
      lessons: ['Introduction to HTML5', 'Advanced CSS and Sass', 'JavaScript for Beginners']
    },
    {
      title: 'Module 2: Advanced JavaScript',
      duration: '12 hours',
      lessons: ['ES6+ Features', 'Asynchronous JavaScript', 'DOM Manipulation']
    },
    {
      title: 'Module 3: Backend with Node.js & Express',
      duration: '15 hours',
      lessons: ['Introduction to Node.js', 'Building APIs with Express', 'Working with Databases']
    },
    {
      title: 'Module 4: React Masterclass',
      duration: '20 hours',
      lessons: ['React Basics & Hooks', 'State Management with Redux', 'Building a Full-Stack MERN App']
    }
  ]
};



// Main Component
const CourseDetailsPage = () => {
  return (
    <>
      <PageWrapper>
        <CourseHeader {...courseData} />
        <Container>
          <Row>
            <Col lg={8}>
              <WhatYouWillLearn outcomes={courseData.learningOutcomes} />
              <CourseContent curriculum={courseData.curriculum} />
            </Col>
            <Col lg={4}>
              <CoursePurchaseBox {...courseData} />
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    </>
  );
};

export default CourseDetailsPage;
// Styled Components - Base
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--background-dark);
  color: var(--text-light);
`;