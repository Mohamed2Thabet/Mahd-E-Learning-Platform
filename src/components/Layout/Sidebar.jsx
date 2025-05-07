import React from 'react';
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
} from 'react-icons/fa';
import './sidebar.css';

const Sidebar = () => {
  const navLinks = [
    { name: 'Home', icon: <FaHome />, to: '/home' },
    { name: 'Instructor', icon: <FaBook />, to: '/instructor' },
    { name: 'Saved Courses', icon: <FaRegSave />, to: '/saved-courses' },
    { name: 'Chart', icon: <FaChartBar />, to: '/chart' },
    { name: 'Profile', icon: <FaUser />, to: '/profile' },
    { name: 'Settings', icon: <FaCog />, to: '/settings' },
    { name: 'Notifications', icon: <FaBell />, to: '/notifications' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <Nav>
          {navLinks.map((link) => (
            <Nav.Item key={link.name}>
              <NavLink
                to={link.to} 
                className="nav-link" 
                title={link.name}
              >
                {link.icon}
              </NavLink>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <div className="sidebar-logout">
        <Nav>
          <Nav.Link href="#">
            <FaSignOutAlt />
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
