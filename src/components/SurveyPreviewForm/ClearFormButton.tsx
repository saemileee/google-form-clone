import styled from 'styled-components';
import {color} from '../../styles/variables.ts/color';
import {useDispatch} from 'react-redux';
import {resetForm} from '../../features/surveyPreviewFormSlice';

const ClearFormButton = () => {
  const dispatch = useDispatch();

  const onClearFormClick = () => {
    dispatch(resetForm());
  };
  return <StyledClearFormButton onClick={onClearFormClick}>Clear form</StyledClearFormButton>;
};

export default ClearFormButton;

const StyledClearFormButton = styled.button`
  margin-top: 24px;
  color: ${color.primary};
  border-radius: 4px;
  font-size: 13pt;
`;
