import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer py-5">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <div className="mb-4">
              {/* <img src="image/logo.png" alt=""/> */}
            </div>
            <p className="text-white-50 mb-4">
              Your trusted platform for online learning and skill development
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-link">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-link">
                <FaInstagram />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h5 className="footer-title mb-4">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Instructors</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="footer-title mb-4">Contact Info</h5>
            <ul className="footer-contact">
              <li>
                <strong>Email:</strong>
                <a href="mailto:support@mahd.com">support@mahd.com</a>
              </li>
              <li>
                <strong>Phone:</strong>
                <a href="tel:+1(555)123-4567">+1 (555) 123-4567</a>
              </li>
              <li>
                <strong>Address:</strong>
                <span>123 Learning Street, Education City</span>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 className="footer-title mb-4">Newsletter</h5>
            <p className="text-white-50 mb-3">
              Subscribe to get updates on new courses and features
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
              />
              <button className="btn btn-primary w-100">Subscribe</button>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom text-center pt-4 mt-5 border-top border-secondary">
          <p className="mb-0 text-white-50">
            © 2025 MAHD Learning. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;