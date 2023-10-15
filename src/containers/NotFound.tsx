import styled from 'styled-components';
import {color} from '../styles/variables.ts/color';

const NotFound = () => {
  const navigateToMain = () => {
    window.location.href = '/';
  };
  return (
    <NotFoundContainer>
      <h1>😭 잘못된 접근입니다...</h1>
      <button onClick={navigateToMain}>메인 화면으로 이동</button>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 50px;
  h1 {
    font-size: 48px;
    font-weight: 600;
    color: ${color.primary};
  }
  button {
    width: fit-content;
    padding: 12px;
    border-radius: 12px;
    background-color: ${color.primary};
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
`;
