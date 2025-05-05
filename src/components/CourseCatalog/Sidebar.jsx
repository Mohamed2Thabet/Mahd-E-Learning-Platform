import React from 'react';
import styled from 'styled-components';

const Sidebar = () => (
  <SidebarWrapper>
    <h5>Categories</h5>
    <ul>
      <li><input type="checkbox" /> UI/UX Design</li>
      <li><input type="checkbox" /> Development</li>
      <li><input type="checkbox" /> Marketing</li>
      <li><input type="checkbox" /> Business</li>
    </ul>

    <h5>Level</h5>
    <ul>
      <li><input type="radio" name="level" /> Beginner</li>
      <li><input type="radio" name="level" /> Intermediate</li>
      <li><input type="radio" name="level" /> Advanced</li>
    </ul>

    <h5>Duration</h5>
    <ul>
      <li><button className="btn btn-outline-light w-100 mb-2">0–2 Hours</button></li>
      <li><button className="btn btn-outline-light w-100 mb-2">3–6 Hours</button></li>
      <li><button className="btn btn-outline-light w-100 mb-2">7–12 Hours</button></li>
      <li><button className="btn btn-outline-light w-100">13+ Hours</button></li>
    </ul>

    <SearchBox type="text" placeholder="Search courses..." />
  </SidebarWrapper>
);

export default Sidebar;

const SidebarWrapper = styled.div`
  width: 250px;
  background: #000;
  color: white;
  padding: 1rem;
  height: 100vh;
  position: fixed;
`;

const SearchBox = styled.input`
  margin-top: 1rem;
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: none;
`;
