import { Row, Col, Badge } from 'react-bootstrap'
import { FiGlobe, FiMapPin } from 'react-icons/fi'

const AboutSection = () => {
  return (
    <Row className="py-4">
      <Col md={12} lg={8}>
        <h2 className="mb-4">About the Instructor</h2>
        <p className="mb-4">
          With over a decade of experience in digital product design, I've had the privilege
          of working with some of the world's leading tech companies and startups. My approach
          to design combines user-centered methodologies with business strategy to create
          meaningful and impactful digital experiences.
        </p>
        <p>
          As an instructor, I focus on practical, real-world applications of design principles.
          My teaching philosophy emphasizes hands-on learning and project-based exercises
          that prepare students for actual work scenarios they'll encounter in their careers.
        </p>
      </Col>
      <Col md={12} lg={4}>
        <div className="card p-4 mt-4 mt-lg-0 card-background">
          <h4 className="mb-3">Expertise</h4>
          <div className="mb-3 gap-2 d-flex flex-wrap ">
            <Badge className="primary-background">UI Design</Badge>
            <Badge className="primary-background">UX Research</Badge>
            <Badge className="primary-background">Figma</Badge>
            <Badge className="primary-background">Design Systems</Badge>
            <Badge className="primary-background">Prototyping</Badge>
          </div>
          <div className="d-flex align-items-center mb-2 p">
            <FiGlobe className="me-2" />
            <span>English</span>
          </div>
          <div className="d-flex align-items-center p">
            <FiMapPin className="me-2" />
            <span>San Francisco, CA</span>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default AboutSection