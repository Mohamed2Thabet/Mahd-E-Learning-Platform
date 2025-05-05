import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import FilterSidebar from './FilterSidebar';
import SortDropdown from './SortDropdown';
import Pagination from './Pagination';
import courses from '../../data/coursesData';
import CourseCard from '../Landing/CourseCard';
import InputSearch from '../UI/InputSearch'
const SearchResults = ({ searchQuery }) => {
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    difficulty: [],
    duration: [],
    rating: null
  });

  const filteredCourses = courses;
  const coursesPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      difficulty: [],
      duration: [],
      rating: null
    });
    setCurrentPage(1);
  };

  return (
    <section className=''>
      <Container>
        <Row className="g-4">
          {/* Sidebar */}
          <Col lg={3} md={4}>
            <div >
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </Col>

          {/* Courses List */}
          <Col lg={9} md={8}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <InputSearch />
              <SortDropdown value={sortBy} onChange={handleSortChange} />
            </div>

            <Row className="g-5">
              {currentCourses.map((course, idx) => (
                <Col md={6} lg={4} key={idx} className="hover-scale ">
                
                  
                    <CourseCard {...course} />
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-center mt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .hover-scale:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default SearchResults;
