import { Container, Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../Landing//TestimonialSection.css'; 

const courses = [
  {
    id: 1,
    title: 'Mastering UI/UX Design with Figma',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    rating: 4.9,
    lessons: 24
  },
  {
    id: 2,
    title: 'Design Systems Fundamentals',
    image: 'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg',
    rating: 4.8,
    lessons: 18
  },
  {
    id: 3,
    title: 'Advanced Prototyping Techniques',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    rating: 4.9,
    lessons: 22
  },
  {
    id: 4,
    title: 'Advanced Prototyping Techniques',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    rating: 4.9,
    lessons: 22
  },
  {
    id: 5,
    title: 'Advanced Prototyping Techniques',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    rating: 4.9,
    lessons: 22
  },
];

const CoursesSection = () => {
  return (
    <section className="testimonial-section py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white mb-4">Top Rated Courses</h2>
        </div>

        <div className="position-relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination'
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              992: { slidesPerView: 3 }
            }}
            className="testimonial-swiper"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <div className="testimonial-card">
                  <div className="testimonial-image-wrapper mb-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="testimonial-image"
                    />
                  </div>
                  <h3 className="testimonial-name mb-2">{course.title}</h3>
                  <p className="testimonial-text text-white-50 mb-2">
                    <FaStar className="me-1 text-warning" />
                    {course.rating} &nbsp;•&nbsp; {course.lessons} Lessons
                  </p>
                  <Button variant="primary" className="rounded-pill px-4 mt-2">
                    Enroll Now
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-prev">
            <FaArrowLeft />
          </div>
          <div className="swiper-button-next">
            <FaArrowRight />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Container>
    </section>
  );
};

export default CoursesSection;
