import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [strength, setStrength] = useState("");
  const [matchError, setMatchError] = useState("");

  const validatePasswordStrength = (password) => {
    if (password.length === 0) return ""; 

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*]/.test(password);
    const lengthValid = password.length >= 8 && password.length <= 64;

    if (!lengthValid) {
      return "Password must be between 8 and 64 characters";
    }

    if ((hasLetters && !hasNumbers && !hasSpecialChars) || (!hasLetters && hasNumbers && !hasSpecialChars)) {
      return "Weak password";
    }

    if (hasLetters && hasNumbers && !hasSpecialChars) {
      return "Medium strength";
    }

    if (hasLetters && hasNumbers && hasSpecialChars) {
      return "Strong password";
    }

    return "Weak password";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(validatePasswordStrength(newPassword));
    setMatchError(""); 
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setMatchError(""); 
  };

  const validateMatch = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  };

  const isFormValid = () => {
    return (
      strength !== "Weak password" &&
      strength !== "Password must be between 8 and 64 characters" &&
      password.length >= 8 &&
      password.length <= 64 &&
      password === confirmPassword &&
      password !== "" &&
      confirmPassword !== ""
    );
  };

  return (
    <Container className="d-flex  justify-content-center align-items-center vh-100">
      <Card className="boxshadowBg bg-transparent" style={{ width: "400px", padding: "20px", color: "white", borderRadius: "10px" }}>
        <div className="logo mb-3">
          <span className="fs-3 fw- d-flex gap-3 justify-content-center "><img src="public/image/logo.png" alt="" width={"40px"} /> MAHD</span>
        </div>
        <h4 className="text-center">Create a New Password</h4>
        <p className="text-center p" style={{ fontSize: "14px" }}>
          Your new password must be 8-64 characters long and include a number and a special character for high security.
        </p>
        <Form>
          {/* New Password Field */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="input-group-text border-0 bg-transparent"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
              </button>
            </div>
            {strength && (
              <small className={strength === "Strong password" ? "text-success" : strength === "Medium strength" ? "text-warning" : "text-danger"}>
                {strength}
              </small>
            )}
          </Form.Group>

          {/* Confirm Password Field */}
          <Form.Group className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={validateMatch}
              />
              <button
                type="button"
                className="input-group-text border-0 bg-transparent"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
              </button>
            </div>
            {matchError && <small className="text-danger">{matchError}</small>}
          </Form.Group>

          {/* Reset Password Button */}
          <Button
            className="w-100 mt-4"
            style={{ background: "#00ff88", border: "none" }}
            disabled={!isFormValid()}
          >
            Reset Password
          </Button>

          <div className="mt-3 text-center">
                    <FaArrowLeft className="text-success me-2" />
                    <Link to="/signin" className="text-success text-decoration-none">Back to Sign In</Link>
                  </div>
        </Form>
      </Card>
    </Container>
  );
};

export default PasswordReset;
