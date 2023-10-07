import {useDispatch} from 'react-redux';
import {AnswerMultipleChoice} from '../../interface/Form';
import {changeMultipleOption} from '../../features/surveyPreviewFormSlice';

const OptionMultipleChoiceItem = ({
  value,
  questionIdx,
  questionAnswer,
  optionIdx,
}: {
  value: string;
  questionIdx: number;
  optionIdx: number;
  questionAnswer: AnswerMultipleChoice;
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
        value={value}
        onChange={() => dispatch(changeMultipleOption({questionIdx, selectedIdx: optionIdx}))}
        checked={optionIdx === selectedOptionIndex}
      />
      <label htmlFor={itemId}>{value}</label>
    </li>
  );
};

export default OptionMultipleChoiceItem;
