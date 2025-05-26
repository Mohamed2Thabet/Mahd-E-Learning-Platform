import React from 'react';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa';

const Card = styled.div`
  background-color: #1a1a1a;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  color: white;
`;

const Title = styled.h5`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  margin: 0;
  color: #ccc;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #0f0;
`;

const ArticleCard = ({ title, description, views }) => (
  <Card>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Footer>
      <span>Read More →</span>
      <span><FaEye className="me-1" /> {views} views</span>
    </Footer>
  </Card>
);

export default ArticleCard;
