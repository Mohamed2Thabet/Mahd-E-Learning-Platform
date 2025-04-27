import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";

const ThankYouScreen = () => {
  const navigate = useNavigate()
  return (
    <div className="text-center background-dark vh-100 d-flex justify-content-center align-items-center" data-aos="fade-in">
      <Card className="boxshadowBg text-white d-flex gap-3 justify-content-center align-items-center"
        style={{ backgroundColor: "#181D19", width: "580px", height: "606px", padding: "40px" }}
        data-aos="zoom-in" data-aos-duration="1500">
        <div className="mb-3" data-aos="fade-down" data-aos-duration="1500">
          <FaCheckCircle size={60} color="#01FE84" />
        </div>
        <h2 className="fw-bold" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">Thank You!</h2>
        <p className="p" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400">
          Your responses will help us personalize your learning journey and provide you with the most relevant content and recommendations. We're excited to help you achieve your goals!
        </p>
        <Button className="w-100 py-2 fw-bold glow-button rounded-5" variant="success" data-aos="flip-up" data-aos-duration="1500" data-aos-delay="500">
          <NavLink to="/welcome-screen" className="text-white text-decoration-none">
            Back to Homepage
          </NavLink>
        </Button>
        <p className="mt-3 p" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
          📩 We'll send you a confirmation email shortly
        </p>
        <div className="mt-3 justify-content-center p-4 d-flex gap-3"
          style={{ borderTop: "1px solid #313631" }}
          data-aos="fade-up" data-aos-duration="1500" data-aos-delay="700">
          <span>Help Center</span>  <span>Contact Support</span>
        </div>
      </Card>
    </div>
  );
};

export default ThankYouScreen;
