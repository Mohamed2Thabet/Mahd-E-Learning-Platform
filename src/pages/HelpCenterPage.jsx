import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FaSearch, FaPlay, FaUserCog, FaMoneyBill, FaBook, FaTools, FaBug } from 'react-icons/fa';
import HelpCenterCard from '../components/HelpCenter/HelpCenterCard';
import PopularArticles from '../components/HelpCenter/PopularArticles';
import ArticleCard from '../components/HelpCenter/ArticleCard';

const categories = [
  { title: 'Getting Started', description: 'Learn the basics and get started with MAHD', icon: <FaPlay /> },
  { title: 'Account & Settings', description: 'Manage your account preferences & settings', icon: <FaUserCog /> },
  { title: 'Billing & Payments', description: 'Information about payments and subscriptions', icon: <FaMoneyBill /> },
  { title: 'Course Access', description: 'Learn about accessing and tracking courses', icon: <FaBook /> },
  { title: 'Instructor Tools', description: 'Resources for course creators and instructors', icon: <FaTools /> },
  { title: 'Technical Issues', description: 'Solutions for common technical problems', icon: <FaBug /> },
];

const StyledSearch = styled(InputGroup)`
  background-color: #2b2b2b;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
`;

const HelpCenterPage = () => {
  return (
  <div className='background-dark min-vh-100'>
      <Container className="text-white py-5" >
        <h2 className="text-center mb-3">Help Center</h2>
        <p className="text-center text-muted mb-4">Find answers to your questions and learn how to get the most out of MAHD</p>
    
        <StyledSearch>
          <FormControl placeholder="Search articles, questions, or topics..." className="bg-dark text-white border-0" />
          <Button variant="success">
            <FaSearch />
          </Button>
        </StyledSearch>
    
        <Row className="g-4">
          {categories.map((item, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <HelpCenterCard icon={item.icon} title={item.title} description={item.description} />
            </Col>
          ))}
        </Row>
        
        <PopularArticles/>
    

      </Container>
  </div>
  );
};

export default HelpCenterPage;
