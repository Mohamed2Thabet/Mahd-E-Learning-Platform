import React from "react";
import { Button, Container, Card } from "react-bootstrap";

const WelcomeScreen = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100  ">
      <Card className="text-center p-5 border-0 bg-transparent" >
      <div className="logo mb-4">
        <span className="fs-3 text-white d-flex gap-3 justify-content-center "><img src="public/image/logo.png" alt="" width={"40px"} /> MAHD</span>
      </div>
        <div className="mb-3 position-relative">
          <img className="position-relative" style={{ bottom: "-40px", left: "10px" }} src="public/image/star.svg" alt=""/>
          <img src="public/image/yes.svg" alt=""/>
          <img className="position-relative" style={{ top: "-40px" ,right: "10px"}} src="public/image/star.svg" alt=""/>
        </div>
        <h2 className="text-white">Welcome to MAHD!</h2>
        <p className="text-success">Your account has been successfully created.</p>
        <p className="p">To get started, explore our courses and personalize your learning experience.</p>
      <Button className="w-100 py-2 my-4 fw-bold  glow-button rounded-5" variant="success">
          Go to Dashboard
                  </Button>
        <Button className="w-100 py-2 fw-bold  rounded-5" variant="outline-success">
          Complete Your Profile
        </Button>
      </Card>
    </Container>
  );
};

export default WelcomeScreen;
