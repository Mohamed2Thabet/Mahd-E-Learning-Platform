import { Card, Button } from 'react-bootstrap'
import { FiStar } from 'react-icons/fi'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const CoursesSection = () => {
  const [courses] = useState([
    {
      id: 1,
      title: 'Mastering UI/UX Design with Figma',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      rating: 4.9,
      lessons: 24,
      category: 'Design'
    },
    {
      id: 2,
      title: 'Design Systems Fundamentals',
      image: 'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg',
      rating: 4.8,
      lessons: 18,
      category: 'Design'
    },
    {
      id: 3,
      title: 'Advanced Prototyping Techniques',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      rating: 4.9,
      lessons: 22,
      category: 'Design'
    }
  ])

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Courses by David</h2>
        <a href="#" className="text-primary">View All Courses</a>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          }
        }}
        className="courses-swiper"
      >
        {courses.map(course => (
          <SwiperSlide key={course.id}>
            <Card className="h-100 card-hover">
              <img
                src={course.image}
                className="course-image"
                alt={course.title}
              />
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <div className="ratings me-2">
                    <FiStar className="me-1" fill="#ffc107" stroke="#ffc107" />
                    <span>{course.rating}</span>
                  </div>
                  <small className="text-muted">{course.lessons} Lessons</small>
                </div>
                <Card.Title>{course.title}</Card.Title>
                <Button variant="primary" className="w-100 mt-3">
                  Enroll Now
                </Button>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CoursesSection