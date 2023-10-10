import {useDispatch} from 'react-redux';
import {OTHER_IDX} from '../../../constants/Form';
import {toggleCheckboxOption, typeOtherOption} from '../../../features/surveyPreviewFormSlice';
import {AnswerCheckboxes} from '../../../interface/Form';
import {StyledPreviewOptionWrapper, StyledQuestionTextInput} from '../../../styles/Form';

interface OptionCheckboxesItemProps {
  isOtherOption?: boolean;
  value?: string;
  questionIdx: number;
  optionIdx?: number | 'other';
  questionAnswer: AnswerCheckboxes;
  isForResult?: boolean;
}

const OptionCheckboxesItem = ({
  value = OTHER_IDX,
  questionIdx,
  questionAnswer,
  optionIdx = OTHER_IDX,
  isForResult = false,
}: OptionCheckboxesItemProps) => {
  const dispatch = useDispatch();
  const itemId = `question-${questionIdx}-${value}`;
  const {selectedOptionIndexes, other} = questionAnswer;
  return (
    <StyledPreviewOptionWrapper>
      <input
        disabled={isForResult}
        type='checkbox'
        id={itemId}
        name={itemId}
        value={value}
        onChange={
          isForResult
            ? undefined
            : () => dispatch(toggleCheckboxOption({questionIdx, selectedIdx: optionIdx}))
        }
        checked={selectedOptionIndexes.includes(optionIdx)}
      />
      {optionIdx === OTHER_IDX ? (
        <span>
          <label htmlFor={itemId}>{value}</label>
          <StyledQuestionTextInput
            disabled={isForResult}
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

export default OptionCheckboxesItem;
