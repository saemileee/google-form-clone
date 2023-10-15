import styled from 'styled-components';
import SPClearFormButton from './SPClearFormButton';
import SPSubmitButton from './SPSubmitButton';
const SPBottomButtons = () => {
  return (
    <StyledBottomButtonWrapper>
      <SPSubmitButton />
      <SPClearFormButton />
    </StyledBottomButtonWrapper>
  );
};

export default SPBottomButtons;

const StyledBottomButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
