import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 ">
      <Card className="p-4 text-center border-0  mainBgColor boxshadowBg"  style={{ width: "450px", borderRadius: "20px" }}>
        <div className="logo ">
          <span className="fs-3 text-white d-flex gap-3 justify-content-center "><img src="public/image/logo.png" alt="" width={"40px"} /> MAHD</span>
        </div>

        {/* Heading */}
        <h4 className="fw-bold text-white my-4">Forgot your password?</h4>
        <p className="p">
          Enter your email address, and we'll send you a link to reset your password.
        </p>

        {/* Input Field */}
        <Form.Group className="my-3 ">
          <div className="input-group">
            <Form.Control type="email" placeholder="Enter your email" />

          </div>
        </Form.Group>

    
  <Button className="w-100 py-2 my-2 fw-bold glow-button rounded-5" variant="success">
          Send Reset Link
            </Button>
        {/* Back to Sign In */}
        <div className="mt-3">
          <FaArrowLeft className="text-success me-2" />
          <Link to="/signin" className="text-success text-decoration-none">Back to Sign In</Link>
        </div>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
