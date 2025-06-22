import React from 'react';
import styled from 'styled-components';

// Styled Components
const StatsContainer = styled.div`
  padding: 2rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
`;

const StatCard = styled.div`
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;

  @media (max-width: 767px) {
    padding: 1.25rem 0.75rem;
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary, #00E676);
  line-height: 1.2;
  margin-bottom: 0.5rem;

  @media (max-width: 767px) {
    font-size: 1.75rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatsSection = () => {
  const stats = [
    { value: 12, label: 'Courses' },
    { value: '15.4K', label: 'Students' },
    { value: '4.9', label: 'Rating' },
    { value: '2.8K', label: 'Reviews' }
  ];

  return (
    <StatsContainer>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>
    </StatsContainer>
  );
};

export default StatsSection;