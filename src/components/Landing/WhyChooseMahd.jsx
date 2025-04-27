import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  FaChalkboardTeacher,
  FaInfinity,
  FaGamepad,
  FaGlobeAmericas
} from 'react-icons/fa';

const WhyChooseMahd = () => {
  const features = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience",
      icon: <FaChalkboardTeacher size={40} className="text-success mb-3" />
    },
    {
      title: "Lifetime Access",
      description: "Study at your own pace with unlimited access to courses",
      icon: <FaInfinity size={40} className="text-success mb-3" />
    },
    {
      title: "Gamified Learning",
      description: "Earn badges and certificates as you progress",
      icon: <FaGamepad size={40} className="text-success mb-3" />
    },
    {
      title: "Global Community",
      description: "Connect with learners from around the world",
      icon: <FaGlobeAmericas size={40} className="text-success mb-3" />
    }
  ];

  return (
    <Container className=" py-5">
      <h2 className="text-center mb-5 text-white">Why Choose MAHD?</h2>
      <Row>
        {features.map((feature, index) => (
          <Col key={index} md={6} lg={3} className="mb-4">
            <Card className="h-100 text-center bg-transparent p-4 border-0 shadow-sm" >
              <Card.Body>
                {feature.icon}
                <Card.Title className='text-white'>{feature.title}</Card.Title>
                <Card.Text className='p'>{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WhyChooseMahd;