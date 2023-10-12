import styled from 'styled-components';
import {QuestionType} from '../../../interface/Form';
import {useDispatch, useSelector} from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai';
import {MdDragIndicator} from 'react-icons/md';
import {changeOptionValue, removeQuestionOption} from '../../../features/surveyPostSlice';
import {RootState} from '../../../store/store';
import {StyledDragButtonH, StyledTextInput, StyledMenuButton} from '../../../styles/Form';
import OptionIcon from './OptionIcon';
import {color} from '../../../styles/variables.ts/color';
import {selectAllText} from '../../../utils/textInputControllers';

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
        <StyledDragButtonH
          aria-label='move-option'
          selected={selected}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
        >
          <MdDragIndicator size={16} />
        </StyledDragButtonH>
        <OptionIcon type={type} optionIdx={optionIdx} />
      </StyledLeftIconsWrapper>
      <StyledTextInput
        type='text'
        aria-label='question-option'
        value={value}
        onChange={e => {
          const value = e.target.value;
          dispatch(changeOptionValue({questionIdx, optionIdx, value}));
        }}
        onFocus={e => {
          selectAllText(e);
          focusOption(optionIdx);
        }}
      />
      {options.length > MIN_OPTION_LENGTH && (
        <StyledMenuButton
          aria-label='remove-option'
          $tooltipPosition='bottom'
          name='remove'
          onClick={() => dispatch(removeQuestionOption({questionIdx, optionIdx}))}
        >
          <AiOutlineClose size={22} color={color.textGrey} />
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
