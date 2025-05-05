import React from 'react';
import { Card, Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";

// مصفوفة الكورسات خارج الـ component
const recentCourses = [
  {
    title: "UI/UX Design Fundamentals",
    students: 200,
    rating: 4.5,
    price: "$59.99"
  },
  {
    title: "Advanced Web Development",
    students: 370,
    rating: 4.7,
    price: "$149.99"
  },
  {
    title: "Digital Marketing Mastery",
    students: 180,
    rating: 4.6,
    price: "$79.99"
  }
];

const DashboardCoursesAnalytics = () => {
  return (
    <div className='p-4'>
      <Row>
        {/* Recent Courses */}
        <Col md={8} className='card-background p-4'>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="p">Recent Courses</h5>
            <span className="text-success" style={{ cursor: 'pointer' }}>View All</span>
          </div>

          {recentCourses.map((course, index) => (
            <Card key={index} className="text-white mb-3 background-dark">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: 60, height: 60, backgroundColor: '#2a2a2a' }} />
                  <div>
                    <h6>{course.title}</h6>
                    <small className="p">{course.students} Students | ⭐ {course.rating}</small>
                  </div>
                </div>
                <div className='fs-4 d-flex gap-3'>
                  <FaEdit className="text-success mt-2" style={{ cursor: 'pointer' }} />
                  <MdDelete className="text-success mt-2" style={{ cursor: 'pointer' }} />
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Analytics */}
        <Col md={4} className='card-background p-4'>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="p">Analytics</h5>
            <span className="text-success">This Week</span>
          </div>

          <Card text="white" className="p-3 background-dark">
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Course Views</span>
                <span>123</span>
              </div>
              <ProgressBar now={100} variant="success" />
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>New Enrollments</span>
                <span>89</span>
              </div>
              <ProgressBar now={89} variant="success" />
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Completion Rate</span>
                <span>76%</span>
              </div>
              <ProgressBar now={76} variant="success" />
            </div>

            <Button variant="success" className="w-100 mt-2">View Detailed Report</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCoursesAnalytics;
