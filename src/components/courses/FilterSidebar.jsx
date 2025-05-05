import { Form, Button } from 'react-bootstrap'
import { FiX } from 'react-icons/fi'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    { id: 'uiux', name: 'UI/UX Design' },
    { id: 'webdev', name: 'Web Development' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'graphic', name: 'Graphic Design' }
  ]

  const difficultyLevels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ]

  const durations = [
    { id: '0-2', name: '0-2 Hours' },
    { id: '2-5', name: '2-5 Hours' },
    { id: '5plus', name: '5+ Hours' }
  ]

  const ratings = [
    { id: 5, label: '5 & up' },
    { id: 4, label: '4 & up' },
    { id: 3, label: '3 & up' }
  ]

  const handleCategoryChange = (categoryId, isChecked) => {
    const updatedCategories = isChecked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId)

    onFilterChange({
      ...filters,
      categories: updatedCategories
    })
  }

  const handleDifficultyChange = (difficultyId, isChecked) => {
    const updatedDifficulty = isChecked
      ? [...filters.difficulty, difficultyId]
      : filters.difficulty.filter(id => id !== difficultyId)

    onFilterChange({
      ...filters,
      difficulty: updatedDifficulty
    })
  }

  const handleDurationChange = (durationId, isChecked) => {
    const updatedDuration = isChecked
      ? [...filters.duration, durationId]
      : filters.duration.filter(id => id !== durationId)

    onFilterChange({
      ...filters,
      duration: updatedDuration
    })
  }

  const handleRatingChange = (ratingValue) => {
    onFilterChange({
      ...filters,
      rating: ratingValue
    })
  }

  return (
    <div className="p-3 rounded card-background p" >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Filters</h5>
        <Button
          variant="link"
          className="text-primary p-0 d-flex align-items-center text-decoration-none"
          onClick={onClearFilters}
        >
          <small className='text-success fs-5'>Clear All</small>
        </Button>
      </div>

      <div className="mb-4">
        <h6 className="mb-3">Category</h6>
        <Form>
          {categories.map(category => (
            <Form.Check
              key={category.id}
              type="checkbox"
              id={`category-${category.id}`}
              label={category.name}
              className="mb-2"
              checked={filters.categories.includes(category.id)}
              onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
            />
          ))}
        </Form>
      </div>

      <div className="mb-4">
        <h6 className="mb-3">Difficulty Level</h6>
        <div className="d-flex flex-wrap gap-2">
          {difficultyLevels.map(level => (
            <Button
              key={level.id}
              variant={filters.difficulty.includes(level.id) ? "primary" : "outline-secondary"}
              size="sm"
              className="rounded-pill"
              onClick={() => handleDifficultyChange(
                level.id,
                !filters.difficulty.includes(level.id)
              )}
            >
              {level.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h6 className="mb-3">Duration</h6>
        <Form>
          {durations.map(duration => (
            <Form.Check
              key={duration.id}
              type="checkbox"
              id={`duration-${duration.id}`}
              label={duration.name}
              className="mb-2"
              checked={filters.duration.includes(duration.id)}
              onChange={(e) => handleDurationChange(duration.id, e.target.checked)}
            />
          ))}
        </Form>
      </div>

      <div className="mb-3">
        <h6 className="mb-3">Rating</h6>
        <Form>
          {ratings.map(rating => (
            <Form.Check
              key={rating.id}
              type="radio"
              id={`rating-${rating.id}`}
              name="rating-filter"
              label={
                <div className="d-flex align-items-center">
                  {[...Array(5)].map((_, i) => {
                    if (i < rating.id) return <FaStar key={i} className="text-success me-1" />;
                    return <FaRegStar key={i} className="text-success me-1" />;
                  })}
                  <span className="ms-1">{rating.label}</span>
                </div>
              }
              className="mb-2"
              checked={filters.rating === rating.id}
              onChange={() => handleRatingChange(rating.id)}
            />
          ))}
        </Form>
      </div>
    </div>
  )
}

export default FilterSidebar