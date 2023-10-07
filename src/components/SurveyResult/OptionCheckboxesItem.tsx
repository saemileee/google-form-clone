import {AnswerCheckboxes} from '../../interface/Form';
import {LABELS, OTHER_IDX} from '../../constants/Form';
import {StyledPreviewOptionWrapper, StyledQuestionTextInput} from '../../styles/Form';

interface OptionCheckboxesItemProps {
  isOtherOption?: boolean;
  value?: string;
  questionIdx: number;
  optionIdx?: number | 'other';
  questionAnswer: AnswerCheckboxes;
}

const OptionCheckboxesItem = ({
  value = LABELS.OTHER_OPTION,
  questionIdx,
  questionAnswer,
  optionIdx = OTHER_IDX,
}: OptionCheckboxesItemProps) => {
  const itemId = `question-${questionIdx}-${value}`;
  const {selectedOptionIndexes, other} = questionAnswer;
  return (
    <StyledPreviewOptionWrapper>
      <input
        disabled
        type='checkbox'
        id={itemId}
        name={itemId}
        value={value}
        checked={selectedOptionIndexes!.includes(optionIdx)}
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

export default OptionCheckboxesItem;
