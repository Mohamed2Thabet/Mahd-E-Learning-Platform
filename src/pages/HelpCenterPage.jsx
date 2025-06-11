import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { FaSearch, FaPlay, FaUserCog, FaMoneyBill, FaBook, FaTools, FaBug, FaChevronRight, FaStar, FaClock, FaUsers, FaQuestionCircle, FaComments } from 'react-icons/fa';

// Styled Components
const StyledContainer = styled.div`
  background-color: var(--background-dark);
  min-height: 100vh;
  color: var(--text-light);
`;

const StyledSearch = styled(InputGroup)`
  background-color: var(--card-background);
  border-radius: 12px;
  padding: 0.5rem;
  margin-bottom: 3rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(0, 230, 118, 0.1);
  }
  
  .form-control {
    background-color: transparent;
    border: none;
    color: var(--text-light);
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    
    &::placeholder {
      color: var(--text-secondary);
    }
    
    &:focus {
      background-color: transparent;
      border: none;
      box-shadow: none;
      color: var(--text-light);
    }
  }
`;

const StyledButton = styled(Button)`
  background-color: var(--primary);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
  }
  
  &:focus {
    background-color: var(--primary-dark);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.2);
  }
`;

const CategoryCard = styled(Card)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.1);
    transform: translateY(-5px);
    
    .card-icon {
      background-color: rgba(0, 230, 118, 0.2);
      color: var(--primary);
    }
    
    .card-title {
      color: var(--primary);
    }
    
    .chevron-icon {
      color: var(--primary);
      transform: translateX(5px);
    }
  }
  
  .card-body {
    padding: 2rem;
  }
