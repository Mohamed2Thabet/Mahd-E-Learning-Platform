import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

const ThankYouScreen = () => {
  return (
    <Container className="text-center  vh-100 d-flex  justify-content-center align-items-center">
      <Card className=" boxshadowBg text-white d-flex gap-3 justify-content-center align-items-center" style={{ backgroundColor: "#181D19", width: "580px", height: "606px" ,padding:"40px"}}>
        <div className="mb-3">
          <FaCheckCircle size={60} color="#01FE84" />
        </div>
        <h2 className="fw-bold">Thank You!</h2>
        <p className="p">
          Your responses will help us personalize your learning journey and provide you with the most relevant content and recommendations. We're excited to help you achieve your goals!
        </p>
<Button className="w-100 py-2 fw-bold glow-button rounded-5" variant="success">
          <NavLink to="/" className="text-white text-decoration-none">
            Back to Homepage
          </NavLink>
            </Button>        <p className="mt-3 p">
          📩 We'll send you a confirmation email shortly
        </p>
        <div className="mt-3 justify-content-center p-4 d-flex gap-3 " style={{ borderTop:"1px solid #313631"}} >
        <span>Help Center</span>  <span>Contact Support</span>
      </div>
      </Card>
    </Container>
  );
};

export default ThankYouScreen;
