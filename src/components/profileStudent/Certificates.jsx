import { Card, Col, Row } from "react-bootstrap";
import { FaCertificate } from "react-icons/fa";
import styled from "styled-components";

const Certificates = () => (
  <>
    <SectionTitle>Certificates</SectionTitle>
    <Row>
      <Col md={6}><CertificateCard><p><FaCertificate color="lime" /> UI/UX Fundamentals<br /><small>Completed on Apr 15, 2025</small></p></CertificateCard></Col>
      <Col md={6}><CertificateCard><p><FaCertificate color="lime" /> Design Thinking<br /><small>Completed on Dec 20, 2024</small></p></CertificateCard></Col>
    </Row>
  </>
);
export default Certificates;
const CertificateCard = styled(Card)`
  background-color: var(--card-background);
  color: white;
  border: none;
  padding: 1rem;
`;
const SectionTitle = styled.h5`
  margin-top: 2rem;
  color: white;
`;
