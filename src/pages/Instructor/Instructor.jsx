// 📁 src/pages/Instructor.jsx
import React from 'react';
import './instructor.css';
import { Card} from 'react-bootstrap';
import Sidebar from '../../components/Layout/Sidebar';
import DashboardCoursesAnalytics from '../../components/Dasboard/Instructor/DashboardCoursesAnalytics ';

const Instructor = () => {
  return (
    <div className="page instructor-page ">
      <Sidebar/>
      <main className="main-content">
        <h2>Welcome back, Jonathan!</h2>
        <div className="summary-cards">
          {["Courses", "Students", "Rating", "Revenue"].map((title, i) => (
            <Card key={i} className='card-background'>
              <Card.Body>
                <Card.Title className='text-white'>{title}</Card.Title>
                <Card.Text className='p'>Value {i + 1}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>

        <DashboardCoursesAnalytics/>
      </main>
    </div>
  );
};

export default Instructor;