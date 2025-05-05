import React from 'react';
import { FaStar } from 'react-icons/fa';

const CourseCard = ({ title, instructor, duration }) => (
  <div className="card bg-dark text-white">
    <div className="card-body">
      <h5>{title}</h5>
      <p>{instructor}</p>
      <div className="d-flex justify-content-between">
        <span><FaStar className="text-success" /> 4.8</span>
        <span>{duration}</span>
      </div>
      <button className="btn btn-success mt-2">Enroll Now</button>
    </div>
  </div>
);

export default CourseCard;
