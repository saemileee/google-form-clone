import {useDispatch} from 'react-redux';
import {AnswerCheckboxes} from '../../interface/Form';
import {toggleCheckboxOption} from '../../features/surveyPreviewFormSlice';

const OptionCheckboxesItem = ({
  value,
  questionIdx,
  questionAnswer,
  optionIdx,
}: {
  value: string;
  questionIdx: number;
  optionIdx: number;
  questionAnswer: AnswerCheckboxes;
}) => {
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
        onChange={() => dispatch(toggleCheckboxOption({questionIdx, optionIdx}))}
        checked={selectedOptionIndexes ? selectedOptionIndexes.includes(optionIdx) : false}
      />
      <label htmlFor={itemId}>{value}</label>
    </li>
  );
};

export default OptionCheckboxesItem;
