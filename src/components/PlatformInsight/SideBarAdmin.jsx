import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FaBars, FaUsers, FaBookOpen, FaChartBar, FaFileExport, FaCog } from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const FixedSidebar = styled.div`
  background-color: #212529;
  color: #fff;
  padding: 1rem;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: none;

  @media (min-width: 773px) {
    display: block;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  color: #fff;
  text-decoration: none;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;

  &.active {
    background-color: #198754; /* Bootstrap success color */
    color: #fff;
  }

  &:hover {
    background-color: #343a40; /* Bootstrap dark-hover */
    color: #fff;
  }
`;

const SidebarContent = () => (
  <>
    <div className="mb-4 pt-5">
      <h5 className="text-success">Admin Tools</h5>
    </div>

    <div className="mb-3 text-start">
      <StyledNavLink to="/user-management">
        <FaUsers className="me-2" /> User Management
      </StyledNavLink>
      <StyledNavLink to="/course-moderation">
        <FaBookOpen className="me-2" /> Course Moderation
      </StyledNavLink>
      <StyledNavLink to="/platform-insights">
        <FaChartBar className="me-2" /> Platform Insights
      </StyledNavLink>
      <StyledNavLink to="/reports-export">
        <FaFileExport className="me-2" /> Reports Export
      </StyledNavLink>
      <StyledNavLink to="/settings">
        <FaCog className="me-2" /> Settings
      </StyledNavLink>
    </div>
  </>
);

const SideBarAdmin = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        variant="dark"
        className="d-md-none mb-4 me-4 position-fixed bottom-0 end-0 z-3"
        onClick={() => setShow(true)}
      >
        <FaBars />
      </Button>

      <FixedSidebar>
        <SidebarContent />
      </FixedSidebar>

      <Offcanvas show={show} onHide={() => setShow(false)} className="bg-dark text-light" placement="start">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBarAdmin;
