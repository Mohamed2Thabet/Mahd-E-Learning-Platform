import React from "react";
import { Button, Container, Card } from "react-bootstrap";

const WelcomeScreen = () => {
  return (
    <div  className="d-flex  background-dark justify-content-center align-items-center vh-100" data-aos="fade-in">
      <Card className="text-center boxshadowBg p-5 border-0 card-background " data-aos="zoom-in" data-aos-duration="1500">
        <div className="logo mb-4" data-aos="fade-down" data-aos-duration="1500">
          <span className="fs-3 text-white d-flex gap-3 justify-content-center">
            <img src="image/logo.png" alt="" width={"40px"} /> MAHD
          </span>
        </div>
        <div className="mb-3 position-relative">
          <img className="position-relative" style={{ bottom: "-40px", left: "10px" }} src="image/star.svg" alt="" data-aos="fade-left" data-aos-duration="1500" />
          <img src="image/yes.svg" alt="" data-aos="fade-up" data-aos-duration="1500" />
          <img className="position-relative" style={{ top: "-40px", right: "10px" }} src="image/star.svg" alt="" data-aos="fade-right" data-aos-duration="1500" />
        </div>
        <h2 className="text-white" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">Welcome to MAHD!</h2>
        <p className="text-success" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400">Your account has been successfully created.</p>
        <p className="p" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">To get started, explore our courses and personalize your learning experience.</p>
        <Button className="w-100 py-2 my-4 fw-bold glow-button rounded-5" variant="success" data-aos="flip-up" data-aos-duration="1500" data-aos-delay="600">
          Go to Dashboard
        </Button>
        <Button className="w-100 py-2 fw-bold rounded-5" variant="outline-success" data-aos="flip-down" data-aos-duration="1500" data-aos-delay="700">
          Complete Your Profile
        </Button>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
