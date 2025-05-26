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
import './sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', icon: <FaHome />, to: '/home' },
    { name: 'Instructor', icon: <FaBook />, to: '/instructor' },
    { name: 'Saved Courses', icon: <FaRegSave />, to: '/saved-courses' },
    { name: 'Chart', icon: <FaChartBar />, to: '/chart' },
    { name: 'Profile', icon: <FaUser />, to: '/profile' },
    { name: 'Settings', icon: <FaCog />, to: '/settings' },
    { name: 'Notifications', icon: <FaBell />, to: '/notifications' }
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="mobile-sidebar-toggle"
        onClick={toggleMobileSidebar}
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="mobile-overlay"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isExpanded ? 'expanded' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Desktop Toggle Button */}
        <button
          className="desktop-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <div className="sidebar-nav">
          <Nav className="flex-column">
            {navLinks.map((link, index) => (
              <Nav.Item key={link.name} className="nav-item-custom">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link-sidebar ${isActive ? 'active' : ''}`
                  }
                  title={!isExpanded ? link.name : ''}
                  onClick={() => setIsMobileOpen(false)}
                  data-aos="fade-right"
                  data-aos-delay={index * 50}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-text">{link.name}</span>
                </NavLink>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        {/* Logout Section */}
        <div className="sidebar-logout">
          <Nav>
            <Nav.Item>
              <button
                className="logout-btn"
                onClick={handleLogout}
                title={!isExpanded ? 'Logout' : ''}
              >
                <span className="nav-icon">
                  <FaSignOutAlt />
                </span>
                <span className="nav-text">Logout</span>
              </button>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;