import { Button, Card, Col, Row } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import styled from "styled-components";

const ProfileHeader = () => (
  <HeaderCard>
    <Row className="align-items-center">
      <Col md="auto">
        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="rounded-circle"
          width={80}
          height={80}
        />
      </Col>
      <Col>
        <h5>Jonathan Lerid G</h5>
        <p className="p">UI/UX Designer • Egypt</p>
      </Col>
      <Col xs="auto">
        <Button variant="success">
          <FaUserEdit /> Edit Profile
        </Button>
      </Col>
    </Row>
  </HeaderCard>
);
export default ProfileHeader;
const HeaderCard = styled(Card)`
  background-color: var(--card-background);
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;
