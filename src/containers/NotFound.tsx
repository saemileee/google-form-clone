import styled from 'styled-components';
import {color} from '../styles/variables.ts/color';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>😭 잘못된 접근입니다...</h1>
      <p>메인 화면으로 이동합니다..</p>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  text-align: center;
  gap: 30px;
  h1 {
    font-size: 48px;
    font-weight: 600;
    color: ${color.primary};
  }
  p {
    font-size: 24px;
  }
`;
