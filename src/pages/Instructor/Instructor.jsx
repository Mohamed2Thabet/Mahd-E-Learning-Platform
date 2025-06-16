import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Layout/Sidebar';

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Instructor = () => {
  const { instructorId } = useParams();

  return (
    <Container>
      <Sidebar role="instructor" instructorId={instructorId} />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default Instructor;
