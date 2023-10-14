import {AiOutlineClose} from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {removeOtherOption} from '../../../features/surveyPostSlice';
import {QuestionType} from '../../../interface/Form';
import {StyledMenuButton, StyledOptionWrapper} from '../../../styles/Form';
import {color} from '../../../styles/variables.ts/color';
import OptionIcon from './OptionIcon';

const OptionOther = ({type, questionId}: {type: QuestionType; questionId: string}) => {
  const dispatch = useDispatch();

  return (
    <StyledOtherOptionWrapper>
      <OptionIcon type={type} />
      <StyledOtherOption>Other...</StyledOtherOption>
      <StyledMenuButton
        aria-label='remove-option'
        name='remove'
        $tooltipPosition='bottom'
        onClick={() => dispatch(removeOtherOption({questionId}))}
      >
        <AiOutlineClose size={22} color={color.textGrey} />
      </StyledMenuButton>
    </StyledOtherOptionWrapper>
  );
};

export default OptionOther;

const StyledOtherOptionWrapper = styled(StyledOptionWrapper)`
  box-sizing: border-box;
  padding: 0 0 0 24px;
  width: 100%;
`;

const StyledOtherOption = styled.span`
  box-sizing: border-box;
  padding-bottom: 4px;
  border-bottom: 1px dotted ${color.lightgrey};
  width: 90%;
`;
