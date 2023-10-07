import {useDispatch} from 'react-redux';
import {AnswerMultipleChoice} from '../../interface/Form';
import {toggleMultipleOption, typeOtherOption} from '../../features/surveyPreviewFormSlice';
import {LABELS, OTHER_IDX} from '../../constants/Form';
import {StyledPreviewOptionWrapper, StyledQuestionTextInput} from '../../styles/Form';

interface OptionMultipleChoiceItemProps {
  value?: string;
  questionIdx: number;
  optionIdx?: AnswerMultipleChoice['selectedOptionIndex'];
  questionAnswer: AnswerMultipleChoice;
}

const OptionMultipleChoiceItem = ({
  value = LABELS.OTHER_OPTION,
  questionIdx,
  questionAnswer,
  optionIdx = OTHER_IDX,
}: OptionMultipleChoiceItemProps) => {
  const dispatch = useDispatch();
  const itemId = `question-${questionIdx}-${value}`;
  const {selectedOptionIndex, other} = questionAnswer;
  return (
    <StyledPreviewOptionWrapper>
      <input
        type='radio'
        id={itemId}
        name={itemId}
        value={value}
        onClick={() => dispatch(toggleMultipleOption({questionIdx, selectedIdx: optionIdx}))}
        onChange={() => {
          return;
        }}
        checked={selectedOptionIndex === optionIdx}
      />
      {optionIdx === OTHER_IDX ? (
        <span>
          <label htmlFor={itemId}>{value}</label>
          <StyledQuestionTextInput
            value={other || ''}
            type='text'
            onChange={e => dispatch(typeOtherOption({questionIdx, value: e.target.value}))}
          />
        </span>
      ) : (
        <label htmlFor={itemId}>{value}</label>
      )}
    </StyledPreviewOptionWrapper>
  );
};

export default OptionMultipleChoiceItem;
