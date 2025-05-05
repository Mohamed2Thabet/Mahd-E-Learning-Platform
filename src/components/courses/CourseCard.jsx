import { Card, Button } from 'react-bootstrap';
import { FaStar, FaClock } from 'react-icons/fa';
import { useState } from 'react';

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="h-100 border-0 shadow-sm"
      style={{
        backgroundColor: '#1E1E1E',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="card-img-top rounded-top"
        style={{
          height: '160px',
          backgroundImage: `url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div
            className="rounded-circle me-2 overflow-hidden"
            style={{ width: '36px', height: '36px' }}
          >
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-100 h-100 object-fit-cover"
            />
          </div>
          <div>
            <small className="text-white-50 d-block">{course.instructor.name}</small>
            <small className="text-white-50">{course.instructor.title}</small>
          </div>
        </div>

        <Card.Title className="mb-3" style={{ fontSize: '1.1rem' }}>
          {course.title}
        </Card.Title>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <FaStar className="text-primary me-1" />
              <span className="fw-bold me-1">{course.rating}</span>
              <small className="text-white-50">({course.students})</small>
            </div>
            <div className="d-flex align-items-center">
              <FaClock className="text-white-50 me-1" size={14} />
              <small className="text-white-50">{course.duration} Hours</small>
            </div>
          </div>

          <Button
            variant="primary"
            className="w-100 rounded-pill fw-bold"
            style={{
              transition: 'all 0.2s ease',
              transform: isHovered ? 'scale(1.03)' : 'scale(1)'
            }}
          >
            Enroll Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CourseCard;
