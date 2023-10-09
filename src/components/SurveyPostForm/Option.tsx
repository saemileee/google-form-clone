import styled from 'styled-components';
import {StyledDragButtonH, StyledMenuButton, StyledTextInput} from '../../styles/Form';

import {useDispatch, useSelector} from 'react-redux';
import {MdDragIndicator} from 'react-icons/md';
import {AiOutlineClose} from 'react-icons/ai';

import {changeOptionValue, removeQuestionOption} from '../../features/questionFormSlice';
import {RootState} from '../../store/store';
import {QuestionType} from '../../interface/Form';
import TypeListIcon from './TypeListIcon';

const MIN_OPTION_LENGTH = 1;

interface OptionProps {
  type: QuestionType;
  value: string;
  optionIdx: number;
  questionIdx: number;
  selected: boolean;
  mouseUp: () => void;
  mouseDown: () => void;
  focusOption: (optionIdx: number) => void;
}
const Option = ({
  type,
  value,
  optionIdx,
  questionIdx,
  selected,
  mouseUp,
  mouseDown,
  focusOption,
}: OptionProps) => {
  const options = useSelector(
    (state: RootState) => state.questionForm.questions[questionIdx].options
  );

  const dispatch = useDispatch();

  return (
    <>
      <StyledLeftIconsWrapper>
        <StyledDragButtonH selected={selected} onMouseDown={mouseDown} onMouseUp={mouseUp}>
          <MdDragIndicator size={16} />
        </StyledDragButtonH>
        <span>
          <TypeListIcon type={type} optionIdx={optionIdx} />
        </span>
      </StyledLeftIconsWrapper>
      <StyledTextInput
        type='text'
        value={value}
        onChange={e => {
          const value = e.target.value;
          dispatch(changeOptionValue({questionIdx, optionIdx, value}));
        }}
        onFocus={() => focusOption(optionIdx)}
      />
      {options.length > MIN_OPTION_LENGTH && (
        <StyledMenuButton
          $tooltipPosition='bottom'
          name='remove'
          onClick={() => dispatch(removeQuestionOption({questionIdx, optionIdx}))}
        >
          <AiOutlineClose size={22} />
        </StyledMenuButton>
      )}
    </>
  );
};

export default Option;

const StyledLeftIconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
