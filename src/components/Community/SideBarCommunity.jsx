import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import {
  FaBars,
  FaComments,
  FaBookmark,
  FaFileAlt,
  FaSearch,
  FaHashtag,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import styled, { keyframes, css } from 'styled-components';

// ✅ Animations
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const rotateArrow = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

// ✅ Enhanced Fixed Sidebar with Expand/Collapse
const FixedSidebar = styled.div`
  background: linear-gradient(135deg, var(--background-dark) 0%, var(--card-background) 100%);
  color: var(--text-light);
  padding: clamp(1rem, 2.5vw, 1.5rem);
  width: ${props => props.$isExpanded ? '280px' : '70px'};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  border-right: 1px solid var(--border-color);
  box-shadow: var(--box-shadow);
  backdrop-filter: blur(10px);
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  animation: ${css`${slideInLeft} 0.6s ease-out`};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--border-color);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 3px;
    
    &:hover {
      background: var(--primary-dark);
    }
  }

  @media (min-width: 773px) {
    display: block;
  }
`;

// ✅ Toggle Button for Expand/Collapse
const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  // left: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--primary);
  border: 2px solid var(--border-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;
  box-shadow: var(--box-shadow);

  &:hover {
    background: var(--primary-dark);
    transform: scale(1.1);
    box-shadow: var(--box-shadow-hover);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.3);
  }

  .arrow-icon {
    font-size: 12px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.$isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'};
  }
`;

// ✅ Enhanced Search Container with Better Icon Positioning
const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding-top: ${props => props.$isExpanded ? '4rem' : '2rem'};
  opacity: ${props => props.$isExpanded ? '1' : '0'};
  visibility: ${props => props.$isExpanded ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .search-icon {
    position: absolute;
  left: 30px;
    bottom: 9px;
    transform: translate(-50%, -50%);
    color: var(--text-secondary);
    font-size: 16px;
    z-index: 2;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  input.form-control {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--border-color);
    color: var(--text-light);
    padding: 14px 16px;
    border-radius: 12px;
    font-size: 14px;
    transition: all 0.3s ease;
    text-align: center;
    width: 100%;

    &::placeholder {
      color: var(--text-secondary);
      text-align: center;
    }

    &:focus {
      background: rgba(38, 166, 154, 0.05);
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.1);
      color: var(--text-light);
      text-align: left;
      padding-left: 45px;
      
      &::placeholder {
        text-align: left;
      }

      + .search-icon {
        left: 15px;
        transform: translateY(-50%);
        color: var(--primary);
      }
    }
  }

  /* Small screen specific styling */
  @media (max-width: 768px) {
    padding-top: 2rem;
    margin-bottom: 1.5rem;
    opacity: 1;
    visibility: visible;
    
    input.form-control {
      padding: 14px 16px 14px 45px;
      font-size: 15px;
      border-radius: 10px;
      background: var(--card-background);
      text-align: left;
      
      &::placeholder {
        text-align: left;
      }
      
      &:focus {
        background: rgba(38, 166, 154, 0.1);
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(38, 166, 154, 0.2);
        padding-left: 45px;
      }
    }
    
    .search-icon {
      left: 15px;
      transform: translateY(-50%);
      font-size: 16px;
      color: var(--primary);
    }
  }
`;

// ✅ Collapsed Icon Container
const CollapsedIconContainer = styled.div`
  display: ${props => props.$isExpanded ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  opacity: ${props => props.$isExpanded ? '0' : '1'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CollapsedIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.02)'};
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border-color)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$active ? 'white' : 'var(--primary)'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${props => props.$active ? 'var(--primary-dark)' : 'rgba(38, 166, 154, 0.1)'};
    transform: scale(1.05);
  }

  .icon {
    font-size: 18px;
  }

  /* Tooltip */
  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--card-background);
    color: var(--text-light);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
    box-shadow: var(--box-shadow);
    z-index: 1002;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
    left: 65px;
  }
`;

// ✅ Navigation Section (Updated)
const NavSection = styled.div`
  margin-bottom: 2rem;
  animation: ${css`${fadeIn} 0.8s ease-out`};
  animation-delay: 0.2s;
  animation-fill-mode: both;
  opacity: ${props => props.$isExpanded ? '1' : '0'};
  visibility: ${props => props.$isExpanded ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// ✅ Navigation Button (Updated)
const NavButton = styled(Button)`
  background: ${props => props.$active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.02)'} !important;
  border: 1px solid ${props => props.$active ? 'var(--primary)' : 'var(--border-color)'} !important;
  color: ${props => props.$active ? 'white' : 'var(--text-light)'} !important;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(38, 166, 154, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: ${props => props.$active ? 'var(--primary-dark)' : 'rgba(38, 166, 154, 0.1)'} !important;
    border-color: ${props => props.$active ? 'var(--primary-dark)' : 'var(--primary)'} !important;
    color: ${props => props.$active ? 'white' : 'var(--primary)'} !important;
    transform: translateX(4px);
    box-shadow: var(--box-shadow);

    &::before {
      left: 100%;
    }
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.2);
  }

  .icon {
    font-size: 16px;
    flex-shrink: 0;
    color: ${props => props.$active ? 'white' : 'var(--primary)'};
  }

  .text {
    opacity: ${props => props.$isExpanded ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

// ✅ Nav Item (Updated)
const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: var(--text-light);
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(38, 166, 154, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: rgba(38, 166, 154, 0.1);
    color: var(--primary);
    transform: translateX(4px);

    &::before {
      left: 100%;
    }
  }

  .icon {
    font-size: 16px;
    flex-shrink: 0;
    color: var(--primary);
  }

  .text {
    opacity: ${props => props.$isExpanded ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

// ✅ Tags Section (Updated)
const TagsSection = styled.div`
  animation: ${css`${fadeIn} 1s ease-out`};
  animation-delay: 0.4s;
  animation-fill-mode: both;
  opacity: ${props => props.$isExpanded ? '1' : '0'};
  visibility: ${props => props.$isExpanded ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SectionTitle = styled.div`
  color: var(--text-secondary);
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  padding: 0 4px;
`;

const TagsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TagItem = styled.li`
  color: var(--text-light);
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(38, 166, 154, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: rgba(38, 166, 154, 0.1);
    color: var(--primary);
    transform: translateX(4px);

    &::before {
      left: 100%;
    }
  }

  .hash-icon {
    color: var(--primary);
    font-size: 12px;
  }

  .text {
    opacity: ${props => props.$isExpanded ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

// ✅ Mobile Toggle Button (keeping existing styles)
const MobileToggleButton = styled(Button)`
  background: var(--card-background) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-light) !important;
  width: 56px;
  height: 56px;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: var(--box-shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  animation: ${css`${pulse} 2s ease-in-out infinite`};

  &:hover {
    background: var(--primary) !important;
    border-color: var(--primary) !important;
    color: white !important;
    transform: scale(1.1);
    box-shadow: var(--box-shadow-hover);
    animation: none;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.3);
  }

  @media (min-width: 768px) {
    display: none !important;
  }

  @media (max-width: 767px) {
    display: flex !important;
  }

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    bottom: 20px !important;
    right: 20px !important;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%) !important;
    color: white !important;
    border: 2px solid var(--primary-dark) !important;
    
    &:hover {
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%) !important;
      transform: scale(1.15);
      box-shadow: 0 8px 25px rgba(38, 166, 154, 0.4);
    }
  }

  @media (max-width: 320px) {
    width: 44px;
    height: 44px;
    bottom: 16px !important;
    right: 16px !important;
    background: var(--primary) !important;
    
    &:hover {
      background: var(--primary-dark) !important;
    }
  }
`;

// ✅ Enhanced Styled Offcanvas (keeping existing styles)
const StyledOffcanvas = styled(Offcanvas)`
  .offcanvas {
    background: linear-gradient(135deg, var(--background-dark) 0%, var(--card-background) 100%) !important;
    color: var(--text-light) !important;
    border-right: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
  }

  .offcanvas-header {
    border-bottom: 1px solid var(--border-color);
    padding: 1.5rem;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);

    .offcanvas-title {
      color: white;
      font-weight: 700;
      font-size: 1.25rem;
    }

    .btn-close {
      background: transparent;
      border: none;
      color: white;
      opacity: 0.9;
      font-size: 1.2rem;
      filter: brightness(0) invert(1);
      
      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }

  .offcanvas-body {
    padding: 1.5rem;
    overflow-y: auto;
    background: var(--background-dark);

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: var(--border-color);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--primary);
      border-radius: 3px;
      
      &:hover {
        background: var(--primary-dark);
      }
    }
  }

  @media (max-width: 768px) {
    .offcanvas {
      width: 85% !important;
      max-width: 320px;
    }
    
    .offcanvas-body {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .offcanvas {
      width: 90% !important;
      max-width: 280px;
    }
  }
`;

// ✅ Enhanced Sidebar Content Component
const SidebarContent = ({ onItemClick, isExpanded }) => {
  const [activeItem, setActiveItem] = useState('all-discussions');

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (onItemClick) onItemClick(item);
  };

  const tags = [
    'UI/UX Design',
    'Marketing',
    'Beginner Help',
    'Development',
    'Career Advice',
    'JavaScript',
    'React',
    'Node.js'
  ];

  const navigationItems = [
    { id: 'all-discussions', icon: FaComments, label: 'All Discussions', isButton: true },
    { id: 'my-posts', icon: FaFileAlt, label: 'My Posts', isButton: false },
    { id: 'following', icon: FaBookmark, label: 'Following', isButton: false }
  ];

  return (
    <>
      <SearchContainer $isExpanded={isExpanded}>
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="form-control"
          placeholder={isExpanded ? "Search discussions..." : ""}
        />
      </SearchContainer>

      {/* Collapsed Icons */}
      <CollapsedIconContainer $isExpanded={isExpanded}>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <CollapsedIcon
              key={item.id}
              $active={activeItem === item.id}
              onClick={() => handleItemClick(item.id)}
              data-tooltip={item.label}
            >
              <IconComponent className="icon" />
            </CollapsedIcon>
          );
        })}
      </CollapsedIconContainer>

      {/* Expanded Navigation */}
      <NavSection $isExpanded={isExpanded}>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;

          if (item.isButton) {
            return (
              <NavButton
                key={item.id}
                $active={activeItem === item.id}
                $isExpanded={isExpanded}
                onClick={() => handleItemClick(item.id)}
              >
                <IconComponent className="icon" />
                <span className="text">{item.label}</span>
              </NavButton>
            );
          }

          return (
            <NavItem
              key={item.id}
              $isExpanded={isExpanded}
              onClick={() => handleItemClick(item.id)}
            >
              <IconComponent className="icon" />
              <span className="text">{item.label}</span>
            </NavItem>
          );
        })}
      </NavSection>

      <TagsSection $isExpanded={isExpanded}>
        <SectionTitle>Popular Tags</SectionTitle>
        <TagsList>
          {tags.map((tag, index) => (
            <TagItem
              key={index}
              $isExpanded={isExpanded}
              onClick={() => handleItemClick(`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <FaHashtag className="hash-icon" />
              <span className="text">{tag}</span>
            </TagItem>
          ))}
        </TagsList>
      </TagsSection>
    </>
  );
};

// ✅ Main Component with Expand/Collapse State
const SideBarCommunity = ({ onItemClick }) => {
  const [show, setShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleItemClick = (item) => {
    if (onItemClick) onItemClick(item);
    setShow(false);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <MobileToggleButton
        className="position-fixed bottom-0 end-0 z-3 me-4 mb-4"
        onClick={() => setShow(true)}
        aria-label="Open sidebar menu"
      >
        <FaBars />
      </MobileToggleButton>

      {/* Desktop Fixed Sidebar with Expand/Collapse */}
      <FixedSidebar $isExpanded={isExpanded}>
        <ToggleButton
          $isExpanded={isExpanded}
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <FaChevronLeft className="arrow-icon" />
        </ToggleButton>

        <SidebarContent onItemClick={onItemClick} isExpanded={isExpanded} />
      </FixedSidebar>

      {/* Mobile Offcanvas */}
      <StyledOffcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="start"
        backdrop={true}
        scroll={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Community Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent onItemClick={handleItemClick} isExpanded={true} />
        </Offcanvas.Body>
      </StyledOffcanvas>
    </>
  );
};

export default SideBarCommunity;
