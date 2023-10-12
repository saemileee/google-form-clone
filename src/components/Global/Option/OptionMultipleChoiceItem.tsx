import {useDispatch} from 'react-redux';
import {LABELS, OTHER_IDX} from '../../../constants/Form';
import {toggleMultipleOption, typeOtherOption} from '../../../features/surveyPreviewFormSlice';
import {AnswerMultipleChoice} from '../../../interface/Form';
import {StyledPreviewOptionWrapper, StyledQuestionTextInput} from '../../../styles/Form';
import {selectAllText} from '../../../utils/textInputControllers';

interface OptionMultipleChoiceItemProps {
  value?: string;
  questionIdx: number;
  optionIdx?: AnswerMultipleChoice['selectedOptionIndex'];
  questionAnswer: AnswerMultipleChoice;
  isForResult?: boolean;
}

const OptionMultipleChoiceItem = ({
  value = LABELS.OTHER_OPTION,
  questionIdx,
  questionAnswer,
  optionIdx = OTHER_IDX,
  isForResult = false,
}: OptionMultipleChoiceItemProps) => {
  const dispatch = useDispatch();
  const itemId = `question-${questionIdx}-${value}`;
  const {selectedOptionIndex, other} = questionAnswer;
  return (
    <StyledPreviewOptionWrapper>
      <input
        disabled={isForResult}
        type='radio'
        id={itemId}
        name={itemId}
        aria-label={itemId}
        value={value}
        onClick={
          isForResult
            ? undefined
            : () => dispatch(toggleMultipleOption({questionIdx, selectedIdx: optionIdx}))
        }
        onChange={() => {
          return;
        }}
        checked={selectedOptionIndex === optionIdx}
      />
      {optionIdx === OTHER_IDX ? (
        <span>
          <label htmlFor={itemId}>{value}</label>
          <StyledQuestionTextInput
            id={itemId}
            name={itemId}
            disabled={isForResult}
            value={other || ''}
            type='text'
            onChange={e => dispatch(typeOtherOption({questionIdx, value: e.target.value}))}
            onFocus={selectAllText}
          />
        </span>
      ) : (
        <label htmlFor={itemId}>{value}</label>
      )}
    </StyledPreviewOptionWrapper>
  );
};

export default OptionMultipleChoiceItem;
