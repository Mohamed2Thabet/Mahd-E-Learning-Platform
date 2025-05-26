import { Form } from "react-bootstrap";

const PrivacyControls = () => {
  return (
    <div className="mb-4">
      <h5>Privacy Controls</h5>
      <Form.Check type="switch" label="Show profile to other users" />
      <Form.Check type="switch" label="Allow course activity on leaderboards" />
      <Form.Check type="switch" label="Allow messages from other students" />
      <Form.Check type="switch" label="Receive promotional emails" />
    </div>
  );
};

export default PrivacyControls;
