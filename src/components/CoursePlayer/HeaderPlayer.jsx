// components/Header.js
import React from 'react';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1c1c1c;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: #00ff88;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

function HeaderPlayer() {
  return (
    <HeaderWrapper>
      <Logo>CourseApp</Logo>
      <div>
        <FaBell color="white" size={20} style={{ marginRight: '1rem' }} />
        <Avatar src="https://i.pravatar.cc/300" alt="user avatar" />
      </div>
    </HeaderWrapper>
  );
}

export default HeaderPlayer;
