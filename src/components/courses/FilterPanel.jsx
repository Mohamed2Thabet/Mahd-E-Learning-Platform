import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

// ✅ FilterPanel Component
const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    { id: 'uiux', name: 'UI/UX Design' },
    { id: 'webdev', name: 'Web Development' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'graphic', name: 'Graphic Design' }
  ];

  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const handleCategoryChange = (categoryId, isChecked) => {
    const updatedCategories = isChecked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);

    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handleDifficultyChange = (difficulty, isChecked) => {
    const updatedDifficulties = isChecked
      ? [...filters.difficulties, difficulty]
      : filters.difficulties.filter(d => d !== difficulty);

    onFilterChange({ ...filters, difficulties: updatedDifficulties });
  };

  return (
    <FilterSidebar>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="m-0 fw-bold" style={{ color: 'var(--heading-color)' }}>Filters</h5>
        <Button
          variant="link"
          className="p-0 text-decoration-none"
          style={{ color: 'var(--primary)' }}
          onClick={onClearFilters}
        >
          Clear All
        </Button>
      </div>

      <div className="mb-4">
        <h6 className="mb-3 fw-semibold" style={{ color: 'var(--text-light)' }}>Category</h6>
        {categories.map(category => (
          <Form.Check
            key={category.id}
            type="checkbox"
            id={`category-${category.id}`}
            label={category.name}
            className="mb-2"
            style={{ color: 'var(--text-light)' }}
            checked={filters.categories.includes(category.id)}
            onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
          />
        ))}
      </div>

      <div className="mb-4">
        <h6 className="mb-3 fw-semibold" style={{ color: 'var(--text-light)' }}>Difficulty</h6>
        {difficulties.map(difficulty => (
          <Form.Check
            key={difficulty}
            type="checkbox"
            id={`difficulty-${difficulty}`}
            label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            className="mb-2"
            style={{ color: 'var(--text-light)' }}
            checked={filters.difficulties.includes(difficulty)}
            onChange={(e) => handleDifficultyChange(difficulty, e.target.checked)}
          />
        ))}
      </div>

      <div className="mb-4">
        <h6 className="mb-3 fw-semibold" style={{ color: 'var(--text-light)' }}>Price Range</h6>
        <Form.Range
          min={0}
          max={200}
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) })}
          className="mb-2"
        />
        <div className="d-flex justify-content-between">
          <small style={{ color: 'var(--text-secondary)' }}>$0</small>
          <small style={{ color: 'var(--text-secondary)' }}>${filters.maxPrice}</small>
        </div>
      </div>
    </FilterSidebar>
  );
};
export default FilterPanel;

const FilterSidebar = styled.div`
 background-color: var(--card-background);
 border: 1px solid var(--border-color);
 border-radius: 16px;
 padding: 24px;
 position: sticky;
 top: 20px;

 .form-check-input:checked {
  background-color: var(--primary);
  border-color: var(--primary);
 }

 .form-check-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25);
 }
`;