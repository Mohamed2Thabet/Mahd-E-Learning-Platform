import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <div className="d-flex background-dark justify-content-center align-items-center " style={{minHeight:"100vh"}}>
      <Card
        className="p-4 text-center border-0 card-background boxshadowBg"
        style={{ width: "450px", borderRadius: "20px" }}
        data-aos="zoom-in"
      >
        <div className="logo" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
          <span className="fs-3 text-white d-flex gap-3 justify-content-center">
            <img src="image/logo.png" alt="" width={"40px"} /> MAHD
          </span>
        </div>

        {/* Heading */}
        <h4 className="fw-bold text-white my-4" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400">
          Forgot your password?
        </h4>
        <p className="p" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
          Enter your email address, and we'll send you a link to reset your password.
        </p>

        {/* Input Field */}
        <Form.Group className="my-3" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
          <div className="input-group">
            <Form.Control type="email" placeholder="Enter your email" />
          </div>
        </Form.Group>

        {/* Button */}
        <Button
          className="w-100 py-2 my-2 fw-bold glow-button rounded-5"
          variant="success"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="700"
          onClick={() => navigate('/password-reset')}
        >
          Send Reset Link
        </Button>

        {/* Back to Sign In */}
        <div className="mt-3" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">
          <FaArrowLeft className="text-success me-2" />
          <Link to="/signin" className="text-success text-decoration-none">
            Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
