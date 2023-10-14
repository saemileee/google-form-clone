import styled from 'styled-components';
import {Option, QuestionType} from '../../../interface/Form';
import {useDispatch} from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai';
import {MdDragIndicator} from 'react-icons/md';
import {changeOptionValue, removeQuestionOption} from '../../../features/surveyPostSlice';
import {StyledDragButtonH, StyledTextInput, StyledMenuButton} from '../../../styles/Form';
import OptionIcon from './OptionIcon';
import {color} from '../../../styles/variables.ts/color';
import {selectAllText} from '../../../utils/textInputControllers';
import useTempSave from '../../../hooks/useTempSave';

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
const OptionItem = ({
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
        <OptionIcon type={type} optionIdx={optionIdx} />
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

export default OptionItem;

const StyledLeftIconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
