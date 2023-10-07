import {useDispatch} from 'react-redux';
import {AnswerDropDown} from '../../interface/Form';
import {changeMultipleOption} from '../../features/surveyPreviewFormSlice';

const OptionDropDownItem = ({
  value,
  questionIdx,
  questionAnswer,
  optionIdx,
}: {
  value: string | null;
  questionIdx: number;
  optionIdx: number;
  questionAnswer: AnswerDropDown;
}) => {
  const dispatch = useDispatch();
  const itemId = `question-${questionIdx}-${value}`;
  const {selectedOptionIndex} = questionAnswer;
  return (
    <li>
      <input
        type='radio'
        id={itemId}
        name={itemId}
        value={value ? value : undefined}
        onChange={() => dispatch(changeMultipleOption({questionIdx, selectedIdx: optionIdx}))}
        checked={optionIdx === selectedOptionIndex}
      />
      <label htmlFor={itemId}>{value}</label>
    </li>
  );
};

export default OptionDropDownItem;
