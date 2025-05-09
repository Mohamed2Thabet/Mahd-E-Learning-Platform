import React from 'react';
import SideBarCommunity from '../../components/Community/SideBarCommunity';
import MainContent from '../../components/Community/MainContent';

const Community = () => {
  return (
    <div className='background-dark' style={{  minHeight: "calc(100vh - 63px)" }}>
      <SideBarCommunity />
      <MainContent/>
    </div>
  );
}

export default Community;
