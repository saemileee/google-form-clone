import styled from 'styled-components';
import ClearFormButton from './ClearFormButton';
import SubmitButton from './SubmitButton';

const BottomButtons = () => {
  return (
    <StyledBottomButtonWrapper>
      <SubmitButton />
      <ClearFormButton />
    </StyledBottomButtonWrapper>
  );
};

export default BottomButtons;

const StyledBottomButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
