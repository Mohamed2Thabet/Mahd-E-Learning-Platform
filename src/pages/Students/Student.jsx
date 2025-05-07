// 📁 src/pages/Student.jsx
import React from 'react';
import './student.css';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaBook, FaClock, FaCertificate, FaTrophy } from "react-icons/fa";
import Sidebar from '../../components/Layout/Sidebar';
import courses from '../../data/coursesData';
import CourseCard from '../../components/Landing/CourseCard';

const summaryData = [
  { title: "Courses", icon: <FaBook /> },
  { title: "Hours", icon: <FaClock /> },
  { title: "Certificates", icon: <FaCertificate /> },
  { title: "Achievements", icon: <FaTrophy /> },
];
const Student = () => {
  return (
    <div className="page student-page">
      <Sidebar/>
      <main className="main-content background-dark">
        <h2>Welcome back, Jonathan!</h2>
        <div className="summary-cards">
          {summaryData.map((item, i) => (
            <Card key={i} className="summary-card text-white card-background ">
              <Card.Body>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div className='icons'>{item.icon}</div>
                  <Card.Title className="mb-0">{item.title}</Card.Title>
                </div>
                <Card.Text>{i * 24+1}</Card.Text>
                <ProgressBar now={40 + i * 10} label={`${40 + i * 10}%`} className="custom-progress" />
              </Card.Body>
            </Card>
          ))}
        </div>

        <h3>Current Courses</h3>
        <CourseList>
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </CourseList>


      <LearningSchedule/>
      </main>
    </div>
  );
};

export default Student;

import styled from "styled-components";
import LearningSchedule from '../../components/Dasboard/User/LearningSchedule';

const CourseList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
`;
