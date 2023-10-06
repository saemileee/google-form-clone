import {StyledMenuButton, StyledOptionWrapper} from '../../styles/Form';
import {AiOutlineClose} from 'react-icons/ai';
import {useDispatch} from 'react-redux';
import {removeOtherOption} from '../../features/questionFormSlice';
import {QuestionType} from '../../interface/Form';
import TypeIcon from './TypeIcon';
import styled from 'styled-components';

const OptionOther = ({type, questionIdx}: {type: QuestionType; questionIdx: number}) => {
  const dispatch = useDispatch();

  return (
    <StyledOtherOptionWrapper>
      <TypeIcon type={type} />
      <StyledOtherOption>Other...</StyledOtherOption>
      <StyledMenuButton name='remove' onClick={() => dispatch(removeOtherOption({questionIdx}))}>
        <AiOutlineClose size={22} />
      </StyledMenuButton>
    </StyledOtherOptionWrapper>
  );
};

export default OptionOther;

const StyledOtherOptionWrapper = styled(StyledOptionWrapper)`
  box-sizing: border-box;
  padding: 0 0 0 24px;
`;

const StyledOtherOption = styled.span`
  box-sizing: border-box;
  padding-bottom: 4px;
  border-bottom: 1px dotted lightgrey;
  width: 100%;
`;
