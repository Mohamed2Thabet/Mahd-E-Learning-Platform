import { Row, Col, Button } from 'react-bootstrap'
import {
  FiCheck,
  FiLinkedin,
  FiTwitter,
  FiGlobe
} from 'react-icons/fi'

const ProfileHeader = () => {
  return (
    <Row className="py-4">
      <Col md={3} className="text-center text-md-start">
        <div className="instructor-avatar d-inline-block">
          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
            alt="David Anderson"
            className="img-fluid"
          />
        </div>
      </Col>
      <Col md={9}>
        <div className="d-flex align-items-center mb-2">
          <h1 className="mb-0">David Anderson</h1>
          <FiCheck className="verified-badge" size={22} />
        </div>
        <h5 className=" mb-3">UI/UX Designer & Instructor</h5>
        <p className="mb-3 ">
          Award-winning designer with 10+ years of experience in digital product
          design. Passionate about teaching and helping others master the craft of
          UI/UX design.
        </p>
        <div className="d-flex align-items-center mb-3 ">
          <a href="#" className="social-icon"><FiLinkedin /></a>
          <a href="#" className="social-icon"><FiTwitter /></a>
          <a href="#" className="social-icon"><FiGlobe /></a>
        </div>
        <Button variant="primary" className="px-4">
          Message Instructor
        </Button>
      </Col>
    </Row>
  )
}

export default ProfileHeader