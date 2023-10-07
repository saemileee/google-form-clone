import {useDispatch} from 'react-redux';
import {AnswerCheckboxes} from '../../interface/Form';
import {toggleCheckboxOption} from '../../features/surveyPreviewFormSlice';
import {LABELS, OTHER_IDX} from '../../constants/Form';

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
  const dispatch = useDispatch();
  const itemId = `question-${questionIdx}-${value}`;
  const {selectedOptionIndexes} = questionAnswer;
  return (
    <li>
      <input
        type='checkbox'
        id={itemId}
        name={itemId}
        value={value}
        onChange={() => dispatch(toggleCheckboxOption({questionIdx, selectedIdx: optionIdx}))}
        checked={selectedOptionIndexes!.includes(optionIdx)}
      />
      {optionIdx === OTHER_IDX ? (
        <div>
          <label htmlFor={itemId}>{value}</label>
          <input type='text' />
        </div>
      ) : (
        <label htmlFor={itemId}>{value}</label>
      )}
    </li>
  );
};

export default OptionCheckboxesItem;
