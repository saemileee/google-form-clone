import {AiOutlineEye} from 'react-icons/ai';
import styled from 'styled-components';
import {StyledMenuButton} from '../styles/Form';

const Header = () => {
  const openPreviewTab = () => {
    window.open(
      `${window.location.origin}${window.location.pathname}preview`,
      '_blank',
      'noopener, noreferrer'
    );
  };
  return (
    <StyledHeaderContainer>
      <span>Survey form</span>
      <StyledMenuButton name='preview' $tooltipPosition='bottom' onClick={openPreviewTab}>
        <AiOutlineEye size={24} />
      </StyledMenuButton>
    </StyledHeaderContainer>
  );
};

export default Header;

const StyledHeaderContainer = styled.header`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 12px 24px;
  width: 100vw;
  background-color: white;
  box-shadow: 0 0 4px lightgrey;
  span {
    font-size: 18pt;
    font-weight: 600;
  }
`;
