import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchResults from '../components/courses/SearchResults';
// import { mockCourses } from '../data/coursesData';

const CourseCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='background-dark'>
      <Container className="py-5 ">
        <Row>
          <Col>
            <h1 className="text-white mb-4">Browse Courses</h1>
            {/* ممكن تضيف Input للبحث لاحقاً */}
            <SearchResults searchQuery={searchQuery} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CourseCatalog;
