import { Row, Col, Card, Badge } from 'react-bootstrap'
import { FiStar } from 'react-icons/fi'
import { useState } from 'react'

const ReviewsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      rating: 5,
      date: '2 weeks ago',
      review: 'David is an exceptional instructor! His teaching style is clear and engaging, and he provides practical examples that really help understand the material. The content is well-structured and up-to-date with current industry standards.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      rating: 5,
      date: '1 month ago',
      review: 'The course exceeded my expectations. David\'s expertise in UI/UX design is evident, and his feedback on assignments was invaluable. I particularly appreciated the real-world projects that helped build my portfolio.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      rating: 5,
      date: '1 month ago',
      review: 'The course exceeded my expectations. David\'s expertise in UI/UX design is evident, and his feedback on assignments was invaluable. I particularly appreciated the real-world projects that helped build my portfolio.'
    },
    {
      id: 4,
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      rating: 5,
      date: '1 month ago',
      review: 'The course exceeded my expectations. David\'s expertise in UI/UX design is evident, and his feedback on assignments was invaluable. I particularly appreciated the real-world projects that helped build my portfolio.'
    },
    {
      id: 5,
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      rating: 5,
      date: '1 month ago',
      review: 'The course exceeded my expectations. David\'s expertise in UI/UX design is evident, and his feedback on assignments was invaluable. I particularly appreciated the real-world projects that helped build my portfolio.'
    },
  ]

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Student Reviews</h2>
        <div className="d-flex align-items-center">
          <Badge
            bg={activeFilter === 'all' ? 'primary' : 'secondary'}
            className="cursor-pointer me-2"
            onClick={() => setActiveFilter('all')}
          >
            All Reviews
          </Badge>
          <Badge
            bg={activeFilter === '5' ? 'primary' : 'secondary'}
            className="cursor-pointer me-2"
            onClick={() => setActiveFilter('5')}
          >
            5 ★
          </Badge>
          <Badge
            bg={activeFilter === '4' ? 'primary' : 'secondary'}
            className="cursor-pointer me-2"
            onClick={() => setActiveFilter('4')}
          >
            4 ★
          </Badge>
          <Badge
            bg={activeFilter === '3' ? 'primary' : 'secondary'}
            className="cursor-pointer"
            onClick={() => setActiveFilter('3')}
          >
            3 ★
          </Badge>
        </div>
      </div>
      <Row>
        {reviews.map(review => (
          <Col key={review.id} md={12} className="mb-4">
            <Card className="p-4 card-background">
              <div className="d-flex align-items-start">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="review-avatar"
                />
                <div>
                  <h5 className="mb-1">{review.name}</h5>
                  <div className="d-flex align-items-center mb-2">
                    <div className="ratings me-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className="me-1"
                          size={14}
                          fill={i < review.rating ? "#ffc107" : "none"}
                          stroke="#ffc107"
                        />
                      ))}
                    </div>
                    <small className="text-muted">{review.date}</small>
                  </div>
                  <p className="mb-0">{review.review}</p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ReviewsSection