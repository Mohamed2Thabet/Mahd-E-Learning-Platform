// src/pages/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaArrowLeft,
  FaTrash, FaShoppingCart, FaPlus
} from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { fadeInUp, fadeOut } from '../components/common/Animations';
import CheckoutHeader from '../components/Checkout/CheckoutHeader';
import OrderSummary from '../components/Checkout/OrderSummary';
import PaymentSection from '../components/Checkout/PaymentSection';
import EmptyState from '../components/Checkout/EmptyState';

// ✅ Stripe Promise
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);





// --- Course Data ---
const initialCourseData = {
  id: '22',
  title: 'The Complete 2025 Web Development Bootcamp',
  instructor: {
    name: 'Dr. Angela Yu',
    id: ' *edu_123* '
  },
  image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=300&fit=crop',
  price: 89.99,
  discountPrice: 14.99,
  description: 'Become a Full-Stack Web Developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps'
};

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


// --- Main CheckoutPage Component ---
const CheckoutPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(initialCourseData);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCourse = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setSelectedCourse(null);
      setIsDeleting(false);
    }, 300);
  };

  // ✅ تحقق من متغيرات البيئة
  useEffect(() => {
    console.log('Environment Variables Check:');
    console.log('VITE_STRIPE_PUBLIC_KEY:', import.meta.env.VITE_STRIPE_PUBLIC_KEY ? '✅ Set' : '❌ Missing');
    console.log('VITE_PAYMENT_API_URL:', import.meta.env.VITE_PAYMENT_API_URL || '❌ Missing');
  }, []);

  return (
    <PageWrapper>
      <CheckoutContainer>
        <CheckoutHeader
          courseTitle={selectedCourse?.title}
          hasSelectedCourse={!!selectedCourse}
        />
        <MainContent>
          {selectedCourse ? (
            <ContentWrapper $isDeleting={isDeleting}>
              <Row>
                <Col lg={7} className="mb-4 mb-lg-0">
                  <OrderSummary
                    course={selectedCourse}
                    onDeleteCourse={handleDeleteCourse}
                  />
                </Col>
                <Col lg={5}>
                  <Elements stripe={stripePromise}>
                    <PaymentSection course={selectedCourse} />
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
