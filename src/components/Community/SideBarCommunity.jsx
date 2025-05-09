import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FaBars, FaComments, FaBookmark, FaFileAlt } from 'react-icons/fa';
import styled from 'styled-components';

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
        <li key={index} className="text-light mb-2"># {tag}</li>
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
      >
        <FaBars />
      </Button>

      {/* Sidebar (for large screens) */}
      <FixedSidebar>
        <SidebarContent />
      </FixedSidebar>

      {/* Offcanvas (for small screens) */}
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

export default SideBarCommunity;
