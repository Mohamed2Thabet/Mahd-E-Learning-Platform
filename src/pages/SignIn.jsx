import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaGoogle, FaFacebookF, FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import "../styles/login.css";
import { NavLink, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="login-container   ">
      <div className="login-box text-center" data-aos="zoom-in">
        <div className="box">
          <div className="text-white mb-4" data-aos="fade-right">
            <div className="logo mb-2">
              <span className="fs-3 fw-bold d-flex gap-3 justify-content-center" data-aos="fade-right">
                <img src="image/logo.png" alt="Logo" width="40px" /> MAHD
              </span>
            </div>
            <h3 className="fw-bold" data-aos="fade-right">Create Account</h3>
            <p className="p" data-aos="fade-left">Sign up to get started with MAHD</p>
          </div>

          <Form className="text-white">
            <Form.Group className="mb-3" data-aos="fade-up">
              <Form.Label className="text-start w-100" >Full Name</Form.Label>
              <div className="input-group">
                <Form.Control type="text" placeholder="Enter your name" />
                <span className="input-group-text">
                  <FaUser color="white" />
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" data-aos="fade-up">
              <Form.Label className="text-start w-100" >Email</Form.Label>
              <div className="input-group">
                <Form.Control type="email" placeholder="Enter your email" />
                <span className="input-group-text">
                  <FaEnvelope color="white" />
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" data-aos="fade-up">
              <Form.Label className="text-start w-100" >Password</Form.Label>
              <div className="input-group">
                <Form.Control type={passwordVisible ? "text" : "password"} placeholder="Enter your password" />
                <button type="button" className="input-group-text border-0" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                </button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 " data-aos="fade-up">
              <Form.Label className="text-start w-100">Account Type</Form.Label>
              <Form.Select aria-label="Select account type" className="white-arrow-select">
                <option value="">Select account type</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Form.Select>
            </Form.Group>
            <Form.Check
              className="p-3 text-start"
              type="checkbox"
              id="agreeCheckbox"
              label={<label htmlFor="agreeCheckbox">I agree to receive updates and promotional emails from MAHD</label>}
              data-aos="fade-up"
            />

            <Button className="w-100 py-2 fw-bold glow-button rounded-5" variant="success" data-aos="fade-up" onClick={() => navigate('/login')}>
              Sign In
            </Button>

            <div className="my-3 p">or continue with</div>

            <div className="d-flex justify-content-center gap-3">
              <Button variant="outline-light" className="rounded-3 social-btn" data-aos="fade-right">
                <FaGoogle />
              </Button>
              <Button variant="outline-light" className="rounded-3 social-btn" data-aos="fade-left">
                <FaFacebookF />
              </Button>
            </div>

            <div className="mt-4 p">
              Already have an account?{" "}
              <NavLink to="/login" className="text-success fw-bold text-decoration-none">
                Log in
              </NavLink>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
