import HeroSection from "../components/Landing/HeroSection";
import PopularCourses from "../components/Landing/PopularCourses";
import TestimonialSection from "../components/Landing/TestimonialSection";
import WhyChooseMahd from "../components/Landing/WhyChooseMahd";
import Footer from "../components/Layout/Footer";

const Home = () => {
  return (
    <div className="background-dark">
      <HeroSection />
      <PopularCourses />
      <WhyChooseMahd />
      {/* <Testimonials /> */}
      <TestimonialSection/>
      <Footer/>
    </div>
  );
}

export default Home;
