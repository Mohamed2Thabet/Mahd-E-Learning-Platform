// components/Sidebar.js
import { Nav } from 'react-bootstrap';
import { FaBell, FaBook, FaInbox, FaTrophy, FaBars, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const SidebarContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

const SidebarWrapper = styled.div`
  width: ${props => props.$isCollapsed ? '70px' : '250px'};
  background-color: var(--background-dark);
  color: var(--text-light);
  height: 100vh;
  padding: ${props => props.$isCollapsed ? '24px 8px' : '24px 16px'};
  border-right: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--primary) 30%,
      var(--primary-dark) 70%,
      transparent 100%
    );
  }

  @media (max-width: 768px) {
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    width: 280px;
    box-shadow: ${props => props.$isOpen ? '0 0 20px rgba(0, 0, 0, 0.5)' : 'none'};
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const ToggleButton = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0, 230, 118, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 230, 118, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CollapseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--card-background);
    color: var(--primary);
    border-color: var(--primary);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarTitle = styled.h3`
  color: var(--heading-color);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 0.5px;
  opacity: ${props => props.$isCollapsed ? '0' : '1'};
  transform: ${props => props.$isCollapsed ? 'scale(0.8)' : 'scale(1)'};
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledNav = styled(Nav)`
  flex-direction: column;
  gap: 8px;
`;

const StyledNavLink = styled(Nav.Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: var(--text-secondary) !important;
  text-decoration: none !important;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  position: relative;
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};
  
  &:hover {
    background-color: var(--card-background);
    color: var(--text-light) !important;
    border-color: var(--border-color);
    transform: ${props => props.$isCollapsed ? 'scale(1.1)' : 'translateX(4px)'};
    
    svg {
      color: var(--primary);
      transform: scale(1.1);
    }
  }
  
  &:active, &.active {
    background-color: var(--card-background);
    color: var(--text-light) !important;
    border-color: var(--primary);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--primary);
      border-radius: 0 2px 2px 0;
    }
    
    svg {
      color: var(--primary);
    }
  }
  
  svg {
    font-size: 1.1rem;
    transition: all 0.3s ease;
    color: var(--text-secondary);
    flex-shrink: 0;
  }
  
  span {
    opacity: ${props => props.$isCollapsed ? '0' : '1'};
    transform: ${props => props.$isCollapsed ? 'translateX(-10px)' : 'translateX(0)'};
    transition: all 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const NavSection = styled.div`
  margin-bottom: 16px;
`;

const SectionLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  padding: 0 16px;
  opacity: ${props => props.$isCollapsed ? '0' : '1'};
  transform: ${props => props.$isCollapsed ? 'scale(0.8)' : 'scale(1)'};
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  margin-left: ${props => props.$sidebarWidth};
  transition: margin-left 0.3s ease;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export default function Sidebar({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const sidebarWidth = isMobile ? '0px' : (isCollapsed ? '70px' : '250px');

  return (
    <>
      <SidebarContainer>
        <Overlay $isOpen={isOpen} onClick={closeMobileSidebar} />

        <SidebarWrapper $isCollapsed={isCollapsed} $isOpen={isOpen}>
          {!isMobile && (
            <CollapseButton onClick={toggleSidebar}>
              <FaBars />
            </CollapseButton>
          )}

          <SidebarTitle $isCollapsed={isCollapsed}>
            
          </SidebarTitle>

          <StyledNav>
            <NavSection>
              <SectionLabel $isCollapsed={isCollapsed}>
                Notifications
              </SectionLabel>
              <StyledNavLink href="#notifications" $isCollapsed={isCollapsed} onClick={closeMobileSidebar}>
                <FaBell />
                <span>All Notifications</span>
              </StyledNavLink>
            </NavSection>

            <NavSection>
              <SectionLabel $isCollapsed={isCollapsed}>
                Learning
              </SectionLabel>
              <StyledNavLink href="#courses" $isCollapsed={isCollapsed} onClick={closeMobileSidebar}>
                <FaBook />
                <span>Course Updates</span>
              </StyledNavLink>
              <StyledNavLink href="#progress" $isCollapsed={isCollapsed} onClick={closeMobileSidebar}>
                <FaTrophy />
                <span>Quiz & Progress</span>
              </StyledNavLink>
            </NavSection>

            <NavSection>
              <SectionLabel $isCollapsed={isCollapsed}>
                Communication
              </SectionLabel>
              <StyledNavLink href="#messages" $isCollapsed={isCollapsed} onClick={closeMobileSidebar}>
                <FaInbox />
                <span>Messages & Replies</span>
              </StyledNavLink>
            </NavSection>
          </StyledNav>
        </SidebarWrapper>

        <ToggleButton onClick={toggleSidebar}>
          {isMobile ? (isOpen ? <FaTimes /> : <FaBars />) : null}
        </ToggleButton>
      </SidebarContainer>

      <ContentWrapper $sidebarWidth={sidebarWidth}>
        {children}
      </ContentWrapper>
    </>
  );
}