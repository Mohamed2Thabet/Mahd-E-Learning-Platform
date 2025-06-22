import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const GoalCard = styled(Card)`
  background-color: #1e1e1e;
  border: none;
  color: #fff;
`;

const GoalSummary = ({ icon, label, value }) => (
  <GoalCard className="p-3 text-center">
    <div>{icon}</div>
    <h5>{label}</h5>
    <p className="fw-bold">{value}</p>
  </GoalCard>
);

export default GoalSummary;
