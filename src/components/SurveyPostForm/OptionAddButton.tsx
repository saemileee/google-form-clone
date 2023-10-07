import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {addOtherOption, addQuestionOption} from '../../features/questionFormSlice';
import TypeListIcon from './TypeListIcon';
import {QuestionType} from '../../interface/Form';
import {StyledOptionWrapper} from '../../styles/Form';
import {color} from '../../styles/variables.ts/color';

const OptionAddButton = ({
  type,
  optionIdx,
  questionIdx,
  isOtherSelected,
  isOtherOptionSelectable,
}: {
  type: QuestionType;
  optionIdx: number;
  questionIdx: number;
  isOtherSelected: boolean;
  isOtherOptionSelectable: boolean;
}) => {
  const dispatch = useDispatch();

  return (
    <StyledAddOptionWrapper>
      <TypeListIcon type={type} optionIdx={optionIdx} />
      <button className='add-option' onClick={() => dispatch(addQuestionOption({questionIdx}))}>
        Add option
      </button>
      {!isOtherSelected && isOtherOptionSelectable && (
        <span>
          {' '}
          or
          <button onClick={() => dispatch(addOtherOption({questionIdx}))} className='add-other'>
            add "Other"
          </button>
        </span>
      )}
    </StyledAddOptionWrapper>
  );
};

export default OptionAddButton;

const StyledAddOptionWrapper = styled(StyledOptionWrapper)`
  padding: 0 24px 0 24px;
  box-sizing: border-box;
  height: 48px;
  span {
    padding-top: 4px;
  }

  button {
    font-size: 12pt;
  }

  .add-option {
    padding: 2px 0 2px 0;
    color: grey;
    &:hover {
      cursor: text;
      border-bottom: 1px solid ${color.lightgrey};
      margin-bottom: -1px;
    }
  }
  .add-other {
    color: ${color.primary};
  }
`;
