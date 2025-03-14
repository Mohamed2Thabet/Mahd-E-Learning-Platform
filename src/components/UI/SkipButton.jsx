import React from 'react';
import styled from 'styled-components';

const SkipButton = ({color}) => {
  return (
    <StyledWrapper>
      <button className="Btn" style={{ background: `linear-gradient(to right, #8be3fc, ${color})` }}>
        SKIP
        <svg viewBox="0 0 320 512" className="svg">
          <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" />
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100px;
    height: 40px;
    border: none;
    padding: 0px 20px;
    background: linear-gradient(to right, #8be3fc, #576bff);
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 20px 30px -7px rgba(97, 118, 238, 0.5);
    transition-duration: 0.3s;
  }

  .svg {
    width: 12px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    fill: white;
    transition-duration: 0.3s;
  }

  .Btn:hover {
    color: transparent;
  }

  .Btn:hover svg {
    right: 43%;
    margin: 0;
    padding: 0;
    border: none;
    transition-duration: 0.3s;
  }

  .Btn:active {
    transform: translate(3px, 3px);
    transition-duration: 0.3s;
  }`;

export default SkipButton;
