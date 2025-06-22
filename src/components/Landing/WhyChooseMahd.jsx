import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaChalkboardTeacher,
  FaInfinity,
  FaGamepad,
  FaGlobeAmericas
} from 'react-icons/fa';

const Section = styled.section`
  background: var(--background-dark);
  padding: 5rem 0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: var(--heading-color);
`;

const StyledCard = styled.div`
  background: var(--card-background);
  border: none;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  height: 100%;
`;

const IconWrapper = styled.div`
  color: var(--primary);
  margin-bottom: 1rem;
`;

const CardTitle = styled.h5`
  color: var(--heading-color);
`;

const CardText = styled.p`
  color: var(--text-secondary);
`;

const WhyChooseMahd = () => {
  const features = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience",
      icon: <FaChalkboardTeacher size={40} />
    },
    {
      title: "Lifetime Access",
      description: "Study at your own pace with unlimited access to courses",
      icon: <FaInfinity size={40} />
    },
    {
      title: "Gamified Learning",
      description: "Earn badges and certificates as you progress",
      icon: <FaGamepad size={40} />
    },
    {
      title: "Global Community",
      description: "Connect with learners from around the world",
      icon: <FaGlobeAmericas size={40} />
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Why Choose MAHD?</Title>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3} className="mb-4">
              <StyledCard>
                <IconWrapper>{feature.icon}</IconWrapper>
                <CardTitle>{feature.title}</CardTitle>
                <CardText>{feature.description}</CardText>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
};

export default WhyChooseMahd;
