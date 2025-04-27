import { Container, Button } from 'react-bootstrap';
import CourseCard from './CourseCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const PopularCourses = () => {
  const courses = [
    {
      image: 'public/image/fullstack.png',
      title: 'UI/UX Design Masterclass',
      description: 'Master the fundamentals of user interface and experience design',
      instructor: 'public/image/mike-johnson.png',
      name: 'John Smith',
      role: 'Senior Designer',
      rating: 4.9,
      reviews: '2.5k',
      students: '15k',
      price: 99,
      free: false,
    },
    {
      image: 'public/image/fullstack.png',
      title: 'UI/UX Design Masterclass',
      description: 'Master the fundamentals of user interface and experience design',
      instructor: 'public/image/mike-johnson.png',
      name: 'John Smith',
      role: 'Senior Designer',
      rating: 4.9,
      reviews: '2.5k',
      students: '15k',
      price: 99,
      free: false,
    },
    {
      image: 'public/image/fullstack.png',
      title: 'Full-Stack Web Development',
      description: 'Build modern web applications from front to back end',
      instructor: 'public/image/mike-johnson.png',
      name: 'Mike Johnson',
      role: 'Lead Developer',
      rating: 4.8,
      reviews: '1.8k',
      students: '12k',
      price: 129,
      free: false,
    },
    {
      image: 'public/image/fullstack.png',
      title: 'Full-Stack Web Development',
      description: 'Build modern web applications from front to back end',
      instructor: 'public/image/mike-johnson.png',
      name: 'Mike Johnson',
      role: 'Lead Developer',
      rating: 4.8,
      reviews: '1.8k',
      students: '12k',
      price: 129,
      free: false,
    },
    {
      image: 'public/image/fullstack.png',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn essential digital marketing strategies and tools',
      instructor: 'public/image/mike-johnson.png',
      name: 'Sarah Williams',
      role: 'Marketing Expert',
      rating: 4.7,
      reviews: '3.2k',
      students: '20k',
      price: 0,
      free: true,
    },
    {
      image: 'public/image/fullstack.png',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn essential digital marketing strategies and tools',
      instructor: 'public/image/mike-johnson.png',
      name: 'Sarah Williams',
      role: 'Marketing Expert',
      rating: 4.7,
      reviews: '3.2k',
      students: '20k',
      price: 0,
      free: true,
    },
    {
      image: 'public/image/fullstack.png',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn essential digital marketing strategies and tools',
      instructor: 'public/image/mike-johnson.png',
      name: 'Sarah Williams',
      role: 'Marketing Expert',
      rating: 4.7,
      reviews: '3.2k',
      students: '20k',
      price: 0,
      free: true,
    },
  ];

  return (
    <section className="text-white py-5 ">
      <Container>
        <h2 className="mb-3">Popular Courses</h2>
        <p className="p">Start your learning journey with our most in-demand courses</p>

        <Swiper
          modules={[Autoplay]}
        
          loop
          autoplay={{
            delay: 1000, // 1 ثانية
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
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
