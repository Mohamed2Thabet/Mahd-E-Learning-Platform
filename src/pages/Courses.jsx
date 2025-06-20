import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Offcanvas, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import Pagination from '../components/courses/Pagination';
import FilterPanel from '../components/courses/FilterPanel';
import CourseCard from '../components/courses/CourseCard';
import { fadeInUp } from '../components/common/Animations';
import { useFilteredCourses } from '../components/hooks/useFilteredCourses';
import { usePagination } from '../components/hooks/usePagination';
import FilterSortControls from '../components/courses/FilterSortControls';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCourses } from '../store/courseSlice';

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    difficulties: [],
    maxPrice: 200
  });

  const dispatch = useDispatch();
  const { list: allCourses, loading, error } = useSelector((state) => state.course);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;


  useEffect(() => {
    dispatch(fetchAllCourses({ limit: 0, offset:0 }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, filters]);

  const filteredAndSortedCourses = useFilteredCourses(allCourses, searchQuery, filters, sortBy);
  const { currentItems: currentCourses, totalPages } = usePagination(filteredAndSortedCourses, currentPage, coursesPerPage);

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      difficulties: [],
      maxPrice: 200
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CoursesPageWrapper>
      <Container className="py-5">
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
            <FilterSortControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              setShowFilters={setShowFilters}
            />
          </Col>
        </Row>

        {loading && (
          <div className="text-center py-4">
            <p style={{ color: 'var(--text-secondary)' }}>Loading courses...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-4">
            <p className="text-danger">{error}</p>
          </div>
        )}

        <Row>
          <Col lg={3} className="d-none d-lg-block">
            <FilterPanel filters={filters} onFilterChange={setFilters} onClearFilters={handleClearFilters} />
          </Col>

          <Col lg={9}>
            <div className="mb-4">
              <h6 style={{ color: 'var(--text-secondary)' }}>
                Showing {currentCourses.length} of {filteredAndSortedCourses.length} courses
                {currentPage > 1 && ` • Page ${currentPage}`}
              </h6>
            </div>

            <Row className="g-4">
              {currentCourses.map(course => (
                <Col key={course._id} md={6} xl={4}>
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
                <Button onClick={handleClearFilters} variant="outline-primary">
                  Clear All Filters
                </Button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-5 justify-content-center d-flex">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  showInfo={true}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
        style={{ backgroundColor: 'var(--background-dark)' }}
      >
        <Offcanvas.Header closeButton style={{ borderColor: 'var(--border-color)' }} />
        <Offcanvas.Body>
          <FilterPanel filters={filters} onFilterChange={setFilters} onClearFilters={handleClearFilters} />
        </Offcanvas.Body>
      </Offcanvas>
    </CoursesPageWrapper>
  );
};

export default CoursesPage;

const CoursesPageWrapper = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  color: var(--text-light);
  animation: ${css`${fadeInUp} 0.8s ease-out`};
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
    color: var(--heading-color);
    border-radius: 0 50px 50px 0;
  }
`;
