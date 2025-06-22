import React from 'react';
import styled from 'styled-components';
import ArticleCard from './ArticleCard';

const Section = styled.div`
  margin-top: 2rem;
`;

const Heading = styled.h4`
  color: white;
  margin-bottom: 1rem;
`;

const PopularArticles = () => {
  const articles = [
    {
      title: 'How to Reset Your Password',
      description: 'Learn how to securely reset your password and regain access to your account...',
      views: '2.4k',
    },
    {
      title: 'Getting Started with Courses',
      description: 'A comprehensive guide to accessing and making the most of your courses...',
      views: '1.8k',
    },
  ];

  return (
    <Section>
      <Heading>Popular Articles</Heading>
      {articles.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </Section>
  );
};

export default PopularArticles;
