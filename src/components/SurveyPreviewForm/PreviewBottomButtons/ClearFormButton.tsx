import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {resetForm} from '../../../features/surveyPreviewFormSlice';
import {color} from '../../../styles/variables.ts/color';

const ClearFormButton = () => {
  const dispatch = useDispatch();

  const onClearFormClick = () => {
    dispatch(resetForm());
  };
  return (
    <StyledClearFormButton aria-label='clear-form' name='clear-form' onClick={onClearFormClick}>
      Clear form
    </StyledClearFormButton>
  );
};

export default ClearFormButton;

const StyledClearFormButton = styled.button`
  margin-top: 24px;
  color: ${color.primary};
  border-radius: 4px;
  font-size: 13pt;
`;
