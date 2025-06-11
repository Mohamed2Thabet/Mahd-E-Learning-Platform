import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FaBars, FaComments, FaBookmark, FaFileAlt } from 'react-icons/fa';
import styled from 'styled-components';

const FixedSidebar = styled.div`
  background-color: var(--background-dark);
  color: var(--text-light);
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

  input.form-control {
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    color: var(--text-light);

    &::placeholder {
      color: var(--text-secondary);
    }
  }

  .btn-success {
    background-color: var(--primary);
    border-color: var(--primary);
    color: var(--mode-text);

    &:hover, &:focus {
      background-color: var(--primary-dark);
      border-color: var(--primary-dark);
      color: var(--mode-text);
    }
  }

  .text-light {
    color: var(--text-light) !important;
  }

  .text-muted {
    color: var(--text-secondary) !important;
  }

  ul li {
    color: var(--text-light);
  }
`;

const SidebarContent = () => (
  <>
    <div className="mb-4 pt-5">
      <input type="text" className="form-control" placeholder="Search discussions..." />
    </div>

    <div className="mb-3">
      <Button variant="success" className="w-100 text-start mb-2">
        <FaComments className="me-2" /> All Discussions
      </Button>
      <div className="text-light mb-2"><FaFileAlt className="me-2" /> My Posts</div>
      <div className="text-light mb-4"><FaBookmark className="me-2" /> Following</div>
    </div>

    <div className="text-muted text-uppercase small mb-2">Popular Tags</div>
    <ul className="list-unstyled">
      {['UI/UX Design', 'Marketing', 'Beginner Help', 'Development', 'Career Advice'].map((tag, index) => (
        <li key={index}># {tag}</li>
      ))}
    </ul>
  </>
);

const SideBarCommunity = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Button for small screens */}
      <Button
        variant="dark"
        className="d-md-none mb-4 me-4 position-fixed bottom-0 end-0 z-3"
        onClick={() => setShow(true)}
        style={{
          backgroundColor: 'var(--background-dark)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-light)',
        }}
      >
        <FaBars />
      </Button>

      {/* Sidebar (for large screens) */}
      <FixedSidebar>
        <SidebarContent />
      </FixedSidebar>

      {/* Offcanvas (for small screens) */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="start"
        style={{
          backgroundColor: 'var(--background-dark)',
          color: 'var(--text-light)',
        }}
      >
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

export default SideBarCommunity;
