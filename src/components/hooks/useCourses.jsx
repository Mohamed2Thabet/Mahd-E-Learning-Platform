// hooks/useCourses.js
import { useState } from 'react';

// Initial courses data
const initialCourses = [
  {
    id: 1,
    title: "UI/UX Design Fundamentals",
    students: 200,
    rating: 4.5,
    price: "$59.99",
    category: "Design",
    description: "Learn the basics of user interface and user experience design"
  },
  {
    id: 2,
    title: "Advanced Web Development",
    students: 370,
    rating: 4.7,
    price: "$149.99",
    category: "Development",
    description: "Master modern web development with React and Node.js"
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    students: 180,
    rating: 4.6,
    price: "$79.99",
    category: "Marketing",
    description: "Complete guide to digital marketing strategies"
  },
];

// Hook for managing courses with add, update, delete
function useCourses() {
  const [courses, setCourses] = useState(initialCourses);

  // Add a new course
  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      students: Math.floor(Math.random() * 500) + 50,
      rating: (Math.random() * 2 + 3).toFixed(1)
    };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  // Update an existing course
  const updateCourse = (id, updatedCourse) => {
    setCourses(prev => prev.map(course =>
      course.id === id ? { ...course, ...updatedCourse } : course
    ));
  };

  // Delete a course
  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  // Get course by ID
  const getCourseById = (id) => {
    return courses.find(course => course.id === id);
  };

  return {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById
  };
}

export default useCourses;
