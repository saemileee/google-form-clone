import {AiOutlineEye} from 'react-icons/ai';
import styled from 'styled-components';
import {StyledMenuButton} from '../styles/Form';
import {color} from '../styles/variables.ts/color';

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
      <StyledMenuButton
        aria-label='preview-form'
        name='preview'
        $tooltipPosition='bottom'
        onClick={openPreviewTab}
      >
        <AiOutlineEye size={24} />
      </StyledMenuButton>
    </StyledHeaderContainer>
  );
};

export default Header;

const StyledHeaderContainer = styled.header`
  position: fixed;
  z-index: 999;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 12px 24px;
  width: 100vw;
  background-color: white;
  box-shadow: 0 0 4px ${color.lightgrey};
  span {
    font-size: 15pt;
    font-weight: 600;
  }
`;
