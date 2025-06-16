import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import styled from "styled-components";

const Student = () => {
  return (
    <>
      <Sidebar role="student" />
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
    </>
  );
};
export default Student;
const MainContentWrapper = styled.main`
  margin-left: 50px;
  padding: 20px;
  background-color: var(--background-dark);
  min-height: 100vh;
  color: var(--text-light);
`;