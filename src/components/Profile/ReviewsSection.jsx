import React, { useState } from 'react';
import styled from 'styled-components';
import { FiStar } from 'react-icons/fi';

// Styled Components
const ReviewsContainer = styled.div`
  padding: 2rem 0;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--heading-color, white);
  margin: 0;
  line-height: 1.3;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const FilterBadge = styled.button`
  background: ${props => props.active ? 'var(--primary, #00E676)' : 'var(--background-dark, #101310)'};
  color: ${props => props.active ? 'var(--background-dark, #101310)' : 'var(--text-secondary, rgba(255, 255, 255, 0.6))'};
  border: 1px solid ${props => props.active ? 'var(--primary, #00E676)' : 'var(--border-color, #333)'};
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? 'var(--primary-dark, #00C853)' : 'var(--border-color, #333)'};
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ReviewCard = styled.div`
  background: var(--card-background, #181d19);
  border: 1px solid var(--border-color, #333);
  border-radius: 8px;
  padding: 1.5rem;
`;

const ReviewContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const ReviewAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ReviewInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ReviewerName = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  color: var(--heading-color, white);
  margin: 0 0 0.5rem 0;
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ReviewDate = styled.small`
  color: var(--text-secondary, rgba(255, 255, 255, 0.6));
  font-size: 0.875rem;
`;

const ReviewText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  margin: 0;
`;

const ReviewsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

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
      name: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      rating: 4,
      date: '2 months ago',
      review: 'Great course content and very knowledgeable instructor. The assignments were challenging but rewarding. Would definitely recommend to anyone looking to improve their design skills.'
    },
    {
      id: 4,
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      rating: 5,
      date: '3 months ago',
      review: 'Outstanding course! David\'s approach to teaching complex design concepts is remarkable. The practical exercises and feedback really helped me grow as a designer.'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      rating: 5,
      date: '3 months ago',
      review: 'Highly recommend this course. The instructor is very experienced and provides excellent guidance throughout the learning process. The course materials are comprehensive and well-organized.'
    },
  ];

  const filteredReviews = activeFilter === 'all'
    ? reviews
    : reviews.filter(review => review.rating === parseInt(activeFilter));

  return (
    <ReviewsContainer>
      <ReviewsHeader>
        <SectionTitle>Student Reviews</SectionTitle>
        <FilterContainer>
          <FilterBadge
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            All Reviews
          </FilterBadge>
          <FilterBadge
            active={activeFilter === '5'}
            onClick={() => setActiveFilter('5')}
          >
            5 ★
          </FilterBadge>
          <FilterBadge
            active={activeFilter === '4'}
            onClick={() => setActiveFilter('4')}
          >
            4 ★
          </FilterBadge>
          <FilterBadge
            active={activeFilter === '3'}
            onClick={() => setActiveFilter('3')}
          >
            3 ★
          </FilterBadge>
        </FilterContainer>
      </ReviewsHeader>

      <ReviewsList>
        {filteredReviews.map(review => (
          <ReviewCard key={review.id}>
            <ReviewContent>
              <ReviewAvatar
                src={review.avatar}
                alt={review.name}
              />
              <ReviewInfo>
                <ReviewerName>{review.name}</ReviewerName>
                <ReviewMeta>
                  <RatingContainer>
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={14}
                        fill={i < review.rating ? "#ffc107" : "none"}
                        stroke="#ffc107"
                      />
                    ))}
                  </RatingContainer>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewMeta>
                <ReviewText>{review.review}</ReviewText>
              </ReviewInfo>
            </ReviewContent>
          </ReviewCard>
        ))}
      </ReviewsList>
    </ReviewsContainer>
  );
};

export default ReviewsSection;