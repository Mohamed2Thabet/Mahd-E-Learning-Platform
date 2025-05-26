import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FaAndroid, FaApple } from "react-icons/fa";
import { MdOutlineCastConnected } from "react-icons/md";

export default function TVConnection() {
  return (
    <Card className=" card-background text-white p-4 mb-5">
      <h5>Learn on the big screen</h5>
      <div className="d-flex gap-3 my-3">
        <Button variant="success"><FaApple className="me-2" /> Apple TV</Button>
        <Button variant="success"><FaAndroid className="me-2" /> Android TV</Button>
        <Button variant="success"><MdOutlineCastConnected className="me-2" /> Chromecast</Button>
      </div>
      <Row className="align-items-center">
        <Col md={6}>
          <Card className="bg-dark p-3">
            <h6>How to connect your TV</h6>
            <ol className="mt-3 p">
              <li>Open the MAHD app on your smart TV</li>
              <li>Go to "Device Sync"</li>
              <li>Enter the sync code shown below</li>
            </ol>
            <Form className="d-flex mt-3 gap-2">
              <Form.Control placeholder="Enter sync code" />
              <Button variant="success">Connect Device</Button>
            </Form>
          </Card>
        </Col>
        <Col md={6}>
          <img src="image/tv-screen.png" alt="TV Sync Screen" className="img-fluid rounded" />
        </Col>
      </Row>
    </Card>
  );
}