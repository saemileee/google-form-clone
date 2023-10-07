import {QUESTION_TYPES} from '../../constants/Form';
import {
  AnswerCheckboxes,
  AnswerMultipleChoice,
  PreviewQuestion,
  QuestionType,
} from '../../interface/Form';
import {StyledFormWrapper, StyledGeneralFormContainer} from '../../styles/Form';
import OptionCheckboxesItem from './OptionCheckboxesItem';
import OptionMultipleChoiceItem from './OptionMultipleChoiceItem';

const SurveyPreviewQuestionList = ({questions}: {questions: PreviewQuestion[]}) => {
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

                {isOtherSelected && (
                  <li>
                    <input type='text' />
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </StyledGeneralFormContainer>
    </StyledFormWrapper>
  );
};

export default SurveyPreviewQuestionList;
