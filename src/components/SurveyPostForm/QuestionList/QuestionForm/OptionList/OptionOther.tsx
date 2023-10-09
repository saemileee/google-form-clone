import {AiOutlineClose} from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {removeOtherOption} from '../../../../../features/surveyPostSlice';
import {QuestionType} from '../../../../../interface/Form';
import {StyledMenuButton, StyledOptionWrapper} from '../../../../../styles/Form';
import {color} from '../../../../../styles/variables.ts/color';
import OptionIcon from './OptionIcon';

const OptionOther = ({type, questionIdx}: {type: QuestionType; questionIdx: number}) => {
  const dispatch = useDispatch();

  return (
    <StyledOtherOptionWrapper>
      <OptionIcon type={type} />
      <StyledOtherOption>Other...</StyledOtherOption>
      <StyledMenuButton
        name='remove'
        $tooltipPosition='bottom'
        onClick={() => dispatch(removeOtherOption({questionIdx}))}
      >
        <AiOutlineClose size={22} />
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
