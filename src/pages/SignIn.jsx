import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaGoogle, FaFacebookF, FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import "../styles/login.css";
import { NavLink, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-black">
      <img src="public/image/Shape.svg" alt="" />
      <div className="login-box p-4 text-center rounded-3" data-aos="zoom-in">
        <div className="box">
          <div className="text-white mb-4" data-aos="fade-right">
            <div className="logo mb-2">
              <span className="fs-3 fw- d-flex gap-3 justify-content-center" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
                <img src="public/image/logo.png" alt="" width={"40px"} data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300" /> MAHD
              </span>
            </div>
            <h3 className="fw-bold" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">Create Account</h3>
            <p className="p" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="300">Sign up to get started with MAHD</p>
          </div>

          <Form className="text-white">
            <Form.Group className="mb-3" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="300">
              <div className="input-group">
                <Form.Label style={{ width: "100%", textAlign: "start" }}>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
                <span className="input-group-text">
                  <FaUser color="white" />
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="400">
              <div className="input-group">
                <Form.Label style={{ width: "100%", textAlign: "start" }}>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
                <span className="input-group-text">
                  <FaEnvelope color="white" />
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">
              <div className="input-group">
                <Form.Label style={{ width: "100%", textAlign: "start" }}>Password</Form.Label>
                <Form.Control type={passwordVisible ? "text" : "password"} placeholder="Enter your password" />
                <button
                  type="button"
                  className="input-group-text border-0"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                </button>
              </div>
            </Form.Group>

            <Form.Check
              className="p-3 text-start pe-auto"
              type="checkbox"
              id="agreeCheckbox"
              label={<label style={{ cursor: "pointer" }} htmlFor="agreeCheckbox">I agree to receive updates and promotional emails from MAHD</label>}
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="600"
            />

            <Button className="w-100 py-2 fw-bold glow-button rounded-5" variant="success" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="700" onClick={() => navigate('/login')}>
              Sign In
            </Button>

            <div className="my-3 p" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">or continue with</div>

            <div className="d-flex justify-content-center gap-3">
              <Button variant="outline-light" className="rounded-3 social-btn" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="900">
                <FaGoogle />
              </Button>
              <Button variant="outline-light" className="rounded-3 social-btn" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="1000">
                <FaFacebookF />
              </Button>
            </div>

            <div className="mt-4 p" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="1100">
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
