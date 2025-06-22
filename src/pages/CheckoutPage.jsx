// src/pages/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fadeInUp, fadeOut } from '../components/common/Animations';
import CheckoutHeader from '../components/Checkout/CheckoutHeader';
import OrderSummary from '../components/Checkout/OrderSummary';
import PaymentSection from '../components/Checkout/PaymentSection';
import EmptyState from '../components/Checkout/EmptyState';

import { fetchCourseById } from '../store/courseSlice';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// --- Styled Components ---
const PageWrapper = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  color: var(--text-light);
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 230, 118, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 230, 118, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const CheckoutContainer = styled(Container)`
  max-width: 1200px;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  z-index: 1;
`;

const MainContent = styled.div`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: clamp(1.5rem, 4vw, 3rem);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  }
`;

const ContentWrapper = styled.div`
  animation: ${props => props.$isDeleting ? fadeOut : 'none'} 0.3s ease-out;
  transition: opacity 0.3s ease-out;
`;

// --- Main Component ---
const CheckoutPage = () => {
  const { id: courseId } = useParams();
  const dispatch = useDispatch();

  const { current: course, loading, error } = useSelector((state) => state.course);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById({ courseId }));
    }
  }, [dispatch, courseId]);

  const handleDeleteCourse = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
    }, 300);
  };
  console.log(course)
  if (loading) return <PageWrapper><p>Loading course details...</p></PageWrapper>;
  if (error) return <PageWrapper><p>Error: {error}</p></PageWrapper>;

  return (
    <PageWrapper>
      <CheckoutContainer>
        <CheckoutHeader
          courseTitle={course?.title}
          hasSelectedCourse={!!course}
        />
        <MainContent>
          {course ? (
            <ContentWrapper $isDeleting={isDeleting}>
              <Row>
                <Col lg={7} className="mb-4 mb-lg-0">
                  <OrderSummary
                    course={course}
                    onDeleteCourse={handleDeleteCourse}
                  />
                </Col>
                <Col lg={5}>
                  <Elements stripe={stripePromise}>
                    <PaymentSection course={course} />
                  </Elements>
                </Col>
              </Row>
            </ContentWrapper>
          ) : (
            <EmptyState />
          )}
        </MainContent>
      </CheckoutContainer>
    </PageWrapper>
  );
};

export default CheckoutPage;
