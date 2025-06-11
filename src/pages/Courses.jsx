import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, Offcanvas, Badge, InputGroup, Dropdown } from 'react-bootstrap';
import { FaStar, FaClock, FaFilter, FaSearch, FaUser, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { coursesData } from '../data/coursesData';

// Mock data


// Styled Components
const CoursesPageWrapper = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  color: var(--text-light);
`;

const StyledCard = styled(Card)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 230, 118, 0.15);
    border-color: var(--primary);
  }
`;

const CourseImage = styled.div`
  height: 200px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 200, 83, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${StyledCard}:hover &::after {
    opacity: 1;
  }
`;

const InstructorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  object-fit: cover;
`;

const RatingStars = styled.div`
  color: var(--primary);
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  font-weight: 600;
  color: #000;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.3);
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
    color: #000;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25);
    color: #000;
  }
`;

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

const SearchContainer = styled.div`
  .form-control {
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    color: var(--text-light);
    border-radius: 50px;
    padding: 12px 20px;

    &:focus {
      background-color: var(--card-background);
      border-color: var(--primary);
      color: var(--text-light);
      box-shadow: 0 0 0 0.2rem rgba(0, 230, 118, 0.25);
    }

    &::placeholder {
      color: var(--text-secondary);
    }
  }

  .input-group-text {
    background-color: var(--primary);
    border: 1px solid var(--primary);
    color: #000;
    border-radius: 0 50px 50px 0;
  }
`;

const FilterButton = styled(Button)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  color: var(--text-light);
  border-radius: 12px;
  padding: 10px 16px;

  &:hover {
    background-color: var(--primary);
    border-color: var(--primary);
    color: #000;
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
      color: #000;
    }
  }
`;

const PopularBadge = styled(Badge)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: #000;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const DifficultyBadge = styled(Badge)`
  background-color: ${props => {
    switch (props.level) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return 'var(--text-secondary)';
    }
  }};
  color: white;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.75rem;
`;

const PriceTag = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
`;

// Components
const CourseCard = ({ course }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" style={{ opacity: 0.5 }} />);
    }

    return stars;
  };

  return (
    <StyledCard>
      <div className="position-relative">
        <CourseImage bgImage={course.image} />
        {course.isPopular && <PopularBadge>Popular</PopularBadge>}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <InstructorAvatar src={course.instructor.avatar} alt={course.instructor.name} />
          <div className="ms-3">
            <div className="fw-semibold" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              {course.instructor.name}
            </div>
          </div>
        </div>

        <Card.Title className="mb-3 fw-bold" style={{ color: 'var(--heading-color)', fontSize: '1.1rem' }}>
          {course.title}
        </Card.Title>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <RatingStars className="d-flex align-items-center">
            {renderStars(course.rating)}
            <span className="ms-2 fw-semibold">{course.rating}</span>
            <span className="ms-1" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              ({course.students.toLocaleString()})
            </span>
          </RatingStars>
          <DifficultyBadge level={course.difficulty}>
            {course.difficulty}
          </DifficultyBadge>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center" style={{ color: 'var(--text-secondary)' }}>
            <FaClock className="me-1" />
            <span>{course.duration}h</span>
          </div>
          <PriceTag>${course.price}</PriceTag>
        </div>

        <div className="mt-auto">
          <PrimaryButton className="w-100">
            Enroll Now
          </PrimaryButton>
        </div>
      </Card.Body>
    </StyledCard>
  );
};

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

// Main Component
const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    difficulties: [],
    maxPrice: 200
  });

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(course.category);
      const matchesDifficulty = filters.difficulties.length === 0 || filters.difficulties.includes(course.difficulty);
      const matchesPrice = course.price <= filters.maxPrice;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
    });

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered = filtered.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'duration':
        filtered = filtered.sort((a, b) => a.duration - b.duration);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, filters]);

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      difficulties: [],
      maxPrice: 200
    });
  };

  return (
    <CoursesPageWrapper>
      <Container className="py-5">
        {/* Header */}
        <Row className="mb-5">
          <Col>
            <h1 className="display-4 fw-bold mb-2" style={{ color: 'var(--heading-color)' }}>
              Discover Amazing Courses
            </h1>
            <p className="lead" style={{ color: 'var(--text-secondary)' }}>
              Learn from industry experts and advance your career
            </p>
          </Col>
        </Row>

        {/* Search and Filter Controls */}
        <Row className="mb-4">
          <Col lg={8}>
            <SearchContainer>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search courses, instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </SearchContainer>
          </Col>
          <Col lg={4} className="d-flex justify-content-end align-items-center">
            <div className="d-flex gap-3">
              <FilterButton
                variant="outline-secondary"
                className="d-lg-none"
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
          </Col>
        </Row>

        <Row>
          {/* Desktop Sidebar */}
          <Col lg={3} className="d-none d-lg-block">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </Col>

          {/* Course Grid */}
          <Col lg={9}>
            <div className="mb-4">
              <h6 style={{ color: 'var(--text-secondary)' }}>
                Showing {filteredAndSortedCourses.length} courses
              </h6>
            </div>

            <Row className="g-4">
              {filteredAndSortedCourses.map(course => (
                <Col key={course.id} md={6} xl={4}>
                  <CourseCard course={course} />
                </Col>
              ))}
            </Row>

            {filteredAndSortedCourses.length === 0 && (
              <div className="text-center py-5">
                <h4 style={{ color: 'var(--text-secondary)' }}>No courses found</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Mobile Filter Offcanvas */}
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
        style={{ backgroundColor: 'var(--background-dark)' }}
      >
        <Offcanvas.Header closeButton style={{ borderColor: 'var(--border-color)' }}>
          <Offcanvas.Title style={{ color: 'var(--heading-color)' }}>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </CoursesPageWrapper>
  );
};

export default CoursesPage;