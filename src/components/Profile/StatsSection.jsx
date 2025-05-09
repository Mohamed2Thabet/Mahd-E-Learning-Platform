import { Row, Col } from 'react-bootstrap'

const StatsSection = () => {
  const stats = [
    { value: 12, label: 'Courses' },
    { value: '15.4K', label: 'Students' },
    { value: '4.9', label: 'Rating' },
    { value: '2.8K', label: 'Reviews' }
  ]

  return (
    <Row className="py-4">
      {stats.map((stat, index) => (
        <Col key={index} xs={6} md={3} className="mb-3 mb-md-0 ">
          <div className="stats-container text-center card-background">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default StatsSection