import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Offcanvas, InputGroup, Spinner } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import styled, { css, keyframes } from 'styled-components';
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
    dispatch(fetchAllCourses({ limit: 0, offset: 0 }));
  }, [dispatch]);

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

  // ✅ Full-page loading spinner
  if (loading) {
    return (
      <FullPageLoader>
        <LoaderContent>
          <SpinnerContainer>
            <StyledSpinner animation="border" />
            <LoadingDots>
              <span></span>
              <span></span>
              <span></span>
            </LoadingDots>
          </SpinnerContainer>
          <LoadingText>
            <h4>Loading Amazing Courses</h4>
            <p>Discovering the best learning opportunities for you...</p>
          </LoadingText>
        </LoaderContent>
        <LoadingProgress />
      </FullPageLoader>
    );
  }

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

        {error && (
          <ErrorContainer>
            <div className="text-center py-4">
              <h4 className="text-danger mb-3">Oops! Something went wrong</h4>
              <p className="text-danger mb-4">{error}</p>
              <Button
                variant="outline-primary"
                onClick={() => dispatch(fetchAllCourses({ limit: 0, offset: 0 }))}
              >
                Try Again
              </Button>
            </div>
          </ErrorContainer>
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

            {filteredAndSortedCourses.length === 0 && !loading && (
              <EmptyState>
                <div className="text-center py-5">
                  <h4 style={{ color: 'var(--text-secondary)' }}>No courses found</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Try adjusting your search criteria or filters
                  </p>
                  <Button onClick={handleClearFilters} variant="outline-primary">
                    Clear All Filters
                  </Button>
                </div>
              </EmptyState>
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

// ✅ Full-page loader animations
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

const dotsAnimation = keyframes`
  0%, 20% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
`;

const progressAnimation = keyframes`
  0% { width: 0%; }
  25% { width: 30%; }
  50% { width: 60%; }
  75% { width: 85%; }
  100% { width: 100%; }
`;

const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ✅ Full-page loader styled components
const FullPageLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--background-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(38, 166, 154, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(38, 166, 154, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 1;
  animation: ${slideInDown} 0.8s ease-out;
`;

const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const StyledSpinner = styled(Spinner)`
  width: 4rem !important;
  height: 4rem !important;
  color: var(--primary) !important;
  border-width: 4px !important;
  animation: ${spinAnimation} 1s linear infinite, ${pulseAnimation} 2s ease-in-out infinite;
  
  &.spinner-border {
    border-right-color: transparent !important;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  
  span {
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
    animation: ${dotsAnimation} 1.5s ease-in-out infinite;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

const LoadingText = styled.div`
  text-align: center;
  color: var(--text-light);
  
  h4 {
    color: var(--heading-color);
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  
  p {
    color: var(--text-secondary);
    margin: 0;
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const LoadingProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--primary);
  animation: ${progressAnimation} 3s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(38, 166, 154, 0.5);
`;

// ✅ Existing styled components with improvements
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
    transition: all 0.3s ease;

    &:focus {
      background-color: var(--card-background);
      border-color: var(--primary);
      color: var(--text-light);
      box-shadow: 0 0 0 0.2rem rgba(38, 166, 154, 0.25);
      transform: translateY(-1px);
    }

    &::placeholder {
      color: var(--text-secondary);
    }
  }

  .input-group-text {
    background-color: var(--primary);
    border: 1px solid var(--primary);
    color: var(--background-dark);
    border-radius: 0 50px 50px 0;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--primary-dark);
      border-color: var(--primary-dark);
    }
  }
`;

const ErrorContainer = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  
  .btn {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--background-dark);
    
    &:hover {
      background: var(--primary-dark);
      border-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(38, 166, 154, 0.3);
    }
  }
`;

const EmptyState = styled.div`
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  
  .btn {
    background: transparent;
    border-color: var(--primary);
    color: var(--primary);
    
    &:hover {
      background: var(--primary);
      color: var(--background-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(38, 166, 154, 0.3);
    }
  }
`;
