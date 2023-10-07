import {AnswerMultipleChoice} from '../../interface/Form';
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
  const itemId = `question-${questionIdx}-${value}`;
  const {selectedOptionIndex, other} = questionAnswer;
  return (
    <StyledPreviewOptionWrapper>
      <input
        disabled
        type='radio'
        id={itemId}
        name={itemId}
        value={value}
        checked={selectedOptionIndex === optionIdx}
      />
      {optionIdx === OTHER_IDX ? (
        <span>
          <label htmlFor={itemId}>{value}</label>
          <StyledQuestionTextInput disabled value={other || ''} type='text' />
        </span>
      ) : (
        <label htmlFor={itemId}>{value}</label>
      )}
    </StyledPreviewOptionWrapper>
  );
};

export default OptionMultipleChoiceItem;
