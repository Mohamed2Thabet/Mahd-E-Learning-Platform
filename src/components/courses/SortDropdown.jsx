import { Form } from 'react-bootstrap'

const SortDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'highest-rated', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ]

  return (
    <div className="d-flex align-items-center">
      <label htmlFor="sort-dropdown" className="me-2 p">Sort by:</label>
      <Form.Select
        id="sort-dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 'auto' }}
        size="sm"
        className='p'
      >
        {sortOptions.map(option => (
          <option className='text-black' key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  )
}

export default SortDropdown