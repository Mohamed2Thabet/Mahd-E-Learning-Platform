import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Button, Badge } from 'react-bootstrap';
import { FaPlus, FaFilter, FaComment, FaClock, FaUser, FaTag, FaHeart, FaShare } from 'react-icons/fa';
import Pagination from '../courses/Pagination';

// ✅ Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

// ✅ Layout Components
const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--background-dark) 0%, #0d110e 100%);

  @media (min-width: 773px) {
    flex-direction: row;
  }
`;

const SidebarPlaceholder = styled.div`
  display: none;

  @media (min-width: 773px) {
    display: block;
    width: 280px;
    flex-shrink: 0;
  }
`;

const Main = styled.main`
  padding: clamp(1rem, 3vw, 2rem);
  width: 100%;
  background: var(--background-dark);
  color: var(--text-light);
  flex: 1;
  animation: ${css`${fadeInUp} 0.6s ease-out`};

  @media (min-width: 773px) {
    width: calc(100% - 280px);
  }

  h2 {
    color: var(--heading-color);
    font-weight: 700;
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin: 0;
  }
`;

// ✅ Header Section
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  animation: ${css`${slideInRight} 0.8s ease-out`};

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .subtitle {
    color: var(--text-secondary);
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    margin: 0;
  }
`;

const NewDiscussionButton = styled(Button)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  border: none !important;
  color: var(--background-dark) !important;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%) !important;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

// ✅ Filters Section
const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  animation: ${css`${fadeInUp} 0.8s ease-out`};
  animation-delay: 0.2s;
  animation-fill-mode: both;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;

  .icon {
    color: var(--primary);
  }
`;

const StyledSelect = styled.select`
  background: var(--card-background);
  color: var(--text-light);
  border: 1px solid var(--border-color);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.1);
  }

  &:hover {
    border-color: var(--primary);
  }

  option {
    background: var(--card-background);
    color: var(--text-light);
    padding: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// ✅ Post Card
const PostCard = styled.div`
  background: var(--card-background);
  color: var(--text-light);
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border-color);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: ${css`${fadeInUp} 0.6s ease-out`};
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
  box-shadow: var(--box-shadow);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--box-shadow-hover);
    border-color: rgba(255, 255, 255, 0.15);

    &::after {
      left: 100%;
    }

    .post-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 12px;
  }
`;

const PostTitle = styled.h5`
  color: var(--heading-color);
  font-weight: 700;
  font-size: clamp(1.1rem, 3vw, 1.25rem);
  margin-bottom: 0.75rem;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${PostCard}:hover & {
    color: var(--primary);
  }
`;

const PostDescription = styled.p`
  color: var(--text-secondary);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;

  .icon {
    color: var(--primary);
    font-size: 12px;
  }

  &.author {
    color: var(--primary);
    font-weight: 600;
  }
`;

const CategoryBadge = styled(Badge)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
  color: var(--background-dark) !important;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);

  @media (max-width: 768px) {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--primary);
    background: rgba(0, 230, 118, 0.1);
  }

  .icon {
    font-size: 14px;
  }
