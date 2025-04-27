import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TestimonialSection.css';

const testimonials = [

  {
    id: 1,
    name: 'David Chen',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    text: 'The platform provided an excellent learning experience with practical assignments and real-world projects. The instructors were knowledgeable and always available for support.'
  },
  {
    id: 2,
    name: 'David Chen',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    text: 'The platform provided an excellent learning experience with practical assignments and real-world projects. The instructors were knowledgeable and always available for support.'
  },
  {
    id: 3,
    name: 'David Chen',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    text: 'The platform provided an excellent learning experience with practical assignments and real-world projects. The instructors were knowledgeable and always available for support.'
  },

];

const TestimonialSection = () => {
  return (
    <section className="testimonial-section py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white mb-4">What Our Students Are Saying</h2>
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
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="testimonial-image-wrapper mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-image"
                    />
                    <div className="quote-icon">
                      <FaQuoteLeft />
                    </div>
                  </div>
                  <h3 className="testimonial-name mb-3">{testimonial.name}</h3>
                  <p className="testimonial-text mb-4">{testimonial.text}</p>
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

        <div className="text-center mt-5">
          <h3 className="ready-title mb-3">Ready to Start Learning?</h3>
          <p className="text-white-50 mb-4">Join thousands of learners already learning with MAHD</p>
          <button className="btn btn-primary btn-lg rounded-pill px-5">
            Get Started Now
          </button>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSection;