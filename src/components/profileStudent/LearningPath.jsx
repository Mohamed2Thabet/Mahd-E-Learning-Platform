import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { FaGraduationCap } from "react-icons/fa";
import styled from "styled-components";

const LearningPath = () => (
  <>
    <SectionTitle>Current Learning Path</SectionTitle>
    <Row>
      <Col md={4}><LearningCard><Card.Body><p><FaGraduationCap /> UI/UX Fundamentals</p><ProgressBar now={75} variant="success" label="75%" /></Card.Body></LearningCard></Col>
      <Col md={4}><LearningCard><Card.Body><p><FaGraduationCap /> Advanced Design Systems</p><ProgressBar now={50} variant="success" label="50%" /></Card.Body></LearningCard></Col>
      <Col md={4}><LearningCard><Card.Body><p><FaGraduationCap /> Frontend Development</p><ProgressBar now={25} variant="success" label="25%" /></Card.Body></LearningCard></Col>
    </Row>
  </>
);
export default LearningPath;
const LearningCard = styled(Card)`
  background-color: var(--card-background);
  color: white;
  border: none;
  padding: 1rem;
  margin-bottom: 1rem;
`;
const SectionTitle = styled.h5`
  margin-top: 2rem;
  color: white;
`;
