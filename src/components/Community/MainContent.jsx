// MainContent.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from '../courses/Pagination';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 773px) {
    flex-direction: row;
  }
`;

const SidebarPlaceholder = styled.div`
  display: none;

  @media (min-width: 773px) {
    display: block;
    width: 250px;
  }
`;

const Main = styled.main`
  padding: 20px;
  width: 100%;

  @media (min-width: 773px) {
    width: calc(100% - 250px);
  }
`;

const PostCard = styled.div`
  background-color: #212529;
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  select {
    width: auto;
    background-color: #343a40;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;

    option {
      background-color: #343a40;
      color: #fff;
    }
  }
`;

// Dummy data
const postsData = [
  {
    title: 'Tips for creating engaging UI animations?',
    description: 'I’m working on my first major UI project...',
    author: 'Sarah Chen',
    time: '2 hours ago',
    replies: 12,
    category: 'UI/UX',
  },
  {
    title: 'Best practices for responsive design in 2025?',
    description: 'Looking for current best practices...',
    author: 'Mike Johnson',
    time: '5 hours ago',
    replies: 18,
    category: 'Development',
  },
  {
    title: 'How to structure a digital marketing campaign?',
    description: 'I’m new to digital marketing...',
    author: 'Emma Davis',
    time: '1 day ago',
    replies: 15,
    category: 'Marketing',
  },
  {
    title: 'Which tools for user research in 2025?',
    description: 'Need feedback on top tools...',
    author: 'Ali Ahmed',
    time: '3 days ago',
    replies: 8,
    category: 'UI/UX',
  },
  {
    title: 'React vs. Next.js for beginners?',
    description: 'Is Next.js too advanced at first?',
    author: 'Leila Mansour',
    time: '4 days ago',
    replies: 22,
    category: 'Development',
  },
  {
    title: 'React vs. Next.js for beginners?',
    description: 'Is Next.js too advanced at first?',
    author: 'Leila Mansour',
    time: '4 days ago',
    replies: 22,
    category: 'Development',
  },
  {
    title: 'React vs. Next.js for beginners?',
    description: 'Is Next.js too advanced at first?',
    author: 'Leila Mansour',
    time: '4 days ago',
    replies: 22,
    category: 'Development',
  },
];

const postsPerPage = 3;

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(postsData.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = postsData.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <LayoutWrapper>
      <SidebarPlaceholder />

      <Main>
        <Header>
          <h2>Community Forum</h2>
          <button className="btn btn-success">Start New Discussion</button>
        </Header>

        <Filters>
          <select>
            <option>All Categories</option>
            <option>UI/UX</option>
            <option>Marketing</option>
          </select>
          <select>
            <option>Most Recent</option>
            <option>Most Popular</option>
          </select>
        </Filters>

        {currentPosts.map((post, index) => (
          <PostCard key={index}>
            <h5>{post.title}</h5>
            <p>{post.description}</p>
            <small className="text-success">
              {post.author} • {post.time} • {post.replies} replies • {post.category}
            </small>
          </PostCard>
        ))}

        {postsData.length > postsPerPage && (
          <div className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Main>
    </LayoutWrapper>
  );
};

export default MainContent;
