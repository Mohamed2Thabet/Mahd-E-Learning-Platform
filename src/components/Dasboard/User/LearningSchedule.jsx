import React from 'react';
import { Card, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { BsCalendar3, BsClock, BsCheckCircleFill } from 'react-icons/bs';

const LearningSchedule = () => {
  return (
    <div className="p-4">
      <Row>
        {/* Learning Schedule */}
        <Col md={8}>
          <h5 className="p">Learning Schedule <span className="float-end text-success" style={{ cursor: 'pointer' }}>View Calendar</span></h5>
          <Card  text="white" className="mt-3 card-background ">
            <ListGroup variant="flush" >
              <ListGroup.Item className="text-white card-background ">
                <BsCheckCircleFill className="text-success me-2" />
                <strong>UI/UX Design Workshop</strong> <span className="float-end">7PM</span>
              </ListGroup.Item>
              <ListGroup.Item className="card-background  text-white">
                <BsCalendar3 className="me-2" />
                <strong>Logo Design Session</strong> <span className="float-end">Tomorrow - 9:00 AM</span>
              </ListGroup.Item>
              <ListGroup.Item className="card-background  text-white">
                <BsClock className="me-2" />
                <strong>Motion Graphics Class</strong> <span className="float-end">June 15, 2025 - 3:00 PM</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Achievements */}
        <Col md={4}>
          <h5 className="p">Achievements</h5>
          <Card text="white" className="mt-3 text-center p-3 card-background ">
            <Badge bg="success" className="mb-2 px-3 py-2 fs-6">5 Day Streak</Badge>
            <Row>
              <Col>
                <h4>250</h4>
                <small className="p">Points</small>
              </Col>
              <Col>
                <h4>3</h4>
                <small className="p">Badges</small>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LearningSchedule;
