import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai';
import {MdDragIndicator} from 'react-icons/md';
import {changeOptionValue, removeQuestionOption} from '../../features/surveyBuilderSlice';
import useTempSave from '../../hooks/useTempSave';
import {QuestionType, Option} from '../../interface/Form';
import {StyledDragButtonH, StyledTextInput, StyledMenuButton} from '../../styles/Form';
import {color} from '../../styles/variables.ts/color';
import {selectAllText} from '../../utils/textInputControllers';
import SBQuestionOptionIcon from './SBQuestionOptionIcon';

interface OptionProps {
  type: QuestionType;
  option: Option;
  optionIdx: number;
  questionId: string;
  selected: boolean;
  mouseUp: () => void;
  mouseDown: () => void;
  focusOption: (optionIdx: number) => void;
  isRemoveBtnActive: boolean;
}
const SBQuestionOption = ({
  type,
  option,
  optionIdx,
  questionId,
  selected,
  mouseUp,
  mouseDown,
  focusOption,
  isRemoveBtnActive,
}: OptionProps) => {
  const dispatch = useDispatch();
  const saveTempForm = useTempSave();

  const {id, value} = option;
  const typeOptionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeOptionValue({questionId, optionId: id, value}));
    saveTempForm();
  };
  const focusInput = (e: React.FocusEvent<HTMLInputElement>) => {
    selectAllText(e);
    focusOption(optionIdx);
  };
  const removeOption = () => {
    dispatch(removeQuestionOption({questionId, optionId: id}));
    saveTempForm();
  };

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
        <SBQuestionOptionIcon type={type} optionIdx={optionIdx} />
      </StyledLeftIconsWrapper>
      <StyledTextInput
        type='text'
        aria-label='question-option'
        value={value}
        onChange={typeOptionValue}
        onFocus={focusInput}
      />
      {isRemoveBtnActive && (
        <StyledMenuButton
          aria-label='remove-option'
          $tooltipPosition='bottom'
          name='remove'
          onClick={removeOption}
        >
          <AiOutlineClose size={22} color={color.textGrey} />
        </StyledMenuButton>
      )}
    </>
  );
};

export default SBQuestionOption;

const StyledLeftIconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
