import {useDispatch} from 'react-redux';
import {LABELS, QUESTION_TYPES} from '../../constants/Form';
import {
  AnswerCheckboxes,
  AnswerMultipleChoice,
  PreviewQuestion,
  QuestionType,
} from '../../interface/Form';
import {StyledFormWrapper, StyledGeneralFormContainer, StyledTextInput} from '../../styles/Form';
import OptionCheckboxesItem from './OptionCheckboxesItem';
import OptionMultipleChoiceItem from './OptionMultipleChoiceItem';
import {changeDropdownOption, changeTextAnswer} from '../../features/surveyPreviewFormSlice';

const SurveyPreviewQuestionList = ({questions}: {questions: PreviewQuestion[]}) => {
  const dispatch = useDispatch();
  return (
    <StyledFormWrapper>
      <StyledGeneralFormContainer>
        {questions.map((question, questionIdx) => {
          const {title, answer, layout} = question;
          const {
            isSelected: isQuestionSelected,
            type,
            options,
            isOtherSelected,
            isRequired,
          } = layout;

          return (
            <div key={questionIdx}>
              <p>
                {isRequired && <span>*</span>}
                {title}
              </p>
              <ul>
                {type === QUESTION_TYPES.multipleChoice &&
                  options.map((option, optionIdx) => (
                    <OptionMultipleChoiceItem
                      key={`${questionIdx}-${optionIdx}`}
                      value={option}
                      questionIdx={questionIdx}
                      optionIdx={optionIdx}
                      questionAnswer={answer as AnswerMultipleChoice}
                    />
                  ))}

                {isOtherSelected && type === QUESTION_TYPES.multipleChoice && (
                  <OptionMultipleChoiceItem
                    isOtherOption
                    key={`${questionIdx}-other`}
                    questionIdx={questionIdx}
                    questionAnswer={answer as AnswerMultipleChoice}
                  />
                )}

                {type === QUESTION_TYPES.checkboxes &&
                  options.map((option, optionIdx) => (
                    <OptionCheckboxesItem
                      key={`${questionIdx}-${optionIdx}`}
                      value={option}
                      questionIdx={questionIdx}
                      optionIdx={optionIdx}
                      questionAnswer={answer as AnswerCheckboxes}
                    />
                  ))}
              </ul>
              {type === QUESTION_TYPES.dropDown && (
                <select
                  defaultValue='LABELS.DROP_DOWN'
                  onChange={e => {
                    const selectedIdx = e.target.id ? Number(e.target.id) : null;
                    dispatch(changeDropdownOption({questionIdx, selectedIdx}));
                  }}
                >
                  <option>{LABELS.DROP_DOWN}</option>
                  {options.map((option, idx) => (
                    <option key={`${questionIdx}-${idx}`} id={idx.toString()} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {type === QUESTION_TYPES.shortAnswer && (
                <StyledTextInput
                  placeholder='Your answer'
                  onChange={e => dispatch(changeTextAnswer({questionIdx, value: e.target.value}))}
                />
              )}
              {type === QUESTION_TYPES.paragraph && (
                <textarea
                  placeholder='Your answer'
                  onChange={e => dispatch(changeTextAnswer({questionIdx, value: e.target.value}))}
                />
              )}
            </div>
          );
        })}
      </StyledGeneralFormContainer>
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