`;

// ✅ Pagination Wrapper
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  animation: ${css`${fadeInUp} 0.8s ease-out`};
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

// ✅ Dummy Data
const postsData = [
  {
    title: 'Tips for creating engaging UI animations?',
    description: "'I'm working on my first major UI project and looking for advice on creating smooth, engaging animations that don't overwhelm users.'",
    author: 'Sarah Chen',
    time: '2 hours ago',
    replies: 12,
    likes: 24,
    category: 'UI/UX',
  },
  {
    title: 'Best practices for responsive design in 2025?',
    description: 'Looking for current best practices and modern approaches to responsive web design. What frameworks and techniques are you using?',
    author: 'Mike Johnson',
    time: '5 hours ago',
    replies: 18,
    likes: 31,
    category: 'Development',
  },
  {
    title: 'How to structure a digital marketing campaign?',
    description: "'I'm new to digital marketing and need guidance on structuring an effective campaign from start to finish.'",
    author: 'Emma Davis',
    time: '1 day ago',
    replies: 15,
    likes: 19,
    category: 'Marketing',
  },
  {
    title: 'Which tools for user research in 2025?',
    description: 'Need feedback on top tools for conducting user research and usability testing in the current landscape.',
    author: 'Ali Ahmed',
    time: '3 days ago',
    replies: 8,
    likes: 12,
    category: 'UI/UX',
  },
  {
    title: 'React vs. Next.js for beginners?',
    description: 'Is Next.js too advanced for someone just starting with React? Looking for guidance on the learning path.',
    author: 'Leila Mansour',
    time: '4 days ago',
    replies: 22,
    likes: 45,
    category: 'Development',
  },
  {
    title: 'Building a personal brand as a designer',
    description: 'Strategies for building a strong personal brand in the design industry. What has worked for you?',
    author: 'James Wilson',
    time: '5 days ago',
    replies: 16,
    likes: 28,
    category: 'Career',
  },
  {
    title: 'Accessibility in modern web development',
    description: 'Best practices for ensuring web accessibility compliance while maintaining modern design aesthetics.',
    author: 'Maria Garcia',
    time: '1 week ago',
    replies: 11,
    likes: 33,
    category: 'Development',
  },
];

const postsPerPage = 3;

// ✅ Main Component
const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortFilter, setSortFilter] = useState('Most Recent');

  const totalPages = Math.ceil(postsData.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = postsData.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleNewDiscussion = () => {
    console.log('Starting new discussion...');
  };

  const handlePostClick = (post) => {
    console.log('Opening post:', post.title);
  };

  const handleLike = (e, post) => {
    e.stopPropagation();
    console.log('Liked post:', post.title);
  };

  const handleShare = (e, post) => {
    e.stopPropagation();
    console.log('Sharing post:', post.title);
  };

  return (
    <LayoutWrapper>
      <SidebarPlaceholder />

      <Main>
        <Header>
          <HeaderContent>
            <h2>Community Forum</h2>
            <p className="subtitle">
              Connect, share knowledge, and learn from fellow students
            </p>
          </HeaderContent>
          <NewDiscussionButton onClick={handleNewDiscussion}>
            <FaPlus />
            Start New Discussion
          </NewDiscussionButton>
        </Header>

        <Filters>
          <FilterLabel>
            <FaFilter className="icon" />
            Filters:
          </FilterLabel>

          <StyledSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All Categories</option>
            <option>UI/UX</option>
            <option>Development</option>
            <option>Marketing</option>
            <option>Career</option>
          </StyledSelect>

          <StyledSelect
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
          >
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Most Replies</option>
          </StyledSelect>
        </Filters>

        {currentPosts.map((post, index) => (
          <PostCard
            key={index}
            $delay={`${index * 0.1}s`}
            onClick={() => handlePostClick(post)}
          >
            <PostTitle>{post.title}</PostTitle>
            <PostDescription>{post.description}</PostDescription>

            <PostMeta>
              <MetaItem className="author">
                <FaUser className="icon" />
                {post.author}
              </MetaItem>
              <MetaItem>
                <FaClock className="icon" />
                {post.time}
              </MetaItem>
              <MetaItem>
                <FaComment className="icon" />
                {post.replies} replies
              </MetaItem>
              <CategoryBadge>
                <FaTag style={{ marginRight: '4px' }} />
                {post.category}
              </CategoryBadge>
            </PostMeta>

            <PostActions className="post-actions">
              <ActionButton onClick={(e) => handleLike(e, post)}>
                <FaHeart className="icon" />
                {post.likes} likes
              </ActionButton>
              <ActionButton onClick={(e) => handleShare(e, post)}>
                <FaShare className="icon" />
                Share
              </ActionButton>
            </PostActions>
          </PostCard>
        ))}

        {postsData.length > postsPerPage && (
          <PaginationWrapper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </PaginationWrapper>
        )}
      </Main>
    </LayoutWrapper>
  );
};

export default MainContent;
