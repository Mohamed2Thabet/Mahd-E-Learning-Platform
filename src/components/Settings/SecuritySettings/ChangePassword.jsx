import { Form, Button } from "react-bootstrap";

const ChangePassword = () => {
  return (
    <div className="mb-4">
      <h5>Change Password</h5>
      <Form>
        <Form.Control type="password" placeholder="Enter current password" className="mb-2" />
        <Form.Control type="password" placeholder="Enter new password" className="mb-2" />
        <Form.Control type="password" placeholder="Confirm new password" className="mb-3" />
        <Button variant="success" className="w-100 fw-bold">Update Password</Button>
      </Form>
    </div>
  );
};

export default ChangePassword;
