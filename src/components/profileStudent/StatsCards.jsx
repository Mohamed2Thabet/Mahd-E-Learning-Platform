import { Card, Col, Row } from "react-bootstrap";
import { FaBookOpen, FaCertificate, FaClock } from "react-icons/fa";
import styled from "styled-components";

const StatsCards = () => (
  <Row className="mb-4">
    <Col md={4}><StatBox><Card.Body><FaBookOpen size={24} /><h4>24</h4><p>Courses Enrolled</p></Card.Body></StatBox></Col>
    <Col md={4}><StatBox><Card.Body><FaClock size={24} /><h4>302</h4><p>Hours Learned</p></Card.Body></StatBox></Col>
    <Col md={4}><StatBox><Card.Body><FaCertificate size={24} /><h4>12</h4><p>Certifications</p></Card.Body></StatBox></Col>
  </Row>
);
export default StatsCards;
const StatBox = styled(Card)`
  background-color: var(--card-background);
  text-align: center;
  color: white;
  border: none;
`;