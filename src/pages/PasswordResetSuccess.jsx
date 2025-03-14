import React from "react";
import { Card, Button } from "react-bootstrap";

const PasswordResetSuccess = () => {
  return (
    <div className="d-flex justify-content-center  align-items-center vh-100">
      <Card className="text-center  boxshadowBg  p-4" style={{ width: "350px", backgroundColor: "#111", color: "#fff", borderRadius: "10px" }}>
        <div className="logo mb-2">
          <span className="fs-3 fw- d-flex gap-3 justify-content-center "><img src="public/image/logo.png" alt="" width={"40px"} /> MAHD</span>
        </div>
        <div className="mb-3 d-flex align-item-center justify-content-center mx-auto" style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor:"#01FE841A"}}>
          <img src="public/image/yes.svg" alt="" width={"50px"}/>
        </div>
        <h5>Your password has been reset successfully!</h5>
        <p className="p">You can now use your new password to log in to your account.</p>
        <Button variant="success" className="w-100 rounded-5">Go to Sign In</Button>
        <p className="mt-3">
          <a href="#" className="text-success">Need help? Contact Support</a>
        </p>
      </Card>
    </div>
  );
};

export default PasswordResetSuccess;