`;

const IconWrapper = styled.div`
  background-color: rgba(0, 230, 118, 0.1);
  color: var(--primary);
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
`;

const CardTitle = styled.h3`
  color: var(--heading-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
`;

const CardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ArticleCount = styled.small`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ChevronIcon = styled(FaChevronRight)`
  color: var(--text-secondary);
  transition: all 0.3s ease;
  margin-left: auto;
`;

const ArticleCard = styled(Card)`
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.1);
    
    .article-title {
      color: var(--primary);
    }
    
    .chevron-icon {
      color: var(--primary);
      transform: translateX(3px);
    }
  }
  
  .card-body {
    padding: 1.5rem;
  }
`;

const ArticleTitle = styled.h5`
  color: var(--heading-color);
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  
  .meta-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .meta-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const StyledBadge = styled(Badge)`
  background-color: var(--primary) !important ;
  border: 1px solid rgba(0, 230, 118, 0.3);
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
`;

const ContactSection = styled.div`
  background: linear-gradient(135deg, rgba(0, 230, 118, 0.1) 0%, rgba(0, 200, 83, 0.1) 100%);
  border: 1px solid rgba(0, 230, 118, 0.2);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  margin-top: 3rem;
`;

const ContactTitle = styled.h3`
  color: var(--heading-color);
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ContactDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const OutlineButton = styled(Button)`
  border: 2px solid var(--primary);
  background-color: transparent;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary);
    color: var(--background-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
  }
  
  &:focus {
    background-color: var(--primary);
    color: var(--background-dark);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.2);
  }
`;

const SectionTitle = styled.h2`
  color: var(--heading-color);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: var(--heading-color);
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.3rem;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

// Data
const categories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and get started with MAHD',
    icon: <FaPlay />,
    articleCount: 12
  },
  {
    title: 'Account & Settings',
    description: 'Manage your account preferences & settings',
    icon: <FaUserCog />,
    articleCount: 8
  },
  {
    title: 'Billing & Payments',
    description: 'Information about payments and subscriptions',
    icon: <FaMoneyBill />,
    articleCount: 15
  },
  {
    title: 'Course Access',
    description: 'Learn about accessing and tracking courses',
    icon: <FaBook />,
    articleCount: 20
  },
  {
    title: 'Instructor Tools',
    description: 'Resources for course creators and instructors',
    icon: <FaTools />,
    articleCount: 10
  },
  {
    title: 'Technical Issues',
    description: 'Solutions for common technical problems',
    icon: <FaBug />,
    articleCount: 18
  },
];

const popularArticles = [
  {
    title: "How to reset your password",
    category: "Account & Settings",
    readTime: "2 min read",
    views: "15.2k views",
    rating: 4.8
  },
  {
    title: "Understanding course completion certificates",
    category: "Course Access",
    readTime: "5 min read",
    views: "12.8k views",
    rating: 4.9
  },
  {
    title: "Setting up payment methods",
    category: "Billing & Payments",
    readTime: "3 min read",
    views: "10.5k views",
    rating: 4.7
  },
  {
    title: "Creating your first course",
    category: "Instructor Tools",
    readTime: "8 min read",
    views: "8.9k views",
    rating: 4.6
  }
];

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <StyledContainer>
      <Container className="py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <PageTitle>Help Center</PageTitle>
          <PageSubtitle>
            Find answers to your questions and learn how to get the most out of MAHD
          </PageSubtitle>
        </div>

        {/* Search Section */}
        <Row className="justify-content-center mb-5">
          <Col lg={8} xl={6}>
            <StyledSearch>
              <FormControl
                placeholder="Search articles, questions, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <StyledButton>
                <FaSearch />
              </StyledButton>
            </StyledSearch>
          </Col>
        </Row>

        {/* Categories Section */}
        <div className="mb-5">
          <SectionTitle>Browse by Category</SectionTitle>
          <Row className="g-4">
            {categories.map((category, index) => (
              <Col xs={12} md={6} lg={4} key={index}>
                <CategoryCard>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <IconWrapper className="card-icon">
                        {category.icon}
                      </IconWrapper>
                      <ChevronIcon className="chevron-icon" />
                    </div>
                    <CardTitle className="card-title">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                    <ArticleCount>{category.articleCount} articles</ArticleCount>
                  </Card.Body>
                </CategoryCard>
              </Col>
            ))}
          </Row>
        </div>

        {/* Popular Articles Section */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <SectionTitle>Popular Articles</SectionTitle>
            <Button variant="link" className="text-decoration-none p-0" style={{ color: 'var(--primary)' }}>
              View all articles <FaChevronRight />
            </Button>
          </div>
          <Row>
            {popularArticles.map((article, index) => (
              <Col lg={6} key={index}>
                <ArticleCard>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <ArticleTitle className="article-title flex-grow-1">{article.title}</ArticleTitle>
                      <ChevronIcon className="chevron-icon ms-2" />
                    </div>
                    <ArticleMeta>
                      <div className="meta-left">
                        <StyledBadge>{article.category}</StyledBadge>
                        <div className="meta-item">
                          <FaClock />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <div className="meta-right">
                        <div className="meta-item">
                          <FaUsers />
                          <span>{article.views}</span>
                        </div>
                        <div className="meta-item">
                          <FaStar style={{ color: '#ffc107' }} />
                          <span>{article.rating}</span>
                        </div>
                      </div>
                    </ArticleMeta>
                  </Card.Body>
                </ArticleCard>
              </Col>
            ))}
          </Row>
        </div>

        {/* Contact Support Section */}
        <ContactSection>
          <ContactTitle>Still need help?</ContactTitle>
          <ContactDescription>
            Can't find what you're looking for? Our support team is here to help you get back on track.
          </ContactDescription>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <StyledButton size="lg">
              <FaQuestionCircle className="me-2" />
              Contact Support
            </StyledButton>
            <OutlineButton size="lg">
              <FaComments className="me-2" />
              Join Community
            </OutlineButton>
          </div>
        </ContactSection>
      </Container>
    </StyledContainer>
  );
};

export default HelpCenterPage;