// CoursePlayer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import SidebarPlayer from '../components/CoursePlayer/SidebarPlayer';
import VideoPlayer from '../components/CoursePlayer/VideoPlayer';
import TabsSection from '../components/CoursePlayer/TabsSection';
import HeaderPlayer from '../components/CoursePlayer/HeaderPlayer';

const CoursePlayerWrapper = styled.div`
  background-color: var(--background-dark, #101310);
  color: var(--text-light, rgba(255, 255, 255, 0.87));
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const MainContainer = styled(Container)`
  padding: 0;
  max-width: 100%;
  
  @media (min-width: 1200px) {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }
`;

const ResponsiveRow = styled(Row)`
  margin: 0;
  min-height: calc(100vh - 80px); // Assuming header is ~80px
  
  @media (max-width: 767.98px) {
    flex-direction: column;
  }
`;

const SidebarCol = styled(Col)`
  padding: 0;
  background-color: var(--card-background, #181d19);
  border-right: 1px solid var(--border-color, #333);
  
  @media (max-width: 767.98px) {
    order: 2;
    min-height: 300px;
    border-right: none;
    border-top: 1px solid var(--border-color, #333);
  }
  
  @media (min-width: 768px) {
    position: sticky;
    top: 80px; // Adjust based on header height
    height: calc(100vh - 80px);
    overflow-y: auto;
    
    /* Custom scrollbar styling */
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--background-dark, #101310);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--border-color, #333);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-dark, #00C853);
    }
  }
  
  @media (min-width: 1200px) {
    flex: 0 0 320px;
    max-width: 320px;
  }
`;

const MainContentCol = styled(Col)`
  padding: 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 767.98px) {
    order: 1;
  }
`;

const VideoCommandSection = styled.div`
  background-color: var(--background-dark, #101310);
  position: relative;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    min-height: 60vh;
  }
`;

const VideoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const CommandWrapper = styled.div`
  background-color: var(--card-background, #181d19);
  border-top: 1px solid var(--border-color, #333);
  padding: 16px;
  
  @media (min-width: 768px) {
    max-height: 200px;
    overflow-y: auto;
    
    /* Custom scrollbar styling */
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--card-background, #181d19);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--border-color, #333);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-dark, #00C853);
    }
  }
`;

const TabsWrapper = styled.div`
  background-color: var(--card-background, #181d19);
  border-top: 1px solid var(--border-color, #333);
  flex: 1;
  
  @media (min-width: 768px) {
    min-height: 40vh;
    overflow-y: auto;
    
    /* Custom scrollbar styling */
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--card-background, #181d19);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--border-color, #333);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary-dark, #00C853);
    }
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background-dark, #101310);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color, #333);
  border-top: 3px solid var(--primary, #00E676);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--border-color, #333) 20%,
    var(--primary, #00E676) 50%,
    var(--border-color, #333) 80%,
    transparent 100%
  );
  margin: 0;
`;

function CoursePlayer() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CoursePlayerWrapper>
      <LoadingOverlay show={isLoading}>
        <Spinner />
      </LoadingOverlay>

      <HeaderPlayer />

      <MainContainer fluid>
        <ResponsiveRow>
          <SidebarCol md={3} lg={3} xl={3}>
            <SidebarPlayer />
          </SidebarCol>

          <MainContentCol md={9} lg={9} xl={9}>
            <VideoCommandSection>
              <VideoWrapper>
                <VideoPlayer />
              </VideoWrapper>

              <SectionDivider />

              <TabsWrapper>
                <TabsSection />
              </TabsWrapper>
            </VideoCommandSection>

          
          </MainContentCol>
        </ResponsiveRow>
      </MainContainer>
    </CoursePlayerWrapper>
  );
}

export default CoursePlayer;