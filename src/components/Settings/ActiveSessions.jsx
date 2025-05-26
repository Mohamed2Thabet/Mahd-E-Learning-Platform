import { Button, Card } from "react-bootstrap";
import { FaLaptop, FaMobileAlt } from "react-icons/fa";

const ActiveSessions = () => {
  return (
    <div>
      <h5>Active Sessions & Devices</h5>
      <Card className="bg-dark text-white mb-2">
        <Card.Body className="d-flex justify-content-between">
          <div><FaLaptop /> MacBook Pro — Now</div>
          <Button variant="danger" size="sm">Log out</Button>
        </Card.Body>
      </Card>
      <Card className="bg-dark text-white mb-2">
        <Card.Body className="d-flex justify-content-between">
          <div><FaMobileAlt /> iPhone 13 — 2 hours ago</div>
          <Button variant="danger" size="sm">Log out</Button>
        </Card.Body>
      </Card>
      <Button variant="danger" className="mt-2">Log out all other sessions</Button>
    </div>
  );
};

export default ActiveSessions;
