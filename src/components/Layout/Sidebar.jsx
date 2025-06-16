import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaBook,
  FaRegSave,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaBell,
  FaBars,
  FaTimes,
  FaPlus,
  FaEdit,
  FaInfoCircle,
  FaArrowLeft,
} from 'react-icons/fa';
import styled, { css } from 'styled-components';

// ✅ Mobile Toggle Button - نقل لأسفل اليمين
const MobileToggleButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1051;
  background: var(--primary);
  color: var(--background-dark);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(0, 230, 118, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 35px rgba(0, 230, 118, 0.5);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  @media(min-width: 768px) {
    display: none;
  }
`;

// ❌ إزالة Back Button الخارجي - تم حذفه بالكامل
// const BackButton = styled(NavLink)`...`

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 1050;
  backdrop-filter: blur(5px);
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 60px;
  background-color: var(--card-background);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1052;
  color: var(--text-light);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.3);

  ${(props) =>
    props.expanded &&
    css`
      width: 280px;
    `}

  ${(props) =>
    props.mobileOpen &&
    css`
      width: 280px;
      position: fixed;
      z-index: 1100;
    `}

  @media (max-width: 767px) {
    transform: translateX(${(props) => (props.mobileOpen ? '0' : '-100%')});
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    width: 280px;
    box-shadow: ${(props) =>
    props.mobileOpen
      ? '4px 0 40px rgba(0, 0, 0, 0.5)'
      : 'none'
  };
  }
`;

const DesktopToggle = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  align-self: flex-start;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 230, 118, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileCloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--primary);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarNav = styled.div`
  flex-grow: 1;
  margin-top: 1rem;
  overflow-y: auto;
  padding: 0 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
  }
`;

const NavItemCustom = styled(Nav.Item)`
  margin-bottom: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: var(--text-light);
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: var(--primary);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(0, 230, 118, 0.15);
    color: var(--primary);
    text-decoration: none;
    transform: translateX(5px);
    
    &::before {
      transform: scaleY(1);
    }
  }

  &.active {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--background-dark);
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);
    
    &::before {
      transform: scaleY(1);
      background: var(--background-dark);
    }
  }
  
  @media (max-width: 767px) {
    justify-content: flex-start !important;
    padding: 1rem !important;
  }
`;

const NavIcon = styled.span`
  font-size: 1.4rem;
  margin-right: ${(props) => (props.expanded ? '1rem' : '0')};
  display: flex;
  justify-content: center;
  width: 24px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  @media (max-width: 767px) {
    margin-right: 1rem !important;
  }
`;

const NavText = styled.span`
  flex-grow: 1;
  opacity: ${(props) => (props.expanded ? 1 : 0)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  pointer-events: ${(props) => (props.expanded ? 'auto' : 'none')};
  font-weight: 500;
  
  @media (max-width: 767px) {
    opacity: 1 !important;
    pointer-events: auto !important;
    display: block !important;
  }
`;

const SidebarBottom = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SidebarBackButton = styled(NavLink)`
  display: flex;
  align-items: center;
  color: var(--text-light);
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 230, 118, 0.1);
  border: 1px solid var(--primary);
  margin-bottom: 0.5rem;

  &:hover {
    background: var(--primary);
    color: var(--background-dark);
    text-decoration: none;
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(0, 230, 118, 0.3);
  }
  
  @media (max-width: 767px) {
    justify-content: flex-start !important;
    padding: 1rem !important;
  }
`;

const LogoutBtn = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: var(--text-light);
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(220, 53, 69, 0.15);
    color: #dc3545;
    transform: translateX(5px);
  }
  
  @media (max-width: 767px) {
    justify-content: flex-start !important;
    padding: 1rem !important;
  }
`;

const Sidebar = ({ role = 'instructor', instructorId = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const studentLinks = [
    { name: 'Dashboard', icon: <FaHome />, to: '/dashboard' },
    { name: 'Saved Courses', icon: <FaRegSave />, to: '/dashboard/saved-courses' },
    { name: 'Profile', icon: <FaUser />, to: '/dashboard/profile' },
    { name: 'Settings', icon: <FaCog />, to: '/dashboard/settings' },
    { name: 'Billing', icon: <FaChartBar />, to: '/dashboard/billing' },
    { name: 'Goals', icon: <FaChartBar />, to: '/dashboard/goals-milestones' },
  ];

  const instructorLinks = [
    { name: 'Dashboard', icon: <FaHome />, to: '/instructor' },
    { name: 'Profile', icon: <FaUser />, to: '/instructor/profile' },
    { name: 'Courses', icon: <FaBook />, to: '/instructor/courses' },
    { name: 'Create Course', icon: <FaPlus />, to: '/instructor/course/create' },
  ];

  const navLinks = role === 'instructor' ? instructorLinks : studentLinks;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <>
      {/* ✅ Mobile Toggle Button Only - تم إزالة Back Button الخارجي */}
      <MobileToggleButton
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
        title="Menu"
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </MobileToggleButton>

      {/* Mobile Overlay */}
      {isMobileOpen && <MobileOverlay onClick={toggleMobileSidebar} />}

      {/* Sidebar */}
      <SidebarContainer expanded={isExpanded} mobileOpen={isMobileOpen}>
        {/* Mobile Close Button */}
        {isMobileOpen && (
          <MobileCloseButton onClick={toggleMobileSidebar}>
            <FaTimes />
          </MobileCloseButton>
        )}

        {/* Desktop Toggle Button */}
        <DesktopToggle onClick={toggleSidebar} aria-label="Toggle sidebar">
          <FaBars />
        </DesktopToggle>

        {/* Navigation Links */}
        <SidebarNav>
          <Nav className="flex-column">
            {navLinks.map((link, index) => (
              <NavItemCustom key={link.name} className="nav-item-custom">
                <StyledNavLink
                  to={link.to}
                  title={!isExpanded ? link.name : ''}
                  onClick={() => setIsMobileOpen(false)}
                  data-aos="fade-right"
                  data-aos-delay={index * 50}
                >
                  <NavIcon expanded={isExpanded}>{link.icon}</NavIcon>
                  <NavText expanded={isExpanded}>{link.name}</NavText>
                </StyledNavLink>
              </NavItemCustom>
            ))}
          </Nav>
        </SidebarNav>

        {/* ✅ Bottom Section مع Back Button داخل الـ Sidebar فقط */}
        <SidebarBottom>
          {/* Back Button داخل الـ Sidebar */}
          <SidebarBackButton to="/" title="Back to Home">
            <NavIcon expanded={isExpanded}>
              <FaArrowLeft />
            </NavIcon>
            <NavText expanded={isExpanded}>Back to Home</NavText>
          </SidebarBackButton>

          {/* Logout Button */}
          <LogoutBtn
            onClick={handleLogout}
            title={!isExpanded ? 'Logout' : ''}
          >
            <NavIcon expanded={isExpanded}>
              <FaSignOutAlt />
            </NavIcon>
            <NavText expanded={isExpanded}>Logout</NavText>
          </LogoutBtn>
        </SidebarBottom>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
