// src/data/paymentData.js
export const PAYMENT_CONFIG = {
  course: {
    id: 'course_123456',
    title: 'The Complete 2025 Web Development Bootcamp',
    instructor: {
      name: 'Dr. Angela Yu',
      id: 'edu_789012'
    },
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=300&fit=crop',
    price: 89.99,
    discountPrice: 14.99,
    description: 'Become a Full-Stack Web Developer with just one course.'
  },

  // ✅ Static payment data
  staticPaymentData: {
    courseId: 'course_123456',
    amount: 14.99,
    currency: 'USD',
    source: 'pm_static_visa_4242',
    educatorId: 'edu_789012',
    description: 'Payment for The Complete 2025 Web Development Bootcamp'
  },

  // ✅ Success messages
  successMessages: {
    title: 'Payment Successful!',
    subtitle: 'Thank you for your purchase',
    description: 'Your payment has been processed successfully. You will be redirected to the home page shortly.',
    redirectMessage: 'Redirecting to home page in',
    accessCourse: 'Access Your Course',
    goHome: 'Go to Home Page'
  },

  timing: {
    redirectDelay: 5000,
    countdownInterval: 1000
  },

  cardElementOptions: {
    style: {
      base: {
        fontSize: '16px',
        color: '#FFFFFF',
        fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      invalid: {
        color: '#f44336',
        iconColor: '#f44336',
      },
      complete: {
        color: '#00E676',
        iconColor: '#00E676',
      },
    },
    hidePostalCode: true,
  },

  defaultBillingDetails: {
    name: 'Test Customer',
    email: 'test@example.com',
    address: {
      line1: '123 Test Street',
      city: 'Test City',
      postal_code: '12345',
      country: 'US'
    }
  }
};
