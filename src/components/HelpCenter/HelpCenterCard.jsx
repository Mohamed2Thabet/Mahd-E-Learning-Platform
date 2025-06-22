import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { IconContext } from 'react-icons';

const StyledCard = styled(Card)`
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #333;
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  height: 100%;
  transition: 0.3s;
  display:flex;
  &:hover {
    border-color: #198754;
    box-shadow: 0 0 10px #198754;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const HelpCenterCard = ({ icon, title, description }) => {
  return (
    <StyledCard>
      <IconWrapper>
        <IconContext.Provider value={{ color: '#00ff88', size: '1.75rem' }}>
          {icon}
        </IconContext.Provider>
      </IconWrapper>
      <h5>{title}</h5>
      <p className=" small">{description}</p>
    </StyledCard>
  );
};



export default HelpCenterCard;
