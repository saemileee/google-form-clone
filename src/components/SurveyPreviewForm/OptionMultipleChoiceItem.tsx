import {useDispatch} from 'react-redux';
import {AnswerMultipleChoice} from '../../interface/Form';
import {changeMultipleOption} from '../../features/surveyPreviewFormSlice';

const OptionMultipleChoiceItem = ({
  isOtherOption = false,
  value = 'Other: ',
  questionIdx,
  questionAnswer,
  optionIdx = null,
}: {
  isOtherOption?: boolean;
  value?: string;
  questionIdx: number;
  optionIdx?: number | null;
  questionAnswer: AnswerMultipleChoice;
}) => {
  const dispatch = useDispatch();
  const itemId = `question-${questionIdx}-${value}`;
  const {selectedOptionIndex, isOtherSelected} = questionAnswer;
  return (
    <li>
      <input
        type='radio'
        id={itemId}
        name={itemId}
        value={value}
        onClick={() =>
          dispatch(changeMultipleOption({questionIdx, selectedIdx: optionIdx, isOtherOption}))
        }
        checked={
          isOtherOption
            ? selectedOptionIndex === null && isOtherSelected
            : optionIdx === selectedOptionIndex
        }
      />
      {isOtherOption ? (
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

export default OptionMultipleChoiceItem;
