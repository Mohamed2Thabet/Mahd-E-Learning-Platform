import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import styled from 'styled-components';

const FilterSortControls = ({ sortBy, setSortBy, setShowFilters }) => {
  return (
    <div className="d-flex gap-3">
      <FilterButton
        variant="outline-secondary"
        className="d-lg-none mt-4"
        onClick={() => setShowFilters(true)}
      >
        <FaFilter className="me-2" />
        Filters
      </FilterButton>

      <Dropdown>
        <Dropdown.Toggle
          variant="outline-secondary"
          style={{
            backgroundColor: 'var(--card-background)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-light)',
            borderRadius: '12px'
          }}
        >
          Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
        </Dropdown.Toggle>
        <SortDropdown>
          <Dropdown.Item onClick={() => setSortBy('popular')}>Most Popular</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortBy('rating')}>Highest Rated</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortBy('price-low')}>Price: Low to High</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortBy('price-high')}>Price: High to Low</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortBy('duration')}>Duration</Dropdown.Item>
        </SortDropdown>
      </Dropdown>
    </div>
  );
}

export default FilterSortControls;

const FilterButton = styled(Button)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  color: var(--text-light);
  border-radius: 12px;
  padding: 10px 16px;

  &:hover {
    background-color: var(--primary);
    border-color: var(--primary);
    color: var(--heading-color);
  }
`;

const SortDropdown = styled(Dropdown.Menu)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 12px;

  .dropdown-item {
    color: var(--text-light);

    &:hover {
      background-color: var(--primary);
      color: var(--heading-color);
    }
  }
`;
