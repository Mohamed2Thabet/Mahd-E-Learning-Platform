// components/StatCard.js
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const IconWrapper = styled.div`
  font-size: 1.5rem;
  float: right;
`;

export default function StatCard({ title, value, icon, growth }) {
  return (
    <Card className="p-3 m-2 card-background">
      <Card.Title className=''>{title}</Card.Title>
      <Card.Text>
        <h4>{value}</h4>
        <small className="text-success">+{growth}%</small>
        <IconWrapper>{icon}</IconWrapper>
      </Card.Text>
    </Card>
  );
}
