import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PasswordResetSuccess = () => {
  const navigate = useNavigate()
  return (
    <div className="d-flex justify-content-center align-items-center background-dark" style={{ minHeight: "100vh" }} data-aos="zoom-in">
      <Card className="text-center boxshadowBg card-background p-4" style={{ width: "350px", color: "#fff", borderRadius: "10px" }} data-aos="fade-up" data-aos-duration="1500">
        <div className="logo mb-2" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="300">
          <span className="fs-3 fw- d-flex gap-3 justify-content-center "><img src="image/logo.png" alt="" width={"40px"} /> MAHD</span>
        </div>
        <div className="mb-3 d-flex align-item-center justify-content-center mx-auto" style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#01FE841A" }} data-aos="fade-left" data-aos-duration="1500" data-aos-delay="400">
          <img src="image/yes.svg" alt="" width={"50px"} />
        </div>
        <h5 data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">Your password has been reset successfully!</h5>
        <p className="p" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">You can now use your new password to log in to your account.</p>
  <Button className="w-100 py-2 fw-bold glow-button rounded-5" variant="success" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="700" onClick={() => navigate('/login')}>
              Log In
            </Button>        <p className="mt-3" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="800">
          <a href="#" className="text-success">Need help? Contact Support</a>
        </p>
      </Card>
    </div>
  );
};

export default PasswordResetSuccess;
