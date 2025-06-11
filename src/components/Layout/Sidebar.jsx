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
} from 'react-icons/fa';
import styled, { css } from 'styled-components';

const MobileToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1051;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.5rem;
  cursor: pointer;

  @media(min-width: 768px) {
    display: none;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1050;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 60px;
  background-color: var(--card-background);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
  transition: width 0.3s ease;
  z-index: 1052;
  color: var(--text-light);

  ${(props) =>
    props.expanded &&
    css`
      width: 240px;
    `}

  ${(props) =>
    props.mobileOpen &&
    css`
      width: 240px;
      position: fixed;
      z-index: 1100;
    `}

  @media (max-width: 767px) {
    transform: translateX(${(props) => (props.mobileOpen ? '0' : '-100%')});
    transition: transform 0.3s ease;
    width: 240px;
  }
`;

const DesktopToggle = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  align-self: flex-start;

  @media (max-width: 767px) {
    display: none;
  }
`;

const SidebarNav = styled.div`
  flex-grow: 1;
  margin-top: 1rem;
  overflow-y: auto;
`;

const NavItemCustom = styled(Nav.Item)`
  margin-bottom: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: var(--text-light);
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover,
  &.active {
    background-color: var(--primary);
    color: var(--background-dark);
  }

  &.active {
    font-weight: 600;
  }
`;

const NavIcon = styled.span`
  font-size: 1.25rem;
  margin-right: ${(props) => (props.expanded ? '1rem' : '0')};
  display: flex;
  justify-content: center;
  width: 24px;
  flex-shrink: 0;
`;

const NavText = styled.span`
  flex-grow: 1;
  opacity: ${(props) => (props.expanded ? 1 : 0)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  pointer-events: ${(props) => (props.expanded ? 'auto' : 'none')};
`;

const SidebarLogout = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--border-color);
`;

const LogoutBtn = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: var(--text-light);
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary);
    color: var(--background-dark);
  }
`;

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', icon: <FaHome />, to: '/home' },
    { name: 'Instructor', icon: <FaBook />, to: '/instructor' },
    { name: 'Saved Courses', icon: <FaRegSave />, to: '/saved-courses' },
    { name: 'Chart', icon: <FaChartBar />, to: '/chart' },
    { name: 'Profile', icon: <FaUser />, to: '/student-profile' },
    { name: 'Settings', icon: <FaCog />, to: '/settings' },
    { name: 'Notifications', icon: <FaBell />, to: '/notifications' },
  ];

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
      {/* Mobile Toggle Button */}
      <MobileToggleButton
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </MobileToggleButton>

      {/* Mobile Overlay */}
      {isMobileOpen && <MobileOverlay onClick={toggleMobileSidebar} />}

      {/* Sidebar */}
      <SidebarContainer expanded={isExpanded} mobileOpen={isMobileOpen}>
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

        {/* Logout Section */}
        <SidebarLogout>
          <Nav>
            <Nav.Item>
              <LogoutBtn
                onClick={handleLogout}
                title={!isExpanded ? 'Logout' : ''}
              >
                <NavIcon expanded={isExpanded}>
                  <FaSignOutAlt />
                </NavIcon>
                <NavText expanded={isExpanded}>Logout</NavText>
              </LogoutBtn>
            </Nav.Item>
          </Nav>
        </SidebarLogout>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
