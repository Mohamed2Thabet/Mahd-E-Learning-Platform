import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Layout/Sidebar';

const Instructor = () => {
  return (
    <Container>
      <Sidebar />
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
    </Container>
  );
};
export default Instructor;
const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContentWrapper = styled.main`
  flex: 1;
  padding: 20px;
  background-color: var(--background-dark);
  color: var(--text-light); 
  margin-left: 60px;

  @media (max-width: 767px) {
    margin-left: 0;
  }
`;

