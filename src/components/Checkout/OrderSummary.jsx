import styled from "styled-components";
import { shake, slideInLeft } from "../common/Animations";
import { FaTrash } from "react-icons/fa";

const OrderSummary = ({ course, onDeleteCourse }) => (
  <SummaryCard>
    <h3 style={{ color: 'var(--heading-color)', marginBottom: '24px', fontWeight: '700' }}>
      Order Summary
    </h3>
    <CourseInfo>
      <CourseImage src={course.image} alt={course.title} />
      <CourseDetails>
        <CourseTitle>{course.title}</CourseTitle>
        <CourseInstructor>By {course.instructor.name}</CourseInstructor>
        <CourseDescription>{course.description}</CourseDescription>
      </CourseDetails>
      <DeleteButton onClick={onDeleteCourse} aria-label="Remove course from cart">
        <FaTrash />
        Remove
      </DeleteButton>
    </CourseInfo>
  </SummaryCard>
);

export default OrderSummary;


// --- Order Summary Components ---
const SummaryCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 32px;
  background: var(--background-dark);
  position: relative;
  overflow: hidden;
  animation: ${slideInLeft} 0.8s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), transparent);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const CourseInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  position: relative;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const CourseImage = styled.img`
  width: 140px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid var(--border-color);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: var(--primary);
  }

  @media (max-width: 576px) {
    width: 200px;
    height: 120px;
  }
`;

const CourseDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CourseTitle = styled.h4`
  color: var(--heading-color);
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
`;

const CourseInstructor = styled.p`
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
`;

const CourseDescription = styled.p`
  color: var(--text-secondary);
  margin: 8px 0 0 0;
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 8px;
  color: #f44336;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(244, 67, 54, 0.2);
    border-color: #f44336;
    transform: translateY(-2px);
    animation: ${shake} 0.5s ease-in-out;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 576px) {
    position: static;
    margin-top: 16px;
    align-self: center;
  }
`;