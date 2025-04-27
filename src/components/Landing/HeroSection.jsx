import { Container, Row, Col, Button } from 'react-bootstrap';
import "./heroSection.css"
const HeroSection = () => {
  return (
    <div className="hero-section  text-white py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className=' d-flex align-content-around flex-column'>
            <h1 className="display-4 fw-bold">
              Transform Your Future Through Modern Education
            </h1>
            <p className="p mt-4">
              Access world-class courses, expert instructors, and a collaborative learning community - all in one platform.
            </p>
            <div className="mt-4 d-flex gap-3">
              <Button variant="success" size="lg">Get Started</Button>
              <Button variant="outline-success" size="lg">Explore Courses</Button>
            </div>
          </Col>

          <Col md={6} className="text-center fog">
            <img
              src="image/landing-illustration.png"
              alt="Learning illustration"
              className="img-fluid"
            />
            <div className="stats-box bg-success text-white p-3 rounded mt-4 d-flex justify-between align-items-center " >
              <img src="public/image/study.png" alt=""/>
              <div>
                <p className="mb-0">Active Students</p>
                <h3>10,000+</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
