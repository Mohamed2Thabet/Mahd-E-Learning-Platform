import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import styled from "styled-components";
const Student = () => {
  return (
    <Container>
      <Sidebar />
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
    </Container>
  );
};

export default Student;
const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContentWrapper = styled.main`
  flex: 1;
  padding: 20px;
  background-color: var(--background-dark);
  color: var(--text-light);
  margin-left: 60px; /* لازم تكون نفس width بتاعت الـ Sidebar */
   @media (max-width: 767px) {
    margin-left: 0;
  }
`;
