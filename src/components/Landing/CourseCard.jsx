import { Card, Button } from 'react-bootstrap';
import { FaStar, FaUsers } from 'react-icons/fa';

const CourseCard = ({ image, title, description, instructor, role, rating, reviews, students, price, free }) => {
  return (
    <Card className=" text-white card-background">
      <div className="position-relative">
        <Card.Img variant="top" src={image} className="rounded-top" />
        <span className={`position-absolute top-0 end-0 m-2 badge rounded-pill ${free ? 'bg-success' : 'bg-info'}`}>
          {free ? 'Free' : `$${price}`}
        </span>
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="p">{description}</Card.Text>

        <div className="d-flex align-items-center gap-2 mt-3">
          <img src={instructor} alt="instructor" className="rounded-circle" width="35" height="35" />
          <div>
            <strong className='p'>{role}</strong>
            <div className="p small">{role}</div>
          </div>
        </div>

        <div className="d-flex justify-content-between p mt-3">
          <div><FaStar className="text-success" /> {rating} ({reviews})</div>
          <div><FaUsers /> {students} students</div>
        </div>

        <Button variant="dark" className="w-100 mt-3 border border-success text-success fw-bold">
          Enroll Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
