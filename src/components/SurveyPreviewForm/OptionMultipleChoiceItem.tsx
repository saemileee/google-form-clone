import {useDispatch} from 'react-redux';
import {AnswerMultipleChoice} from '../../interface/Form';
import {toggleMultipleOption, typeOtherOption} from '../../features/surveyPreviewFormSlice';
import {LABELS, OTHER_IDX} from '../../constants/Form';

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
  const {selectedOptionIndex} = questionAnswer;
  return (
    <li>
      <input
        type='radio'
        id={itemId}
        name={itemId}
        value={value}
        onClick={() => dispatch(toggleMultipleOption({questionIdx, selectedIdx: optionIdx}))}
        checked={selectedOptionIndex === optionIdx}
      />
      {optionIdx === OTHER_IDX ? (
        <div>
          <label htmlFor={itemId}>{value}</label>
          <input
            type='text'
            onChange={e => dispatch(typeOtherOption({questionIdx, value: e.target.value}))}
          />
        </div>
      ) : (
        <label htmlFor={itemId}>{value}</label>
      )}
    </li>
  );
};

export default OptionMultipleChoiceItem;
