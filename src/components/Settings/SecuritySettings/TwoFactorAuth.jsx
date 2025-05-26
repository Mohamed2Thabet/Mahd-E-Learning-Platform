import { Button } from "react-bootstrap";

const TwoFactorAuth = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h5>Two-Factor Authentication</h5>
      <Button variant="outline-success">Enable 2FA</Button>
    </div>
  );
};

export default TwoFactorAuth;
