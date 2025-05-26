import { Col, Container, Row } from "react-bootstrap";
import ConnectedDevices from "../components/DownloadAppPage/ConnectedDevices";
import MobileFeatures from "../components/DownloadAppPage/MobileFeatures";
import TVConnection from "../components/DownloadAppPage/TVConnection";

export default function DownloadAppPage() {
  return (
    <div style={{ backgroundColor: '#0c0c0c', minHeight: '100vh', paddingTop: '2rem' }}>
      <Container>

        <h2 className="text-white text-center mb-3">Download the MAHD App</h2>
        <p className="text-secondary text-center mb-5">
          Access your courses anywhere. Learn on mobile, tablet, or TV with the MAHD app.
        </p>
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <MobileFeatures />
          </Col>
          <Col md={6}>
            <img src="image/mahd-mobile-app.png" alt="MAHD App Preview" className="img-fluid" />
          </Col>
        </Row>
        <TVConnection />
        <ConnectedDevices />
      </Container>
    </div>
  );
}