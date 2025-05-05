import { Container, Button } from 'react-bootstrap';
import CourseCard from './CourseCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// استيراد البيانات
import courses from '../../data/coursesData';

const PopularCourses = () => {
  return (
    <section className="text-white py-5 ">
      <Container>
        <h2 className="mb-3">Popular Courses</h2>
        <p className="p">Start your learning journey with our most in-demand courses</p>

        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <CourseCard {...course} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-4">
          <Button variant="success" size="lg" className="rounded-pill px-4">
            View All Courses
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default PopularCourses;
