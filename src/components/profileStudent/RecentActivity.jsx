import { Card } from "react-bootstrap";
import { FaBookOpen, FaCertificate, FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";

const RecentActivity = () => (
  <>
    <SectionTitle>Recent Activity</SectionTitle>
    <ActivityCard><FaCheckCircle color="lime" /> Completed "Introduction to Design Thinking"</ActivityCard>
    <ActivityCard><FaCertificate color="lime" /> Earned "UI Design Expert" Certificate</ActivityCard>
    <ActivityCard><FaBookOpen color="lime" /> Started "Advanced Prototyping with Figma"</ActivityCard>
  </>
);
export default RecentActivity;
const SectionTitle = styled.h5`
  margin-top: 2rem;
  color: white;
`;
const ActivityCard = styled(Card)`
  background-color: var(--card-background);
  color: white;
  border: none;
  margin-bottom: 1rem;
  padding: 1rem;
`;