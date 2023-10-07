import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {LABELS, QUESTION_TYPES} from '../../constants/Form';
import OptionMultipleChoiceItem from './OptionMultipleChoiceItem';
import OptionCheckboxesItem from './OptionCheckboxesItem';
import {selectDropDownOption, changeTextAnswer} from '../../features/surveyPreviewFormSlice';
import {StyledTextInput} from '../../styles/Form';

const QuestionForm = ({questionIdx}: {questionIdx: number}) => {
  const dispatch = useDispatch();
  const question = useSelector(
    (state: RootState) => state.surveyPreviewForm.questions[questionIdx]
  );
  const {title, answer, layout} = question;

  const {isSelected: isQuestionSelected, type, options, isOtherSelected, isRequired} = layout;

  return (
    <div key={questionIdx}>
      <p>
        {isRequired && <span>*</span>}
        {title}
      </p>
      {(() => {
        switch (type) {
          case QUESTION_TYPES.shortAnswer:
            return (
              <StyledTextInput
                placeholder='Your answer'
                onChange={e => dispatch(changeTextAnswer({questionIdx, value: e.target.value}))}
              />
            );
          case QUESTION_TYPES.paragraph:
            return (
              <StyledTextInput
                placeholder='Your answer'
                onChange={e => dispatch(changeTextAnswer({questionIdx, value: e.target.value}))}
              />
            );
          case QUESTION_TYPES.multipleChoice:
            return (
              <ul>
                {options.map((option, optionIdx) => (
                  <OptionMultipleChoiceItem
                    key={`${questionIdx}-${optionIdx}`}
                    value={option}
                    questionIdx={questionIdx}
                    optionIdx={optionIdx}
                    questionAnswer={answer.multipleChoice!}
                  />
                ))}
                {isOtherSelected && (
                  <OptionMultipleChoiceItem
                    key={`${questionIdx}-other`}
                    questionIdx={questionIdx}
                    questionAnswer={answer.multipleChoice!}
                  />
                )}
              </ul>
            );
          case QUESTION_TYPES.checkboxes:
            return (
              <ul>
                {options.map((option, optionIdx) => (
                  <OptionCheckboxesItem
                    key={`${questionIdx}-${optionIdx}`}
                    value={option}
                    questionIdx={questionIdx}
                    optionIdx={optionIdx}
                    questionAnswer={answer.checkboxes!}
                  />
                ))}
                {isOtherSelected && (
                  <OptionCheckboxesItem
                    key={`${questionIdx}-other`}
                    questionIdx={questionIdx}
                    questionAnswer={answer.checkboxes!}
                  />
                )}
              </ul>
            );
          case QUESTION_TYPES.dropDown:
            return (
              <select
                defaultValue='LABELS.DROP_DOWN'
                onChange={e => {
                  const selectedIdx = e.target.id ? Number(e.target.id) : null;
                  dispatch(selectDropDownOption({questionIdx, selectedIdx}));
                }}
              >
                <option>{LABELS.DROP_DOWN}</option>
                {options.map((option, idx) => (
                  <option key={`${questionIdx}-${idx}`} id={idx.toString()} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );

          default:
            return <></>;
        }
      })()}
    </div>
  );
};

export default QuestionForm;
